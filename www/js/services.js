angular.module('quizBot.services', [])

.factory('Quizbot', function($http) {
  // get all quizzes from db
  var getQuizbot = function() {
    return $http({
      method: 'GET',
      url: '/quizbot'
    })
    .then(function(quizbot){
      return quizbot.data;
    });
  };

  // submit quiz
  var submitQuiz = function(userQuiz) {
    return $http({
      method: 'POST',
      url: '/quiz/submit',
      data: userQuiz
    })
    .then(function(resp){
      return resp.data;
    })
  }

  return {
    getQuizbot: getQuizbot,
    submitQuiz: submitQuiz
  };

});
