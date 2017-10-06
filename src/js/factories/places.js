angular
  .module('bemoApp')
  .factory('Place', Place);

Place.$inject = ['$resource'];
function Place($resource){
  return $resource('/api/places/:id', { id: '@id'}, {
    'update': { method: 'PUT' }
  });
}
