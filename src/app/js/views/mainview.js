define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./form/buildinginfoform",
        "./form/productionform",
        "./form/purchasedform",
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
        PurchasedForm,
        ChartAreaView,
        ChartAreaModel,
        MapView
    ) {

    var viewTypes = {
        "building-info" : BuildingInfoForm,
        "production"    : ProductionForm,
        "purchased"     : PurchasedForm
    }

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
                self.selectChartView(view);
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
            this.viewtype = viewTypes[view];
        },
        selectChartView: function(view) {
            switch(view) {
                case "production":
                    this.mapView.showSolarAndGeoEnergy();
                    break;
                default:
                    this.mapView.showOnlyBuildingLayer();
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