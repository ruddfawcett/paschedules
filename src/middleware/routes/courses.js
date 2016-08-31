const router = require('feathers').Router();

module.exports = function(app) {
  const courses = app.service('/api/courses');

  router.get('/:slug', (req, res, next) => {
    courses.find({ query: { slug: req.params.slug}}).then((courses) => {
      if (!courses.data.length) {
        res.send('error sorry');
        // res.render('error', {
        //   error: new Error('User not found.')
        // });
      }
      else {
        var sections = [];
        courses.data.forEach((course) => {
          course.sections.forEach((section) => {
            sections.push({
              teacher: section.teacher.name,
              code: section.code,
              size: section.students.length,
              room: section.room
            });
          });
        });
        res.json(sections);
      }
      // res.render('schedule');
    }).catch((error) => {
      console.log(error);
      res.render('error', {
        error: error
      });
    });
  });

  return router;
};
