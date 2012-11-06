define([
    "backbone.marionette", 
    "hbs!./widgetconfabulator.tmpl"
    ],
    function(Marionette, tmpl) {

        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            }
        });
        
});
