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
            electricityConsumption  : "div.electricity-consumption",
            heatingConsumption      : "div.heating-consumption",
            electricityProduction   : "div.electricity-production",
            heatingProduction       : "div.heating-production",
            electricityPurchased    : "div.electricity-purchased",
            heatingPurchased        : "div.heating-purchased"
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
            this.electricityConsumption.show(new ChartView({
                model: this.model
            }));

            this.heatingConsumption.show(new ChartView({
                model: this.model
            }));
            
            this.electricityProduction.show(new ChartView({
                model: new BuildingInfoModel({})
            }));

            this.heatingProduction.show(new ChartView({
                model: new BuildingInfoModel({})
            }));

            this.electricityPurchased.show(new ChartView({
                model: new BuildingInfoModel({})
            }));

            this.heatingPurchased.show(new ChartView({
                model: new BuildingInfoModel({})
            }));

            this.markSelected(this.$('h3.building-info'), true);
        }
    });

});