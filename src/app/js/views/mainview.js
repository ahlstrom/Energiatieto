define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./controlformcollectionview",
        "./chartareaview",
        "./mapview",
        "../models/selectedbuildings"
    ], 
    function(
        Backbone,
        Marionette, 
        tmpl,
        ControlFormCollectionView,
        ChartAreaView,
        MapView,
        SelectedBuildingsCollection) {

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
            var coll = new SelectedBuildingsCollection();

            _.bindAll(this);
            this.ControlFormCollection = new ControlFormCollectionView({
                collection: coll
            });
            this.ChartArea = new ChartAreaView({
                model: this.model
            });
            this.mapView = new MapView({
                collection: coll
            });
        },
        onShow: function() {
            this.map.show(this.mapView);
            this.form.show(this.ControlFormCollection);
            this.charts.show(this.ChartArea);
        }
    });
    return MainView;
});