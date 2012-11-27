define([
    "underscore",
    "./mapstyles",
    "../../models/buildinginfomodel",
    "./buildinglayercontrols",
    "./markerstore"
    ], function(_, MapStyles, Building, BuildingLayerControls, MarkerStore) {

        var clickableZoomLevel = 16;

        return function(map, collection) {

            var layer = new google.maps.FusionTablesLayer({
                query: {
                    select: 'col10',
                    from: '1-IZOhHD0En2LK-l8I9GXUztwCTr24_GJ70irCpQ'
                },
                clickable: (map.getZoom() >= clickableZoomLevel),
                suppressInfoWindows: true,
                styles: MapStyles.buildingsLayer
            });

            layer.eventlisteners = [];
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
            };

            layer.deactivate = function() {
                layer.setOpaque(true);
                layer.markerStore.disassociate();

                layer.deactivateClickHandlers();
            };

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

                if (building.get("___selected")) {
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

            var newBuilding = function(opts) {
                var building = new Building({
                    byggid: opts.byggid,
                    averageRadiation: opts.averageRadiation,
                    roofArea: opts.roofArea,
                    location: opts.location
                });
                collection.add(building);
                selectBuilding(building);
            };

            layer.activateClickHandlers = function() {
                var buildingCreateClickHandler = function(event) {
                    if (event.row) {
                        // user clicked on a building
                        var byggid = event.row.ByggID.value;
                        var findByByggId = function(it) { return it.get("byggid") == byggid; };

                        var building = collection.find(findByByggId);

                        if (building === null || typeof building === 'undefined') {
                            newBuilding({
                                byggid: byggid,
                                averageRadiation: event.row.AvActKWHm2.value,
                                roofArea: event.row.area.value,
                                location: {
                                    lat: event.latLng.lat(),
                                    lng: event.latLng.lng()
                                }
                            });
                        }
                    } else {
                        // user clicked directly on map
                        newBuilding({
                            averageRadiation: 0,
                            roofArea: 0,
                            location: {
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng()
                            }
                        });
                    }
                    
                    return false;
                };

                layer.eventlisteners.push(google.maps.event.addListener(map, 'click', buildingCreateClickHandler));
                layer.eventlisteners.push(google.maps.event.addListener(layer, 'click', buildingCreateClickHandler));
            };
            layer.deactivateClickHandlers = function() {
                _.each(layer.eventlisteners, google.maps.event.removeListener);
                layer.eventlisteners = [];
            };

            layer.controls = new BuildingLayerControls({});

            layer.controls.on("activate", layer.activateClickHandlers);
            layer.controls.on("deactivate", layer.deactivateClickHandlers);

            return layer;
    };

});