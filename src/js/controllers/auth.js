angular
  .module('bemoApp')
  .controller('LoginCtrl', LoginCtrl)
  .controller('RegisterCtrl', RegisterCtrl);

LoginCtrl.$inject = ['$auth', '$state', '$rootScope'];
function LoginCtrl($auth, $state, $rootScope) {
  const vm = this;

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then(() => {
          $rootScope.$broadcast('loggedIn');
          $state.go('index');
        })
        .catch(() => $state.go('index'));
    }
  }
  vm.submit = submit;
}

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    if (vm.registerForm.$valid) {
      $auth.signup(vm.user)
        .then(() => $state.go('index'))
        .catch(() => $state.go('index'));
    }
  }
  vm.submit = submit;
}
