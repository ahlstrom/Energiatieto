if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["backbone", "../algorithm/facade"], function(Backbone, algorithm) {
    return Backbone.Model.extend({
        defaults: {
            // init with a 12-item array that contains zeroes
            data: algorithm.empty,
            peopleCount: 1
        },
        initialize: function() {
            _.bindAll(this);
            this.on("change", this.modelChanged);
        },
        modelChanged: function() {
            if(!this.hasChanged("data")) {
                var data = algorithm.calculate(this.attributes);
                this.set({
                    data: data
                });
            }
        }
    });
});