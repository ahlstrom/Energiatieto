define([
    "backbone.marionette", 
    "./controlformview"
    ], function(Marionette, ControlFormView) {
        return Marionette.CollectionView.extend({
            itemView: ControlFormView,
            onItemAdded: function(itemView) {
                itemView.on("delete", this.removeItemFn(itemView));
            },
            removeItemFn: function(itemView) {
                var self = this;
                return function() {
                    itemView.model.destroy();
                };
            },
            onItemRemoved: function(itemView) {
                itemView.off("delete");
            }
        });
});
