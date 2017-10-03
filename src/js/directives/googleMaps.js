angular
  .module('bemoApp')
  .directive('googleMap', googleMap)
  .directive('mapClick', mapClick);

googleMap.$inject = ['$window', '$anchorScroll', '$location'];
function googleMap($window, $anchorScroll, $location) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">There should be a map here</div>',
    scope: {
      center: '=',
      places: '='
    },
    link(scope, element) {
      let markers = [];
      const map = new $window.google.maps.Map(element[0], {
        zoom: 3,
        minZoom: 1,
        center: scope.center,
        styles: mapStyle
      });


      scope.$watch('places', () => {
        markers.forEach(marker => marker.setMap(null));
        if(!scope.places || scope.places.length === 0) return false;

        markers = scope.places.map(place => {
          const marker = new $window.google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map: map,
            icon: {
              url: 'http://simpleicon.com/wp-content/uploads/map-marker-15-256x256.png',
              scaledSize: new $window.google.maps.Size(20, 20)
            }
          });
          marker.addListener('click', () => {
            console.log('clicked', place.name);
            $location.hash(place.id);
            $anchorScroll();
          });
        });

      }, true);
    }
  };
}




mapClick.$inject = ['$window'];
function mapClick($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">There should be a map here</div>',
    scope: {
      center: '='
    },
    link(scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 3,
        minZoom: 1,
        center: scope.center,
        styles: mapStyle
      });
      const marker = new $window.google.maps.Marker({
        position: scope.center,
        map: map,
        draggable: true,
        title: 'Click to zoom'
      });

      marker.addListener('dragend', (e) => {
        scope.center = e.latLng.toJSON();
        scope.$apply();
      });






    }
  };
}










const mapStyle = [
  {
    featureType: 'administrative.country',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#eace9e'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.fill',
    stylers: [
      {
        hue: '#ff0000'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels',
    stylers: [
      {
        color: '#ad8f5a'
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        color: '#b77510'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        color: '#876118'
      }
    ]
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      },
      {
        weight: 4
      },
      {
        hue: '#ffa900'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'geometry',
    stylers: [
      {
        hue: '#ff9a00'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#86bcc4'
      }
    ]
  }
];
