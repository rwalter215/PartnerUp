// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('PU.auth', [])

.controller('AuthController', function ($scope, $window, $location) {
  $scope.user = {};

});
