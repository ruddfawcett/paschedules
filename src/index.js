const app = require('./app');
const port = process.env.PORT || 8080;;
const server = app.listen(port);

server.on('listening', () => {
  console.log(`Timetable is live on ${app.get('host')}:${port}.`)
});
