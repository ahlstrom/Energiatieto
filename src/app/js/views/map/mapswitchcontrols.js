define([
        "underscore",
        "backbone",
        "backbone.marionette",
        "hbs!./mapswitchcontrols.tmpl"
    ], function(_, Backbone, Marionette, tmpl) {
    var MapControl = Marionette.ItemView.extend({
        template: {
            template: tmpl,
            type: "handlebars"
        },
        triggers: {
            "click" : "select"
        },
        templateHelpers: {
            className: function() {
                return "control" + (this.selected ? " selected" : "");
            }
        },
        select: function() {
            this.model.set({
                selected: true
            });
            this.render();
            this.model.get("onSelect")();
        },
        deselect: function() {
            this.model.set({
                selected: false
            });
            this.render();
        },
        initialize: function(options) {
            _.bindAll(this);
            this.model = new Backbone.Model(options);
        }
    });

    return function(controls) {
        var elements = _.map(controls, function(it) {
            return new MapControl(it);
        });
        _.each(elements, function(it) {
            it.on("select", function() {
                _.each(elements, function(el) {
                    el.deselect();
                });
                it.select();
            });
        });

        this.select = function(byTitle) {
            _.find(elements, function(it) { return it.model.get("title") === byTitle; }).select();
        };

        this.renderElements = function() {
            return elements.map(function(it) { return it.render().el; });
        };
    };
});