if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['underscore'], function(_) {
    return function(values) {
        
        var requiredValues = ['buildYear', 'avgHeight', 'floorArea'];
        var validateRequiredValue = function(it) {
            return values.hasOwnProperty(it) && isNumericAndAboveZero(values[it]);
        };
        var isNumericAndAboveZero = function(it) {
            var num = parseInt(it, 10);
            return !isNaN(num) && num >= 0;
        };

        this.isValid = function() {
            return (values && _.all(requiredValues, validateRequiredValue));
        };

        this.asMap = function() {
            if (!this.isValid()) {
                return {};
            }
            return _.reduce(
                values, 
                function(memo, value, key) {
                    memo[key] = parseInt(value, 10);
                    return memo;
                },
                {}
            );
        };

    };
});