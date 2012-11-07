define([
    "backbone.marionette", 
    "hbs!./controlformview.tmpl",
    "backbone.modelbinder",
    "./forms/heatingselector",
    "./forms/widgetconfabulator"
    ], function(Marionette, tmpl, ModelBinder, HeatingSelector, WidgetConfabulator) {
        var roundValueConverter = function(direction, value) {
            var result = Math.round(value);
            if (isNaN(result)) {
                return null;
            } else {
                return result;
            }
        };

        return Marionette.Layout.extend({
            template: {
                type: 'handlebars',
                template: tmpl
            },
            modelEvents: {
                "change:dropdown": "dropdownChanged"
            },
            regions: {
                "subview": ".sub-view"
            },
            initialize: function(options) {
                this.modelBinder = new ModelBinder();
            },
            onShow: function() {
                var bindings = ModelBinder.createDefaultBindings(this.el, 'name');
                bindings.averageRadiation.converter = bindings.roofArea.converter = roundValueConverter;
                bindings.address.converter = function(direction, value) {
                    return value && value.formatted_address;
                };
                this.modelBinder.bind(this.model, this.el, bindings);
            },
            onClose: function() {
                this.modelBinder.unbind();
            },
            dropdownChanged: function() {
                switch(this.model.get("dropdown")) {
                    case "1":
                        this.subview.show(new HeatingSelector({
                            model: this.model
                        }));
                        break;
                    case "2":
                        this.subview.show(new WidgetConfabulator());
                        break;
                    default:
                        this.subview.reset();
                        break;
                }
            }
        });
});
