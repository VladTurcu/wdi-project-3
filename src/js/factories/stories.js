angular
  .module('bemoApp')
  .factory('Story', Story);

Story.$inject = ['$resource'];
function Story($resource){
  return $resource('/api/stories/:id', { id: '@id'}, {
    'update': { method: 'PUT' }
  });
}
