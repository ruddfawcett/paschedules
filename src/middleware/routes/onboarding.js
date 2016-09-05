const router = require('feathers').Router();
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  router.get('/login', (req, res, next) => {
    res.render('login');
  });

  router.get('/signup', (req, res, next) => {
    res.render('signup');
  });

  return router;
};
