'use strict';

const errors = require('../utils/errors.js');

module.exports = function() {
  return function(req, res, next) {
    next(errors.NotFound);
  };
};
