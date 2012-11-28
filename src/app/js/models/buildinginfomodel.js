if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            buildingType                            : null,
            buildingYear                            : null,
            numberOfInhabitants                     : 3,
            averageRoomHeight                       : 2.8,
            waterConsumptionPerPersonPerDay         : 60,
            oilEfficiency                           : 0.87,
            districtHeatingEfficiency               : 0.97,
            waterHeatingTemperatureDifference       : 50,
            waterHeatingLosses                      : 0.89,
            nominalElectricityConsumption           : 58,
            energyConsumptionIncludesWaterHeating   : true,
            electricHeatingIncludesSpaceHeating     : true
        }
    });
});