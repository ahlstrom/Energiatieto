define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            type: 'solarpanel',
            iconBaseUrl: '/images/mapMarkerA',

            solarInstallationName               : " ",

            // Roof specific values from database
            roofId                              : 422,
            roofArea                            : 151.163,  // m2
            roofAreaAvgIrradiance               : 789.471,  // kWh/(m2 year)
            roofGoodArea                        : 80.3742,  // m2
            roofGoodAreaAvgIrradiance           : 916.824,  // kWh/(m2 year)
            roofRemainingArea                   : 70.7888,  // m2
            roofRemainingAreaAvgIrradiance      : 644.8727, // kWh/(m2 year)

            // Areas used for energy production
            photovoltaicArea                    : 0,        // m2
            thermalArea                         : 0,        // m2

            // PV panel specific values
            photovoltaicPeakPowerFactor         : 0.15,
            photovoltaicInstallationFactor      : 0.75,     // Depends on the installation. Value 0.75 is applicable when the panel is moderately ventilated

            // Thermal collector specific values
            IAM                                 : 0.94,
            a1                                  : 2,        // W/m2K
            a2                                  : 0,
            nkierto                             : 0.8,
            no                                  : 0.83,
            thw                                 : 40,       // degrees celsius
            tcw                                 : 5,        // degrees celsius
//          Vnim                                : 0,        // dm3
            Vll                                 : 0,        // dm3
            xfactor                             : 0.7,

            // water heating related values
            waterHeatingTemperatureDifference   : 50,       // Kelvin or Celsius
            waterHeatingLosses                  : 0.89,

            // system dimensioning related values
            reservoirVolumeDimensioning         : 75,       // liters / collector-m2
            reservoirCapacityDimensioning       : 2.5       // times daily hot water consumption
        }
    });
});