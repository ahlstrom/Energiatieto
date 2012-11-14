define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./form/buildinginfoform",
        "./form/productionform",
        "./form/purchasedform",
        "./chartareaview",
        "../models/chartareamodel",
        "./helptext",
        "./map/mapview",
        "../models/mapposition"
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
        HelpTextView,
        MapView,
        MapPosition
    ) {

    var viewTypes = {
        "building-info" : BuildingInfoForm,
        "production"    : ProductionForm,
        "purchased"     : PurchasedForm
    };

    var MainView = Marionette.Layout.extend({
        className: 'master',
        template: {
            type: 'handlebars',
            template: tmpl
        },
        regions: {
            form        : '.control-form',
            charts      : '.chart-area',
            map         : '.map',
            helptext    : '.helptext'
        },
        initialize: function(options) {
            _.bindAll(this);
            
            var self       = this,
                coll       = this.collection,
                chartModel = this.chartModel = new ChartAreaModel();


            this.ChartArea = new ChartAreaView({
                model: chartModel
            }).on("select", function(view) {
                self.selectFormView(view);
                self.selectChartView(view);
                self.redrawForm();
            });

            this.mapView = new MapView({
                collection: coll,
                model: new MapPosition({
                    id: 'map-view-pos'
                })
            });

            this.bindTo(this.collection, "reset", function() {
                if (coll.length > 0) {
                    self.selectModel(coll.models[0]);
                }
            });

            this.bindTo(this.collection, "remove", function(model, coll) {
                self.clearForm();
            });

            this.bindTo(this.collection, "select", this.selectModel);

            this.viewtype = BuildingInfoForm;
        },
        selectModel: function(model) {
                this.redrawForm(model);
                this.chartModel.changeUnderlyingModel(model);
        },
        selectFormView: function(view) {
            this.viewtype = viewTypes[view];
        },
        selectChartView: function(view) {
            if(view === "production") {
                this.mapView.showSolarAndGeoEnergy();
            } else {
                this.mapView.showOnlyBuildingLayer();
            }
        },
        clearForm: function() {
            this.form.close();
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
            this.helptext.show(new HelpTextView({
                model: new Backbone.Model()
            }));
        }
    });
    return MainView;
});