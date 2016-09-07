const router = require('feathers').Router();
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  const users = app.service('/api/users');
  const sections = app.service('/api/sections');

  router.get('/:user_id', (req, res, next) => {
    users.find({ query: { _id: req.params.user_id, role: 'TEACHER' } }).then((teacher) => {
      if (!teacher.data.length) { next(errors.NotFound); }
      else {
        teacher = teacher.data[0];
        sections.find({ query: { teacher: teacher._id }}).then((sections) => {
          if (!sections.data.length) { next(errors.NotFound); }
          else {
            res.render('teacher', {
              teacher: teacher,
              sections: sections.data
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
