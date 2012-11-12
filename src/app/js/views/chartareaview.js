define([
        "backbone.marionette", 
        "hbs!./chartareaview.tmpl",
        "./chartview",
        "../models/buildinginfomodel"
    ], function(Marionette, tmpl, ChartView, BuildingInfoModel) {

    return Marionette.Layout.extend({
        template: {
            type: 'handlebars',
            template: tmpl
        },
        regions: {
            consumption: "div.consumption",
            production: "div.production",
            sum: "div.sum"
        },
        events: {
            "click .subheader": "subheaderclick"
        },
        subheaderclick: function(event) {
            this.$(".selected").removeClass("selected");

            var trgt = this.$(event.target);
            if (trgt.hasClass("building-info")) {
                trgt.addClass("selected");
                this.trigger("select", "building-info");
            } else if (trgt.hasClass("production")) {
                trgt.addClass("selected");
                this.trigger("select", "production");
            }
        },
        initialize: function() {
            _.bindAll(this);
        },
        onShow: function() {
            this.consumption.show(new ChartView({
                model: this.model
            }));
            
            this.production.show(new ChartView({
                model: new BuildingInfoModel({})
            }));

            this.sum.show(new ChartView({
                model: new BuildingInfoModel({})
            }));
        }
    });

});