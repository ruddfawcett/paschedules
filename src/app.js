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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser');

const app = feathers();

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

app.use(session({
  secret: 'f7b5eec8!',
  saveUninitialized: true,
  resave: true,
  cookie : {
    maxAge: 3600000 // see below
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.configure(services);
app.configure(middleware);

app.get('*', (req, res, next) => {
  res.render('error', {
    error: errors.NotFound
  });
});

module.exports = app;
