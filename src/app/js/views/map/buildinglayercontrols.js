define([
    "backbone.marionette",
    "hbs!./buildinglayercontrols.tmpl"
    ], 
    function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: 'handlebars'
            },
            events: {
                "click .btn": "click"
            },
            onShow: function() {
                this.delegateEvents();
            },
            click: function() {
                var btn = this.$(".btn");
                if (btn.hasClass("btn-inverse")) {
                    btn.removeClass("btn-inverse");
                    this.trigger("activate");
                } else {
                    btn.addClass("btn-inverse");
                    this.trigger("deactivate");
                }
            }
        });
});