angular.module('quizBot.controllers', [])

.controller('TrendingCtrl', function($scope, Chats) {
  $scope.quizzes = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('MyQuizzesCtrl', function($scope, Chats) {
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

.controller('QuizPlayCtrl', function($scope, $stateParams, Chats) {
  $scope.quiz = Chats.get($stateParams.quizId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
