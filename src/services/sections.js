const service = require('feathers-mongoose');
const Section = require('../models/section');
const hooks = require('feathers-hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: Section,
    paginate: {
      default: 5,
      max: 25
    }
  };

  app.use('/api/sections', service(options));
  app.service('/api/sections').before({
    all: hooks.disable('external')
  });
  app.service('/api/sections').after({
    get: [
      hooks.populate('teacher', {
        service: '/api/users'
      })
    ]
  });
};
