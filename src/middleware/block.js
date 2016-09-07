const router = require('feathers').Router();
const errors = require('../utils/errors.js');
const find = require('../modules/students/find.js');

module.exports = function(app) {
  router.get('*', (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.render('login');
    }
    else {
      next();
    }
  });

  router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
      return find(app, res, next, req.user.username);
    }
    else {
      return res.render('login');
    }
  });

  return router;
}
