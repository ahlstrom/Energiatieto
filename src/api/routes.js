"use strict";
var queryStr = require('url').parse,
	param = function(req, name) {
		return queryStr(req.url, true).query[name];
	};

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