angular
  .module('bemoApp')
  .directive('googleMap', googleMap)
  .directive('mapDrag', mapDrag);

googleMap.$inject = ['$window', '$anchorScroll', '$location'];
function googleMap($window, $anchorScroll, $location) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">There should be a map here</div>',
    scope: {
      center: '=',
      items: '=?',
      item: '=?'
    },
    link(scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 3,
        minZoom: 2,
        maxZoom: 10,
        center: scope.center,
        styles: mapStyle
      });

      let mapItems = [];

      scope.$watch('items', () => {
        mapItems.forEach(mapItem => mapItem.setMap(null));
        if(!scope.items || scope.items.length === 0) return false;

        mapItems = scope.items.map(item => {
          let mapItem = null;
          if (item.route) mapItem = newRoute(item);
          else mapItem = newMarker(item);
          mapItem.addListener('click', () => {
            $location.hash(item.id);
            $anchorScroll();
          });
          return mapItem;
        });

        checkBounds();

      }, true);

      scope.$watch('item', () => {
        let mapItem = null;
        mapItems.forEach(mapItem => mapItem.setMap(null));
        if(!scope.item) return false;
        if (scope.item.route) mapItem = newRoute(scope.item);
        else mapItem = newMarker(scope.item);
        mapItem.addListener('click', () => {
          $location.hash(scope.item.id);
          $anchorScroll();
        });

        mapItems.push(mapItem);

        checkBounds();

      }, true);

      function newRoute(item) {
        const route = new $window.google.maps.Polyline({
          path: item.route,
          map: map,
          geodesic: true,
          strokeColor: '#406e8e',
          strokeOpacity: 1,
          strokeWeight: 3
        });
        return route;
      }

      function newMarker(item) {
        console.log('creating new marker');
        const marker = new $window.google.maps.Marker({
          position: { lat: item.lat, lng: item.lng },
          map: map,
          icon: {
            url: 'http://simpleicon.com/wp-content/uploads/map-marker-15-256x256.png',
            scaledSize: new $window.google.maps.Size(20, 20)
          }
        });
        return marker;
      }

      function checkBounds() {
        const bounds = new $window.google.maps.LatLngBounds();
        mapItems.forEach(item => {
          // console.log('item', item);
          if(!item.position) return false;
          const latLng = { lat: item.position.lat(), lng: item.position.lng() };
          bounds.extend(latLng);
        });
        map.fitBounds(bounds);
      }
    }
  };
}

// Map for new place and story pages
mapDrag.$inject = ['$window', 'geocoder'];
function mapDrag($window, geocoder) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">There should be a map here</div>',
    scope: {
      center: '=',
      route: '=',
      address: '=?'
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
        icon: {
          url: 'images/bemo-pointer1.png',
          scaledSize: new $window.google.maps.Size(100, 40)
        }
      });

      marker.addListener('dragend', (e) => {
        scope.center = e.latLng.toJSON();
        geocoder.geocode({ latlng: `${scope.center.lat},${scope.center.lng}` })
          .then(response => {
            scope.address = response.data.results[0].formatted_address;
          });
      });

      scope.$watch('center', () => {
        map.setCenter(scope.center);
        marker.setPosition(scope.center);
      }, true);

      scope.$watch('route', () => {
        if(!scope.route) return false;
        if (scope.route.length <= 1) {
          new $window.google.maps.Marker({
            position: scope.route[scope.route.length - 1],
            map: map,
            icon: {
              url: 'http://simpleicon.com/wp-content/uploads/map-marker-15-256x256.png',
              scaledSize: new $window.google.maps.Size(20, 20)
            }
          });
        }

        new $window.google.maps.Polyline({
          path: scope.route,
          map: map,
          geodesic: true,
          strokeColor: '#406e8e',
          strokeOpacity: 1,
          strokeWeight: 2
        });

      }, true);
    }
  };
}

// Nothing but styles below this point
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
