define([], {
    options: function() {
      return {
        zoom: 11,
        maxZoom: 20,
        center: new google.maps.LatLng(60.2, 24.7),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        styles: [
          {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [ { "color": "#ffffff" } ]
          },{
            "featureType": "water",
            "stylers": [ { "color": "#9fa0a0" } ]
          },{
            "featureType": "poi",
            "stylers": [ { "color": "#ffffff" } ]
          },{
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [ { "color": "#ffffff" } ]
          },{
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [ { "color": "#ffffff" } ]
          },{
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [ { "visibility": "off" } ]
          },{
            "stylers": [ { "saturation": -100 } ]
          }
        ],
        mapTypeControl: false
      };
    },
    buildingsLayer: [{
        polygonOptions: {
            fillColor: "#000000",
            strokeColor: "#333333",
            strokeWeight: "1"
        }
    }],
    buildingsLayerInactive: [{
        polygonOptions: {
            fillColor: "#FFFFFF",
            strokeColor: "#333333",
            strokeWeight: "1",
            fillOpacity: 0.01
        }
    }]
});