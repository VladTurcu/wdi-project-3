angular
  .module('bemoApp')
  .controller('UserShowCtrl', UserShowCtrl);


UserShowCtrl.$inject = ['User', '$state'];
function UserShowCtrl(User, $state) {
  const vm = this;
  vm.user = {};



  userShow();
  function userShow() {
    vm.user = User.get($state.params);

  }
  console.log(vm.user);
}
