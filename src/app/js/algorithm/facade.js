if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        'underscore'
    ], function(_) {
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

        this.calculate = function(options, callback, profiles) {
            var heating     = profiles.SpaceHeatingEnergyProfile,
                electricity = profiles.ElectricityConsumptionProfile,
                constants   = profiles.Constants;

            if (options.buildings && options.buildings.length > 0) {
                var monthly = function(profile) {
                    return _.map(_.range(12), function(num) {
                        return profile.month(num + 1);
                    });
                };
                callback({
                    heat: {
                        total: monthly(heating(options.buildings[0], constants))
                    },
                    electricity: {
                        total: monthly(electricity(options.buildings[0], constants))
                    }
                });
                return;
            } else {
                callback(this.empty);
                return;                
            }
        };

        return this;
        
    })();
});