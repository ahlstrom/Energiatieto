"use strict";

var phantom = require('./helpers/phantom'),
    assert  = require('assert'),
    url     = 'http://localhost:5050';

describe('index page', function() {
    it('should have a correct title', function(done) {
        phantom
            .withUrl(url)
            .evaluate(function() {
                return document.title;
            })
            .then(function(result) {
                assert.equal(result, 'Energiatieto');
                done();
            });
    });

});