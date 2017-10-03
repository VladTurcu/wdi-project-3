angular
  .module('bemoApp')
  .controller('MainCtrl', MainCtrl)
  .controller('MainIndexCtrl', MainIndexCtrl);

MainCtrl.$inject = ['$state', '$auth', 'User'];
function MainCtrl($state, $auth, User) {
  const vm = this;
  vm.registerHidden = true;
  vm.registerShow = registerShow;

  vm.userId = $auth.getPayload().userId;
  if(vm.userId) vm.user = User.get({ id: vm.userId });

  vm.isAuthenticated = $auth.isAuthenticated;

  function registerShow() {
    vm.registerHidden = !vm.registerHidden;
  }

  function logout() {
    $auth.logout();
    $state.go('placesIndex');
  }
  vm.logout = logout;
}

MainIndexCtrl.$inject = ['$state', 'Place', 'Story'];
function MainIndexCtrl($state, Place, Story) {
  const vm = this;

  placesPush();
  function placesPush() {
    return Place
      .query()
      .$promise
      .then(places => {
        Story
          .query()
          .$promise
          .then(stories => {
            vm.all = stories.concat(places);
            vm.countries = [];
            vm.all.forEach(place => {
              if (place.country) {
                vm.countries.push(place.country);
              }
            });
            // vm.countries = vm.countries
            //   .sort()
            //   .filter((item, pos) => vm.abvList.indexOf(item) === pos);

            console.log(vm.countries);
          });
      });
  }
}
