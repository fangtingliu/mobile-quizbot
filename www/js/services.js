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

  return {
    getQuizbot: getQuizbot
  };

});
