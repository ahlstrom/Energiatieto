if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['underscore'], function(_) {
    return function(values) {
        
        var requiredValues = ['buildYear', 'avgHeight', 'floorArea'];

        this.isValid = function() {
            var doesNotExist = function(it) {
                return !values.hasOwnProperty(it);
            };
            
            return (values && !_.any(requiredValues, doesNotExist));
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