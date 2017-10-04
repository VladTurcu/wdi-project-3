angular
  .module('bemoApp')
  .controller('ProfileShowCtrl', ProfileShowCtrl)
  .controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$state'];
function UserShowCtrl(User, $state) {
  const vm = this;
  vm.user = {};

  userShow();
  function userShow() {
    vm.user = User.get($state.params);
  }
}


ProfileShowCtrl.$inject = ['User', '$state'];
function ProfileShowCtrl(User, $state) {
  const vm = this;
  vm.profile = {};

  userShow();
  function userShow() {
    vm.profile = User.get($state.params);
  }
}
