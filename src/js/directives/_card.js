angular
  .module('bemoApp')
  .directive('card', card);

function card() {
  return {
    restrict: 'E',
    templateUrl: 'js/views/directives/_card.html',
    replace: true,
    scope: {
      item: '='
    }
  };
}
