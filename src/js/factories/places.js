angular
  .module('bemoApp')
  .factory('Place', Place);

Place.$inject = ['$resource'];
function Place($resource){
  return $resource('/places/:id', { id: '@id'}, {
    'update': { method: 'PUT' }
  });
}
