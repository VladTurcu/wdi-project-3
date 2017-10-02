angular
  .module('bemoApp')
  .controller('UserShowCtrl', UserShowCtrl)
  .controller('UserIndexCtrl', UserIndexCtrl);

UserIndexCtrl.$inject = ['User'];
function UserIndexCtrl(User) {
  const vm = this;
  vm.all = User.query();
}


UserShowCtrl.$inject = ['User', '$state'];
function UserShowCtrl(User, $state) {
  const vm = this;
  vm.user = {};

  userShow();
  function userShow() {
    vm.user = User.get($state.params);
  }
}
