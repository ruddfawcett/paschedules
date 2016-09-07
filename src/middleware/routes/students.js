const router = require('feathers').Router();
const find = require('../../modules/students/find.js');

module.exports = function(app) {
  router.get('/:username', (req, res, next) => {
    return find(app, res, next, req.params.username);
  });

  return router;
};
