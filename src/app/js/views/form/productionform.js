define([
    "backbone.marionette",
    "hbs!./productionform.tmpl"
    ], function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            }
        });
});
