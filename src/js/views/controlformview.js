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
                this.modelBinder.bind(this.model, this.el);
            }
        });
});
