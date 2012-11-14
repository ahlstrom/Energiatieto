if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["backbone", "backbone.localstorage"], function(Backbone) {
    return Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage("map-position"),
        initialize: function() {
            _.bindAll(this);
            var self = this;
            this.on("change", function() {
                self.save();
            });
        }
    });
});