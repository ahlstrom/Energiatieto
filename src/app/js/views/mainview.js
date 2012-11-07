define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./controlformview",
        "./chartareaview",
        "../models/chartareamodel",
        "./map/mapview"
    ], 
    function(
        Backbone,
        Marionette, 
        tmpl,
        ControlFormView,
        ChartAreaView,
        ChartAreaModel,
        MapView
    ) {

    var MainView = Marionette.Layout.extend({
        template: {
            type: 'handlebars',
            template: tmpl
        },
        regions: {
            form: '.control-form',
            charts: '.chart-area',
            map: '.map'
        },
        initialize: function(options) {
            _.bindAll(this);
            
            var self       = this,
                coll       = this.collection,
                chartModel = new ChartAreaModel();


            this.ChartArea = new ChartAreaView({
                model: chartModel
            });

            this.mapView = new MapView({
                collection: coll
            });

            this.collection.on("select", function(model) {
                self.form.show(new ControlFormView({
                    model: model
                }));
                chartModel.changeUnderlyingModel(model);
            });
        },
        onShow: function() {
            this.map.show(this.mapView);
            this.charts.show(this.ChartArea);
        }
    });
    return MainView;
});