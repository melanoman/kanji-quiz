const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'kanji',
    password: 'pass',
    database: 'write-kanji',
});

conn.connect(function(err) {
  (err) ? console.log(err) : console.log('connected to MySQL');
});

module.exports = conn;
