angular
  .module('bemoApp')
  .controller('PlacesShowCtrl', PlacesShowCtrl)
  .controller('PlacesNewCtrl', PlacesNewCtrl)
  .controller('PlacesEditCtrl', PlacesEditCtrl);

PlacesShowCtrl.$inject = ['$state', 'Place'];
function PlacesShowCtrl($state, Place) {
  const vm = this;
  vm.place = {};
  vm.delete = placesDelete;

  placesShow();
  function placesShow() {
    vm.place = Place.get($state.params);
  }

  function placesDelete(){
    Place
      .delete($state.params)
      .$promise
      .then(() => {
        $state.go('index');
      });
  }
}

PlacesNewCtrl.$inject = ['$state', 'Place', '$http', '$scope'];
function PlacesNewCtrl($state, Place, $http, $scope) {
  const vm  = this;
  vm.place = {};
  vm.center = { lat: 45, lng: 5 };

  $scope.$watch(() => vm.center, () => {
    vm.place.lat = vm.center.lat;
    vm.place.lng = vm.center.lng;
  }, true);

  vm.create = placesCreate;
  function placesCreate() {
    if (vm.place.address) {
      geocode(vm.place.address)
        .then(savePlace);
    } else {
      savePlace();
    }
  }

  function savePlace() {
    return Place
      .save(vm.place)
      .$promise
      .then(() => $state.go('index'));
  }

  function geocode(address) {
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        address: address,
        key: 'AIzaSyAKoE_jY6PNxyupg_GsKz80YLv0wfChnGs'
      },
      skipAuthorization: true
    })
      .then(data => {
        console.log(data);
        vm.place.country = data.data.results[0].address_components.reverse()[1].short_name;
        vm.place.lat = data.data.results[0].geometry.location.lat;
        vm.place.lng = data.data.results[0].geometry.location.lng;
        return getCountryData();
      });
  }

  function getCountryData() {
    return $http({
      method: 'GET',
      url: `https://restcountries.eu/rest/v2/alpha/${vm.place.country}`,
      skipAuthorization: true
    })
      .then(countryData => {
        vm.place.flag = countryData.data.flag;
      });
  }
}

PlacesEditCtrl.$inject = ['$state', 'Place'];
function PlacesEditCtrl($state, Place) {
  const vm = this;
  vm.place = {};

  placesShow();
  function placesShow(){
    vm.place = Place.get($state.params);
  }

  vm.update = placesUpdate;
  function placesUpdate() {
    Place
      .update($state.params, vm.place)
      .$promise
      .then(() => {
        $state.go('placesShow', $state.params);
      });
  }
}
