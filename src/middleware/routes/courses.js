const router = require('feathers').Router();
const errors = require('../../utils/errors.js');
const async = require('async');

module.exports = function(app) {
  const courses = app.service('/api/courses');
  const sections = app.service('/api/sections');

  // Renders a singular course view...
  router.get('/:slug', (req, res, next) => {
    courses.find({ query: { slug: req.params.slug}}).then((courses) => {
      if (!courses.data.length) { next(errors.NotFound); }
      else {
        var sections = [];
        courses.data.forEach((course) => {
          course.sections.forEach((section) => {
            sections.push({
              teacher: section.teacher,
              number: section.number,
              period: section.period,
              code: section.code,
              size: section.students.length
            });
          });
        });
        res.render('course', {
          course: courses.data[0],
          sections: sections
        });
      }
    }).catch((error) => {
      next(error);
    });
  });

  router.get('/:slug/:section', (req, res, next) => {
    var sectionNumber = parseInt(req.params.section);
    courses.find({ query: { slug: req.params.slug}}).then((courses) => {
      if (!courses.data.length) { next(errors.NotFound); }
      else {
        var result = false;
        async.each(courses.data[0].sections, (section) => {
          section.period = addSufix(section.period) + ' Period';
          if (section.number == sectionNumber) {
          result = true;
            return res.render('section', {
              course: courses.data[0],
              section: section
            });
          }
        });
        if (!result) {
          res.render('error', {error: errors.NotFound});
        }
      }
    }).catch((error) => {
      next(error);
    });
  });

  function addSufix(p) {
    if (p === 1) return p + 'st';
    if (p === 2) return p + 'nd';
    if (p === 3) return p + 'rd';
    return p + 'th';
  }

  return router;
};
