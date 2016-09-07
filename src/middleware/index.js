const error = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

const students = require('./routes/students');
const teachers = require('./routes/teachers');
const courses = require('./routes/courses');
const verify = require('./routes/verify');
const onboarding = require('./routes/onboarding');
const search = require('./routes/search');

module.exports = function() {
  const app = this;

  app.use('/', onboarding(app));
  app.use('/verify', verify(app));
  app.get('*', (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
    }
    else {
      next();
    }
  });
  app.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/students/'+req.user.username);
    }
  });
  app.use('/students', students(app));
  app.use('/teachers', teachers(app));
  app.use('/courses', courses(app));
  app.use('/search', search(app));

  app.get('/demo/ical', (req, res) => {
    res.send(require('fs').readFileSync('/Users/ruddfawcett/GitHub/timetable/specs/example.ics', 'utf8'));
  });

  app.use(logger(app));
  app.use(error({
    html: (error, req, res, next) => {
      res.render('error', {
        error: error
      });
    }
  }));
};
