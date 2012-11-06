define(["backbone", "./buildinginfomodel"], function(Backbone, Building) {
    // this is a singleton, so that it can be accessed in test cases
    return new (Backbone.Collection.extend({
        model: Building
    }))();
});