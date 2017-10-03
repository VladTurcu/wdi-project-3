angular
  .module('bemoApp')
  .controller('LoginCtrl', LoginCtrl)
  .controller('RegisterCtrl', RegisterCtrl);
  // .controller('Register2Ctrl', Register2Ctrl);

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then(() => $state.go('placesIndex'))
        .catch(() => $state.go('login'));
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
        .then(() => $state.go('login'))
        .catch(() => $state.go('register'));
    }
  }

  vm.submit = submit;
}

// function Register2Ctrl() {
//   const vm = this;
//   console.log('in the register2 ctrl');
//   vm.mapObject = {
//     scope: 'usa',
//     options: {
//       width: 1110,
//       legendHeight: 60 // optionally set the padding for the legend
//     },
//     geographyConfig: {
//       highlighBorderColor: '#EAA9A8',
//       highlighBorderWidth: 2
//     },
//     fills: {
//       'HIGH': '#CC4731',
//       'MEDIUM': '#306596',
//       'LOW': '#667FAF',
//       'defaultFill': '#DDDDDD'
//     },
//     data: {
//       AZ: {
//         fillKey: 'MEDIUM'
//       },
//       CO: {
//         fillKey: 'HIGH'
//       },
//       DE: {
//         fillKey: 'LOW'
//       },
//       GA: {
//         fillKey: 'MEDIUM'
//       }
//     }
//   };
// }
