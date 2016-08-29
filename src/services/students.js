const service = require('feathers-mongoose');
const Student = require('../models/student');
const hooks = require('../hooks/students');

module.exports = function() {
  const app = this;

  const options = {
    Model: Student,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('students', service(options));
  app.service('students').before(hooks.before);
  app.service('students').after(hooks.after);
};
