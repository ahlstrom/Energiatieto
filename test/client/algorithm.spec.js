"use strict";

var basedir = '../../src/app/js/algorithm/';

var Algorithm = require(basedir + 'facade'),
    Options   = require(basedir + 'options'),
    heating   = require(basedir + 'heating'),
    System    = require(basedir + 'energysystem'),
    Building  = require(basedir + 'building'),
    Persons   = require(basedir + 'persons'),
    assert    = require('assert');

describe('algorithm', function() {
    it('should give twelve datapoints', function() {
        var res = Algorithm.calculate();
        assert.equal(res.length, 12);
    });
});

describe('options', function() {
    it('is not valid if it doesn\'t have enough data', function() {
        assert(!new Options({}).isValid());
    });
    it('is valid if it has enough data', function() {
        assert(new Options({
            buildYear: 1950,
            avgHeight: 250,
            floorArea: 68
        }).isValid());
    });

    it('returns an empty map if not valid', function() {
        assert.deepEqual({}, new Options({
            buildYear: 1950,
            avgHeight: 250
        }).asMap());
    });

    it('returns properties as map if not valid', function() {
        assert.deepEqual({
            buildYear: 1950,
            avgHeight: 250,
            floorArea: 72
        }, new Options({
            buildYear: 1950,
            avgHeight: 250,
            floorArea: 72
        }).asMap());
    });

    it('parses string values to integers if valid', function() {
        assert.deepEqual({
            buildYear: 1912,
            avgHeight: 359,
            floorArea: 72
        }, new Options({
            buildYear: "1912",
            avgHeight: "359",
            floorArea: "72"
        }).asMap());
    });
});

describe('heating', function() {
    it('should give predefined values for defined years', function() {
        assert.equal(heating.byYear(1950), 20);
        assert.equal(heating.byYear(1970), 13);
        assert.equal(heating.byYear(1980), 11);
        assert.equal(heating.byYear(2005), 7);
    });
    it('should interpolate between construction years', function() {
        assert.equal(16.5, heating.byYear(1960));
        assert.equal(12, heating.byYear(1975));
        assert.equal(9, Math.round(heating.byYear(1992)));
        assert.equal(6, Math.round(heating.byYear(2009)));
    });
    it('should give predefined values for defined months', function() {
        assert.equal(638, heating.byMonth(0));
        assert.equal(0, heating.byMonth(5));
        assert.equal(569, heating.byMonth(11));
        assert.equal(0, heating.byMonth(13));
    });
});

describe('energysystem', function() {
    var cons = function(day) { return day; };

    it('should sum up daily consumption from all constituents', function() {
        var norm = {
            getDailyConsumption: cons
        };
        var sys = new System([ norm, norm, norm ]);
        assert.equal(36 * 3, sys.getDailyConsumption(36));
    });

    it('should sum up monthly consumption from all constituents', function() {
        var norm = {
            getDailyConsumption: function() { return 1; }
        };
        var sys = new System([ norm, norm, norm ]);
        assert.equal(31 * 3, sys.getMonthlyConsumption(11));
        assert.equal(30 * 3, sys.getMonthlyConsumption(3));
        assert.equal(28 * 3, sys.getMonthlyConsumption(1));
        assert.equal(31 * 3, sys.getMonthlyConsumption(0));
    });

    it('should pass correct number of day to constituent', function() {
        var norm = {
            getDailyConsumption: function(day) { return day; }
        };
        var sys = new System([ norm ]);

        assert.equal(465, sys.getMonthlyConsumption(0));
        assert.equal(3135, sys.getMonthlyConsumption(3));
    });
});

describe('building', function() {
    var cons = function(day) { return day; };

    it('should return correct consumption for the given day', function() {
        var bldng = new Building(1956, 68, 250);

        // heating consumption is zero in the summer
        assert.equal(0, bldng.getDailyConsumption(200));
    });
});

describe('persons', function() {
    it('always consume the same amount of energy', function() {
        var prs = new Persons(3);
        assert.equal(prs.getDailyConsumption(0), prs.getDailyConsumption(200));
    });

    it('consume the same amount of energy per person', function() {
        assert.equal(
            new Persons(1).getDailyConsumption(0) * 3,
            new Persons(3).getDailyConsumption(0));
    });

    it('consume 1505kWh per person per year', function() {
        assert.equal(1505000, Math.round(new Persons(1).getDailyConsumption(0) * 365));
    });

});