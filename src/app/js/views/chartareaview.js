define([
        "backbone.marionette", 
        "hbs!./chartareaview.tmpl",
        "./chartview",
    ], function(Marionette, tmpl, ChartView) {

    return Marionette.Layout.extend({
        template: {
            type: 'handlebars',
            template: tmpl
        },
        regions: {
            consumption: ".consumption",
            production: ".production",
            sum: ".sum"
        },
        onShow: function() {
            this.consumption.show(new ChartView({
                model: this.model
            }));
            
            this.production.show(new ChartView({
                model: this.model
            }));

            this.sum.show(new ChartView({
                model: this.model
            }));
        }
    });

});