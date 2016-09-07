const router = require('feathers').Router();
const errors = require('../../utils/errors.js');
const Q = require('q');

const reperiod = require('../../../tools/reperiod.js');

module.exports = function(app) {
  const users = app.service('/api/users');
  const tokens = app.service('/api/tokens');

  router.get('/periods/refresh', (req, res, next) => {
    if (!req.isAuthenticated() || req.user.username !== 'rfawcett') {return res.redirect('/');}

    reperiod.work(app, function(total) {
      return res.json({result: 'success', updated: total});
    });
  });

  router.get('/stats', (req, res, next) => {
    if (!req.isAuthenticated() || req.user.username !== 'rfawcett') {return res.redirect('/');}

    var total = 1131;

    users.find({query: {role: 'STUDENT'}}).then((registered) => {
      var rPercent = ((registered.data.length) / total) * 100;
      users.find({query: {role: 'STUDENT', verified: true}}).then((verified) => {
        var vPercent = ((verified.data.length) / total) * 100;
        return res.json({
          registered: {
            total: registered.data.length,
            percentage: `${rPercent}`
          },
          verified: {
            total: verified.data.length,
            percentage: `${vPercent}`
          }
        });
      });
    });
  });

  return router;
};
