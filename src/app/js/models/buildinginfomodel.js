if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["backbone", "underscore", "../algorithm/facade"], function(Backbone, _, Algorithm) {
    return Backbone.Model.extend({
        defaults: {
            // init with a 12-item array that contains zeroes
            data: _.map(_.range(12), function() { return 0; })
        },
        initialize: function() {
            _.bindAll(this);
            this.on("change", this.modelChanged);
        },
        modelChanged: function() {
            if(!this.hasChanged("data")) {
                var data = new Algorithm(this.attributes).calculate();
                this.set({
                    data: data
                });
            }
        }
    });
});