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
        },
        'backbone.localstorage': {
            deps: ['backbone']
        },
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2014': {
            exports: 'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2014'
        },
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2015': {
            exports: 'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2015'
        },
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2016': {
            exports: 'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2016'
        },
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2017': {
            exports: 'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2017'
        },
        'heatingDemandProfileHelsinkiKaisaniemiReferenceYear': {
            exports: 'heatingDemandProfileHelsinkiKaisaniemiReferenceYear'
        },
        'SpaceHeatingEnergyProfile': {
            deps: [
                'Profile',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2014',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2015',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2016',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2017'
            ],
            exports: 'SpaceHeatingEnergyProfile'
        },
        'HotWaterHeatingEnergyProfile': {
            deps: [
                'Profile'
            ]
        },
        'ElectricityConsumptionProfile': {
            deps: [
                'Profile'
            ]
        },
        'Constants': {
            deps: [
                'heatingDemandProfileHelsinkiKaisaniemiReferenceYear',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2014',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2015',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2016',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2017'
            ],
            exports: 'Constants'
        },
        'Profile': {
            exports: 'Profile'
        }
    },
    hbs : {
         templateExtension : 'hbs',
         disableI18n : true,
         disableHelpers: true
    },
    baseUrl: 'js',
    paths: {
        'Constants'                                                    : '../calculation/Constants',
        'Profile'                                                      : '../calculation/Profile',

        'SpaceHeatingEnergyProfile'                                    : '../calculation/SpaceHeatingEnergyProfile',
        'HotWaterHeatingEnergyProfile'                                 : '../calculation/HotWaterHeatingEnergyProfile',
        'ElectricityConsumptionProfile'                                : '../calculation/ElectricityConsumptionProfile',

        'heatingDemandProfileHelsinkiKaisaniemiReferenceYear'          : '../calculation/Profiles/heatingDemandProfileHelsinkiKaisaniemiReferenceYear',
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2014': '../calculation/Profiles/simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2014',
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2015': '../calculation/Profiles/simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2015',
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2016': '../calculation/Profiles/simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2016',
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2017': '../calculation/Profiles/simulatedSpaceHeatingDemandOfResidentialReferenceBuilding2017',

        'json2': '../lib/json2/json2',
        'd3': '../lib/d3/d3.v2',
        'jquery': '../lib/jquery/jquery-1.8.2',
        'underscore': '../lib/lodash/lodash-0.9.0',
        'backbone': '../lib/backbone/backbone-0.9.2',
        'backbone.localstorage': '../lib/backbone/backbone.localStorage',
        'backbone.modelbinder': '../lib/backbone/backbone.modelbinder-0.1.6',
        'backbone.marionette': '../lib/marionette/backbone.marionette.bundle-1.0.0-beta3',
        'hbs': '../lib/hbs/hbs-0.4.0',
        'i18nprecompile': '../lib/hbs/i18nprecompile',
        'handlebars': '../lib/handlebars/handlebars-1.0.rc.1',
        'backbone.marionette.handlebars': '../lib/marionette/backbone.marionette.handlebars-0.2.0',
        'tipsy': '../lib/tipsy/tipsy-1.0.0a',
        'text': '../lib/require/text-2.0.3'
    },
    deps: ['backbone.localstorage','backbone.marionette.handlebars']
});