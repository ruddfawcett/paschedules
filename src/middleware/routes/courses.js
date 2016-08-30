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
        var teachers = [];
        courses.data.forEach((course) => {
          course.sections.forEach((section) => {
            teachers.push(section.teacher.name.first);
          });
        });
        res.json(teachers);
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
