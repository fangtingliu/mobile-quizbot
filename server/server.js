var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Quizbot = require('./quizbotModel.js');
var app = express();

// static serve
app.use(express.static(__dirname + './../www'));

// dev request logger
app.use(morgan('dev'));

app.get('/quizbot', function(req, res){
    Quizbot.find({}, function(err, quizbot){
      if (err) { throw err; }
      console.log('server.js quizbot', quizbot);
      return quizbot;
    })
    .then(function(quizbot){
      res.send(quizbot);
    })
})

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/quizbot');
// local server
var port = process.env.PORT || 8000;
app.listen(port, function(){
  console.log("Listening to localhost, port #: " + port);
})