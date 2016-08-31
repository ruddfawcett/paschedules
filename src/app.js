const path = require('path');
const feathers = require('feathers');
const rest = require('feathers-rest');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');
const authentication = require('feathers-authentication');
const configuration = require('feathers-configuration');
const middleware = require('./middleware');
const services = require('./services');
const sass = require('node-sass-middleware');
const hooks = require('feathers-hooks');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));
app.configure(hooks());
app.configure(authentication({
  usernameField: 'username',
  passwordField: 'password',
  session: true
}));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', feathers.static(path.join(__dirname, '../public')));
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
app.configure(socketio());
app.configure(services);
app.configure(middleware);

module.exports = app;
