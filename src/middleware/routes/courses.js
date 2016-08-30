const router = require('feathers').Router();

module.exports = function(app) {
  const courses = app.service('courses');

  router.get('/:slug', (req, res, next) => {
    courses.find({ query: { slug: req.params.slug}}).then((course) => {
      if (!course.data.length) {
        res.send('error sorry');
        // res.render('error', {
        //   error: new Error('User not found.')
        // });
      }
      else {
        res.send(course);
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
