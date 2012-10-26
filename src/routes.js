"use strict";

module.exports = function(app){

  require('./api/routes')(app, '/api');

}; 