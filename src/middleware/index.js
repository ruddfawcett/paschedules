const error = require('feathers-errors/handler');
const logger = require('./logger');
const block = require('./block');
const routes = require('./routes/');

module.exports = function() {
  const app = this;

  app.use('/login', routes.login(app));
  app.use('/logout', routes.logout());
  app.use('/signup', routes.signup(app));
  app.use('/verify', routes.verify(app));

  app.use('/', block(app));

  app.use('/students', routes.students(app));
  app.use('/teachers', routes.teachers(app));
  app.use('/courses', routes.courses(app));
  app.use('/search', routes.search(app));
  app.use('/tools', routes.tools(app));

  app.use(logger(app));
  app.use(error({
    html: (error, req, res, next) => {
      return res.render('error', {
        error: error
      });
    }
  }));
};
