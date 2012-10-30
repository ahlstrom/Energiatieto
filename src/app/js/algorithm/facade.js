if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        'underscore', 
        './heating',
        './options',
        './building',
        './energysystem'
    ], function(_, heating, Options, Building, System) {
    return (function() {
        var arrayWith = function(val, num) {
            return _.map(_.range(num), function() { return val; });
        };

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
            var opts = new Options(options);
            if (!opts.isValid()) {
                return this.empty;
            }
            var heat = this.heatingRequirements(
                    options.buildYear,
                    options.floorArea,
                    options.avgHeight
                );
            return heat;
        };
        this.heatingRequirements = function(buildYear, floorArea, avgHeightInCm) {
            var bldg = new Building(buildYear, floorArea, avgHeightInCm);
            var sys = new System([ bldg ]);

            return _.map(_.range(12), function(num) {
                return sys.getMonthlyConsumption(num);
            });
        };

        return this;
        
    })();
});