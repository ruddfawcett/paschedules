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

  app.use('sections', service(options));
  app.service('sections').before({
    all: hooks.disable('external')
  });
};
