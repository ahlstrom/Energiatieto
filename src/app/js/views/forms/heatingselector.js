define([
    "backbone.marionette", 
    "hbs!./heatingselector.tmpl",
    "backbone.modelbinder",
    "./woodheating",
    "./electricheating"
    ],
    function(Marionette, tmpl, ModelBinder, WoodHeating, ElectricHeating) {

        return Marionette.Layout.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            },
            regions: {
                subview: '.sub-view'
            },
            modelEvents: {
                "change:heating": "showSubviews"
            },
            showSubviews: function() {
                 if (this.model.get("heating")) {
                    this.subview.show(new WoodHeating({
                        model: this.model
                    }));
                 } else {
                    this.subview.show(new ElectricHeating({
                        model: this.model
                    }));
                 }
            },
            initialize: function(options) {
                this.modelBinder = new ModelBinder();
            },
            onShow: function() {
                this.modelBinder.bind(this.model, this.el);
                this.showSubviews();
            },
            onClose: function() {
                this.modelBinder.unbind();
            }
        });

});
