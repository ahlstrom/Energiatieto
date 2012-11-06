define(["backbone", "./buildinginfomodel"], function(Backbone, Building) {
    return Backbone.Collection.extend({
        model: Building
    });
});