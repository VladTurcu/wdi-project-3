angular
  .module('bemoApp')
  .service('restCountries', RestCountries);

RestCountries.$inject = ['$http'];
function RestCountries($http) {
  const vm = this;

  vm.getFlag = getFlag;
  function getFlag(isoCode) {
    return $http({
      method: 'GET',
      url: `https://restcountries.eu/rest/v2/alpha/${isoCode}`,
      skipAuthorization: true
    })
      .then(countryData => {
        return countryData.data.flag;
      });
  }

}
