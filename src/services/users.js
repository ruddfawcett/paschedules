const service = require('feathers-mongoose');
const User = require('../models/user');
const hooks = require('../hooks/users');

module.exports = function() {
  const app = this;

  const options = {
    Model: User,
    paginate: {
      default: 5,
      max: 25
    }
  };

  app.use('users', service(options));
  app.service('users').before(hooks.before);
  app.service('users').after(hooks.after);
};
