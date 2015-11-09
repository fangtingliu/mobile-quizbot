var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Due to the nature of the app (paly fun quizzes, not track certain performance of a certain subject. We can easily convert it to a educational quizbot though if we want to later), I did not have a user table. Users are not required to login to play a quiz even though the quiz result is stored in the Quizzes table. 

var Quizbot = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  // all the questions of the quiz
  questions: {
    type: Array,
    required: true
  },
  // options and weight(score) of each question
  options: {
    type: Array,
    required: true
  },
  // the interpretation of a specific score for the quiz
  interpretation: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Quizbot', Quizbot);

// hardcode in a quiz "Should I have a Dog?"
// if we want to use an API like jService, We can set up an worker to update us quizbot regularly. However, due to time limitation, I will hardcode one quiz into db 
var newQuiz = {
  name: "Should I have a dog?",
  questions: ["Do you want a dog because you are lonely?", "Do you want a dog because you love animals?", "Do you want a dog because your house needs protection?", "Do you want a dog because your best friend has one?"],
  options: [[20, "Yes", "No"], [10, "Yes", "No"], [30, "Yes", "No"], [40, "Yes", "No"]],
  interpretation: [[50, "You should not get a dog."], [70, "You need to beaware of the responsibilities of owning a dog."], ["You should get a dog for sure."]]
};

module.exports.create(newQuiz);