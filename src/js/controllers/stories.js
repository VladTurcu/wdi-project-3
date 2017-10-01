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

StoriesNewCtrl.$inject = ['$state', 'Story'];
function StoriesNewCtrl($state, Story) {
  const vm  = this;
  vm.story = {};
  vm.create = storiesCreate;


  function storiesCreate(){
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
