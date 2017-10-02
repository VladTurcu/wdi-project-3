angular
  .module('bemoApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$state', '$auth', 'User'];
function MainCtrl($state, $auth, User) {
  const vm = this;
  vm.registerHidden = true;
  vm.registerShow = registerShow;

  vm.userId = $auth.getPayload();
  if(vm.userId) vm.user = User.get({ id: vm.userId });
  vm.isAuthenticated = $auth.isAuthenticated;

  function registerShow() {
    vm.registerHidden = !vm.registerHidden;
    console.log(vm.registerHidden);
  }

}
