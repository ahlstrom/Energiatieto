define([
        "backbone.marionette",
        "../helpers/helptextvent",
        "hbs!./helptext.tmpl"
    ],
    function(Marionette, HelpTextVent, tmpl) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            },
            modelEvents: {
                "change": "render"
            },
            initialize: function() {
                var self = this;
                this.bindTo(HelpTextVent, "change", function(text) {
                    self.model.set({
                        text: text
                    });
                });
            }
        });
});