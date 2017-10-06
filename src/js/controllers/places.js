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


PlacesNewCtrl.$inject = ['$state', 'Place', '$http', '$scope', 'geocoder', 'restCountries'];
function PlacesNewCtrl($state, Place, $http, $scope, geocoder, restCountries) {
  const vm  = this;
  vm.place = {};
  vm.center = { lat: 45, lng: 5 };

  $scope.$watch(() => vm.center, () => {
    vm.place.lat = vm.center.lat;
    vm.place.lng = vm.center.lng;
  }, true);

  $scope.$watchGroup([
    () => vm.place.lat,
    () => vm.place.lng
  ], () => {
    if(!vm.place.lat || !vm.place.lng) return false;
    vm.center = { lat: Number(vm.place.lat), lng: Number(vm.place.lng) };
  }, true);

  vm.create = placesCreate;

  function placesCreate() {
    if (vm.place.address) {
      geocoder.geocode({ address: vm.place.address })
        .then(response => {
          vm.place.country = response.data.results[0].address_components.find(component => component.types.includes('country')).short_name;
          vm.place.lat = response.data.results[0].geometry.location.lat;
          vm.place.lng = response.data.results[0].geometry.location.lng;

          restCountries.getFlag(vm.place.country)
            .then((url) => {
              vm.place.flag = url;
              savePlace();
            });
        });

    } else {
      savePlace();
    }
  }

  function savePlace() {
    console.log(vm.place);
    return Place
      .save(vm.place)
      .$promise
      .then(() => $state.go('index'));
  }

}

PlacesEditCtrl.$inject = ['$state', 'Place', '$scope'];
function PlacesEditCtrl($state, Place, $scope) {
  const vm = this;
  vm.place = {};

  $scope.$watch(() => vm.center, () => {
    if(!vm.center) return false;
    vm.place.lat = vm.center.lat;
    vm.place.lng = vm.center.lng;
  }, true);

  placesShow();
  function placesShow(){
    Place.get($state.params)
      .$promise
      .then(place => {
        vm.center = { lat: place.lat, lng: place.lng };
        vm.place = place;
      });
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
