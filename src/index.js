const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const importer = require('./modules/importer');

const ical = require('ical');

const students = app.service('students');

server.on('listening', () => {
  // var profile = {
  //   name: {
  //     first: 'Rudd',
  //     last: 'Fawcett'
  //   },
  //   year: 2018,
  //   username: 'rfawcett',
  //   ical: 'https://unify-ext.andover.edu/extranet/Student/OpenCalendar?key=pCByjXwd6Ca7IEAErwE7LA%3D%3D&langue=US',
  //   password: 'test'
  // }

  // students.create(profile).then((result) => {
  //   console.log('result', result);
  // }).catch((error) => {
  //   console.log('error',error);
  // });

  testCal();

  console.log(`Timetable is live on ${app.get('host')}:${port}.`)
});

function testCal() {
  // remember to validate URL
  // ical.fromURL('https://unify-ext.andover.edu/extranet/Student/OpenCalendar?key=pCByjXwd6Ca7IEAErwE7LA%3D%3D&langue=US', {}, function(err, data) {
  ical.fromURL('http://localhost:8080/demo_spec', {}, function(err, data) {
    if (err) console.log(err);

    importer.import(data);
  });
}
