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
