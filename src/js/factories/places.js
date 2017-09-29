angular
  .module('bemoApp')
  .factory('Place', Place);

Place.$inject = ['$resource', 'API'];
function Place($resource, API){
  return $resource(`${API}/places/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}
