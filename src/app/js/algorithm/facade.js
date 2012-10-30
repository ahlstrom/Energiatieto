if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        'underscore', 
        './heating',
        './options',
        './building',
        './energysystem',
        './persons'
    ], function(_, heating, Options, Building, System, Persons) {
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
            var sys = this.constructSystem(opts.asMap());
            return _.map(_.range(12), function(num) {
                return sys.getMonthlyConsumption(num);
            });
        };
        this.constructSystem = function(options) {
            var bldg = new Building(
                options.buildYear, 
                options.floorArea, 
                options.avgHeight
            );
            var prs = new Persons(options.peopleCount);

            return new System([ bldg, prs ]);
        };

        return this;
        
    })();
});