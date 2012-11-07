define([
    "./mapstyles"
    ], function(MapStyles) {

        return function(map) {
            return new google.maps.ImageMapType({
                  getTileUrl: function(coord, zoom) {
                    var bound = Math.pow(2, zoom);
                    return "https://raw.github.com/ahlstrom/EnergiatietoSolar/master/mapTIles" + "/" + zoom + "/" + coord.x + "/" + (bound - coord.y - 1) + ".png";
                  },
                  tileSize: new google.maps.Size(256, 256),
                  maxZoom: 20,
                  minZoom: 8,
                  name: "Solar",
                  opacity: 1.0
            });
        };
    });