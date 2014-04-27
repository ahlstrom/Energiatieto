define(["jquery"], function($) {
    return function(map) {
        var queryUrl = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20type,%20typeid%20FROM%201Sr5yGr8Mx8SniwKxpU5YA1YHli46VGIGLH8KD9Q%20WHERE%20ST_INTERSECTS(geometry,CIRCLE(LATLNG({{lat}},{{lng}}),10))&key=" + window.googleMapsApiKey;
        var mapType = new google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
                var proj = map.getProjection();
                var zfactor = Math.pow(2, zoom);
                // get Long Lat coordinates
                var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
                var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));

                //corrections for the slight shift of the SLP (mapserver)
                var deltaX = 0.0013;
                var deltaY = 0.00058;

                //create the Bounding box string
                var bbox =     (top.lng() + deltaX) + "," +
                               (bot.lat() + deltaY) + "," +
                               (bot.lng() + deltaX) + "," +
                               (top.lat() + deltaY);
                //base WMS URL
                var url = "http://kartat.espoo.fi/teklaogcweb/WMS.ashx";
                url += "?REQUEST=GetMap"; //WMS operation
                url += "&SERVICE=WMS";    //WMS service
                url += "&VERSION=1.1.1";  //WMS version  
                url += "&LAYERS=" + "Geoenergiakartta"; //WMS layers
                url += "&STYLES=";
                url += "&FORMAT=image/png"; //WMS format
                url += "&BGCOLOR=0xFFFFFF";  
                url += "&TRANSPARENT=TRUE";
                url += "&SRS=EPSG:4326";     //set WGS84 
                url += "&BBOX=" + bbox;      // set bounding box
                url += "&WIDTH=256";         //tile size in google
                url += "&HEIGHT=256";
                return url;                 // return URL for the tile
            },
            tileSize: new google.maps.Size(256, 256),
            isPng: true,
            opacity: 0.5
        });
        mapType.getData = function(latLng, callback) {
                var url = queryUrl
                            .replace("{{lat}}", latLng.lat())
                            .replace("{{lng}}", latLng.lng());

                $.get(url)
                    .success(function(data) {
                        if (data.rows) {
                            callback({
                                type: data.rows[0][0],
                                typeid: data.rows[0][1]
                            });
                        } else {
                            callback({});
                        }
                    })
                    .error(function() {
                        callback({});
                    });
            };
        return mapType;
    };
});