"use strict";

module.exports = function(app, express) {
    var config = this;

    //generic config
	app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.set('view options', { layout: false });

        app.use(app.router);

        var staticdir = __dirname + '/../public';

        console.log('environment: ' + app.settings.env);
        if ('development' === app.settings.env) {
            app.use(express['static'](staticdir));
        } else {
            app.use(express['static'](staticdir + '/dist'));
        }

    });
};