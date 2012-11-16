define(["backbone"], function(Backbone) {
    // this is a singleton, so that it can be accessed in test cases
    return Backbone.Collection.extend({
        initialize: function(options) {
            var self = this;
            this.on("all", function(event, model, info) {
                switch(event) {
                    case "add":
                        model.save();
                        break;
                    case "change":
                        if (!info.changes.id) {
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
                        it.unset("___selected");
                        it.trigger("deselect");
                    } else {
                        it.set({ ___selected: true });
                        it.trigger("selected");
                    }
                });
            });
            this.on("remove", function() {
                if (self.length > 0) {
                    self.trigger("select", self.at(0));
                }
            });

            this.on("reset", function() {
                var it = self.getSelected();
                if (it) {
                    self.trigger("select", it);
                }
            });
        },
        getSelected: function() {
            return this.find(function(it) {
                return it.get("___selected");
            });
        }
    });
});