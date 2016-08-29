const router = require('feathers').Router();

module.exports = function(app) {
  const students = app.service('students');
  const teachers = app.service('teachers');

  router.get('/:username', (req, res, next) => {
    var email = req.params.username+'@andover.edu';

    students.find({ query: { email: email } }).then((result) => {
      if (!result.data.length) {
        res.render('error', {
          error: new Error('User not found.')
        });
      }

      // sections.find({ query: {  } })

      res.render('schedule');
    }).catch((error) => {
      res.render('error', {
        error: error
      });
    });
  });

  return router;
};
