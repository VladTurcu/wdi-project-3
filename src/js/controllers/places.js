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

PlacesNewCtrl.$inject = ['$state', 'Place'];
function PlacesNewCtrl($state, Place) {
  const vm  = this;
  vm.place = {};
  vm.create = placesCreate;

  function placesCreate(){
    Place
      .save(vm.place)
      .$promise
      .then(() => {
        $state.go('placesIndex');
      });
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
