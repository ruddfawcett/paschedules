const scheduler = require('./scheduler');
const async = require('async');
const Q = require('q');
const app = require('../app');
const mongoose = require('mongoose');

const courses = app.service('courses');
const sections = app.service('sections');
const users = app.service('users');

var self = module.exports = {
  import: (data) => {
    scheduler.parseCalendar(data).then(scheduler.buildSchedule).then((items) => {
      async.each(items, (item) => {
        courses.find({ query: {code: item.course.code}}).then((results) => {
          var P = Q.defer();
          if (!results.data.length) {
            P.resolve(courses.create(item.course));
          }
          else {
            P.resolve(results.data[0]);
          }

          return P.promise;
        }).then((course) => {
          var P = Q.defer();
          sections.find({query: {code: item.section.code}}).then((results) => {
            if (!results.data.length) {
              sections.create(item.section).then((section) => {
                courses.update(course._id, {$push: {sections: section._id}}).then((course) => {
                  P.resolve(section);
                }).catch(self.error);
              }).catch(self.error);
            }
            else {
              var section = results.data[0];
              courses.update(course._id, {$push: {sections: section._id}}).then((course) => {
                P.resolve(section);
              }).catch(self.error);
            }

            return P.promise;
          }).then((section) => {
            var P = Q.defer();
            users.find({query: item.teacher}).then((results) => {
              if (!results.data.length) {
                users.create(item.teacher).then((teacher) => {
                  sections.update(section._id, {$set: {teacher: teacher._id}}).then((result) => {
                    P.resolve(section);
                  });
                }).catch(self.error);
              }
              else {
                var teacher = results.data[0];
                sections.update(section._id, {$set: {teacher: teacher._id}}).then(() => {
                  P.resolve(section);
                });
              }
              return P.promise;
            }).then((section) => {
              sections.update(section._id, {$push: {students: mongoose.Types.ObjectId('asdfasdfasdf')}});
            }).catch(self.error);;
          });
        });
      });
    });
  },
  error: (error) => {
    console.log(error);
  },
  clone: (obj) => {
    var o = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }
    return o;
  }
}
