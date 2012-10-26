define([
        "backbone.marionette", 
        "hbs!./mainview.tmpl",
        "./controlformview",
        "./chartareaview"
    ], 
    function(
        Marionette, 
        tmpl,
        ControlFormView,
        ChartAreaView) {

    var MainView = Marionette.Layout.extend({
        template: {
            type: 'handlebars',
            template: tmpl
        },
        regions: {
            form: '.control-form',
            charts: '.chart-area'
        },
        initialize: function(options) {
            _.bindAll(this);
            this.ControlForm = new ControlFormView({
                model: this.model
            });
            this.ChartArea = new ChartAreaView({
                model: this.model
            });
        },
        onShow: function() {
            this.form.show(this.ControlForm);
            this.charts.show(this.ChartArea);
        }
    });
    return MainView;
});