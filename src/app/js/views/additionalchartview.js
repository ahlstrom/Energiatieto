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
                    var ser = self.options.series(),
                        ret = {};
                    _.each(ser, function(month, key) {
                        ret[key] = month[self.options.categoryIndex];
                    });
                    return ret;
                },
                propertyName  : this.options.propertyName,
                chartOptions: {
                    width: 550
                }
            }));
        }
    });
});