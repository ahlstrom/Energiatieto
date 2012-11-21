define([
        "backbone.marionette", 
        "hbs!./additionalchartview.tmpl", 
        "../algorithm/facade",
        "./chartview"
    ], function(Marionette, tmpl, Algorithm, ChartView) {
    return Marionette.Layout.extend({
        template: {
            template: tmpl,
            type: "handlebars"
        },
        regions: {
            chart: ".chart"
        },
        triggers: {
            "click .close": "click:close"
        },
        onShow: function() {
            var self = this;
            this.chart.show(new ChartView({
                model: this.model,
                series: function() {
                    return {
                        total: self.model.get("data")[self.options.opts.propertyName].averages[self.options.categoryIndex]
                    };
                },
                chartOptions: {
                    width: 550
                }
            }));
        }
    });
});