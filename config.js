module.exports = function(app, express) {
	var config = this;

	//generic config
  	app.configure(function(){
    	app.set('views', __dirname + '/views');
    	app.set('view engine', 'jade');
		app.set('view options', { layout: false });
		
    	app.use(express.bodyParser());
    	app.use(express.cookieParser());
	    app.use(express.methodOverride());
	    app.use(app.router);
	    app.use(express.static(__dirname + '/public'));
	  });
};