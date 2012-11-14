define([
    "./solarmaptype",
    "./geoenergymaptype",
    "./solarmapcontrols"
    ], function(SolarMapType, GeoEnergyMapType, SolarMapControls) {
        return function(map) {
            this.controls = new SolarMapControls();

            this.activate = function() {
                this.selectSolar();
            };

            this.selectSolar = function() {
                map.overlayMapTypes.clear();
                map.overlayMapTypes.push(new SolarMapType(map));
            };

            this.selectGeoEnergy = function() {
                map.overlayMapTypes.clear();
                map.overlayMapTypes.push(new GeoEnergyMapType(map));
            };

            this.controls.on("select:solar", this.selectSolar);
            this.controls.on("select:geoenergy", this.selectGeoEnergy);
        };
});