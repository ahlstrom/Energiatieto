define([
    "backbone.marionette", 
    "hbs!./controlformview.tmpl",
    'backbone.modelbinder'
    ], function(Marionette, tmpl, ModelBinder) {
        return Marionette.ItemView.extend({
            template: {
                type: 'handlebars',
                template: tmpl
            },
            initialize: function(options) {
                this.modelBinder = new ModelBinder();
            },
            onRender: function() {
                this.modelBinder.bind(this.model, this.el, {
                    averageRadiation: {
                        selector: 'input[name=averageRadiation]',
                        converter: function(direction, value) {
                            return Math.round(value);
                        }
                    },
                    roofArea: {
                        selector: 'input[name=roofArea]',
                        converter: function(direction, value) {
                            return Math.round(value);
                        }
                    }
                });
            }
        });
});
