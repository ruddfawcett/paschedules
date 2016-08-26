const service = require('feathers-mongoose');
const Student = require('../models/student');
const studentHooks = require('../hooks/students');

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
  app.service('students').before(studentHooks.before);
  app.service('students').after(studentHooks.after);
};
