define([
        "backbone.marionette", 
        "hbs!./mapview.tmpl",
        "../helpers/googlemaps",
        "../models/buildinginfomodel"
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
                                var byggid = event.row.ByggID.value;
                                var findByByggId = function(it) { return it.get("byggid") == byggid; };

                                var building = self.collection.find(findByByggId);

                                if (building === null || typeof building === 'undefined') {
                                    building = new Building({
                                        byggid: byggid,
                                        averageRadiation: event.row.AvActKWHm2.value,
                                        roofArea: event.row.ActualArea.value,
                                        address: res[0],
                                        location: event.latLng
                                    });

                                    var marker = new google.maps.Marker({
                                        position: event.latLng,
                                        animation: google.maps.Animation.DROP,
                                        map: map
                                    });

                                    var selectBuilding = function() {
                                        self.collection.trigger("select", building);

                                        map.panTo(building.get("location"));
                                        map.setZoom(17);
                                    };
                                    
                                    google.maps.event.addListener(marker, 'click', selectBuilding);

                                    building.on("destroy", function() {
                                        marker.setMap(null);
                                    });

                                    self.collection.add(building);

                                    selectBuilding();
                                }

                            });
                        
                        return false;
                    });

                    layer.setMap(map);
                });
            }
        });
});