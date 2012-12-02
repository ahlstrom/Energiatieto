if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["underscore"], function(_) {
    return function(options) {
        this.getData = options.data || function() { return []; };

        var withData = function(data, fn) {
            return fn(data, function(it) {
                if (typeof it !== "number") {
                    return withData(it, fn);
                } else {
                    return it; 
                }
            });
        };

        this.getSeries = function() {
            return _.keys(this.getData());
        };

        this.getDataRange = function() {
            var sum = function(list) {
                    return _.reduce(list, function(memo, num){ 
                        return memo + num; 
                    }, 0);
                };
            var max = sum(_.map(this.getData(), function(it) {
                        return withData(it, _.max);
                    })),
                min = sum(_.map(this.getData(), function(it) {
                        return withData(it, _.min);
                    }));
            return {
                max: max,
                min: min
            };
        };

        this.numDataPoints = function() {
            var series = this.getSeries();
            var data = this.getData();
            return _.max(_.map(series, function(it) { 
                return data[it].length; 
            }));
        };

        this.getRange = options.range || this.getDataRange;
    };
});