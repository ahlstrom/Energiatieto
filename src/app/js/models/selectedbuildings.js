define(["backbone", "./building"], function(Backbone, Building) {
    return Backbone.Collection.extend({
        model: Building
    });
});