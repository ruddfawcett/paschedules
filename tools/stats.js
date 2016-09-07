const Q = require('q');

module.exports = {
  countStudents: (app) => {
    var P = Q.defer();
    const users = app.service('/api/users');

    var total = process.env.STUDENT_POPULATION || 1131;

    users.find({query: {role: 'STUDENT'}}).then((registered) => {
      var rPercent = ((registered.data.length) / total) * 100;
      users.find({query: {role: 'STUDENT', verified: true}}).then((verified) => {
        var vPercent = ((verified.data.length) / total) * 100;
        P.resolve({
          app: app,
          result: {
            students: {
              registered: {
                total: registered.data.length,
                percentage: `${rPercent}`
              },
              verified: {
                total: verified.data.length,
                percentage: `${vPercent}`
              }
            }
          }
        });
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });

    return P.promise;
  },
  countTeachers(data) {
    var P = Q.defer();
    const users = data.app.service('/api/users');

    users.find({query:{role:'TEACHER'}}).then((teachers) => {
      data.result.teachers = {
        total: teachers.data.length
      }

      P.resolve(data);
    }).catch((error) => {
      console.log(error);
    });

    return P.promise;
  },
  countCourses(data) {
    var P = Q.defer();
    const courses = data.app.service('/api/courses');

    courses.find().then((courses) => {
      data.result.courses = {
        total: courses.data.length
      }

      P.resolve(data);
    }).catch((error) => {
      console.log(error);
    });

    return P.promise;
  },
  countSections(data) {
    var P = Q.defer();
    const sections = data.app.service('/api/sections');

    sections.find().then((sections) => {
      data.result.sections = {
        total: sections.data.length
      }

      P.resolve(data.result);
    }).catch((error) => {
      console.log(error);
    });

    return P.promise;
  }
}
