const pigeon = require('./pigeon');

module.exports =  {
  email: (options) => {
    return (hook) => {
      if (!hook.result.username) {
        return;
      }
      const tokens = hook.app.service('/api/tokens');

      tokens.create({ target: hook.result._id}).then((result) => {
        if (result) {
          pigeon.send('verify', { user: hook.result, token: result }).catch((error) => {
            console.log(error);
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  user: (token) => {

  }
}
