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
        var findByType = function(arr, type) {
            return _.filter(arr, function(it) {
                return it.type === type;
            });
        };

        var empty = {
            total: arrayWith(0, 12),
            averages: arrayWith(0, 30)
        };

        this.empty = {
            heatingConsumption: {
                water: empty,
                space: empty
            },
            electricityConsumption: empty,
            heatingProduction: {
                water: empty,
                space: empty
            },
            electricityProduction: empty,
            heatingBalance: {
                water: empty,
                space: empty
            },
            electricityBalance: empty
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
                    var system = {
                        building: options.buildings,
                        solarInstallation: findByType(options.producers, "solarpanel"),
                        borehole: findByType(options.producers, "geothermal")
                    };

                    var valuesFor = function(profile) {
                        var constants   = profiles.Constants,
                            calculatedProfile = profile(system, constants);
                        return {
                            total: this.monthly(calculatedProfile),
                            averages: this.monthlyAverages(calculatedProfile, constants)
                        };
                    };

                    var pivot = function(obj) {
                        var args = ["total", "averages"];
                            ret = {};
                        _.each(args, function(value) {                            
                            _.map(obj, function(val, key) {
                                if (!ret[value]) {
                                    ret[value] = {};
                                }
                                ret[value][key] = obj[key][value];
                            });
                        });
                        return obj;
                    };
                    callback({
                        heatingConsumption: pivot({
                            water: valuesFor(profiles.SystemHotWaterHeatingEnergyConsumption),
                            space: valuesFor(profiles.SystemSpaceHeatingEnergyConsumption)
                        }),
                        electricityConsumption
                                    : valuesFor(profiles.SystemElectricityConsumption),
                        heatingProduction: pivot({
                            water: valuesFor(profiles.SystemHotWaterHeatingEnergyProduction),
                            space: valuesFor(profiles.SystemSpaceHeatingEnergyProduction)
                        }),
                        electricityProduction
                                    : valuesFor(profiles.SystemElectricityProduction),
                        heatingBalance: pivot({
                            water: valuesFor(profiles.SystemHotWaterHeatingEnergyBalance),
                            space: valuesFor(profiles.SystemSpaceHeatingEnergyBalance)
                        }),
                        electricityBalance
                                    : valuesFor(profiles.SystemElectricityBalance)
                    });
                    return;
                } else {
                    callback(this.empty);
                    return;                
                }
            } catch (e) {
                if (typeof e.stack !== "undefined") {
                    console.warn(e.stack);
                } else {
                    console.warn(e);
                }
                callback(this.empty);
                return;                
            }
        };

        return this;
        
    })();
});