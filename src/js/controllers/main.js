angular
  .module('bemoApp')
  .controller('MainCtrl', MainCtrl)
  .controller('MainIndexCtrl', MainIndexCtrl);

MainCtrl.$inject = ['$state', '$auth', 'User', '$rootScope'];
function MainCtrl($state, $auth, User, $rootScope) {
  const vm = this;

  // Function to show/hide registration form
  vm.registerHidden = true;
  vm.registerShow = registerShow;
  function registerShow() {
    vm.registerHidden = !vm.registerHidden;
  }

  // Responds to users login/logout
  vm.isAuthenticated = $auth.isAuthenticated;
  $rootScope.$on('loggedIn', () => {
    vm.user = User.get({ id: $auth.getPayload().userId });
    console.log(`${vm.user.username} has logged in!`);  // logs undefined?
  });

  vm.logout = logout;
  function logout() {
    $auth.logout();
    vm.user = null;
    $state.go('index');
  }

}

MainIndexCtrl.$inject = ['$state', '$scope', 'filterFilter', 'Place', 'Story'];
function MainIndexCtrl($state, $scope, filterFilter, Place, Story) {
  const vm = this;

  getPlaces();
  function getPlaces() {
    Place
      .query()
      .$promise
      .then(places => vm.places = places)
      .then(getStories);
  }

  function getStories() {
    Story
      .query()
      .$promise
      .then(stories => vm.stories = stories)
      .then(concatCollections);
  }

  function concatCollections() {
    vm.all = vm.stories.concat(vm.places);
    vm.filtered = vm.all;
    createCountryFilter();
    createCategoryFilter();
  }

  vm.countries = [];
  vm.countrySearch = null;
  function createCountryFilter() {
    vm.all.forEach(item => {
      if (item.country && !vm.countries.includes(item.country)) {
        vm.countries.push(item.country);
      }
    });
    vm.countries = vm.countries
      .sort();
  }

  vm.categories = [];
  vm.categorySearch = null;
  function createCategoryFilter() {
    vm.all.forEach(item => {
      if (item.category && !vm.categories.includes(item.category)) {
        vm.categories.push(item.category);
      }
    });
    vm.categories = vm.categories
      .sort();
  }

  function filter() {
    const params = {};
    let searchData = vm.all;

    if (vm.contentSearch === 'stories') searchData = vm.stories;
    else if (vm.contentSearch === 'places') searchData = vm.places;

    if (vm.countrySearch) params.country = vm.countrySearch;
    if (vm.categorySearch) params.category = vm.categorySearch;
    if (vm.nameSearch) params.name = vm.nameSearch;

    vm.filtered = filterFilter(searchData, params);
    if (vm.countrySearch === null && vm.categorySearch === null && vm.nameSearch === null) vm.filtered = searchData;
  }

  $scope.$watchGroup([
    () => vm.countrySearch,
    () => vm.categorySearch,
    () => vm.contentSearch,
    () => vm.nameSearch
  ], filter);

}
