const scheduler = require('./scheduler');
const async = require('async');
const Q = require('q');
const app = require('../app');
const mongoose = require('mongoose');

const sections = app.service('/api/sections');
const users = app.service('/api/users');

var self = module.exports = {
  deport: (data) => {
    var P = Q.defer();
    scheduler.parseCalendar(data).then(scheduler.buildSchedule).then((items) => {
      async.each(items, (item) => {
        sections.find({query: {code: item.section.code}}).then((section) => {
          // TODO get current user id..... rip....
          sections.update(section._id, {$pull: {students: mongoose.Types.ObjectId('test')}})
        });
      });
    });

    P.resolve();
    return P.promise;
  },
  error: (error) => {
    console.log(error);
  }
}
