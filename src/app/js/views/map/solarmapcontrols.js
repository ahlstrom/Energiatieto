define([
    "backbone.marionette",
    "hbs!./solarmapcontrols.tmpl"
    ], 
    function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            events: {
                "click .btn"        : "clickBtn"
            },
            clickBtn: function(event) {
                var btn = this.$(".btn");
                if (btn.hasClass("btn-inverse")) {
                    btn.removeClass("btn-inverse");
                    this.trigger("activate");
                } else {
                    btn.addClass("btn-inverse");
                    this.trigger("deactivate");
                }
            },
            onShow: function() {
                this.delegateEvents();
            },
            template: {
                template: tmpl,
                type: 'handlebars'
            },
            setText: function(text) {
                this.$(".text").text(text);
            }
        });
});