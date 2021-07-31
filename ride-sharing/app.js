const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
app.use(bodyParser.json({ limit: '50mb' }));
let endpoints = require('./enpdoints');
app.use('/', endpoints);