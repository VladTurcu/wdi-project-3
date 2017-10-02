angular
  .module('bemoApp')
  .directive('register', register);

function register() {
  return {
    restrict: 'E',
    templateUrl: 'js/views/auth/register.html',
    replace: true,
    controller: 'RegisterCtrl as register'
  };
}
