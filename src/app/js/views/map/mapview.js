define([
        "underscore",
        "backbone.marionette", 
        "hbs!./mapview.tmpl",
        "../../helpers/googlemaps",
        "./mapstyles",
        "./mapswitchcontrols",
        "./buildinglayer",
        "./solarmaptype"
    ], function(_, Marionette, tmpl, GoogleMaps, MapStyles, MapSwitchControls, BuildingLayer, SolarMapType) {
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
                            title: 'Aurinkoenergia',
                            onSelect: function() {
                                map.overlayMapTypes.push(solarMapType);
                                buildingLayer.setMap(null);
                            }
                        },
                        {
                            title: 'Rakennukset',
                            onSelect: function() {
                                buildingLayer.setMap(map);
                                map.overlayMapTypes.clear();
                            }
                        }
                    ]);

                    controls.select('Rakennukset');

                    var topRightControls = map.controls[google.maps.ControlPosition.TOP_RIGHT];

                    _.each(controls.renderElements(), function(it) {
                        topRightControls.push(it);
                    });
                });
            }
        });
});