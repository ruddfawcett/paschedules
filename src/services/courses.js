const service = require('feathers-mongoose');
const Course = require('../models/course');
const hooks = require('feathers-hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: Course,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('courses', service(options));
  app.service('courses').before({
    all: hooks.disable('external')
  });
};
