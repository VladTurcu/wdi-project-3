angular
  .module('bemoApp')
  .directive('autocomplete', autocomplete);

autocomplete.$inject = ['$window'];
function autocomplete($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      lat: '=',
      lng: '='
    },
    link($scope, $element, attrs, ngModel) {
      const autocomplete = new $window.google.maps.places.Autocomplete($element[0]);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const countryCode = place.address_components.find(component => component.types.includes('country')).short_name;

        ngModel.$setViewValue($element.val());

        $scope.lat = place.geometry.location.lat();
        $scope.lng = place.geometry.location.lng();
        $scope.$apply();
      });
    }
  };
}
