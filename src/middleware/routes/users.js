const router = require('feathers').Router();

module.exports = function(app) {
  const users = app.service('/api/users');

  router.get('/:username', (req, res, next) => {
    users.find({ query: { username: req.params.username } }).then((result) => {
      if (!result.data.length) {
        res.render('error', {
          error: new Error('User not found.')
        });
      }

      res.render('schedule');
    }).catch((error) => {
      res.render('error', {
        error: error
      });
    });
  });

  return router;
};
