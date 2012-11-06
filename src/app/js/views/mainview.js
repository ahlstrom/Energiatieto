define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./controlformcollectionview",
        "./chartareaview",
        "./mapview"
    ], 
    function(
        Backbone,
        Marionette, 
        tmpl,
        ControlFormCollectionView,
        ChartAreaView,
        MapView) {

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
            var self = this;
            this.ControlFormCollection = new ControlFormCollectionView({
                collection: this.collection
            });
            this.ChartArea = new ChartAreaView({
                collection: this.collection
            });
            this.mapView = new MapView({
                collection: this.collection
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