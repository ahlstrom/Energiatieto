define(
    [
        "backbone"
    ],
    function(Backbone) {
        return Backbone.Model.extend({
            initialize: function(model) {
                this.changeUnderlyingModel(model);
            },
            changeUnderlyingModel: function(model) {
                if (this.underlyingModel) {
                    this.underlyingModel.off("change", this.underlyingChanging);
                }
                this.underlyingModel = model;
                this.clear({ silent:true });
                this.set(this.underlyingModel.attributes);
                this.underlyingModel.on("change", this.underlyingChanging);
            },
            underlyingChanging: function(model) {
                this.set(model.attributes);
            }
        });
});