liveBlog.service('AdminPost', ['$rootScope', '$http', function ($rootScope, $http) {
  
  var service = {

    addPost: function (post) {
      $http({
        method: 'POST',
        url: 'http://127.0.0.1:5000/liveblog/api/1.0/posts',
        data: post,
      })
      .success(function (data, status, headers, config) {
        $rootScope.$broadcast('admin.post_added');
      })
      .error(function (data, status, headers, config) {
        $rootScope.$broadcast('posts.server_error');
      });
    },
  };

  return service;

}]);
