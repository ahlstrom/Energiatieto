define([
    "backbone.marionette", 
    "hbs!./controlformview.tmpl",
    'backbone.modelbinder'
    ], function(Marionette, tmpl, ModelBinder) {
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
            triggers: {
                "click .delete": "delete"
            },
            initialize: function(options) {
                this.modelBinder = new ModelBinder();
            },
            onShow: function() {
                var bindings = ModelBinder.createDefaultBindings(this.el, 'name');
                bindings.averageRadiation.converter = bindings.roofArea.converter = roundValueConverter;
                bindings.address.converter = function(direction, value) {
                    return value.formatted_address;
                };
                this.modelBinder.bind(this.model, this.el, bindings);
            },
            onClose: function() {
                this.modelBinder.unbind();
            }
        });
});
