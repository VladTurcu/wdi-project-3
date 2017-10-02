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
  console.log(vm.user);
  vm.isAuthenticated = $auth.isAuthenticated;

  function registerShow() {
    vm.registerHidden = !vm.registerHidden;
  }

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

            console.log(vm.all);

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

  //
  // mix(vm.all);
  //
  // function mix(alli) {
  //   var m = alli.length, t, i;
  //
  //   // While there remain elements to shuffle
  //   while (m) {
  //     // Pick a remaining element…
  //     i = Math.floor(Math.random() * m--);
  //
  //     // And swap it with the current element.
  //     t = alli[m];
  //     alli[m] = alli[i];
  //     alli[i] = t;
  //   }
  //
  //   return alli;
  // }
  //


  // console.log(vm.all);
}
