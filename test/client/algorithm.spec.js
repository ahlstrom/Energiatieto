"use strict";

var Algorithm = require('../../src/app/js/algorithm/facade'),
    assert    = require('assert');

describe('algorithm', function() {
    it('should give twelve datapoints', function() {
        var res = new Algorithm().calculate();
        assert.equal(res.length, 12);
    });
});
