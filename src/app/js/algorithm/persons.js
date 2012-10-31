if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    var dailyConsumption = 1505000 / 365.0;
    var consumptionType = "water";

    return function(num) {
        this.getDailyConsumption = function(day, type) {
            if (!type || type == consumptionType) {
                return dailyConsumption * num;
            } else {
                return 0;
            }
        };
    };
});