"use strict";

var basedir = '../../src/app/js/algorithm/';

var monthops  = require(basedir + 'monthops'),
    assert    = require('assert');

describe('monthops', function() {
    it('should give the current month for a given day', function() {
        assert.equal(0, monthops.monthForDay(1));
        assert.equal(1, monthops.monthForDay(32));
        assert.equal(11, monthops.monthForDay(364));
    });
});
