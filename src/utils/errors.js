const errors = require('feathers-errors');

module.exports = {
  NotFound: new errors.NotFound('Sorry about it.'),
  NotFoundStudent: new errors.NotFound('This student hasn\'t signed up yet... tell them about us?'),
  NotFoundToken: new errors.NotFound('This token either does not exist, or has already been used.')
}
