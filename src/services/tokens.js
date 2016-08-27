const service = require('feathers-mongoose');
const Token = require('../models/token');
const hooks = require('feathers-hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: Token,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('tokens', service(options));
  app.service('tokens').before({
    all: hooks.disable('external')
  });
};
