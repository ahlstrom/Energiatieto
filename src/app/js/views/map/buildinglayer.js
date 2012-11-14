define([
    "./mapstyles",
    "../../models/buildinginfomodel",
    "./buildinglayercontrols"
    ], function(MapStyles, Building, BuildingLayerControls) {

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

            layer.activate = function() {
                layer.setMap(map);
                layer.setOpaque(false);
                _.each(markers, function(it) {
                    it.setMap(map);
                });
            };

            layer.deactivate = function() {
                layer.setOpaque(true);
                _.each(markers, function(it) {
                    it.setMap(null);
                });
            };

            layer.controls = new BuildingLayerControls({
                
            });

            var scaledSize   = new google.maps.Size(30, 30),
                origin       = new google.maps.Point(15, 15),
                activeIcon   = new google.maps.MarkerImage('/images/mapMarkerDotActive.png', null, null, origin, scaledSize),
                inactiveIcon = new google.maps.MarkerImage('/images/mapMarkerDot.png', null, null, origin, scaledSize),
                markers      = [];

            google.maps.event.addListener(map, 'zoom_changed', function() {
                layer.setOptions({
                    clickable: (map.getZoom() >= clickableZoomLevel)
                });
            });

            var selectBuilding = function(building) {
                collection.trigger("select", building);
            };

            var addBuilding = function(building, silent) {
                var loc = building.get("location");

                var marker = new google.maps.Marker({
                    icon: inactiveIcon,
                    position: new google.maps.LatLng(loc.lat, loc.lng),
                    map: map
                });

                markers.push(marker);

                building.on("deselect", function() {
                    marker.setIcon(inactiveIcon);
                });

                building.on("selected", function() {
                    marker.setIcon(activeIcon);
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    selectBuilding(building);
                });

                building.on("destroy", function() {
                    marker.setMap(null);
                    markers = _.without(markers, marker);
                });

            };

            collection.on("add", addBuilding);

            collection.each(addBuilding);

            _.each(collection.where({selected: true}), function(it) {
                selectBuilding(it);
            });

            google.maps.event.addListener(layer, 'click', function(event) {
                var byggid = event.row.ByggID.value;
                var findByByggId = function(it) { return it.get("byggid") == byggid; };

                var building = collection.find(findByByggId);

                if (building === null || typeof building === 'undefined') {
                    building = new Building({
                        byggid: byggid,
                        averageRadiation: event.row.AvActKWHm2.value,
                        roofArea: event.row.area.value,
                        location: {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng()
                        }
                    });
                    collection.add(building);
                    selectBuilding(building);
                }
                
                return false;
            });

            return layer;
    };

});