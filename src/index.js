const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const importer = require('./modules/importer');
const ical = require('ical');
const users = app.service('/api/users');

server.on('listening', () => {
  // testImporter();
  // signup();
  console.log(`Timetable is live on ${app.get('host')}:${port}.`)
});


function signup() {
  var student = {
    name: {
      first: 'Rudd',
      last: 'Fawcett'
    },
    class: 2018,
    username: 'rfawcett',
    password: 'test',
    role: 'STUDENT'
  }

  users.create(student);
}

function testImporter() {
  ical.fromURL('http://localhost:8080/demo/ical', {}, function(err, data) {
    if (err) console.log(err);

    importer.import(data);
  });
}
