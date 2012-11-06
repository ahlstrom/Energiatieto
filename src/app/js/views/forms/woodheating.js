define([
    "backbone.marionette", 
    "hbs!./woodheating.tmpl"
    ],
    function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            }
        });
});