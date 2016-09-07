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
      console.log('test');
      var P = Q.defer();
      sections.find().then((results) => {
        console.log(`Loaded ${results.data.length} sections`);
        P.resolve(results.data);
      }).catch((error) => {
        P.reject(error);
      });
      return P.promise;
    }

    function findPeriod(section) {
      var P = Q.defer();
      async.forEach(section.meets, (meeting, callback) => {
        if (meeting.day !== 3 && meeting.day !== 4) {
          callback({
            section: section,
            period: timeToPeriod(meeting.start)
          });
        }
        else {
          callback({
            section: section,
            period: 0
          });
        }
      }, function(result) {
        P.resolve(result);
      });
      return P.promise;
    }

    function setPeriod(data) {
      var P = Q.defer();
      sections.update(data.section._id, {$set:{period: data.period}}).then((result) => {
        P.resolve(result);
      }).catch((error) => {
        P.reject(error);
      });
      return P.promise;
    }

    function fix(sections) {
      var P = Q.defer();
      async.forEach(sections, (section, callback) => {
        findPeriod(section).then(setPeriod).then(function() {
          callback();
        });
      }, function() {
        P.resolve(sections.length);
      });
      return P.promise;
    }

    return load().then(fix);
  }
}
