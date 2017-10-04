angular
  .module('bemoApp')
  .controller('StoriesShowCtrl', StoriesShowCtrl)
  .controller('StoriesNewCtrl', StoriesNewCtrl)
  .controller('StoriesEditCtrl', StoriesEditCtrl);

StoriesShowCtrl.$inject = ['$state', 'Story'];
function StoriesShowCtrl($state, Story) {
  const vm = this;
  vm.story = {};

  storiesShow();
  function storiesShow() {
    vm.story = Story.get($state.params);
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

StoriesNewCtrl.$inject = ['$state', '$scope', 'Story'];
function StoriesNewCtrl($state, $scope, Story) {
  const vm  = this;
  vm.story = {};
  vm.story.route = [];
  vm.center = { lat: 51.5264476, lng: -0.0969805 };

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
}

StoriesEditCtrl.$inject = ['$state', 'Story'];
function StoriesEditCtrl($state, Story) {
  const vm = this;
  vm.story = {};

  storiesShow();
  function storiesShow(){
    vm.story = Story.get($state.params);
  }

  vm.update = storiesUpdate;
  function storiesUpdate(){
    Story
      .update($state.params, vm.story)
      .$promise
      .then(() => {
        $state.go('storiesShow', $state.params);
      });
  }

}
