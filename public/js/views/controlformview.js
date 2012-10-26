define(["backbone.marionette", "hbs!./controlformview.tmpl"], function(Marionette, tmpl) {
    return Marionette.ItemView.extend({
        template: {
            type: 'handlebars',
            template: tmpl
        }
    });
});
