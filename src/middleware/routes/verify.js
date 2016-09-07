const router = require('feathers').Router();
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  const users = app.service('/api/users');
  const tokens = app.service('/api/tokens');

  router.get('/:token_id', (req, res, next) => {
    if (req.isAuthenticated()) {return res.redirect('/students/'+req.user.username);}
    tokens.find({ query: {_id: req.params.token_id, valid: true}}).then((result) => {
      if (!result.length) {
        return res.render('error', {error: errors.NotFoundToken});
      }
      else {
        req.logout();
        req.session = null;
        res.render('login', {
          verify: true,
          token: req.params.token_id
        });
      }
    }).catch((error) => {
      next(error);
    });
  });

  return router;
};
