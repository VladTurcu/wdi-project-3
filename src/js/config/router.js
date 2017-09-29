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
    });

  $urlRouterProvider.otherwise('/places');
}
