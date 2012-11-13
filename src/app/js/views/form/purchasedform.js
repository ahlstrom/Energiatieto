define([
    "backbone.marionette",
    "hbs!./purchasedform.tmpl",
    "../../helpers/helptextvent",
    "text!../helptexts/purchased.txt"
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
