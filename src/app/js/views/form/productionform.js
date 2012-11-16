define([
    "backbone.marionette",
    "hbs!./productionform.tmpl",
    "../../helpers/helptextvent",
    "text!../helptexts/production.txt"
    ], function(Marionette, tmpl, HelpTextVent, HelpText) {
        return Marionette.ItemView.extend({
            templateHelpers: {
                typeName: function() {
                    if (this.type === "solarpanel") {
                        return "Aurinkopaneeli";
                    } else {
                        return "Maalämpökaivo";
                    }
                }
            },
            events: {
                "click .delete": "destroyModel"
            },
            destroyModel: function() {
                this.model.destroy();
            },
            template: {
                template: tmpl,
                type: "handlebars"
            },
            onShow: function() {
                HelpTextVent.trigger("change", HelpText);
            }
        });
});
