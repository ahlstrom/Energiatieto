define(["./selectablecollection", "./buildinginfomodel", "backbone.localstorage"], 
    function(SelectableCollection, Building) {
    // this is a singleton, so that it can be accessed in test cases
    return new (SelectableCollection.extend({
        localStorage: new Backbone.LocalStorage("selected-buildings"),
        model: Building
    }))();
});