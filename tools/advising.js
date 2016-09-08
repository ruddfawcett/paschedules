const async = require('async');
const Q = require('q');

module.exports = {
  work: function(app) {
    const sections = app.service('/api/sections');
    const courses = app.service('/api/courses');

    var P = Q.defer();

    courses.find({query:{slug:'advising'}}).then((results) => {
      async.each(results.data[0].sections, (section, callback) => {
        var number = parseInt(section.code.replace('ADV/',''));
        sections.update(section._id, {$set:{number: number}}).then((update) => {
          if (update) {
            callback();
          }
        }).catch((error) => {
          P.reject(error);
        });
      }, () => {
        P.resolve();
      });
    }).catch((error) => {
      P.reject(error);
    });

    return P.promise;
  }
}
