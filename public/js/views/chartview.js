define([
        "backbone.marionette", 
        "hbs!./chartview.tmpl",
        "chart"
    ], function(Marionette, tmpl, Chart) {
        var ModelDataSource = function(model, property) {
            this.getData = function() {
                return model.get(property);
            };
        };
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
                this.chart = new Chart(
                    this.$("svg")[0],
                    new ModelDataSource(this.model, "data")
                ).draw();
            },
            modelChanged: function() {
                if (this.chart) {
                    this.chart.redraw();
                };
            }
        });
});