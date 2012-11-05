"use strict";

var phantom = require("phantom"),
    async   = require('async'),
    Q       = require('q');

var callbackify = function(callback) {
    return function(res) {
        callback(null, res);
    };
};

module.exports = {
    withUrl: function(url) {
        var pg,
            connectDeferred = Q.defer(),
            promise         = connectDeferred.promise,
            self            = this;

        async.waterfall([
            function(callback) {
                phantom.create(callbackify(callback));
            },
            function(ph, callback) {
                ph.createPage(callbackify(callback));
            },
            function(page, callback) {
                pg = page;
                page.open(url, callbackify(callback));
            },
            function(status, callback) {
                connectDeferred.resolve(pg);
            }
        ]);

        this.then = function(fun) {
            promise.then(fun);
            return self;
        };

        this.evaluate = function(fun) {
            var evalDeferred = Q.defer();
            promise.then(function() {
                pg.evaluate(fun, function(result) {
                    evalDeferred.resolve(result);
                });
            });
            return evalDeferred.promise;
        };

        this.waitFor = function(condition) {
            var waitForDeferred = Q.defer();
            var action = function() {
                self
                    .evaluate(condition)
                    .then(function(res) {
                        if (res === true) {
                            waitForDeferred.resolve();
                        } else {
                            setTimeout(action, 100);
                        }
                    });
            };

            action();

            return waitForDeferred.promise;
        };
        return this;
    }
};