const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const importer = require('./modules/importer');
const ical = require('ical');
const users = app.service('/api/users');

server.on('listening', () => {
  testCal();

  console.log(`Timetable is live on ${app.get('host')}:${port}.`)
});

function testCal() {
  ical.fromURL('http://localhost:8080/demo_spec', {}, function(err, data) {
    if (err) console.log(err);

    importer.import(data);
  });
}
