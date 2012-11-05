"use strict";

var phantom = require('./helpers/phantom'),
    assert  = require('assert');

describe('index page', function() {
    it('should have a correct title', function(done) {
        phantom
            .withUrl('http://localhost:5050')
            .evaluate(function() {
                return document.title;
            })
            .then(function(result) {
                assert.equal(result, 'Energiatieto');
                done();
            });
    });

    it('should show a graph when proper input is presented', function(done) {
        var ph = phantom
                .withUrl('http://localhost:5050');

        ph.waitFor(function() {
            /*jslint browser: true */
            if (require !== null && window.$ && window.$('input[name=buildYear]').length > 0) {                
                require(["jquery", "underscore"], function($, _) {
                    window._ = _;

                    $('input[name=buildYear]').val(1958).change();
                    $('input[name=floorArea]').val(68).change();
                    $('input[name=avgHeight]').val(250).change();
                });
            }

            return (typeof window.$ !== "undefined" && typeof window._ !== "undefined");
        }).then(function() {
            ph.waitFor(function() {
                /* jslint browser: true */
                // with the values given, combined height of graphs _should_ be over 100 px
                var _ = window._,
                    $ = window.$;

                return _.reduce(
                    $("g.total rect").map(function() {
                        return $(this).attr("height"); 
                    }), 
                    function(it, acc) { 
                        return parseFloat(it, 10) + acc;
                    }, 0.0) > 100;
            }).then(function(res) {
                done();
            });
        });
    });
});