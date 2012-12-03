define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./form/buildinginfoform",
        "./form/productionform",
        "./form/purchasedform",
        "../models/selectedbuildings",
        "../models/energyproducers",
        "./chartareaview",
        "../models/chartareamodel",
        "./helptext",
        "./map/mapview",
        "../models/mapposition",
        "../helpers/helptextvent",

        "text!./helptexts/buildinginfo.txt",
        "text!./helptexts/production.txt"
    ], 
    function(
        Backbone,
        Marionette, 
        tmpl,
        BuildingInfoForm,
        ProductionForm,
        PurchasedForm,
        SelectedBuildings,
        EnergyProducers,
        ChartAreaView,
        ChartAreaModel,
        HelpTextView,
        MapView,
        MapPosition,
        HelpText,
        BuildingHelpText,
        ProductionHelpText
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
                buildings  = this.buildings  = SelectedBuildings,
                chartModel = this.chartModel = new ChartAreaModel(options.model),
                producers  = this.producers  = EnergyProducers;

            this.bindTo(this.buildings, "select", this.showBuildingInfoForm);
            this.bindTo(this.buildings, "remove", this.showBuildingInfoForm);

            this.bindTo(this.producers,  "select", this.showProductionForm);
            this.bindTo(this.producers,  "remove", this.showProductionForm);

            this.producers.attachTo(this.model, "producers");
            this.buildings.attachTo(this.model, "buildings");

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
                buildings: buildings,
                producers: producers,
                model: new MapPosition({
                    id: 'map-view-pos'
                })
            });
        },
        showBuildingInfoForm: function() {
            HelpText.trigger("change", BuildingHelpText);
            var model = this.buildings.getSelected();
            if (!model) {
                this.form.close();
            } else {
                this.form.show(new BuildingInfoForm({
                    model: model
                }));
            }
        },
        showProductionForm: function() {
            HelpText.trigger("change", ProductionHelpText);
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
            HelpText.trigger("change", BuildingHelpText);
            
            this.producers.fetch();
            this.buildings.fetch();
        }
    });
    return MainView;
});