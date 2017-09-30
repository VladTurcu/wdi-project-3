angular
  .module('bemoApp')
  .factory('Story', Story);

Story.$inject = ['$resource', 'API'];
function Story($resource, API){
  return $resource(`${API}/stories/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}
