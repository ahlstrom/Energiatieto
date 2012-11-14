define(["backbone", "./buildinginfomodel", "backbone.localstorage"], function(Backbone, Building) {
    // this is a singleton, so that it can be accessed in test cases
    return new (Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("selected-buildings"),
        model: Building,
        initialize: function(options) {
            var self = this;
            this.on("all", function(event, model, info) {
                switch(event) {
                    case "add":
                        model.save();
                        break;
                    case "change":
                        if (!info.changes['id']) {
                            model.save();
                        }
                        break;
                    default:
                        break;
                }
            });

            this.on("select", function(model) {
                self.each(function(it) {
                    if (it !== model) {
                        it.trigger("deselect");
                    } else {
                        it.trigger("selected");
                    }
                });
            });
        }
    }))();
});