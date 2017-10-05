angular
  .module('bemoApp')
  .service('geocoder', Geocoder);

Geocoder.$inject = ['$http'];
function Geocoder($http) {
  const vm = this;

  vm.geocode = geocode;
  function geocode(address) {
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        address: address,
        key: 'AIzaSyAKoE_jY6PNxyupg_GsKz80YLv0wfChnGs'
      },
      skipAuthorization: true
    });
  }
}
