require.config({
    shim: {
        'd3': {
            exports: 'd3'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'json2': {
            exports: 'JSON'
        }
    },
    hbs : {
         templateExtension : 'hbs',
         disableI18n : true,
         disableHelpers: true
    },
    baseUrl: 'js',
    paths: {
        'json2': '../lib/json2/json2',
        'd3': '../lib/d3/d3.v2',
        'jquery': '../lib/jquery/jquery-1.8.2',
        'underscore': '../lib/lodash/lodash-0.9.0',
        'backbone': '../lib/backbone/backbone-0.9.2',
        'backbone.modelbinder': '../lib/backbone/backbone.modelbinder-0.1.6',
        'backbone.marionette': '../lib/marionette/backbone.marionette.bundle-1.0.0-beta3',
        'hbs': '../lib/hbs/hbs-0.4.0',
        'i18nprecompile': '../lib/hbs/i18nprecompile',
        'handlebars': '../lib/handlebars/handlebars-1.0.rc.1',
        'backbone.marionette.handlebars': '../lib/marionette/backbone.marionette.handlebars-0.2.0'
    },
    deps: ['backbone.marionette.handlebars']
});