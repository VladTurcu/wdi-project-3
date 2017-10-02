angular
  .module('bemoApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$state', '$auth', 'User'];
function MainCtrl($state, $auth, User) {
  const vm = this;
  vm.registerHidden = true;
  vm.registerShow = registerShow;

  const { userId } = $auth.getPayload();
  if(userId) vm.user = User.get({ id: userId });
  vm.isAuthenticated = $auth.isAuthenticated;

  
  function registerShow() {
    vm.registerHidden = !vm.registerHidden;
    console.log(vm.registerHidden);
  }

}
