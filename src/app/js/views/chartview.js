define([
        "backbone.marionette", 
        "hbs!./chartview.tmpl",
        "chart",
        "../models/multiseriesdatasource",
        "../algorithm/facade"
    ], function(Marionette, tmpl, Chart, MultiSeriesDataSource, Algorithm) {
        return Marionette.ItemView.extend({
            template: {
                type: 'handlebars',
                template: tmpl
            },
            initialize: function(options) {
                _.bindAll(this);
                this.bindTo(this.model, "change", this.modelChanged);
                this.propertyName = options.propertyName;
            },
            onShow: function() {
                var model = this.model,
                    self  = this;

                this.chart = new Chart(
                    this.$("svg")[0],
                    new MultiSeriesDataSource(function() {
                        var series = model.get("data")[self.propertyName];
                        if (series) {
                            return series;
                        } else {
                            return Algorithm.empty;
                        }
                    }),
                    this.options.chartOptions
                ).draw();
                this.chart.onclick = function(value, category) {
                    self.trigger("click", category);
                };
            },
            modelChanged: function() {
                if (this.chart && this.model.get("data")[this.propertyName]) {
                    this.chart.redraw();
                }
            }
        });
});