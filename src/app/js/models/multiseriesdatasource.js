if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["underscore"], function(_) {
    return function(dataFn, property) {
        this.getData = dataFn;

        this.getSeries = function() {
            return _.keys(this.getData());
        };

        this.numDataPoints = function() {
            var series = this.getSeries();
            var data = this.getData();
            return _.max(_.map(series, function(it) { return data[it].length; }));
        };
    };
});