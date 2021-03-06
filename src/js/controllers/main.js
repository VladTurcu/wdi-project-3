angular
  .module('bemoApp')
  .controller('MainCtrl', MainCtrl)
  .controller('MainIndexCtrl', MainIndexCtrl);

MainCtrl.$inject = ['$state', '$auth', 'User', '$rootScope', '$scope', '$transitions', '$window', '$location'];
function MainCtrl($state, $auth, User, $rootScope, $scope, $transitions, $window, $location) {
  const vm = this;

  // Function to show/hide registration form
  vm.registerHidden = true;
  vm.registerShow = registerShow;
  function registerShow() {
    vm.registerHidden = !vm.registerHidden;
  }
  // Search button class toggle
  $scope.isActive = false;
  $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
  };
  //Navbar burger button class toggle
  $scope.isActiveNav = false;
  $scope.activeBurger = function() {
    $scope.isActiveNav = !$scope.isActiveNav;
  };


  function cardIsActive(id) {
    return $location.hash() === id;
  }

  vm.cardIsActive = cardIsActive;


  // Responds to users login/logout
  vm.isAuthenticated = $auth.isAuthenticated;
  $rootScope.$on('loggedIn', () => vm.user = User.get({ id: $auth.getPayload().userId }));

  if($auth.isAuthenticated()) vm.user = User.get({ id: $auth.getPayload().userId });

  vm.logout = logout;
  function logout() {
    $auth.logout();
    vm.user = null;
    $state.go('index');
  }

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name;
    $window.scrollTo(0, 0);
  });

}


MainIndexCtrl.$inject = ['$state', '$scope', 'filterFilter', 'Place', 'Story', '$q'];
function MainIndexCtrl($state, $scope, filterFilter, Place, Story, $q) {
  const vm = this;

  $q.all({
    places: Place.query().$promise,
    stories: Story.query().$promise
  })
    .then(data => {
      vm.places = data.places;
      vm.stories = data.stories;
      return concatCollections();
    });

  function concatCollections() {
    vm.all = vm.stories.concat(vm.places);
    vm.filtered = vm.all;
    createCountryFilter();
    createCategoryFilter();
  }

  vm.countrySearch = null;
  function createCountryFilter() {
    vm.countries = Array.from(new Set(vm.places.map(item => item.country).sort()));
  }

  vm.categorySearch = null;
  function createCategoryFilter() {
    vm.categories = Array.from(new Set(vm.places.map(item => item.category).sort()));
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
