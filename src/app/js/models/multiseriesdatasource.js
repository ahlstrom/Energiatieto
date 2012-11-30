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
            return {
                max: _.max(withData(this.getData(), _.max)),
                min: _.min(withData(this.getData(), _.min))
            };
        };

        this.numDataPoints = function() {
            var series = this.getSeries();
            var data = this.getData();
            return _.max(_.map(series, function(it) { return data[it].length; }));
        };

        this.getRange = options.range || this.getDataRange;
    };
});