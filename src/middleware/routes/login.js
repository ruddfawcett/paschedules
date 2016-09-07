const router = require('feathers').Router();
const errors = require('../../utils/errors.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const importer = require('../../modules/importer');
const ical = require('ical');

module.exports = function(app) {
  const users = app.service('/api/users');
  const tokens = app.service('/api/tokens');

  router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {return res.redirect('/');}
    return res.render('login');
  });

  passport.use(new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => {
    if (req.body.token) {
      users.find({query: {username: username, role: 'STUDENT'}}).then((results) => {
        if (!results.data.length) { return done(null, false); }
        else {
          var user = results.data[0];
          user.verifyPassword(password, (err, match) => {
            if (err || !match) {
              return done(null, false);
            }
            else {
              tokens.update(req.body.token, {$set: {valid: false}}).then((invalidated) => {
                if (!invalidated) {return done(null, false);}
                else {
                  users.update(user._id, {$set: {verified: true}}).then((verified) => {
                    if (!verified) {return done(null, false);}
                    else {
                      var calendar = user.calendar.url;
                      ical.fromURL(calendar, {}, function(error, data) {
                        if (error) { console.log('[ERROR] Couldn\'t load calendar from URL'); return done(null, false);}
                        else {
                          importer.import(app, verified, data).then(() => {
                            return done(null, verified);
                          });
                        }
                      }).catch((error) => {
                        return done(error);
                      });
                    }
                  });
                }
              }).catch((error) => {
                return done(error);
              });
            }
          });
        }
      }).catch((error) => {
        return done(error);
      });
    }
    else {
      users.find({query: {username: username, verified: true, role: 'STUDENT'}}).then((results) => {
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

  router.post('/', (req, res, next) => {
    if (req.isAuthenticated()) {res.json({code: 200, path: '/students/'+req.user.username});}
    passport.authenticate('local', {session: true}, (error, user, info) => {
      if (error) { return res.json({code: 500}); }
      if (!user) { return res.json({code: 401}); }
      req.logIn(user, function(error) {
        if (!req.body.token && !user.verified) { return res.json({code: 403}); }
        if (error) { return res.json({code: 500}); }
        return res.json({code: 200, path: '/students/'+req.user.username});
      });
    })(req, res, next);
  });

  return router;
};
