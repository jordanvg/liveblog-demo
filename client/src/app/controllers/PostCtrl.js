liveBlog.controller('PostCtrl', ['$scope', '$timeout', 'Post', function ($scope, $timeout, Post) {
  
  $scope.posts = {};
  $scope.latestId = 0;
  $scope.autoUpdate = true;

  Post.getAllPosts();

  $scope.$on('posts.update', function (event) {
    $scope.posts = Post.posts;
    $scope.serverError = false;

    if ($scope.posts.length > 0) {
      $scope.latestId = $scope.posts[$scope.posts.length-1].id;
    }
  });

  $scope.$on('posts.server_error', function (event) {
    $scope.serverError = true;
  });

  var poll = function() {
    $timeout(function() {
      if ($scope.autoUpdate) {
        Post.getLatestPosts($scope.latestId);
        $scope.posts = Post.posts;
        if ($scope.posts.length > 0) {
          $scope.latestId = $scope.posts[$scope.posts.length-1].id;
        }
      }
      poll();
    }, 3000);
  };
  poll();

  $scope.posts = Post.posts;

}]);
