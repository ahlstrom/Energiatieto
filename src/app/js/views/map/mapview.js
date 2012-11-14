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
            initialize: function() {
                _.bindAll(this);
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
            createMap: function() {
                var map = this.map = new google.maps.Map(this.$('.map')[0], MapStyles.options());
                this.bindTo(this, "search", function(address) {
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

                this.model.fetch({
                    success: function(model) {
                        if (model.has("center")) {
                            var center = model.get("center");
                            map.setCenter(new google.maps.LatLng(center.lat, center.lng));
                        }
                        if (model.has("zoom")) {
                            map.setZoom(model.get("zoom"));
                        }
                    }
                });

                var buildingLayer = new BuildingLayer(map, this.collection);
                var solarMapType = new SolarMapType(map);
                this.controls = {
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
                var self = this;

                google.maps.event.addListener(map, 'center_changed', function() {
                    var center = map.getCenter();
                    self.model.set({
                        center: {
                            lat: center.lat(),
                            lng: center.lng()
                        }
                    });                    
                });
                google.maps.event.addListener(map, 'zoom_changed', function() {
                    self.model.set({
                        zoom: map.getZoom()
                    });
                });

            },
            onShow: function() {
                GoogleMaps.create(this.createMap);
            }
        });
});