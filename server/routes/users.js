var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var conn = require('./conn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  conn.query('select * from people', function(err, data) {
    (err)?res.send(err):res.json({people: data});
  });
});

module.exports = router;
