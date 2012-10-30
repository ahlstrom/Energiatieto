if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    var dailyConsumption = 1505000 / 365.0;

    return function(num) {
        this.getDailyConsumption = function(day) {
            return dailyConsumption * num;
        };
    };
});