if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        'underscore', 
        './heating',
        './options',
        './building',
        './energysystem',
        './persons',
        'SpaceHeatingEnergyProfile',
        'Constants'
    ], function(_, heating, Options, Building, System, Persons, SpaceHeatingEnergyProfile, Constants) {
    return (function() {
        var arrayWith = function(val, num) {
            return _.map(_.range(num), function() { return val; });
        };
        var consumptionFromSystem = function(sys, type) {
            return _.map(_.range(12), function(num) {
                return sys.getMonthlyConsumption(num, type);
            });
        };

        this.empty = {
            total: arrayWith(0, 12),
            water: arrayWith(0, 12)
        };

        this.randomizeData = function() {
            var max = 50;
            var points = 12;
            var newData = [];
            for (var i = 0; i < points; i++) {
                newData.push(Math.random() * max);
            }
            return newData;
        };

        this.calculate = function(options, callback) {
            if (options.buildings && options.buildings.length > 0) {
                var prof = SpaceHeatingEnergyProfile(options.buildings[0], new Constants());
                var monthly = _.map(_.range(12), function(num) {
                    return prof.month(num + 1)
                });
                callback({
                    total: monthly
                });
                return;
            }

            var opts = new Options(options);
            if (!opts.isValid()) {
                callback(this.empty);
                return;
            }

            var sys = this.constructSystem(opts.asMap());
            callback({
                total: consumptionFromSystem(sys),
                water: consumptionFromSystem(sys, 'water')
            });
        };
        this.constructSystem = function(options) {
            var bldg = new Building(
                options.buildYear, 
                options.floorArea, 
                options.avgHeight
            );
            var prs = new Persons(options.peopleCount);

            return new System([ bldg, prs ]);
        };

        return this;
        
    })();
});