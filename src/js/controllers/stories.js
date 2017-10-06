angular
  .module('bemoApp')
  .controller('StoriesShowCtrl', StoriesShowCtrl)
  .controller('StoriesNewCtrl', StoriesNewCtrl)
  .controller('StoriesEditCtrl', StoriesEditCtrl);

StoriesShowCtrl.$inject = ['$state', 'Story'];
function StoriesShowCtrl($state, Story) {
  const vm = this;
  vm.story = {};
  vm.items = [];

  storiesShow();
  function storiesShow() {
    Story.get($state.params)
      .$promise
      .then((story) => {
        vm.story = story;
        vm.items = [];
        story.places.forEach(place => vm.items.push(place));
        vm.items.push({ route: story.route });
      });
  }

  vm.delete = storiesDelete;
  function storiesDelete() {
    Story
      .delete($state.params)
      .$promise
      .then(() => {
        $state.go('index');
      });
  }
}

StoriesNewCtrl.$inject = ['$state', '$scope', 'Story', 'Place'];
function StoriesNewCtrl($state, $scope, Story, Place) {
  const vm  = this;
  vm.story = { places: [] };
  vm.story.route = [];
  vm.center = { lat: 51.5264476, lng: -0.0969805 };
  vm.places = Place.query();

  $scope.$watch(() => vm.center, () => {
    vm.story.testLat = vm.center.lat;
    vm.story.testLng = vm.center.lng;
  }, true);

  vm.nextLeg = nextLeg;
  function nextLeg() {
    vm.story.route.push({ lat: vm.story.testLat, lng: vm.story.testLng });
  }

  vm.create = storiesCreate;
  function storiesCreate(){
    Story
      .save(vm.story)
      .$promise
      .then(() => {
        $state.go('index');
      });
  }

  function togglePlace(place) {
    const index = vm.story.places.indexOf(place.id);
    if(index > -1) vm.story.places.splice(index, 1);
    else vm.story.places.push(place.id);
  }

  vm.togglePlace = togglePlace;
}

StoriesEditCtrl.$inject = ['$state', 'Story', 'Place', '$scope'];
function StoriesEditCtrl($state, Story, Place, $scope) {
  const vm = this;
  vm.story = {};
  vm.center = { lat: 51.5264476, lng: -0.0969805 };
  vm.places = Place.query();
  vm.newEdit = true;


  Story.get($state.params)
    .$promise
    .then((story) => {
      vm.story = story;
      console.log(vm.story.route);
      vm.story.places = vm.story.places.map((place) => place.id);
    });

  $scope.$watch(() => vm.center, () => {
    vm.story.testLat = vm.center.lat;
    vm.story.testLng = vm.center.lng;
  }, true);

  vm.nextLeg = nextLeg;
  function nextLeg() {
    if (vm.newEdit) {
      vm.story.route = [];
      vm.newEdit = false;
    }
    vm.story.route.push({ lat: vm.story.testLat, lng: vm.story.testLng });
  }

  vm.update = storiesUpdate;
  function storiesUpdate(){
    console.log(vm.story);
    Story
      .update($state.params, vm.story)
      .$promise
      .then(() => {
        $state.go('storiesShow', $state.params);
      });
  }

  function togglePlace(place) {
    const index = vm.story.places.indexOf(place.id);
    if(index > -1) vm.story.places.splice(index, 1);
    else vm.story.places.push(place.id);
  }

  vm.togglePlace = togglePlace;

}
