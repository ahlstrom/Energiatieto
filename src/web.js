"use strict";

var express = require('express');

var app = express.createServer(express.logger());

var config = require('./config.js')(app, express);

require('./routes')(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

module.exports = app;