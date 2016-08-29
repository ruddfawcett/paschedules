const Q = require('q');
const parser = require('./parser');
const async = require('async');

var self = module.exports = {
  parseCalendar: (data) => {
    var P = Q.defer();

    // September 19, 2016
    var dFrom = new Date(1474257600 * 1000);
    // September 23, 2016
    var dTo = new Date(1474686000 * 1000);
    var inRange = [];

    for (uid in data) {
      var item = data[uid];
      var start = new Date(item.start);

      if ((start <= dTo && start >= dFrom)) {
        inRange.push(data[uid]);
      }
    }

    P.resolve(inRange);
    return P.promise;
  },
  buildSchedule: (classes) => {
    var P = Q.defer();
    var courses = [];

    async.each(classes, (section) => {
      var data = parser.parse(section.summary);
      var code = data.section.code;

      var addTimeToCourse = (course) => {
        courses[course].section.meets.push({
          day: section.start.getDay(),
          start: section.start,
          end: section.end
        });
      }

      if (code in courses) {
        addTimeToCourse(code);
      }
      else {
        courses[code] = {
          course: {
            title: data.course.title,
            code: data.course.code,
            year: data.course.year,
            term: data.course.term
          },
          section: {
            teacher: data.section.teacher,
            number: data.section.number,
            meets: []
          }
        };
        addTimeToCourse(code);
      }
    });

    var newCourses = [];

    for (k in courses) {
      var course = courses[k];
      course.section.code = k;
      newCourses.push(course);
    }

    P.resolve(newCourses);
    return P.promise;
  }
}

// var courses = [];
//
// $.each(days, (d, day) => {
//   $.each($(day).find('a'), (c, day) => {
//     var name = $(day).find('.fc-title').text();
//     var parts = name.split(' - ');
//
//     var code = parts[0].trim();
//     var name = cleanseName(parts[1].trim());
//     var teacher = cleanseName(parts[2].trim());
//
    // var addTimeToCourse = function(course) {
    //   var range = $(day).find('.fc-time').text();
    //   var times = range.split(' - ');
    //
    //   courses[course].meets[d.toString()] = {
    //     start: times[0].trim(),
    //     end: times[1].trim()
    //   };
    // }
//
//     if (code in courses) {
//       addTimeToCourse(code);
//     }
//     else {
      // courses[code] = {
      //   name: name,
      //   teacher: teacher,
      //   meets: {}
      // };
//       addTimeToCourse(code);
//     }
//   });
// });