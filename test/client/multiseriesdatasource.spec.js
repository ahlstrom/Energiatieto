"use strict";

var basedir = '../../src/app/js/models/';

var MultiSeriesDataSource = require(basedir + 'multiseriesdatasource'),
    assert          = require('assert');

describe('multiseriesdatasource', function() {
    var data = {
        total: [12, 22, 36, 41, 50, 69],
        water: [3, 4, 5, 6, 7]
    };
    var dataFn = function() { return data; };

    it('should return list of series', function() {
        assert.deepEqual(new MultiSeriesDataSource(dataFn).getSeries(), ['total', 'water']);
    });

    it('should count max datapoint length from series', function() {
        assert.equal(new MultiSeriesDataSource(dataFn).numDataPoints(), 6);
    });
});