if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        'underscore',
        './monthops'
    ], function(_, monthops) {
        var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        return function(constituents) {
            var dailyCons = this.getDailyConsumption = function(day, type) {
                return _.reduce(constituents, function(memo, c) {
                    return memo + c.getDailyConsumption(day, type);
                }, 0);
            };

            var dailyConsFn = function(type) {
                return function(day) {
                    return dailyCons(day, type);
                };
            };

            var sum = function(list, func) {
                return _.reduce(list, function(memo, v) {
                    return memo + func(v);
                }, 0);
            };

            this.getMonthlyConsumption = function(month, type) {
                return sum(monthops.listDaysInMonth(month), dailyConsFn(type));
            };

        };
});