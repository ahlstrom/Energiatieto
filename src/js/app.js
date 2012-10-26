define([
        'backbone.marionette', 
        'views/mainview',
        'models/buildinginfomodel'
    ], function(Marionette, MainView, BuildingInfoModel) {

    var app = new Marionette.Application();

    app.addRegions({
        mainRegion: "body"
    });

    app.addInitializer(function(options) {
        app.mainRegion.show(new MainView({
            model: new BuildingInfoModel()
        }));
    });

    return app;
});
