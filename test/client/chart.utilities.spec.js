"use strict";

var basedir = '../../src/app/js/';

var Utils     = require(basedir + 'chart.utilities'),
    assert    = require('assert'),
    series    = [-1500, -500, -2000];

describe('chart.utils', function() {
    it('calculates zero point offset based on data', function() {
        assert.equal(Utils.zeroPointOffset([
            -100,
            100,
            -50
        ],
        100), 50);

        assert.equal(Utils.zeroPointOffset([
            150,
            -50
        ],
        100), 75);

        assert.equal(Utils.zeroPointOffset([
            50,
            -150,
            -100
        ],
        100), 25);
    });

    it('returns max height as zero point offset if all values above zero', function() {
        assert.equal(Utils.zeroPointOffset([
            150,
            50
        ],
        100), 100);
    });

    it('returns zero as zero point offset if all values below zero', function() {
        assert.equal(Utils.zeroPointOffset([
            -150,
            -50,
            -20
        ],
        100), 0);
    });

    it('calculates quantiles for the given data', function() {
        assert.deepEqual([
            -500,
            -1000,
            -1500,
            -2000
            ], 
            Utils.quantiles(series, 4));

        assert.deepEqual([
            158,
            68.5,
            -21,
            -110.5,
            -200
            ], 
            Utils.quantiles([158, 21, -12, -200], 4));

        assert.deepEqual([
            ], 
            Utils.quantiles([0, 0, 0], 4));

        assert.deepEqual([
            ], 
            Utils.quantiles([], 4));
    });

    it('zero point is not a quantile', function() {
        assert.deepEqual(
            [100, 50, -50, -100], 
            Utils.quantiles([-100, 100], 4)
            );
    });
    it('calculate an offset for value', function() {
        assert.equal(
            Utils.offset(100, 100, 300, -100),
            50);
    });

    it('calculates offsets for values', function() {
        assert.deepEqual([
            25,
            50,
            75,
            100
            ], 
            Utils.offsets(
                Utils.quantiles(series, 4), 100, 0));

        assert.deepEqual([
            62.5,
            75,
            87.5,
            100
            ], 
            Utils.offsets(
                Utils.quantiles(series, 4), 100, 2000));
    });

    it('calculates heights for series', function() {
        assert.deepEqual([
            25,
            50,
            75,
            100
            ], 
            Utils.heights([50, 100, 150, 200], 100));

        assert.deepEqual([
            25,
            50,
            75,
            100
            ], 
            Utils.heights([-50, -100, -150, -200], 100));

        assert.deepEqual([
            50,
            25,
            0,
            12.5,
            50
            ], 
            Utils.heights([200, 100, 0, -50, -200], 100));

        assert.deepEqual([
            50,
            50
            ], 
            Utils.heights([-300, 300], 100));

        assert.deepEqual([
            25,
            0,
            25,
            75
            ], 
            Utils.heights([300, 0, -300, -900], 100));
    });

});
