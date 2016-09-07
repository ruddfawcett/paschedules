const router = require('feathers').Router();

module.exports = function() {
  router.get('/', (req, res, next) => {
    req.logout();
    req.session = null;
    return res.redirect('/');
  });

  return router;
}
