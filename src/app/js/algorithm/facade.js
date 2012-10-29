if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['underscore', './heating'], function(_, heating) {
    return new function() {
        var arrayWith = function(val, num) {
            return _.map(_.range(num), function() { return val });
        }

        this.empty = arrayWith(0, 12);

        this.randomizeData = function() {
            var max = 50;
            var points = 12;
            var newData = [];
            for (var i = 0; i < points; i++) {
                newData.push(Math.random() * max);
            }
            return newData;
        };

        this.calculate = function(options) {
            var buildYear = parseInt(options.buildYear, 10);
            return arrayWith(heating.byYear(buildYear), 12);
        };
        
    };
});