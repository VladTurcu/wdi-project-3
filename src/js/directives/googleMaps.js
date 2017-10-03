angular
  .module('bemoApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$anchorScroll', '$location'];
function googleMap($window, $anchorScroll, $location) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">There should be a map here</div>',
    scope: {
      center: '=',
      places: '=',
      stories: '='
    },
    link(scope, element) {
      let markers = [];
      let routes = [];
      const map = new $window.google.maps.Map(element[0], {
        zoom: 3,
        minZoom: 1,
        center: scope.center,
        styles: mapStyle
      });

      scope.$watch('places', () => {
        markers.forEach(marker => marker.setMap(null));
        if(scope.places.length === 0) return false;

        markers = scope.places.map(place => {
          console.log('this thing logs in markers');
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

      scope.$watch('stories', () => {
        routes.forEach(route => route.setMap(null));
        if(scope.stories.length === 0) return false;

        routes = scope.stories.map(story => {
          console.log('this thing logs in routes');
          const route = new $window.google.maps.Polyline({
            path: story.route,
            geodesic: true,
            strokeColor: '#FFFFFF',
            strokeOpacity: 1,
            strokeWeight: 3
          });
          route.setMap(map);
          route.addListener('click', () => {
            console.log(story.name);
          });
        });
      });

  //     var flightPlanCoordinates = [
  //   {lat: 37.772, lng: -122.214},
  //   {lat: 21.291, lng: -157.821},
  //   {lat: -18.142, lng: 178.431},
  //   {lat: -27.467, lng: 153.027}
  // ];
  // var flightPath = new $window.google.maps.Polyline({
  //   path: flightPlanCoordinates,
  //   geodesic: true,
  //   strokeColor: '#FFFFFF',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2
  // });
  //
  // flightPath.setMap(map);

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
