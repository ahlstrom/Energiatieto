define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            type: 'geothermal',
            iconBaseUrl: '/images/mapMarkerK',

            boreholeName                            : " ",
            activeDepth                             : 0,                // meters
            activeDepthMax                          : 280,              // meters
            usedForHotWaterHeating                  : true,
            electricityAssisted                     : false,
            powerDimensioning                       : 100,              // %        

            // Bedrock data at borehole location
            bedrockType                             : "Ei tiedossa",
            bedrockTypeId                           : 0,
            bedrockDepth                            : 0,
            bedrockDepthAccuracy                    : "Heikko",

            // Boreholespecific default values.
            // User can view and change if necessary.
            diameter                                : 0.13,             // meters
            wallTemp                                : 0.5,              // degrees celsius
            tGroundLoop                             : -5,               // degrees celsius
            tOutSpaceMax                            : 45,               // degrees celsius
            tOutSpaceMaxAt                          : -30,              // degrees celsius
            tOutSpaceMin                            : 20,               // degrees celsius
            tOutSpaceMinAt                          : 20,               // degrees celsius
            tOutHotWater                            : 55,               // degrees celsius
            tDiffCondenser                          : 10,               // degrees celsius
            tDiffEvaporator                         : 5,                // degrees celsius
            efficiencyFactor                        : 0.5,              // Adjusting theoretical Carno't process to reality

            // Dimensioning values based on system energy demand
            loadShare                               : 0,
            maxOutPower                             : 0

        }
    });
});