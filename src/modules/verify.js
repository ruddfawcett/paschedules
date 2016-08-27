const app = require('../app');
const tokens = app.service('tokens');

module.exports = {
  email: function(options) {
    return function(hook) {
      tokens.create({ target:  id}).then((result) => {
        if (result) {
          pigeon.send('verify', { user: hook.data, token: result });
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
