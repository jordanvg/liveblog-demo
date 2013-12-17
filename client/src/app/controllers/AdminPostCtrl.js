liveBlog.controller('AdminPostCtrl', ['$scope', 'AdminPost', function ($scope, AdminPost) {
  
  $scope.post = {};

  $scope.addPost = function (post) {
    AdminPost.addPost(post);
  };

}]);
