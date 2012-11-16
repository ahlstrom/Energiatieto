define([
    "./mapstyles",
    "../../models/buildinginfomodel",
    "./buildinglayercontrols",
    "./markerstore"
    ], function(MapStyles, Building, BuildingLayerControls, MarkerStore) {

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

            layer.markerStore = new MarkerStore();


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
                layer.markerStore.associateWith(map);

                layer.activateClickHandler();
            };

            layer.deactivate = function() {
                layer.setOpaque(true);
                layer.markerStore.disassociate();

                google.maps.event.removeListener(layer.eventlistener);
            };

            layer.controls = new BuildingLayerControls({
                
            });

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

                var marker = layer.markerStore.create({
                    position: new google.maps.LatLng(loc.lat, loc.lng),
                    map: map
                });

                marker.onclick(_.bind(selectBuilding, this, building));
                building.on("deselect", marker.deactivate);
                building.on("selected", marker.activate);
                building.on("destroy", marker.remove);

                if (building.get("selected")) {
                    marker.activate();
                }

            };

            var initMarkers = function() {
                layer.markerStore.clear();

                collection.each(addBuilding);
            };

            collection.on("add", addBuilding);
            collection.on("reset", initMarkers);


            initMarkers();

            layer.activateClickHandler = function() {
                layer.eventlistener = google.maps.event.addListener(layer, 'click', function(event) {
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
            };

            return layer;
    };

});