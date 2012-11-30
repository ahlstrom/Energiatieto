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
                var self = this;
                this.bindTo(this.model, "change", this.modelChanged);
                this.seriesSource = (options && options.series) || function() {
                    return self.model.get("data")[options.propertyName];
                };
                this.dataSource = new MultiSeriesDataSource({
                        data: function() {
                            var series = self.seriesSource();
                            if (series) {
                                return series;
                            } else {
                                return Algorithm.empty;
                            }
                        },
                        range: this.options.rangeFn
                });
            },
            onShow: function() {
                var model = this.model,
                    self  = this;

                this.chart = new Chart(
                    this.$("svg")[0],
                    this.dataSource,
                    this.options.chartOptions || {}
                ).draw();
                this.chart.onclick = function(value, category) {
                    self.trigger("click", category);
                };
            },
            modelChanged: function() {
                if (this.chart && this.seriesSource()) {
                    this.chart.redraw();
                }
            }
        });
});