const path = require('path');
const feathers = require('feathers');
const rest = require('feathers-rest');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');
const configuration = require('feathers-configuration');
const middleware = require('./middleware');
const services = require('./services');
const sass = require('node-sass-middleware');
const hooks = require('feathers-hooks');
const errors = require('./utils/errors.js');

const flash = require('connect-flash');
const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser');

const app = feathers();

// Force SSL
app.configure(function () {
  if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
      }
      return next();
    });
  }
});

app.configure(configuration(path.join(__dirname, '..')));
app.configure(hooks());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(compress());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '../public/assets/images/favicon.ico')));
app.options('*', cors());

app.use(
  sass({
    src: path.join(__dirname, '../scss/'),
    dest: path.join(__dirname, '../public/assets/styles/'),
    debug: false,
    force: true,
    outputStyle: 'compressed',
    prefix: '/static/assets/styles/'
  })
);

app.configure(rest());
app.use('/static', feathers.static(path.join(__dirname, '../public')));

app.use(cookieSession({
  secret: process.env.COOKIE_SECRET || 'secret',
  maxAge: 1000*60*60
}));

app.use(passport.initialize());
app.use(passport.session());
app.configure(services);
app.configure(middleware);

app.get('*', (req, res, next) => {
  return res.render('error', {
    error: errors.NotFound
  });
});

module.exports = app;
