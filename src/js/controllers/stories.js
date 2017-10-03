angular
  .module('bemoApp')
  .controller('StoriesIndexCtrl', StoriesIndexCtrl)
  .controller('StoriesShowCtrl', StoriesShowCtrl)
  .controller('StoriesNewCtrl', StoriesNewCtrl)
  .controller('StoriesEditCtrl', StoriesEditCtrl);


StoriesIndexCtrl.$inject = ['Story'];
function StoriesIndexCtrl(Story) {
  const vm = this;
  vm.all = Story.query();
}

StoriesShowCtrl.$inject = ['$state', 'Story'];
function StoriesShowCtrl($state, Story) {
  const vm = this;
  vm.story = {};
  vm.delete = storiesDelete;

  storiesShow();
  function storiesShow() {
    vm.story = Story.get($state.params);
  }


  function storiesDelete(){
    Story
      .delete($state.params)
      .$promise
      .then(() => {
        $state.go('storiesIndex');
      });
  }
}

StoriesNewCtrl.$inject = ['$state', '$scope', 'Story'];
function StoriesNewCtrl($state, $scope, Story) {
  const vm  = this;
  vm.story = {};
  vm.story.route = [];
  vm.create = storiesCreate;
  vm.center = {lat: 51.5264476, lng: -0.0969805};
  vm.nextLeg = nextLeg;

  $scope.$watch(() => vm.center, () => {
    vm.story.testLat = vm.center.lat;
    vm.story.testLng = vm.center.lng;
  }, true);

  function nextLeg() {
    vm.story.route.push({ lat: vm.story.testLat, lng: vm.story.testLng });


    console.log(vm.story.route);


  }

  function storiesCreate(){
    const vm = this;
    Story
      .save(vm.story)
      .$promise
      .then(() => {
        $state.go('storiesIndex');
      });
  }
}

StoriesEditCtrl.$inject = ['$state', 'Story'];
function StoriesEditCtrl($state, Story) {
  const vm = this;
  vm.story = {};
  vm.update = storiesUpdate;

  storiesShow();

  function storiesShow(){
    vm.story = Story.get($state.params);
  }

  function storiesUpdate(){
    Story
      .update($state.params, vm.story)
      .$promise
      .then(() => {
        $state.go('storiesIndex');
      });
  }

}
