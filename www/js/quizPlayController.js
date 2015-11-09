angular.module('quizBot.controllers')

.controller('QuizPlayCtrl', function($scope, $stateParams, $location, $window, Quizbot) {
  // get the quiz
  $scope.quiz = JSON.parse($window.sessionStorage.getItem('selectedQuiz'));
  $scope.incomplete = true;

  // start to create object userQuiz for later submittion
  $scope.userQuiz = {
    quizId: $scope.quiz._id,
    selection: []
  };

  // check if userEmail is stored
  if ($window.sessionStorage.getItem('userEmail') === null) {
    $scope.hasUserEmail = false;
  } else {
    $scope.userQuiz.userEmail = JSON.parse($window.sessionStorage.getItem('userEmail'));
    $scope.hasUserEmail = true;
  }

  // submit email handler
  $scope.submitEmail = function(){
    $scope.hasUserEmail = true;
    $window.sessionStorage.setItem('userEmail', JSON.stringify($scope.userQuiz.userEmail));
    $scope.userQuiz.userEmail = JSON.parse($window.sessionStorage.getItem('userEmail'));
  }

  // as user start to do the quiz, update data as the process goes
  $scope.updateSelected = function(quiz, questionIndex, option) {
    $scope.userQuiz.selection[questionIndex] = option;
    if ($scope.userQuiz.selection.length === $scope.quiz.questions.length) {
      for (var i = 0; i < $scope.userQuiz.selection.length; i ++) {
        var item = $scope.userQuiz.selection[i];
        if (typeof item !== "string") {
          $scope.incomplete = true;
          break;
        } else if (i === $scope.userQuiz.selection.length-1) {
          $scope.incomplete = false;
        }
      }
    } else {
      $scope.incomplete = true;      
    }
  };

  // submit quiz along with either user wants an email
  $scope.submit = function(email){
    if (!$scope.incomplete) {
      $scope.userQuiz.email = email;
      Quizbot.submitQuiz($scope.userQuiz)
        .then(function(data){
          alert("You score is " + data.userScore + ". " + data.description);
          $location.path('/tab/trending')
        })
    } else {
      alert("Please answer all the questions!");
    }
  }
})

