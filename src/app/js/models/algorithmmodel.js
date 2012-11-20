if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["backbone", "../algorithm/facade", "../algorithm/profiles"], function(Backbone, algorithm, Profiles) {
    return Backbone.Model.extend({
        defaults: {
            // init with a 12-item array that contains zeroes
            data: algorithm.empty
        },
        initialize: function() {
            _.bindAll(this);
            this.on("change", this.modelChanged);
        },
        setData: function(res) {
            this.set({
                data: res
            });
        },
        modelChanged: function() {
            if(!this.hasChanged("data")) {
                algorithm.calculate(this.attributes, this.setData, Profiles);
            }
        }
    });
});