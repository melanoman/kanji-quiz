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

router.get('/lesson/:lesson', function(req, res, next) {
  var query = 'select * from questions where lesson = ' + req.params.lesson;
  conn.query(query, (err, data) => {
    (err)?res.send(err):res.json({words: data});
  });
});

/* Shouldn't use get, but quicker to manually test for now. */
router.get('/new/:lesson/:word/:kanji/:reading', function(req, res, next) {
  var query = "insert into questions (lesson, word, kanji, reading) values (" +
              req.params.lesson + ",'" +
              req.params.word + "','" +
              req.params.kanji + "','" +
              req.params.reading + "')";
  conn.query(query, (err, data) => {
    (err)?res.send(err):res.json({words: data});
  });
});

module.exports = router;
