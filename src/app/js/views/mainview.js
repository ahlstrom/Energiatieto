define([
        "backbone",
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./controlformview",
        "./chartareaview",
        "./mapview"
    ], 
    function(
        Backbone,
        Marionette, 
        tmpl,
        ControlFormView,
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
            this.ControlForm = new ControlFormView({
                model: this.model
            });
            this.ChartArea = new ChartAreaView({
                model: this.model
            });
            this.mapView = new MapView({
                model: this.model
            });
        },
        onShow: function() {
            this.map.show(this.mapView);
            this.form.show(this.ControlForm);
            this.charts.show(this.ChartArea);
        }
    });
    return MainView;
});