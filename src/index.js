const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const ical = require('ical');

const students = app.service('students');

server.on('listening', () => {
  var profile = {
    name: {
      first: 'Rudd',
      last: 'Fawcett'
    },
    year: 2018,
    email: 'rfawcett@andover.edu',
    ical: 'https://unify-ext.andover.edu/extranet/Student/OpenCalendar?key=pCByjXwd6Ca7IEAErwE7LA%3D%3D&langue=US',
    password: 'test'
  }

  students.create(profile).then((result) => {
    console.log('result',result);
  }).catch((error) => {
    console.log('error',error);
  });


  console.log(`Timetable is live on ${app.get('host')}:${port}.`)
});

function testCal() {
  // remember to validate URL
  ical.fromURL('https://unify-ext.andover.edu/extranet/Student/OpenCalendar?key=pCByjXwd6Ca7IEAErwE7LA%3D%3D&langue=US', {}, function(err, data) {
    var utcSecondsFrom = 1474257600;
    var utcSecondsTo = 1474686000;

    var dFrom = new Date(utcSecondsFrom * 1000);
    var dTo = new Date(utcSecondsTo * 1000);
    var good_events = [];

    for (uid in data) {
      var item = data[uid];
      var start = new Date(item.start);

      if ((start <= dTo && start >= dFrom)) {
        good_events.push(data[uid]);
      }
    }

    console.log(JSON.stringify(good_events));
  });
}
