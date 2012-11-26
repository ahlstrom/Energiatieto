define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            type: 'solarpanel',
            iconBaseUrl: '/images/mapMarkerA'
        }
    });
});