if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        'underscore'
    ], function(_) {

        var def = function(val) {
            return typeof val !== "undefined";
        };

        var utils = function() {
            
            var self = this;

            this.offsets = function(series, height, maximum, minimum) {
                var max  = def(maximum) ? maximum : _.max(series),
                    min  = def(minimum) ? minimum : _.min(series);

                return _.map(series, function(it) {
                    return self.offset(it, height, max, min);
                });
            };
            this.offsetsAgainstSeries = function(series, height, compareTo) {
                var max = _.max(compareTo),
                    min = _.min(compareTo);

                if (min >= 0 && max >= 0) {
                    return this.offsets(series, height, max, 0);
                } else if (min < 0 && max < 0) {
                    return this.offsets(series, height, 0, min);
                } else {
                    return this.offsets(series, height, max, min);
                }
            };
            this.offset = function(val, height, max, min) {
                var total = max - min,
                    half = height / (total / height),
                    offset = height * ((max - val) / total);

                return offset;
            };
            this.zeroPointOffset = function(series, height, maximum, minimum) {
                var max = def(maximum) ? maximum : _.max(series),
                    min = def(minimum) ? minimum :_.min(series);
                if (min >= 0 && max >= 0) {
                    return height;
                } else if (min <= 0 && max <= 0) {
                    return 0;
                } else {
                    return this.offset(0, height, max, min);
                }
            };
            this.quantilesBetween = function(start, end, num) {
                var diff = start - end,
                    step = -(diff / (num));

                return _.filter(
                            _.range(start, end + step, step), 
                            function(it) {
                                return it !== 0;
                            }
                    );
            };
            this.quantiles = function(series, num) {
                if (series.length === 0) {
                    return [];
                }
                var max  = _.max(series),
                    min  = _.min(series),
                    start = (min <= 0 && max <= 0) ? 0 : max,
                    end   = (min >= 0 && max >= 0) ? 0 : min;

                return this.quantilesBetween(start, end, num);
            };
            this.height = function(val, maxHeight, max, min) {
                var biggest,
                    absMin = Math.abs(min);
                if ((max * min) < 0) {
                    biggest = Math.abs(max) + absMin;
                } else {
                    biggest = max > absMin ? max : absMin;
                }

                return Math.abs(maxHeight * (val / biggest));
            };
            this.heightOfElement = function(series, val, maxHeight) {
                return this.height(val, maxHeight, _.max(series), _.min(series));
            };
            this.heights = function(series, maxHeight) {
                return _.map(series, function(it) {
                    return self.heightOfElement(series, it, maxHeight);
                });
            };
            this.perPixelValue = function(series, height) {
                var max  = _.max(series),
                    min  = _.min(series);
                if ((max * min) >= 0) {
                    return _.max([max, min], Math.abs) / height;
                } else {
                    return (Math.abs(max) + Math.abs(min)) / height;
                }
            };
        };

        return new utils();
});