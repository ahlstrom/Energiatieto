"use strict";

var assert = require('assert');

describe('test', function() {
    describe('#test()', function() {
        it('should be fine', function() {
            console.log(__dirname);
            assert.equal(true, true);
        });
    });
});