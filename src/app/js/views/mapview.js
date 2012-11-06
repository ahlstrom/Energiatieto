define([
        "backbone.marionette", 
        "hbs!./mapview.tmpl",
        "../helpers/googlemaps",
        "../models/building"
    ], function(Marionette, tmpl, GoogleMaps, Building) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            },
            onShow: function() {
                var self = this;
                GoogleMaps.create(function() {
                    var map = new google.maps.Map(self.$('.map')[0], {
                        zoom: 11,
                        center: new google.maps.LatLng(60.2, 24.7),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        streetViewControl: false
                    });

                    var layer = new google.maps.FusionTablesLayer({
                        query: {
                            select: 'col10',
                            from: '1A3CXe08s00bb9SgIzCnmXWz61yAOHWIkcdpzOa0'
                        },
                        suppressInfoWindows: true
                    });

                    google.maps.event.addListener(layer, 'click', function(event) {
                        new google.maps.Geocoder().geocode({
                                latLng: event.latLng
                            },
                            function(res, status) {
                                var building = new Building({
                                    byggid: event.row.ByggID.value,
                                    averageRadiation: event.row.AvActKWHm2.value,
                                    roofArea: event.row.ActualArea.value,
                                    address: res[0]
                                });

                                if (!self.collection.any(function(it) { return it.get("byggid") == building.get("byggid"); })) {

                                    map.panTo(event.latLng);
                                    map.setZoom(17);

                                    var marker = new google.maps.Marker({
                                        position: event.latLng,
                                        animation: google.maps.Animation.DROP,
                                        map: map
                                    });
                                    google.maps.event.addListener(marker, 'click', function(event) {
                                        building.destroy();
                                    });

                                    building.on("destroy", function() {
                                        marker.setMap(null);
                                    });
                                    self.collection.add(building);
                                }
                            });
                        
                        return false;
                    });

                    layer.setMap(map);
                });
            }
        });
});