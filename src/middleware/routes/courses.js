const router = require('feathers').Router();
const notFound = require('../not-found-handler');
const errors = require('../../utils/errors.js');

module.exports = function(app) {
  const courses = app.service('/api/courses');

  router.get('/:slug', (req, res, next) => {
    courses.find({ query: { slug: req.params.slug}}).then((courses) => {
      if (!courses.data.length) {
        next(errors.NotFound);
      }
      else {
        var sections = [];
        courses.data.forEach((course) => {
          course.sections.forEach((section) => {
            sections.push({
              teacher: section.teacher.name,
              period: section.period,
              code: section.code,
              size: section.students.length
            });
              sections.push({
                teacher: section.teacher.name,
                period: section.period,
                code: section.code,
                size: section.students.length
              });
          });
        });
        res.render('course', {
          course: courses.data[0],
          sections: sections
        })
      }
    }).catch((error) => {
      next(error);
    });
  });

  return router;
};
