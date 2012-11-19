define([
        'backbone.marionette', 
        'views/mainview',
        'models/algorithmmodel'
    ], function(Marionette, MainView, AlgorithmModel) {

    var app = new Marionette.Application();

    app.addRegions({
        mainRegion: "body"
    });

    app.addInitializer(function(options) {
        app.mainRegion.show(new MainView({
            model: new AlgorithmModel()
        }));
    });

    return app;
});
