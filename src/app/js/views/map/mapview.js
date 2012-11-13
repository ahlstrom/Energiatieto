define([
        "underscore",
        "backbone.marionette", 
        "hbs!./mapview.tmpl",
        "../../helpers/googlemaps",
        "./mapstyles",
        "./mapswitchcontrols",
        "./buildinglayer",
        "./solarmaptype",
        "./geoenergymaptype"
    ], function(_, Marionette, tmpl, GoogleMaps, MapStyles, MapSwitchControls, BuildingLayer, SolarMapType, GeoEnergyMapType) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            },
            events: {
                "submit form.search": "submitSearchForm"
            },
            submitSearchForm: function(event) {
                this.trigger("search", this.$("input[name=search]").val());
                return false;
            },
            showOnlyBuildingLayer: function() {
                this.controls.buildings.onSelect();
                this.setControls([]);
            },
            showSolarAndGeoEnergy: function() {
                var self = this;
                this.setControls([
                        self.controls.geoenergy,
                        self.controls.solar
                    ],
                    self.controls.solar.title);
            },
            setControls: function(controlList, select) {
                var topRightControls = this.map.controls[google.maps.ControlPosition.TOP_RIGHT];

                topRightControls.clear();
                var controls = new MapSwitchControls(controlList);

                _.each(controls.renderElements(), function(it) {
                    topRightControls.push(it);
                });
                if (select) {
                    controls.select(select);
                }
            },
            onShow: function() {
                var self = this;
                GoogleMaps.create(function() {
                    var map = self.map = new google.maps.Map(self.$('.map')[0], MapStyles.options());
                    self.bindTo(self, "search", function(address) {
                        new google.maps.Geocoder().geocode({
                                address: address,
                                bounds: map.getBounds()
                            },
                            function(res, status) {
                                if (status === "OK") {
                                    map.panTo(res[0].geometry.location);
                                    map.setZoom(MapStyles.options().maxZoom);
                                }
                            });
                    });

                    var buildingLayer = new BuildingLayer(map, self.collection);
                    var solarMapType = new SolarMapType(map);
                    self.controls = {
                        geoenergy: {
                            title: 'Geoenergia',
                            onSelect: function() {
                                map.overlayMapTypes.clear();
                                map.overlayMapTypes.push(new GeoEnergyMapType(map));
                                buildingLayer.setOpaque(true);
                            }
                        },
                        solar: {
                            title: 'Aurinkoenergia',
                            onSelect: function() {
                                map.overlayMapTypes.clear();
                                map.overlayMapTypes.push(solarMapType);
                                buildingLayer.setOpaque(true);
                            }
                        },
                        buildings: {
                            title: 'Rakennukset',
                            onSelect: function() {
                                buildingLayer.setOpaque(false);
                                map.overlayMapTypes.clear();
                            }
                        }
                    };

                    buildingLayer.setMap(map);
                });
            }
        });
});