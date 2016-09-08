const router = require('feathers').Router();
const errors = require('../../utils/errors.js');
const Q = require('q');

const reperiod = require('../../../tools/reperiod.js');
const stats = require('../../../tools/stats.js');
const advising = require('../../../tools/advising.js');

module.exports = function(app) {
  router.get('/periods/refresh', (req, res, next) => {
    if (!req.isAuthenticated() || req.user.username !== 'rfawcett') {return res.redirect('/');}

    reperiod.work(app).then((total) => {
      return res.json({result: 'success', updated: total});
    }).catch((error) => {
      return res.json({ error: error });
    });
  });

  router.get('/stats', (req, res, next) => {
    if (!req.isAuthenticated() || req.user.username !== 'rfawcett') {return res.redirect('/');}

    stats.countStudents(app).then(stats.countTeachers).then(stats.countCourses).then(stats.countSections).then((result) => {
      return res.json(result);
    });
  });

  router.get('/fix/advising', (req, res, next) => {
    if (!req.isAuthenticated() || req.user.username !== 'rfawcett') {return res.redirect('/');}

    advising.work(app).then((result) => {
      return res.json({result: 'success'});
    }).catch((error) => {
      return res.json({error: error});
    });
  });

  return router;
};
