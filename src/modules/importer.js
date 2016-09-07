const scheduler = require('./scheduler');
const async = require('async');
const Q = require('q');
const app = require('../app');
const mongoose = require('mongoose');

var self = module.exports = {
  import: (app, user, data) => {
    const courses = app.service('/api/courses');
    const sections = app.service('/api/sections');
    const users = app.service('/api/users');

    return scheduler.parseCalendar(data).then(scheduler.buildSchedule).then((items) => {
      async.each(items, (item) => {
        courses.find({ query: {code: item.course.code}}).then((results) => {
          var P = Q.defer();
          if (!results.length) {
            P.resolve(courses.create(item.course));
          }
          else {
            P.resolve(results[0]);
          }

          return P.promise;
        }).then((course) => {
          var P = Q.defer();
          sections.find({query: {code: item.section.code}}).then((results) => {
            if (!results.length) {
              item.section.course = course._id;
              sections.create(item.section).then((section) => {
                courses.update(course._id, {$addToSet: {sections: section._id}}).then((course) => {
                  P.resolve(section);
                }).catch(self.error);
              }).catch(self.error);
            }
            else {
              var section = results[0];
              courses.update(course._id, {$addToSet: {sections: section._id}}).then((course) => {
                P.resolve(section);
              }).catch(self.error);
            }

            return P.promise;
          }).then((section) => {
            var P = Q.defer();
            users.find({query: item.teacher}).then((results) => {
              if (!results.length) {
                users.create(item.teacher).then((teacher) => {
                  sections.update(section._id, {$set: {teacher: teacher._id}}).then((result) => {
                    P.resolve(section);
                  });
                }).catch(self.error);
              }
              else {
                var teacher = results[0];
                sections.update(section._id, {$set: {teacher: teacher._id}}).then(() => {
                  P.resolve(section);
                });
              }
              return P.promise;
            }).then((section) => {
              sections.update(section._id, {$addToSet: {students: user._id}});
            }).catch(self.error);;
          });
        });
      });
    });
  },
  error: (error) => {
    console.log(error);
  }
}
