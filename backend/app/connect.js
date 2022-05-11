const config = require('./config.js');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql");
});

module.exports = connection;