const scheduler = require('./scheduler');
const async = require('async');
const app = require('../app');

const courses = app.service('courses');
const sections = app.service('sections');
const teachers = app.service('teachers');

module.exports = {
  import: (data) => {
    scheduler.parseCalendar(data).then(scheduler.buildSchedule).then((items) => {
      async.each(items, (item) => {
        courses.find({ query: { code: item.course.code } }).then((results) => {
          if (!results.data.length) {
            return courses.create(item.course).catch((error) => {
              console.log(error);
            });
          }
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}
