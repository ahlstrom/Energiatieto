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
            initialize: function(options) {
                this.modelBinder = new ModelBinder();
            },
            onRender: function() {
                var bindings = ModelBinder.createDefaultBindings(this.el, 'name');
                bindings.averageRadiation.converter = bindings.roofArea.converter = roundValueConverter;
                this.modelBinder.bind(this.model, this.el, bindings);
            }
        });
});
