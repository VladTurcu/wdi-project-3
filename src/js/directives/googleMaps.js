angular
  .module('bemoApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
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
        center: scope.center,
        styles: mapStyle
      });
      new $window.google.maps.Marker({
        position: scope.center,
        map: map
      });

      scope.$watch('places', () => {
        markers.forEach(marker => marker.setMap(null));
        if(scope.places.length === 0) return false;

        markers = scope.places.map(place => {
          return new $window.google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map: map
          });
        });

      }, true);
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
