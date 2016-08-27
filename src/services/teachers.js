const service = require('feathers-mongoose');
const Teacher = require('../models/teacher');
const hooks = require('feathers-hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: Teacher,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('teachers', service(options));
  app.service('teachers').before({
    all: hooks.disable('external')
  });
};
