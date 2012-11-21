define([
        "jquery",
        "underscore",
        "backbone.marionette", 
        "hbs!./chartareaview.tmpl",
        "./chartview",
        "../models/buildinginfomodel",
        "./additionalchartview"
    ], function($, _, Marionette, tmpl, ChartView, BuildingInfoModel, AdditionalChartView) {

    return Marionette.Layout.extend({
        template: {
            type: 'handlebars',
            template: tmpl
        },
        regions: {
            electricityConsumption  : "div.electricity-consumption",
            heatingConsumption      : "div.heating-consumption",
            electricityProduction   : "div.electricity-production",
            heatingProduction       : "div.heating-production",
            electricityPurchased    : "div.electricity-purchased",
            heatingPurchased        : "div.heating-purchased",

            firstAdditionalInfo     : "div.first-infoarea"
        },
        events: {
            "click .subheader": "subheaderclick"
        },
        subheaderclick: function(event) {
            var trgt = this.$(event.target),
                self = this;

            this.markSelected(trgt);

            _(["building-info", "production", "purchased", "costs"]).each(function(it) {
                if (trgt.hasClass(it)) {
                    self.trigger("select", it);
                }
            });
        },
        markSelected: function(node, silent) {
            this.$(".arrow").animate({
                right: '+20'
            }, {
                duration: 100,
                complete: function() { 
                    $(this).remove(); 
                }
            });
            var arrow = $("<span class='arrow'></span>");
            node.append(arrow);

            if (silent) {
                arrow.css('right', '-20px');
            } else {
                arrow.animate({
                    right: '-20'
                },{
                    duration: 100
                });
            }
        },
        initViewInChart: function(opts) {
            var clk = opts.clickHandler;
            opts.view = new ChartView({
                model        : this.model,
                propertyName : opts.propertyName
            });
            opts.clickHandler = function() {
                clk.apply(clk, [opts].concat([].slice.call(arguments, 0)));
            };
        },
        initViewsInCharts: function(chartOpts) {
            _.each(_.values(chartOpts), this.initViewInChart);
        },
        additionalInfo: function(region) {
            var self = this;
            return function(opts, categoryIndex) {
                var view = new AdditionalChartView({
                    model: self.model,
                    opts: opts,
                    categoryIndex: categoryIndex
                });
                self.bindTo(view, "click:close", function() {
                    region.slideUp(function() {
                        region.reset();
                        region.isVisible = false;
                    });
                });
                region.show(view);
            };
        },
        initialize: function() {
            _.bindAll(this);
            var slideOpen = function(view) {
                var self = this;
                if (!this.isVisible) {
                    this.$el.hide();
                    this.$el.html(view.el);
                    this.$el.slideDown("fast", function() {
                        self.isVisible = true;
                    });
                } else {
                    this.$el.html(view.el);
                }
            };

            this.firstAdditionalInfo.open = slideOpen;
            this.firstAdditionalInfo.slideUp = function(callback) {
                var $el = this.$el;
                $el.slideUp("fast", function() {
                    callback();
                    $el.show();
                });
            };

            this.charts = {
                electricityConsumption: {
                    propertyName: "electricity",
                    clickHandler: this.additionalInfo(this.firstAdditionalInfo)
                },
                heatingConsumption: {
                    propertyName: "heat",
                    clickHandler: this.additionalInfo(this.firstAdditionalInfo)
                },
                electricityProduction: {},
                heatingProduction: {},
                electricityPurchased: {},
                heatingPurchased: {}
            };
            this.initViewsInCharts(this.charts);
        },
        onShow: function() {
            var self = this;
            _.each(_.pairs(this.charts), function(it) {
                self[it[0]].show(it[1].view);
                self.bindTo(it[1].view, "click", it[1].clickHandler);
            });
            this.markSelected(this.$('h3.building-info'), true);
        }
    });

});