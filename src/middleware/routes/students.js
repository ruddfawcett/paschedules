const router = require('feathers').Router();
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  const users = app.service('/api/users');

  router.get('/:username', (req, res, next) => {
    users.find({ query: { username: req.params.username, role: 'STUDENT' } }).then((users) => {
      if (!users.data.length) { next(errors.NotFound); }
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
