angular
  .module('bemoApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('placesIndex', {
      url: '/places',
      templateUrl: '/js/views/places/index.html',
      controller: 'PlacesIndexCtrl as placesIndex'
    })
    .state('placesNew', {
      url: '/places/new',
      templateUrl: '/js/views/places/new.html',
      controller: 'PlacesNewCtrl as placesNew'
    })
    .state('placesShow', {
      url: '/places/:id',
      templateUrl: '/js/views/places/show.html',
      controller: 'PlacesShowCtrl as placesShow'
    })
    .state('placesEdit', {
      url: '/places/:id/edit',
      templateUrl: '/js/views/places/edit.html',
      controller: 'PlacesEditCtrl as placesEdit'
    })
    .state('userIndex', {
      url: '/users/:id',
      templateUrl: '/js/views/users/index.html',
      controller: 'UserShowCtrl as userShow'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('storiesIndex', {
      url: '/stories',
      templateUrl: '/js/views/stories/index.html',
      controller: 'StoriesIndexCtrl as storiesIndex'
    })
    .state('storiesNew', {
      url: '/stories/new',
      templateUrl: '/js/views/stories/new.html',
      controller: 'StoriesNewCtrl as storiesNew'
    })
    .state('storiesShow', {
      url: '/stories/:id',
      templateUrl: '/js/views/stories/show.html',
      controller: 'StoriesShowCtrl as storiesShow'
    })
    .state('storiesEdit', {
      url: '/stories/:id/edit',
      templateUrl: '/js/views/stories/edit.html',
      controller: 'StoriesEditCtrl as storiesEdit'
    });

  $urlRouterProvider.otherwise('/places');
}