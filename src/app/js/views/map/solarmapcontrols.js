define([
    "backbone.marionette",
    "hbs!./solarmapcontrols.tmpl"
    ], 
    function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            triggers: {
                "click .solar"      : "select:solar",
                "click .geoenergy"  : "select:geoenergy"
            },
            events: {
                "click .btn"        : "clickBtn"
            },
            clickBtn: function(event) {
                if (!$(event.target).hasClass("btn-inverse")) {
                    $(event.target).addClass("btn-inverse");
                } else {
                    this.$(".btn").addClass("btn-inverse");
                    $(event.target).removeClass("btn-inverse");
                }
            },
            onShow: function() {
                this.delegateEvents();
            },
            template: {
                template: tmpl,
                type: 'handlebars'
            }
        });
});