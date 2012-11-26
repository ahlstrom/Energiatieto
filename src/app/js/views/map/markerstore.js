define(["underscore"], function(_) {

    return function() {

        var self = this,
            scaledSize = new google.maps.Size(30, 30),
            origin     = new google.maps.Point(15, 15),
            icons      = {
                "default": {
                    active   : new google.maps.MarkerImage('/images/mapMarkerDotActive.png', null, null, origin, scaledSize),
                    inactive : new google.maps.MarkerImage('/images/mapMarkerDot.png', null, null, origin, scaledSize)
                }

        };

        this.associateWith = function(map) {
            _.each(self.markers, function(it) {
                it.setMap(map);
            });
        };

        this.disassociate = function() {
            _.each(self.markers, function(it) {
                it.setMap(null);
            });
        };

        this.clear = function() {
            _.each(self.markers, function(it) {
                it.setMap(null);
            });
            self.markers = [];
        };

        this.create = function(markerData) {
            var existingMarker = 
                _.find(self.markers, function(it) {
                    return it.position === markerData.position;
                }),
                iconType = "default";

            if(existingMarker) {
                return existingMarker;
            };
            if (markerData && markerData.iconBaseUrl) {
                iconType = markerData.iconBaseUrl;
            };
            if (!icons[iconType]) {                
                icons[iconType] = {
                    active: new google.maps.MarkerImage(iconType + 'Active.png', null, null, origin, scaledSize),
                    inactive: new google.maps.MarkerImage(iconType + '.png', null, null, origin, scaledSize)
                }
            };

            var marker = new google.maps.Marker(_.extend(markerData, {
                iconType: icons[iconType],
                icon: icons[iconType].inactive
            }));

            marker.remove = function() {
                marker.setMap(null);
                self.markers = _.without(self.markers, marker);
            };

            marker.activate = function() {
                marker.setIcon(icons[iconType].active);
            };

            marker.deactivate = function() {
                marker.setIcon(icons[iconType].inactive);
            };

            marker.onclick = function(callback) {
                google.maps.event.addListener(marker, 'click', callback);
            };

            self.markers.push(marker);

            return marker;
        };

        this.clear();
    };
});