angular.module('mathtest.login', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise("/")
      $stateProvider
      .state('login', {
        templateUrl: '../html/login.html',
        controller:'LoginCtrl'
      });
})
.controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', 'AuthService','$state',
  function($scope, $rootScope, $http, $location, authService,$state) {
  $scope.error = false;
  $rootScope.selectedTab = $location.path() || '/';

  $scope.credentials = {};

  var validateRole = function(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  $scope.login = function() {
    // We are using formLogin in our backend, so here we need to serialize our form data
    $http({
      url: authService.getProtocol() + "://"+ authService.getAddress() + '/auth/login',
      method: 'POST',
      data: $scope.credentials,
      headers: authService.createAuthorizationTokenHeader()
    })
    .then(function(res) {
      if(validateRole(res.data.access_token).iss.indexOf("ROLE_ADMIN") != -1) {
        $rootScope.authenticated = true;
        authService.setJwtToken(res.data.access_token);
        $state.transitionTo('home');
        $scope.error = false;
      } else {
        $.notify("Username can't access this page", "error");
        authService.removeJwtToken();
        $rootScope.authenticated = false;
        $scope.error = true;
      }
    },function(err) {
      $.notify("Username or Password not found", "error");
      authService.removeJwtToken();
      $rootScope.authenticated = false;
      $scope.error = true;
    });
  };
  


}]);
