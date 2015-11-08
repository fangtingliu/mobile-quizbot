angular.module('quizBot.services', [])

.factory('Quizbot', function($http) {
  // Might use a resource here that returns a JSON array
  var getQuizbot = function() {
    return $http({
      method: 'GET',
      url: '/quizbot'
    })
    .then(function(quizbot){
      return quizbot.data;
    });
  };

  var submitQuiz = function(userQuiz) {
    return $http({
      method: 'POST',
      url: '/quiz/submit',
      data: userQuiz
    })
    .then(function(resp){
      console.log('submitQuiz service resp: ', resp);
      return resp.data;
    })
  }

  return {
    getQuizbot: getQuizbot,
    submitQuiz: submitQuiz
  };

});
