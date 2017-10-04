angular
  .module('bemoApp')
  .directive('navbar', navbar);

function navbar() {
  return {
    restrict: 'E',
    templateUrl: 'js/views/directives/_navbar.html',
    replace: true
  };
}
