const router = require('feathers').Router();
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  const users = app.service('/api/users');

  router.get('/:username', (req, res, next) => {
    users.find({ query: { username: req.params.username, role: 'TEACHER' } }).then((result) => {
      if (!courses.data.length) { next(errors.NotFound); }
      else {
        res.render('schedule');
      }
    }).catch((error) => {
      res.render('error', {
        error: error
      });
    });
  });

  return router;
};
