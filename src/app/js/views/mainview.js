define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./form/buildinginfoform",
        "./form/productionform",
        "./chartareaview",
        "../models/chartareamodel",
        "./map/mapview"
    ], 
    function(
        Backbone,
        Marionette, 
        tmpl,
        BuildingInfoForm,
        ProductionForm,
        ChartAreaView,
        ChartAreaModel,
        MapView
    ) {

    var MainView = Marionette.Layout.extend({
        className: 'master',
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
            }).on("select", function(view) {
                self.selectFormView(view);
                self.redrawForm();
            });

            this.mapView = new MapView({
                collection: coll
            });

            this.bindTo(this.collection, "select", function(model) {
                self.redrawForm(model);
                chartModel.changeUnderlyingModel(model);
            });

            this.viewtype = BuildingInfoForm;
        },
        selectFormView: function(view) {
            switch(view) {
                case "building-info":
                    this.viewtype = BuildingInfoForm;
                    break;
                case "production":
                    this.viewtype = ProductionForm;
                    break;
            }
        },
        redrawForm: function(model) {
            var currentModel = model ? model : this.form.currentView.model;
            this.form.show(new this.viewtype({
                model: currentModel
            }));
        },
        onShow: function() {
            this.map.show(this.mapView);
            this.charts.show(this.ChartArea);
        }
    });
    return MainView;
});