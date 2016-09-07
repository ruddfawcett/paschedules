const errors = require('../../utils/errors.js');

module.exports = function(app, res, next, username) {
  const users = app.service('/api/users');
  const sections = app.service('/api/sections');

  users.find({ query: { username: username, verified: true, role: 'STUDENT' } }).then((students) => {
    if (!students.data.length) { next(errors.NotFoundStudent); }
    else {
      var student = students.data[0];
      sections.find({ query: { students: student }}).then((sections) => {
        if (!sections.data.length) { next(errors.NotFound); }
        else {
          var periodZero = [];
          var theSections = [];
          sections.data.forEach((section) => {
            if (section.period === 0) {
              periodZero.push(section);
            }
            else {
              theSections.push(section);
            }
          });
          theSections.sort(function(a,b) {
            return a.period > b.period;
          });
          return res.render('student', {
            student: student,
            sections: theSections,
            other: periodZero
          });
        }
      });
    }
  }).catch((error) => {
    return res.render('error', {
      error: error
    });
  });
}
