const students = require('./students');
const teachers = require('./teachers');
const courses = require('./courses');
const tokens = require('./tokens');
const sections = require('./sections');

const mongoose = require('mongoose');

module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(students);
  app.configure(teachers);
  app.configure(courses);
  app.configure(tokens);
  app.configure(sections);
};
