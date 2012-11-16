define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./form/buildinginfoform",
        "./form/productionform",
        "./form/purchasedform",
        "../models/energyproducers",
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
        EnergyProducers,
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
                chartModel = this.chartModel = new ChartAreaModel(),
                producers  = this.producers  = EnergyProducers;

            this.bindTo(this.collection, "select", this.showBuildingInfoForm);
            this.bindTo(this.collection, "remove", this.showBuildingInfoForm);

            this.bindTo(this.producers,  "select", this.showProductionForm);
            this.bindTo(this.producers,  "remove", this.showProductionForm);


            this.ChartArea = new ChartAreaView({
                model: chartModel
            }).on("select", function(view) {
                if (view === "production") {
                    self.showProductionForm();
                } else {
                    self.showBuildingInfoForm();
                }
                self.selectMapView(view);
            });

            this.mapView = new MapView({
                buildings: coll,
                producers: producers,
                model: new MapPosition({
                    id: 'map-view-pos'
                })
            });

            producers.fetch();

        },
        showBuildingInfoForm: function() {
            var model = this.collection.getSelected();
            if (!model) {
                this.form.close();
            } else {
                this.form.show(new BuildingInfoForm({
                    model: model
                }));
            }
        },
        showProductionForm: function() {
            var model = this.producers.getSelected();
            if (!model) {
                this.form.close();
            } else {
                this.form.show(new ProductionForm({
                    model: model
                }));
            }
        },
        selectMapView: function(view) {
            if(view === "production") {
                this.mapView.showSolarAndGeoEnergy();
            } else {
                this.mapView.showOnlyBuildingLayer();
            }
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