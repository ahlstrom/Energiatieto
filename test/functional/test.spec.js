"use strict";

var phantom = require('phantom'),
    assert  = require('assert'),
    async   = require('async');

describe('index page', function() {
    it('title should be correct', function(done) {
        var callbackify = function(callback) {
            return function(res) {
                callback(null, res);
            };
        };
        var pg;
        async.waterfall([
            function(callback) {
                phantom.create(callbackify(callback));
            },
            function(ph, callback) {
                ph.createPage(callbackify(callback));
            },
            function(page, callback) {
                pg = page;
                page.open("http://localhost:5050", callbackify(callback));
            },
            function(status, callback) {
                console.log("opened localhost", status);
                pg.evaluate(function() { return document.title; }, callbackify(callback));
            },
            function(result, callback) {
                assert.equal(result, "Hello, Energiatieto!");
                done();
            }
        ]);
    });
});