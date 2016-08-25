const path = require('path');
const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');
const configuration = require('feathers-configuration');
const services = require('./services');
const hooks = require('feathers-hooks');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));
app.configure(hooks());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.configure(rest());
app.configure(socketio());
app.configure(services);
app.use(handler());

module.exports = app;
