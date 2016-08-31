'use strict';

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

const users = require('./routes/users');
const courses = require('./routes/courses');
const verify = require('./routes/verify');

module.exports = function() {
  const app = this;

  app.use('/users', users(app));
  app.use('/courses', courses(app));
  app.use('/verify', verify(app));

  app.get('/demo_spec', (req, res) => {
    res.send(require('fs').readFileSync('/Users/ruddfawcett/GitHub/timetable/specs/example.ics', 'utf8'));
  });


  app.get('/', (req, res) => {
    res.render('index');
  });

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
