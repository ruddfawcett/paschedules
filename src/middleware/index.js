'use strict';

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

const users = require('./routes/users');

module.exports = function() {
  const app = this;

  app.use('/u', users(app));

  app.get('/demo_spec', (req, res) => {
    res.send(require('fs').readFileSync('/Users/ruddfawcett/GitHub/timetable/specs/example.ics', 'utf8'));
  });

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
