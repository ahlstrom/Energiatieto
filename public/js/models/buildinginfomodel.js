define(["backbone", "underscore"], function(Backbone, _) {
    return Backbone.Model.extend({
        defaults: {
            // init with a 12-item array that contains zeroes
            data: _.map(_.range(12), function() { return 0; })
        },
        initialize: function() {
            var max = 50;
            var points = 12;
            var self = this;
            setInterval(function() {
                var newData = [];
                for (var i = 0; i < points; i++) {
                    newData.push(Math.random() * max);
                }
                self.set({
                    data: newData
                });
            }, 2000);
        }
    });
});