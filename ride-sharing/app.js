const express = require('express');
const app = express();
const bodyParser = require('body-parser');

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'local'
const env = process.env.NODE_ENV;
const hostname = env == 'local' ? '127.0.0.1' : '0.0.0.0';
const port = 3000;


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ on ${env} environment`);
});
app.use(bodyParser.json({ limit: '50mb' }));
let endpoints = require('./enpdoints');
app.use('/', endpoints);

setTimeout(() => {
  let db = require('./db').getInstance();
  db.query("SHOW DATABASES;", (err, resp) => {
    console.log('DB connection established successfully');
  });
}, 5000)


process.on('SIGINT', () => {
  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  process.exit();
});

// quit properly on docker stop
process.on('SIGTERM', () => {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  process.exit();
})