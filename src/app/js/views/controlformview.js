define([
    "underscore",
    "backbone.marionette", 
    "hbs!./controlformview.tmpl",
    "backbone.modelbinder"
    ], function(_, Marionette, tmpl, ModelBinder) {
        var roundValueConverter = function(direction, value) {
            var result = Math.round(value);
            if (isNaN(result)) {
                return null;
            } else {
                return result;
            }
        };

        return Marionette.ItemView.extend({
            template: {
                type: 'handlebars',
                template: tmpl
            },
            templateHelpers: {
                dropdownchoice1: function() {
                    return this.dropdown === "1";
                }
            },
            modelEvents: {
                "change": "modelChanged"
            },
            // re-renders the form if element bound to changed property has class ".re-render"
            modelChanged: function(model, event) {
                var self = this;
                _.each(_.keys(event.changes), function(it) {
                    var selector = ".re-render[name="+it+"]";
                    if (self.$(selector).length) {
                        self.render();
                        // re-select the element from the now changed form and focus on it
                        self.$(selector).each(function() { this.focus(); });
                    }
                });
            },
            initialize: function(options) {
                _.bindAll(this);
                this.modelBinder = new ModelBinder();
            },
            onRender: function() {
                var bindings = ModelBinder.createDefaultBindings(this.el, 'name');
                bindings.averageRadiation.converter = bindings.roofArea.converter = roundValueConverter;
                bindings.address.converter = function(direction, value) {
                    return value && value.formatted_address;
                };
                this.modelBinder.bind(this.model, this.el, bindings);
            },
            onClose: function() {
                this.modelBinder.unbind();
            }
        });
});
