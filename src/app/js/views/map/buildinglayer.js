define([
    "./mapstyles",
    "../../models/buildinginfomodel"
    ], function(MapStyles, Building) {

        var clickableZoomLevel = 16;

        return function(map, collection) {

            var layer = new google.maps.FusionTablesLayer({
                query: {
                    select: 'col10',
                    from: '1A3CXe08s00bb9SgIzCnmXWz61yAOHWIkcdpzOa0'
                },
                clickable: (map.getZoom() >= clickableZoomLevel),
                suppressInfoWindows: true,
                styles: MapStyles.buildingsLayer
            });


            layer.setOpaque = function(val) {
                if (val === true) {
                    layer.set("styles", MapStyles.buildingsLayerInactive);
                } else {
                    layer.set("styles", MapStyles.buildingsLayer);
                }
            };

            var scaledSize = new google.maps.Size(30, 30),
                origin     = new google.maps.Point(15, 15),
                activeIcon = new google.maps.MarkerImage('/images/mapMarkerDotActive.png', null, null, origin, scaledSize);
                inactiveIcon = new google.maps.MarkerImage('/images/mapMarkerDot.png', null, null, origin, scaledSize);

            google.maps.event.addListener(map, 'zoom_changed', function() {
                layer.setOptions({
                    clickable: (map.getZoom() >= clickableZoomLevel)
                });
            });

            google.maps.event.addListener(layer, 'click', function(event) {
                new google.maps.Geocoder().geocode({
                        latLng: event.latLng
                    },
                    function(res, status) {
                        var byggid = event.row.ByggID.value;
                        var findByByggId = function(it) { return it.get("byggid") == byggid; };

                        var building = collection.find(findByByggId);

                        if (building === null || typeof building === 'undefined') {
                            building = new Building({
                                byggid: byggid,
                                averageRadiation: event.row.AvActKWHm2.value,
                                roofArea: event.row.area.value,
                                address: res[0],
                                location: event.latLng
                            });

                            var marker = new google.maps.Marker({
                                icon: inactiveIcon,
                                position: event.latLng,
                                map: map
                            });

                            building.on("deselect", function() {
                                marker.setIcon(inactiveIcon);
                            });

                            var selectBuilding = function() {
                                marker.setIcon(activeIcon);
                                collection.trigger("select", building);
                            };
                            
                            google.maps.event.addListener(marker, 'click', selectBuilding);

                            building.on("destroy", function() {
                                marker.setMap(null);
                            });

                            collection.add(building);

                            selectBuilding();
                        }

                    });
                
                return false;
            });

            return layer;
    };

});