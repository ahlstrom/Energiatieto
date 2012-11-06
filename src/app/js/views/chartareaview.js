define([
        "backbone.marionette", 
        "hbs!./chartareaview.tmpl",
        "./chartview",
        "../models/buildinginfomodel",
        "../algorithm/facade"
    ], function(Marionette, tmpl, ChartView, BuildingInfoModel, Algorithm) {
        var AggregateDataSumModel = Backbone.Model.extend({
            defaults: {
                data: Algorithm.empty
            },
            initialize: function(values, options) {
                var self = this;
                options.collection.on("change:data", function(target) {
                    self.set({
                        data: target.get("data")
                    });
                });
            }
        });

    return Marionette.Layout.extend({
        template: {
            type: 'handlebars',
            template: tmpl
        },
        regions: {
            consumption: ".consumption",
            production: ".production",
            sum: ".sum"
        },
        initialize: function() {
            this.model = new AggregateDataSumModel({}, {
                collection: this.collection
            });
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