define([
    "backbone.marionette",
    "hbs!./energylayermodeselector.tmpl"
    ], 
    function(Marionette, tmpl) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            },
            events: {
                "click .solar": "solar",
                "click .geoenergy": "geoenergy"
            },
            solar: function() {
                this.$(".geoenergy").addClass("btn-inverse");
                this.$(".solar").removeClass("btn-inverse");
                this.trigger("solar");
            },
            onShow: function() {
                this.delegateEvents();
            },
            geoenergy: function() {
                this.$(".solar").addClass("btn-inverse");
                this.$(".geoenergy").removeClass("btn-inverse");
                this.trigger("geoenergy");
            }
        });
    }
);