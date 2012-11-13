define([
    "backbone.marionette",
    "hbs!./purchasedform.tmpl"
    ], function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            }
        });
});
