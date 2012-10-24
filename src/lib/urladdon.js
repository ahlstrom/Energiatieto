"use strict";

var queryStr = require('url').parse;

module.exports = {
    param: function(req, name) {
        return queryStr(req.url, true).query[name];
    }
};