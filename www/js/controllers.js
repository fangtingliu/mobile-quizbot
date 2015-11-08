angular.module('quizBot.controllers', [])

.controller('TrendingCtrl', function($scope, $rootScope, $window, $location, Quizbot) {
  $scope.init = function(){
    Quizbot.getQuizbot()
      .then(function(data){
        $scope.quizzes = data;
      })
  };

  $scope.init();

  $scope.selectQuiz = function(quiz) {
    $window.sessionStorage.setItem('selectedQuiz', JSON.stringify(quiz));
    $location.path('/tab/trending/play/' + quiz._id);
  }
})

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

  $scope.submit = function(){
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
      Quizbot.submit($scope.userQuiz)
    }



  }
})


.controller('MyQuizzesCtrl', function($scope, Quizbot) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.quizzes = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
