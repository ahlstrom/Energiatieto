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
            onShow: function() {
                var self = this;
                GoogleMaps.create(function() {
                    var map = new google.maps.Map(self.$('.map')[0], MapStyles.options());

                    var buildingLayer = new BuildingLayer(map, self.collection);
                    var solarMapType = new SolarMapType(map);

                    var controls = new MapSwitchControls([
                        {
                            title: 'Geoenergia',
                            onSelect: function() {
                                map.overlayMapTypes.clear();
                                map.overlayMapTypes.push(new GeoEnergyMapType(map));
                                buildingLayer.setOpaque(true);
                            }
                        },
                        {
                            title: 'Aurinkoenergia',
                            onSelect: function() {
                                map.overlayMapTypes.clear();
                                map.overlayMapTypes.push(solarMapType);
                                buildingLayer.setOpaque(true);
                            }
                        },
                        {
                            title: 'Rakennukset',
                            onSelect: function() {
                                buildingLayer.setOpaque(false);
                                map.overlayMapTypes.clear();
                            }
                        }
                    ]);

                    buildingLayer.setMap(map);
                    controls.select('Rakennukset');

                    var topRightControls = map.controls[google.maps.ControlPosition.TOP_RIGHT];

                    _.each(controls.renderElements(), function(it) {
                        topRightControls.push(it);
                    });
                });
            }
        });
});