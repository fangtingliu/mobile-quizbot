var express = require('express');
var parse = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Quizbot = require('./quizbotModel.js');
var Quizzes = require('./quizzesModel.js');
var Q = require('q');
var app = express();

var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var tranporter = nodemailer.createTransport(directTransport());

// static serve
app.use(express.static(__dirname + './../www'));
app.use(parse.urlencoded({extended: true}));
app.use(parse.json());

// dev request logger
app.use(morgan('dev'));

app.get('/quizbot', function(req, res){
  Quizbot.find({}, function(err, quizbot){
    if (err) { throw err; }
    res.send(quizbot);
  });
});

app.post('/quiz/submit', function(req, res){
  var data = req.body;
  find = Q.nbind(Quizzes.find, Quizzes);
  findQuiz = Q.nbind(Quizbot.findById, Quizbot);
  create = Q.nbind(Quizzes.create, Quizzes);
  update = Q.nbind(Quizzes.update, Quizzes);
  var quiz = {
    userEmail: data.userEmail,
    quiz: data.quizId,
    selection: data.selection
  };

  find({
      userEmail: data.userEmail,
      quiz: data.quizId,
    })
    .then(function(results){
      if (results.length > 0){
        update(quiz)
        .then(function(result){
          return result;
        })    
      } else {
        create(quiz)
        .then(function(result){
          return result
        })
      }
    })
    .then(function(result){
      if (data.email) {
        findQuiz(data.quizId)
        .then(function(quiz){
          tranporter.sendMail({
            from: 'fangtingprahl@gmail.com',
            to: data.userEmail,
            subject: 'Result of quiz ' + quiz.name,
            text: 'Hi, you score is abc'
          }, function(err, response){
            console.log("hi from sendMail")
            if (err) {
              console.log('send email error: ', err);
              res.send(err);
            } else {
              res.send(200);
            }
          })
        })
      }
    });
})

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/quizbot');
// local server
var port = process.env.PORT || 8000;
app.listen(port, function(){
  console.log("Listening to localhost, port #: " + port);
})