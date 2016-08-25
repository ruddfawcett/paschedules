const service = require('feathers-mongoose');
const Student = require('../models/student');

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
  app.use('/students', service(options));
};
