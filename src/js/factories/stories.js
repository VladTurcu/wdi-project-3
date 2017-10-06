angular
  .module('bemoApp')
  .factory('Story', Story);

Story.$inject = ['$resource'];
function Story($resource){
  return $resource('/stories/:id', { id: '@id'}, {
    'update': { method: 'PUT' }
  });
}
