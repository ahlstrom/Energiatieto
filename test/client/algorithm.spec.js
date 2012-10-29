"use strict";

var Algorithm = require('../../src/app/js/algorithm/facade'),
    heating   = require('../../src/app/js/algorithm/heating'),
    assert    = require('assert');

describe('algorithm', function() {
    it('should give twelve datapoints', function() {
        var res = new Algorithm().calculate();
        assert.equal(res.length, 12);
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
});