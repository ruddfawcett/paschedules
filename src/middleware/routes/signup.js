const router = require('feathers').Router();
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  const users = app.service('/api/users');
  const tokens = app.service('/api/tokens');

  router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {return res.redirect('/students/'+req.user.username);}
    res.render('signup');
  });

  router.post('/', (req, res, next) => {
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
            return res.json({code: 201});
          }
          else {
            return res.json({code: 500});
          }
        }).catch((error) => {
          return res.json({code: 500});
        });
      }
      else {
        return res.json({code: 409});
      }
    }).catch((error) => {
      return res.json({code: 500});
    });
  });

  return router;
};
