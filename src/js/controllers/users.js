angular
  .module('bemoApp')
  .controller('ProfileShowCtrl', ProfileShowCtrl);

ProfileShowCtrl.$inject = ['User', '$state'];
function ProfileShowCtrl(User, $state) {
  const vm = this;
  vm.profile = {};

  userShow();
  function userShow() {
    vm.profile = User.get($state.params)
      .$promise
      .then((user) => {
        vm.profile = user;
        vm.items = [];
        user.places.forEach(place => vm.items.push(place));
        user.stories.forEach(story => vm.items.push({ route: story.route }));
      });
  }
}
