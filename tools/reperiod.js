const async = require('async');
const Q = require('q');

module.exports = {
  work: function(app) {
    const sections = app.service('/api/sections');

    var timeToPeriod = (start) => {
      var h = start.getHours();
      if (h == 8) {
        if (start.getMinutes() === 0) {
          return 1;
        }
        return 2;
      }
      if (h == 10) return 3;
      if (h == 11) return 4;
      if (h == 12) return 5;
      if (h == 13) return 6;
      if (h == 14) return 7;
      return 0;
    }

    function load() {
      var P = Q.defer();
      sections.find().then((results) => {
        P.resolve(results);
      });
      return P.promise;
    }

    function findPeriod(section) {
      var P = Q.defer();
      section.meets.forEach(function(meeting) {
        if (meeting.day == 3 || meeting.day == 4) {
          return;
        }
        else {
          P.resolve({
            section: section,
            period: timeToPeriod(meeting.start)
          });
        }
      });
      return P.promise;
    }

    function setPeriod(data) {
      var P = Q.defer();
      sections.update(data.section._id, {$set:{period: data.period}}).then((result) => {
        P.resolve();
      });
      return P.promise;
    }

    function fix(sections) {
      async.forEach(sections, (section, callback) => {
        findPeriod(section).then(setPeriod).then(function() {
          callback();
        });
      }, function(err) {
        P.resolve();
      });
      return P.promise;
    }

    load().then(fix).then(function() {
      console.log('Done.');
    });
  }
}
