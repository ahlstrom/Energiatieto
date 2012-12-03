define([
    "backbone.marionette",
    "hbs!./productionform.tmpl",
    "backbone.modelbinder",
    "../../helpers/helptextvent",
    "text!../helptexts/production.txt"
    ], function(Marionette, tmpl, ModelBinder, HelpTextVent, HelpText) {
        return Marionette.ItemView.extend({
            template: {
                template: tmpl,
                type: "handlebars"
            },
            templateHelpers: {
                typeName: function() {
                    if (this.type === "solarpanel") {
                        return ("Aurinkokeräin : " + this.solarInstallationName);
                    } else {
                        return ("Lämpökaivo : " + this.boreholeName);
                    }
                },
                typeIsSolar: function() {
                    if (this.type === "solarpanel") {
                        return true;
                    }
                },
                typeIsGeothermal: function() {
                    if (this.type === "geothermal") {
                        return true;
                    }
                },
                showSolarInstallationDataIsTrue: function() {
                    return ( this.showSolarInstallationData === true );
                },
                showBoreholeDataIsTrue: function() {
                    return ( this.showBoreholeData === true );
                },
                roofArea: function() {
                    return Number(this.roofArea);
                }
            },
            events: {
                "click .delete": "destroyModel"
            },
            modelEvents: {
                "change": "modelChanged"
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
                this.modelBinder.bind(this.model, this.el, bindings);
            },
            onClose: function() {
                this.modelBinder.unbind();
            }
        });
});
