define([
    "backbone.marionette",
    "hbs!./solarmapcontrols.tmpl"
    ], 
    function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            triggers: {
                "click .solar:not(.active)"      : "select:solar",
                "click .geoenergy:not(.active)"  : "select:geoenergy",
                "click .active"     : "deactivate"
            },
            events: {
                "click .btn"        : "clickBtn"
            },
            clickBtn: function(event) {
                if (!$(event.target).hasClass("btn-inverse")) {
                    $(event.target).addClass("btn-inverse");
                    $(event.target).removeClass("active");
                } else {
                    this.$(".btn").addClass("btn-inverse");
                    $(event.target).removeClass("btn-inverse");
                    $(event.target).addClass("active");
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