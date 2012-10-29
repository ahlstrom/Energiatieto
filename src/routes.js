"use strict";

module.exports = function(app){

  app.get('/', function(req, res) {
    res.render('index.' + app.settings.env + '.jade');
  });

  require('./api/routes')(app, '/api');

}; 