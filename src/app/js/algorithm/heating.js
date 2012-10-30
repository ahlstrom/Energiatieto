if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    this.byYear = function(year) {
        if (year >= 2005) {
            return this.interpolate(2005, 2014, 7, 5, year);
        } else if (year >= 1980) {
            return this.interpolate(1980, 2005, 11, 7, year);
        } else if (year >= 1970) {
            return this.interpolate(1970, 1980, 13, 11, year);
        } else if (year >= 1950) {
            return this.interpolate(1950, 1970, 20, 13, year);
        } else {
            return 0;
        }
    };
    this.byMonth = function(month) {
        var energy = [638,606,576,372,120,0,0,0,115,333,453,569];
        if (month < 0 || month > 11) {
            return 0;
        } else {
            return energy[month];
        }
    };
    this.interpolate = function(from, to, valFrom, valTo, at) {
        var range       = to - from,
            amount      = at - from,
            percentage  = amount / range;
        return valFrom + (valTo - valFrom) * percentage;
    };
    return this;
});