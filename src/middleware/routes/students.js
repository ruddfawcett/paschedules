const router = require('feathers').Router();
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  const users = app.service('/api/users');
  const sections = app.service('/api/sections');

  router.get('/:username', (req, res, next) => {
    users.find({ query: { username: req.params.username, role: 'STUDENT' } }).then((students) => {
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
            res.render('student', {
              student: student,
              sections: theSections,
              other: periodZero
            });
          }
        });
      }
    }).catch((error) => {
      res.render('error', {
        error: error
      });
    });
  });

  return router;
};
