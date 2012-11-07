define([], {
    main: [
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
    buildingsLayer: [{
        polygonOptions: {
            fillColor: "#000000",
            strokeColor: "#333333",
            strokeWeight: "1"
        }
    }]
});