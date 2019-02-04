var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var conn = require('./conn');

/* GET dict listing. */
router.get('/', function(req, res, next) {
  conn.query('select * from questions', function(err, data) {
    (err)?res.send(err):res.json({words: data});
  });
});

router.get('/:lesson', function(req, res, next) {
  var query = 'select * from questions where lesson = ' + req.params.lesson;
  conn.query(query, (err, data) => {
    (err)?res.send(err):res.json({words: data});
  });
});

module.exports = router;