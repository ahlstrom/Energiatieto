define([
    "underscore",
    "./markerstore",
    "./solarmaptype",
    "./geoenergymaptype",
    "./solarmapcontrols",
    "./energylayermodeselector",
    "../../models/solarpanel",
    "../../models/geothermalwell"
    ], function(
        _,
        MarkerStore,
        SolarMapType,
        GeoEnergyMapType,
        SolarMapControls,
        EnergyLayerModeSelector,
        SolarPanel,
        GeoThermalWell) {

        return function(map, collection, buildingLayer) {
            var self = this;

            var geoEnergyOverlay = new GeoEnergyMapType(map);

            this.modeselector = new EnergyLayerModeSelector();
            this.controls = new SolarMapControls();
            this.markerStore = new MarkerStore();

            this.controls.on("deactivate", function() {
                google.maps.event.removeListener(self.listener);
            });

            this.onclick = function() {};

            this.clickHandler = function() {
                self.onclick.apply(self, arguments);
            };

            this.activate = function() {
                collection.on("reset", self.initMarkers);
                self.markerStore.associateWith(map);
                collection.on("add", self.addMarker);

                this.initMarkers();
            };

            this.deactivate = function() {
                google.maps.event.removeListener(self.listener);
                buildingLayer.setOptions({
                    clickable: true
                });
                self.markerStore.disassociate();
                collection.off("reset", self.initMarkers);
                collection.off("add", self.addMarker);
            };

            this.initMarkers = function() {
                self.markerStore.clear();
                collection.each(self.addMarker);
            };

            this.addMarker = function(producer) {
                var loc = producer.get("loc"),
                    marker = self.markerStore.create({
                        position: new google.maps.LatLng(loc.lat, loc.lng),
                        map: map,
                        iconBaseUrl: producer.get("iconBaseUrl")
                });

                marker.onclick(function() {
                    collection.trigger("select", producer);
                });

                producer.on("deselect", marker.deactivate);
                producer.on("selected", marker.activate);
                producer.on("destroy", marker.remove);

                if (producer.get("___selected")) {
                    marker.activate();
                }
            };

            this.addSolarPanel = function(event) {
                var loc = event.latLng,
                    panel = new SolarPanel({
                            averageRadiation: event.row.AvActKWHm2.value,
                            loc: {
                                lat: loc.lat(),
                                lng: loc.lng()
                            }
                        });

                collection.add(panel);
                collection.trigger("select", panel);
            };

            this.selectSolar = function() {
                self.replaceOverlay(new SolarMapType(map));

                self.activate();
                self.onclick = self.addSolarPanel;
                self.controls.off("activate");
                self.controls.on("activate", function() {
                    self.listener = google.maps.event.addListener(buildingLayer, 'click', self.clickHandler);
                });
                buildingLayer.setOptions({
                    clickable: true
                });
                self.controls.setText("Aurinkokeräin");
            };

            this.replaceOverlay = function(overlayType) {
                map.overlayMapTypes.clear();
                map.overlayMapTypes.push(overlayType);
            };

            this.addGeoThermalWell = function(event) {
                geoEnergyOverlay.getData(event.latLng, function(data) {
                    var loc = event.latLng,
                        well = new GeoThermalWell({
                                loc: {
                                    lat: loc.lat(),
                                    lng: loc.lng()
                                }
                            });
                        if (data.type) {
                            well.set({
                                "bedrockType": data.type,
                                "bedrockTypeId": data.typeid
                            });
                        }

                    collection.add(well);
                    collection.trigger("select", well);
                });
            };

            this.selectGeoEnergy = function() {
                self.replaceOverlay(geoEnergyOverlay);

                buildingLayer.setOptions({
                    clickable: false
                });
                self.activate();
                self.onclick = self.addGeoThermalWell;
                self.controls.off("activate");
                self.controls.on("activate", function() {
                    self.listener = google.maps.event.addListener(map, 'click', self.clickHandler);
                });
                self.controls.setText("Lämpökaivo");
            };

            this.modeselector.on("solar", this.selectSolar);
            this.modeselector.on("geoenergy", this.selectGeoEnergy);

            _.bindAll(this);
        };
});