const service = require('feathers-mongoose');
const Course = require('../models/course');
const auth = require('feathers-authentication').hooks;
const hooks = require('feathers-hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: Course,
    paginate: {
      default: 5,
      max: 2000
    }
  };

  app.use('/api/courses', service(options));

  var createSlug = function(options) {
    return function(hook) {
      hook.data.slug = hook.data.title.toLowerCase().replace(/ /g, '-').replace(':', '').replace(',','');
    }
  }

  app.service('/api/courses').before({
    all: [
      hooks.disable('external'),
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    create: [
      createSlug()
    ]
  });
  app.service('/api/courses').after({
    find: [
      hooks.populate('sections', {
        service: '/api/sections'
      })
    ]
  });
};
