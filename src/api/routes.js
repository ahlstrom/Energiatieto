"use strict";
var param = require('../lib/urladdon').param;

module.exports = function(app, prefix) {
  app.get(prefix + '/solarProfile', function(req, res){
    var buildingId = param(req, 'buildingId');
    if (buildingId) {
      res.send(buildingId);
    } else {
      res.send("ERROR: no buildingId");
    }
  });
};