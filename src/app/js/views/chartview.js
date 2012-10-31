define([
        "backbone.marionette", 
        "hbs!./chartview.tmpl",
        "chart",
        "../models/multiseriesdatasource"
    ], function(Marionette, tmpl, Chart, MultiSeriesDataSource) {
        return Marionette.ItemView.extend({
            template: {
                type: 'handlebars',
                template: tmpl
            },
            initialize: function() {
                _.bindAll(this);
                this.bindTo(this.model, "change", this.modelChanged);
            },
            onShow: function() {
                var model = this.model;
                this.chart = new Chart(
                    this.$("svg")[0],
                    new MultiSeriesDataSource(function() {
                        return model.get("data");
                    })
                ).draw();
            },
            modelChanged: function() {
                if (this.chart) {
                    this.chart.redraw();
                }
            }
        });
});