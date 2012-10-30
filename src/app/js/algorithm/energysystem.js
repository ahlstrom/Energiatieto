if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        'underscore',
        './monthops'
    ], function(_, monthops) {
        var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        return function(constituents) {
            var dailyCons = this.getDailyConsumption = function(day) {
                return _.reduce(constituents, function(memo, c) {
                    return memo + c.getDailyConsumption(day);
                }, 0);
            };

            var sum = function(list, func) {
                return _.reduce(list, function(memo, v) {
                    return memo + func(v);
                }, 0);
            };

            this.getMonthlyConsumption = function(month) {
                return sum(monthops.listDaysInMonth(month), dailyCons);
            };

        };
});