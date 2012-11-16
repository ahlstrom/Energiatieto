define(["underscore"], function(_) {
    return function() {

        var self = this,
            scaledSize   = new google.maps.Size(30, 30),
            origin       = new google.maps.Point(15, 15),
            activeIcon   = new google.maps.MarkerImage('/images/mapMarkerDotActive.png', null, null, origin, scaledSize),
            inactiveIcon = new google.maps.MarkerImage('/images/mapMarkerDot.png', null, null, origin, scaledSize);

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
            var marker = new google.maps.Marker(_.extend(markerData, {
                    icon: inactiveIcon
                }));

            marker.remove = function() {
                marker.setMap(null);
                self.markers = _.without(self.markers, marker);
            };

            marker.activate = function() {
                marker.setIcon(activeIcon);
            };

            marker.deactivate = function() {
                marker.setIcon(inactiveIcon);
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