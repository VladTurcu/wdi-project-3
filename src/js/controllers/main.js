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


MainIndexCtrl.$inject = ['$state', '$scope', 'filterFilter', 'Place', 'Story'];
function MainIndexCtrl($state, $scope, filterFilter, Place, Story) {
  const vm = this;

  placesPush();
  function placesPush() {
    return Place
      .query()
      .$promise
      .then(places => {
        vm.places = places;
        Story
          .query()
          .$promise
          .then(stories => {
            vm.stories = stories;
            vm.all = stories.concat(places);
            vm.filtered = stories.concat(places);
            console.log(vm.all);

            vm.countries = [];
            vm.categories = [];
            vm.countrySearch = null;
            vm.categorySearch = null;
            vm.all.forEach(place => {
              if (place.country && !vm.countries.includes(place.country)) {
                vm.countries.push(place.country);
              }
              if (place.category && !vm.categories.includes(place.category)) {
                vm.categories.push(place.category);
              }
            });
            vm.countries = vm.countries
              .sort();
            vm.categories = vm.categories
              .sort();

            console.log(vm.countries);
          });
      });
  }

  function filterPlaces() {
    const params = {};
    let searchData = vm.all;

    if (vm.contentSearch === 'stories') {
      console.log('storrrrrries');
      searchData = vm.stories;
    } else if (vm.contentSearch === 'places') {
      searchData = vm.places;
    }

    if (vm.countrySearch) {
      params.country = vm.countrySearch;
    }

    if (vm.categorySearch) {
      params.category = vm.categorySearch;
    }

    if (vm.nameSearch) {
      params.name = vm.nameSearch;
    }

    vm.filtered = filterFilter(searchData, params);
    if (vm.countrySearch === null && vm.categorySearch === null && vm.nameSearch === null) {
      console.log('shit be null');
      vm.filtered = searchData;
    }
  }

  $scope.$watchGroup([
    () => vm.countrySearch,
    () => vm.categorySearch,
    () => vm.contentSearch,
    () => vm.nameSearch
  ], filterPlaces);

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
