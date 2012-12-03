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
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2013To2014': {
            exports: 'simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2013To2014'
        },
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2015To2017': {
            exports: 'simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2015To2017'
        },
        'heatingDemandProfileHelsinkiKaisaniemiReferenceYear': {
            exports: 'heatingDemandProfileHelsinkiKaisaniemiReferenceYear'
        },
        'DomesticElectricityConsumptionWeekValues': {
            exports: 'DomesticElectricityConsumptionWeekValues'
        },
        'DomesticElectricityConsumptionHourValues': {
            exports: 'DomesticElectricityConsumptionHourValues'
        },
        'SpaceHeatingEnergyProfile': {
            deps: [
                'Profile'
            ],
            exports: 'SpaceHeatingEnergyProfile'
        },
        'SystemElectricityConsumption': {
            deps: [
                'ElectricityConsumptionProfile',
                'BoreholeEnergyProductionAndConsumption'
            ],
            exports: 'SystemElectricityConsumption'
        },
        'SystemHotWaterHeatingEnergyConsumption': {
            exports: 'SystemHotWaterHeatingEnergyConsumption'
        },
        'SystemSpaceHeatingEnergyConsumption': {
            deps: [
                'SpaceHeatingEnergyProfile'
            ],
            exports: 'SystemSpaceHeatingEnergyConsumption'
        },
        'SystemHotWaterHeatingEnergyProduction': {
            deps: [
                'SolarHeatingEnergyProductionProfile',
                'SolarElectricityProductionProfile'
            ],
            exports: 'SystemHotWaterHeatingEnergyProduction'
        },
        'SystemSpaceHeatingEnergyProduction': {
            exports: 'SystemSpaceHeatingEnergyProduction'
        },
        'SystemElectricityProduction': {
            exports: 'SystemElectricityProduction'
        },

        'SystemSpaceHeatingEnergyBalance': {
            exports: 'SystemSpaceHeatingEnergyBalance'
        },
        'SystemHotWaterHeatingEnergyBalance': {
            exports: 'SystemHotWaterHeatingEnergyBalance'
        },
        'SystemElectricityBalance': {
            exports: 'SystemElectricityBalance'
        },

        'HotWaterHeatingEnergyProfile': {
            deps: [
                'Profile'
            ],
            exports: 'HotWaterHeatingEnergyProfile'
        },
        'VantaaReferenceYearOutsideTemperature': {
            exports: 'VantaaReferenceYearOutsideTemperature'
        },
        'VantaaReferenceYearTotalIrradiationOnHorizontalSurface': {
            exports: 'VantaaReferenceYearTotalIrradiationOnHorizontalSurface'
        },
        'ReferenceYearCalendar': {
            exports: 'ReferenceYearCalendar'
        },
        'BedrockThermalConductivity': {
            exports: 'BedrockThermalConductivity'
        },
        'ElectricityConsumptionProfile': {
            deps: [
                'Profile'
            ],
            exports: 'ElectricityConsumptionProfile'
        },
        'Constants': {
            deps: [
                'VantaaReferenceYearOutsideTemperature',
                'VantaaReferenceYearTotalIrradiationOnHorizontalSurface',
                'DomesticElectricityConsumptionWeekValues',
                'DomesticElectricityConsumptionHourValues',
                'heatingDemandProfileHelsinkiKaisaniemiReferenceYear',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2013To2014',
                'simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2015To2017',
                'ReferenceYearCalendar',
                'BedrockThermalConductivity'
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

        'ReferenceYearCalendar'                                        : '../calculation/tables/referenceYearCalendar',
        'DomesticElectricityConsumptionWeekValues'                     : '../calculation/tables/domesticElectricityConsumptionWeekValues',
        'DomesticElectricityConsumptionHourValues'                     : '../calculation/tables/domesticElectricityConsumptionHourValues',
        'BedrockThermalConductivity'                                   : '../calculation/tables/bedrockThermalConductivity',

        'SpaceHeatingEnergyProfile'                                    : '../calculation/SpaceHeatingEnergyProfile',
        'HotWaterHeatingEnergyProfile'                                 : '../calculation/HotWaterHeatingEnergyProfile',
        'ElectricityConsumptionProfile'                                : '../calculation/ElectricityConsumptionProfile',
        'SolarHeatingEnergyProductionProfile'                          : '../calculation/SolarHeatingEnergyProductionProfile',
        'SolarElectricityProductionProfile'                            : '../calculation/SolarElectricityProductionProfile',

        'BoreholeEnergyProductionAndConsumption'                       : '../calculation/BoreholeEnergyProductionAndConsumption',

        'SystemElectricityConsumption'                                 : '../calculation/SystemElectricityConsumption',
        'SystemSpaceHeatingEnergyConsumption'                          : '../calculation/SystemSpaceHeatingEnergyConsumption',
        'SystemHotWaterHeatingEnergyConsumption'                       : '../calculation/SystemHotWaterHeatingEnergyConsumption',

        'SystemHotWaterHeatingEnergyProduction'                        : '../calculation/SystemHotWaterHeatingEnergyProduction',
        'SystemSpaceHeatingEnergyProduction'                           : '../calculation/SystemSpaceHeatingEnergyProduction',
        'SystemElectricityProduction'                                  : '../calculation/SystemElectricityProduction',

        'SystemSpaceHeatingEnergyBalance'                              : '../calculation/SystemSpaceHeatingEnergyBalance',
        'SystemHotWaterHeatingEnergyBalance'                           : '../calculation/SystemHotWaterHeatingEnergyBalance',
        'SystemElectricityBalance'                                     : '../calculation/SystemElectricityBalance',

        'VantaaReferenceYearOutsideTemperature'                        : '../calculation/Profiles/vantaaReferenceYearOutsideTemperature',
        'VantaaReferenceYearTotalIrradiationOnHorizontalSurface'       : '../calculation/Profiles/vantaaReferenceYearTotalIrradiationOnHorizontalSurface',
        'heatingDemandProfileHelsinkiKaisaniemiReferenceYear'          : '../calculation/Profiles/heatingDemandProfileHelsinkiKaisaniemiReferenceYear',
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2013To2014'
                                                                       : '../calculation/Profiles/simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2013To2014',
        'simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2015To2017'
                                                                       : '../calculation/Profiles/simulatedSpaceHeatingDemandOfResidentialReferenceBuildingFrom2015To2017',

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