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

// parse data
app.use(parse.urlencoded({extended: true}));
app.use(parse.json());

// dev request logger
app.use(morgan('dev'));

// get all quizzes from quizbot
app.get('/quizbot', function(req, res){
  Quizbot.find({}, function(err, quizbot){
    if (err) { throw err; }
    res.send(quizbot);
  });
});

// submit a quiz for user
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
          return result;
        })
      }
    })
    .then(function(result){
      var quizResult = {userScore: 0};

      // get quiz data and calculate score for user
      findQuiz(data.quizId)
      .then(function(quiz){
        quiz.options.forEach(function(que, index){
          if (data.selection[index] === que[1]) {
            quizResult.userScore += que[0];
          }
        })
        // obtain score's meaning for user
        for (var i = 0; i < quiz.interpretation.length; i ++){
          var inter = quiz.interpretation[i];
          if (inter[0] && quizResult.userScore < inter[0]) {
            quizResult.description = inter[1];
            break;
          } else {
            quizResult.description = inter[0];
          }
        }

        if (data.email) {
          // email user when user required
          tranporter.sendMail({
            from: 'fangtingprahl@gmail.com',
            to: data.userEmail,
            subject: 'Result of quiz ' + quiz.name,
            text: 'Hi, you score is + ' + quizResult.userScore + '. ' + quizResult.description
          }, function(err, response){
            if (err) {
              console.log('send email error: ', err);
              res.send(err);
            } else {
              res.send(quizResult);
            }
          })
        } else {
          res.send(quizResult);
        }
      })
    });
})

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/quizbot');
// local server
var port = process.env.PORT || 8000;
app.listen(port, function(){
  console.log("Listening to localhost, port #: " + port);
})