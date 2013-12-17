liveBlog.service('Post', ['$rootScope', '$http', function ($rootScope, $http) {

  var service = {
    posts: [],

    getAllPosts: function () {
      service.posts = [];

      $http({
        method: 'GET',
        url: 'http://127.0.0.1:5000/liveblog/api/1.0/posts'
      })
      .success(function (data, status, headers, config) {
        service.posts = data.posts;
        $rootScope.$broadcast('posts.update');
      })
      .error(function (data, status, headers, config) {
        $rootScope.$broadcast('posts.server_error');
      });
    },

    getLatestPosts: function (latest_id) {
      $http({
        method: 'GET',
        url: 'http://127.0.0.1:5000/liveblog/api/1.0/posts?new=' + latest_id
      })
      .success(function (data, status, headers, config) {
        if (data.posts.length > 0) {
          service.posts = service.posts.concat(data.posts);
          $rootScope.$broadcast('posts.update');
        }
      })
      .error(function (data, status, headers, config) {
        $rootScope.$broadcast('posts.server_error');
      });
    },
  };

  return service;
  
}]);
