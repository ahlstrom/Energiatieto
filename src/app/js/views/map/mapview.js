define([
        "underscore",
        "jquery",
        "backbone.marionette", 
        "hbs!./mapview.tmpl",
        "../../helpers/googlemaps",
        "./mapstyles",
        "./mapswitchcontrols",
        "./buildinglayer",
        "./energylayer",
        "./solarmaptype",
        "./geoenergymaptype"
    ], function(_, $, Marionette, tmpl, GoogleMaps, MapStyles, MapSwitchControls, BuildingLayer, EnergyLayer, SolarMapType, GeoEnergyMapType) {
        return Marionette.Layout.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            },
            events: {
                "submit form.search": "submitSearchForm"
            },
            regions: {
                controls: ".controls"
            },
            layers: {
            },
            submitSearchForm: function(event) {
                this.trigger("search", this.$("input[name=search]").val());
                return false;
            },
            activate: function(layer) {
                this.clear();
                if (typeof layer.activate === "function") {
                    layer.activate();
                }
                if (typeof layer.controls !== "undefined") {
                    this.controls.show(layer.controls);
                }
            },
            showOnlyBuildingLayer: function() {
                this.activate(this.layers.building);
            },
            clear: function() {
                this.controls.close();
                this.map.overlayMapTypes.clear();
                _.each(_.values(this.layers), function(it) {
                    if (typeof it.deactivate === "function") {
                        it.deactivate();
                    }
                });
            },
            showSolarAndGeoEnergy: function() {
                this.activate(this.layers.energy);
            },
            initialize: function() {
                _.bindAll(this);
                var self = this;
                GoogleMaps.create(function() {
                    self.createMap();
                    self.layers = self.newLayers();
                    self.showOnlyBuildingLayer();
                });
            },
            newLayers: function() {
                return {
                    building    : new BuildingLayer(this.map, this.collection),
                    energy      : new EnergyLayer(this.map),
                    solar       : new SolarMapType(this.map),
                    geoenergy   : new GeoEnergyMapType(this.map)
                };
            },
            createMap: function() {
                var self = this;
                this.map = new google.maps.Map($("<div style='width: 400px; height: 300px;'/>")[0], MapStyles.options());
                this.bindTo(this, "search", function(address) {
                    new google.maps.Geocoder().geocode({
                            address: address,
                            bounds: self.map.getBounds()
                        },
                        function(res, status) {
                            if (status === "OK") {
                                self.map.panTo(res[0].geometry.location);
                                self.map.setZoom(MapStyles.options().maxZoom);
                            }
                        });
                });

                this.model.fetch({
                    success: function(model) {
                        if (model.has("center")) {
                            var center = model.get("center");
                            self.map.setCenter(new google.maps.LatLng(center.lat, center.lng));
                        }
                        if (model.has("zoom")) {
                            self.map.setZoom(model.get("zoom"));
                        }
                    }
                });

                google.maps.event.addListener(this.map, 'center_changed', function() {
                    var center = self.map.getCenter();
                    self.model.set({
                        center: {
                            lat: center.lat(),
                            lng: center.lng()
                        }
                    });                    
                });
                google.maps.event.addListener(this.map, 'zoom_changed', function() {
                    self.model.set({
                        zoom: self.map.getZoom()
                    });
                });

            },
            onShow: function() {
                var self = this;
                GoogleMaps.create(function() {
                    self.$(".map").append(self.map.getDiv());
                });
            },
            onHide: function() {
                self.$(".map").children().detach();
            }
        });
});