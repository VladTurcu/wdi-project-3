angular
  .module('bemoApp')
  .directive('login', login);

function login() {
  return {
    restrict: 'E',
    templateUrl: 'js/views/auth/login.html',
    replace: false,
    controller: 'LoginCtrl as login'
  };
}
