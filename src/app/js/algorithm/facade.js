if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    return function(options) {
        this.randomizeData = function() {
            var max = 50;
            var points = 12;
            var newData = [];
            for (var i = 0; i < points; i++) {
                newData.push(Math.random() * max);
            }
            return newData;
        };

        this.calculate = this.randomizeData;
        
    };
});