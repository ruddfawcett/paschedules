const service = require('feathers-mongoose');
const Token = require('../models/token');
const hooks = require('feathers-hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: Token
  };

  app.use('/api/tokens', service(options));
  app.service('/api/tokens').before({
    all: hooks.disable('external')
  });
};
