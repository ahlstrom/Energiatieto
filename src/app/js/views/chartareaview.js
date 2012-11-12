define([
        "jquery",
        "underscore",
        "backbone.marionette", 
        "hbs!./chartareaview.tmpl",
        "./chartview",
        "../models/buildinginfomodel"
    ], function($, _, Marionette, tmpl, ChartView, BuildingInfoModel) {

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
            var trgt = this.$(event.target),
                self = this;

            this.markSelected(trgt);

            _(["building-info", "production"]).each(function(it) {
                if (trgt.hasClass(it)) {
                    self.trigger("select", it);
                }
            })
        },
        markSelected: function(node, silent) {
            this.$(".arrow").animate({
                right: '+20'
            }, {
                duration: 100,
                complete: function() { 
                    $(this).remove(); 
                }
            });
            var arrow = $("<span class='arrow'></span>");
            node.append(arrow);

            if (silent) {
                arrow.css('right', '-20px');
            } else {
                arrow.animate({
                    right: '-20'
                },{
                    duration: 100
                });
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

            this.markSelected(this.$('h3.building-info'), true);
        }
    });

});