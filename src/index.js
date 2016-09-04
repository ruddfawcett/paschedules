const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const importer = require('./modules/importer');
const ical = require('ical');
const users = app.service('/api/users');

server.on('listening', () => {
  testImporter();
  console.log(`Timetable is live on ${app.get('host')}:${port}.`)
});

function testImporter() {
  ical.fromURL('http://localhost:8080/demo/ical', {}, function(err, data) {
    if (err) console.log(err);

    importer.import(data);
  });
}
