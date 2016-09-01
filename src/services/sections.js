const service = require('feathers-mongoose');
const Section = require('../models/section');
const auth = require('feathers-authentication').hooks;
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

  let assignPeriod = (options) => {
    var timeToPeriod = (start) => {
      var h = start.getHours();
      if (h == 8) return 1 ? start.getMinutes() == 0 : 2;
      if (h == 10) return 3;
      if (h == 11) return 4;
      if (h == 12) return 5;
      if (h == 13) return 6;
      if (h == 14) return 7;
      return 0;
    }

    return function(hook) {
      hook.data.meets.forEach((meeting) => {
        if (meeting.day == 3 || meeting.day == 4) {
          return;
        }
        else {
          hook.data.period = timeToPeriod(meeting.start);
          return;
        }
      });
    }
  }

  app.use('/api/sections', service(options));
  app.service('/api/sections').before({
    all: [
      hooks.disable('external'),
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    create: [
      assignPeriod()
    ]
  });
  app.service('/api/sections').after({
    get: [
      hooks.populate('teacher', {
        service: '/api/users'
      }),
      hooks.populate('students', {
        service: '/api/users'
      })
    ]
  });
};
