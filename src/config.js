"use strict";

var gzippo = require('gzippo').staticGzip;

module.exports = function(app, express) {
    var config = this;

    //generic config
	app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.set('view options', { layout: false });

        app.use(app.router);

        console.log('environment: ' + app.settings.env);



        if ('development' === app.settings.env) {
            app.use(gzippo(__dirname + '/app'));
        } else {
            app.use(gzippo(__dirname + '/../public/dist'));
        }

    });
};