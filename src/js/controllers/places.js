angular
  .module('bemoApp')
  .controller('PlacesIndexCtrl', PlacesIndexCtrl)
  .controller('PlacesShowCtrl', PlacesShowCtrl)
  .controller('PlacesNewCtrl', PlacesNewCtrl)
  .controller('PlacesEditCtrl', PlacesEditCtrl);


PlacesIndexCtrl.$inject = ['Place'];
function PlacesIndexCtrl(Place) {
  const vm = this;
  vm.all = Place.query();
}

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
        console.log('delete');
        $state.go('placesIndex');
      });
  }
}

PlacesNewCtrl.$inject = ['$state', 'Place', '$http'];
function PlacesNewCtrl($state, Place, $http) {
  const vm  = this;
  vm.place = {};
  vm.create = placesCreate;

  function placesCreate(){
    if (vm.place.address) {
      let address = vm.place.address;
      address = address.split(' ').join('+');
      console.log(address);
      $http({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAKoE_jY6PNxyupg_GsKz80YLv0wfChnGs`,
        skipAuthorization: true
      })
        .then(data => {
          console.log(data.data.results[0].address_components);
          const latLng = (data.data.results[0].geometry.location);
          vm.place.lat = latLng.lat;
          vm.place.lng = latLng.lng;
          console.log('1', vm.place);

          Place
            .save(vm.place)
            .$promise
            .then(() => {
              console.log('2', vm.place);
              $state.go('placesIndex');
            });
        });
    } else {
      console.log('1', vm.place);
      Place
        .save(vm.place)
        .$promise
        .then(() => {
          $state.go('placesIndex');
        });
    }
  }
}

PlacesEditCtrl.$inject = ['$state', 'Place'];
function PlacesEditCtrl($state, Place) {
  const vm = this;
  vm.place = {};
  vm.update = placesUpdate;

  placesShow();

  function placesShow(){
    vm.place = Place.get($state.params);
  }

  function placesUpdate(){
    Place
      .update($state.params, vm.place)
      .$promise
      .then(() => {
        $state.go('placesIndex');
      });
  }

}
