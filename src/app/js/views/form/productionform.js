define([
    "backbone.marionette",
    "hbs!./productionform.tmpl",
    "../../helpers/helptextvent",
    "text!../helptexts/production.txt"
    ], function(Marionette, tmpl, HelpTextVent, HelpText) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            },
            onShow: function() {
                HelpTextVent.trigger("change", HelpText);
            }
        });
});
