define(["./selectablecollection", "backbone.localstorage"], function(SelectableCollection) {
    return new (SelectableCollection.extend({
        localStorage: new Backbone.LocalStorage("energy-producers")
    }))();
});