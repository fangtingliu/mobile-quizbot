angular.module('quizBot.controllers')

.controller('QuizPlayCtrl', function($scope, $stateParams, $window, Quizbot) {
  $scope.quiz = JSON.parse($window.sessionStorage.getItem('selectedQuiz'));

  $scope.userQuiz = {
    quizId: $scope.quiz._id,
    selection: []
  };

  if ($window.sessionStorage.getItem('userEmail') === undefined) {
    $scope.hasUserEmail = false;
  } else {
    $scope.userQuiz.userEmail = JSON.parse($window.sessionStorage.getItem('userEmail'));
    $scope.hasUserEmail = true;
  }

  $scope.submitEmail = function(){
    $scope.hasUserEmail = true;
    $window.sessionStorage.setItem('userEmail', JSON.stringify($scope.userQuiz.userEmail));
    $scope.userQuiz.userEmail = JSON.parse($window.sessionStorage.getItem('userEmail'));
  }

  $scope.updateSelected = function(quiz, questionIndex, option) {
    $scope.userQuiz.selection[questionIndex] = option;
  }

  $scope.submit = function(email){
    if ($scope.userQuiz.selection.length === $scope.quiz.questions.length) {
      $scope.userQuiz.selection.forEach(function(item){
        if (typeof item !== "string") {
          $scope.incomplete = true;
          alert("Please answer all the questions!");
        }
      });      
    } else {
      $scope.incomplete = true;
      alert("Please answer all the questions!");
    }

    if (!$scope.incomplete) {
      $scope.userQuiz.email = email;
      Quizbot.submitQuiz($scope.userQuiz)
        .then(function(resp){
          if (resp === 'OK') {
            //$location.path('/');
          }
        })
    }

  }
})

