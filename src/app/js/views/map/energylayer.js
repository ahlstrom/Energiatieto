define([
    "underscore",
    "./markerstore",
    "./solarmaptype",
    "./geoenergymaptype",
    "./solarmapcontrols",
    "../../models/solarpanel",
    "../../models/geothermalwell"
    ], function(
        _,
        MarkerStore,
        SolarMapType,
        GeoEnergyMapType,
        SolarMapControls,
        SolarPanel,
        GeoThermalWell) {

        return function(map, collection, buildingLayer) {
            var self = this;

            this.controls = new SolarMapControls();
            this.markerStore = new MarkerStore();

            this.controls.on("deactivate", function() {
                google.maps.event.removeListener(self.listener);
            });
            this.controls.on("select:solar", function() {
                self.listener = google.maps.event.addListener(buildingLayer, 'click', self.clickHandler);
                self.onclick = self.addSolarPanel;
            });
            this.controls.on("select:geoenergy", function() {
                self.listener = google.maps.event.addListener(map, 'click', self.clickHandler);
                self.onclick = self.addGeoThermalWell;
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
            };

            this.replaceOverlay = function(overlayType) {
                map.overlayMapTypes.clear();
                map.overlayMapTypes.push(overlayType);
            };

            this.addGeoThermalWell = function(event) {
                var loc = event.latLng,
                    well = new GeoThermalWell({
                            loc: {
                                lat: loc.lat(),
                                lng: loc.lng()
                            }
                        });

                collection.add(well);
                collection.trigger("select", well);
            };

            this.selectGeoEnergy = function() {
                self.replaceOverlay(new GeoEnergyMapType(map));

                buildingLayer.setOptions({
                    clickable: false
                });
                self.activate();
            };

            this.controls.on("select:solar", this.selectSolar);
            this.controls.on("select:geoenergy", this.selectGeoEnergy);

            _.bindAll(this);
        };
});