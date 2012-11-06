define([
        'backbone.marionette', 
        'views/mainview',
        'models/selectedbuildings'
    ], function(Marionette, MainView, SelectedBuildingsCollection) {

    var app = new Marionette.Application();

    app.addRegions({
        mainRegion: "body"
    });

    app.addInitializer(function(options) {
        app.mainRegion.show(new MainView({
            collection: new SelectedBuildingsCollection()
        }));
    });

    return app;
});
