angular
  .module('bemoApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: '/js/views/home/index.html',
      controller: 'MainIndexCtrl as mainIndex'
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
    .state('userPage', {
      url: '/users/:id',
      templateUrl: '/js/views/users/show.html',
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

  $urlRouterProvider.otherwise('/');
}
