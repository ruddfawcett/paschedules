const router = require('feathers').Router();

module.exports = function(app) {
  const users = app.service('/api/users');
  const tokens = app.service('/api/tokens');

  router.get('/:token_id', (req, res, next) => {
    tokens.find({ query: {_id: req.params.token_id, valid: true}}).then((result) => {
      if (!result.data.length) {
        console.log('token not found');
      }
      else {
        console.log(`found token, target user: ${result.data[0].target}`);
      }
    }).catch((error) => {
      console.log(error);
    })
  });

  return router;
};
