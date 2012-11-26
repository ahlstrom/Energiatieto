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
            total: arrayWith(0, 12)
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

        this.monthly = function(profile) {
            return _.map(_.range(12), function(num) {
                var it = profile.month(num + 1);
                return (isNaN(it) ? 0 : it);
            });
        };

        this.monthlyAverages = function(profile, constants) {
            return _.map(_.range(12), function(month) {
                return _.map(_.range(24), function(hour) {
                    var it = profile.hourOfDayAvgValueInMonth(hour + 1, month + 1, constants);
                    return (isNaN(it) ? 0 : it);
                });
            });
        };

        this.calculate = function(options, callback, profiles) {
            try {
                if (options.buildings && options.buildings.length > 0) {
                    var constants   = profiles.Constants,
                        heating     = profiles.SpaceHeatingEnergyProfile(options.buildings[0], constants),
                        electricity = profiles.ElectricityConsumptionProfile(options.buildings[0], constants);

                    callback({
                        heat: {
                            total: this.monthly(heating),
                            averages: this.monthlyAverages(heating, constants)
                        },
                        electricity: {
                            total: this.monthly(electricity),
                            averages: this.monthlyAverages(electricity, constants)
                        }
                    });
                    return;
                } else {
                    callback(this.empty);
                    return;                
                }
            } catch (e) {
                console.log(e);
                callback(this.empty);
                return;                
            }
        };

        return this;
        
    })();
});