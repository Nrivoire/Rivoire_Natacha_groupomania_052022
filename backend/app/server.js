const express = require('express');
const app = express();

const config = require('./config.js');
const connect = require('./connect.js');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

connect;

app.get('/', function(req, res) {
  console.log("Hello there");
  res.status(200).send('ok');
})

app.listen(config.port);