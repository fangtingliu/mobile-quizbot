var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Quizbot = require('./quizbotModel.js');

var Quizzes = new Schema({
  userEmail: {
    type: String,
    required: true
  },

  selection: {
    type: Array,
    required: true
  },

  quiz: [{
    type: Schema.Types.ObjectId,
    ref: 'Quizbot'
  }]
})

module.exports = mongoose.model('Quizzes', Quizzes);