define([
    "underscore",
    "backbone.marionette", 
    "hbs!./buildinginfoform.tmpl",
    "backbone.modelbinder",
    "../../helpers/helptextvent",
    "text!../helptexts/buildinginfo.txt"
    ], function(_, Marionette, tmpl, ModelBinder, HelpTextVent, HelpText) {
        var roundValueConverter = function(direction, value) {
            var result = Math.round(value);
            if (isNaN(result)) {
                return null;
            } else {
                return result;
            }
        };

        return Marionette.ItemView.extend({
            template: {
                type: 'handlebars',
                template: tmpl
            },
            templateHelpers: {
                buildingTypeIs1: function() {
                    return this.buildingType === "existing";
                },
                buildingTypeIs2: function() {
                    return this.buildingType === "new";
                },
                heatingSystemIs1: function() {
                    return ( this.heatingSystem === "1" && this.buildingType === "1" );
                },
                heatingSystemIs2: function() {
                    return ( this.heatingSystem === "2" && this.buildingType === "1" );
                },
                heatingSystemIs3: function() {
                    return ( this.heatingSystem === "3" && this.buildingType === "1" );
                },
                heatingSystemIs4: function() {
                    return ( this.heatingSystem === "4" && this.buildingType === "1" );
                },
                heatingEnergyConsumptionEstimatedNOT: function() {
                    return ( this.heatingEnergyConsumptionEstimated === false || this.heatingEnergyConsumptionEstimated === undefined );
                },
                electricityConsumption: function() {
                    return this.buildingType === "1" ;
                },
                electricityConsumptionEstimatedNOT: function() {
                    return ( this.electricityConsumptionEstimated === false || this.electricityConsumptionEstimated === undefined );
                },
                showBackgroundDataIsTrue: function() {
                    return ( this.showBackgroundData === true );
                }
            },
            modelEvents: {
                "change": "modelChanged"
            },
            events: {
                "click .delete": "destroyModel"
            },
            destroyModel: function() {
                this.model.destroy();
            },
            // re-renders the form if element bound to changed property has class ".re-render"
            modelChanged: function(model, event) {
                var self = this;
                _.each(_.keys(event.changes), function(it) {
                    var selector = ".re-render[name="+it+"]";
                    if (self.$(selector).length) {
                        self.render();
                        // re-select the element from the now changed form and focus on it
                        self.$(selector).each(function() { this.focus(); });
                    }
                });
            },
            initialize: function(options) {
                _.bindAll(this);
                this.modelBinder = new ModelBinder();
            },
            onShow: function() {
                HelpTextVent.trigger("change", HelpText);
            },
            onRender: function() {
                var bindings = ModelBinder.createDefaultBindings(this.el, 'name');
                
                (bindings.averageRadiation || {}).converter = (bindings.roofArea || {}).converter = roundValueConverter;
                (bindings.address || {}).converter = function(direction, value) {
                    return value && value.formatted_address;
                };
                this.modelBinder.bind(this.model, this.el, bindings);
            },
            onClose: function() {
                this.modelBinder.unbind();
            }
        });
});
