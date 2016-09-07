const router = require('feathers').Router();
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  router.get('/:query', (req, res, next) => {
    console.log(req.params.query);
  });

  return router;
};
