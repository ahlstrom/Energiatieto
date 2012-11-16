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
                collection.each(self.addMarker);
            };

            this.markerFilter = function() { return true; };

            this.addMarker = function(producer) {
                var loc = producer.get("loc");
                var marker = self.markerStore.create({
                    position: new google.maps.LatLng(loc.lat, loc.lng),
                    map: map
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
                var loc = event.latLng;

                collection.add(new SolarPanel({
                    averageRadiation: event.row.AvActKWHm2.value,
                    loc: {
                        lat: loc.lat(),
                        lng: loc.lng()
                    }
                }));
            };

            this.selectSolar = function() {
                self.replaceOverlay(new SolarMapType(map));
                self.listener = google.maps.event.addListener(buildingLayer, 'click', self.clickHandler);

                self.onclick = self.addSolarPanel;
                self.markerFilter = function(it) {
                    return it.get('type') === 'solarpanel';
                };
                self.activate();
            };

            this.replaceOverlay = function(overlayType) {
                self.deactivate();
                map.overlayMapTypes.clear();
                map.overlayMapTypes.push(overlayType);
            };

            this.addGeoThermalWell = function(event) {
                var loc = event.latLng;

                collection.add(new GeoThermalWell({
                    loc: {
                        lat: loc.lat(),
                        lng: loc.lng()
                    }
                }));
            };

            this.selectGeoEnergy = function() {
                self.replaceOverlay(new GeoEnergyMapType(map));

                self.onclick = self.addGeoThermalWell;

                self.listener = google.maps.event.addListener(map, 'click', self.clickHandler);
                buildingLayer.setOptions({
                    clickable: false
                });
                self.markerFilter = function(it) {
                    return it.get('type') === 'geothermal';
                };
                self.activate();
            };

            this.controls.on("select:solar", this.selectSolar);
            this.controls.on("select:geoenergy", this.selectGeoEnergy);

            _.bindAll(this);
        };
});