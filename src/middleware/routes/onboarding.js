const router = require('feathers').Router();
const errors = require('../../utils/errors.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

module.exports = function(app) {
  const users = app.service('/api/users');

  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(function (err) {
      return res.redirect('/login');
    });
  });

  router.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {return res.redirect('/students/'+req.user.username);}
    res.render('login');
  });

  passport.use(new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    if (req.body.token) {

    }
    else {
      users.find({query: {username: username, role: 'STUDENT'}}).then((results) => {
        if (!results.data.length) { return done(null, false); }
        else {
          results.data[0].verifyPassword(password, (err, match) => {
            if (err || !match) {
              return done(null, false);
            }
            else {
              return done(null, results.data[0]);
            }
          });
        }
      }).catch((error) => {
        return done(error);
      });
    }
  }));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    users.get(id).then((user) => {
      done(null, user);
    }).catch((error) => {
      done(error, null);
    });
  });

  router.post('/login', (req, res, next) => {
    if (req.isAuthenticated()) {return res.redirect('/students/'+req.user.username);}
    passport.authenticate('local', {session: true}, (error, user, info) => {
      if (error) { return res.json({code: 500}); }
      if (!user) { return res.json({code: 401}); }
      req.logIn(user, function(error) {
        if (!req.body.token && !user.verified) { return res.json({code: 403}); }
        if (error) { return res.json({code: 500}); }
        return res.json({code: 200});
      });
    })(req, res, next);
  });

  router.get('/signup', (req, res, next) => {
    if (req.isAuthenticated()) {return res.redirect('/students/'+req.user.username);}
    res.render('signup');
  });

  router.post('/signup', (req, res, next) => {
    if (req.isAuthenticated()) {return res.redirect('/students/'+req.user.username);}

    if (!req.body.ical.startsWith('https://unify-ext.andover.edu/extranet/Student/OpenCalendar')) {
      return res.json({code: 400});
    }

    var Student = {
      name: {
        first: req.body.name.first,
        last: req.body.name.last
      },
      calendar: {
        url: req.body.ical
      },
      username: req.body.username,
      password: req.body.password,
      class: req.body.class,
      role: 'STUDENT'
    }

    users.find({query: {username: Student.username, role: 'STUDENT'}}).then((result) => {
      if (!result.data.length) {
        users.create(Student).then((result) => {
          if (result) {
            res.json({code: 201});
          }
          else {
            res.json({code: 500});
          }
        }).catch((error) => {
          res.json({code: 500});
        });
      }
      else {
        res.json({code: 409});
      }
    }).catch((error) => {
      res.json({code: 500});
    });
  });

  return router;
};
