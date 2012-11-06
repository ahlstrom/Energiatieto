define([
    "backbone.marionette", 
    "hbs!./electricheating.tmpl"
    ],
    function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            }
        });
});