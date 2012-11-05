"use strict";

var _      = require('underscore'),
    config = require('../config');

_.each(config, function(value, key) {
    process.env[key] = value;
});

var express = require('express');

var app = express.createServer();

require('./config.js')(app, express);

require('./routes')(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

module.exports = app;