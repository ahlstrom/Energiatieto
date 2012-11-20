if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        "ElectricityConsumptionProfile",
        "HotWaterHeatingEnergyProfile",
//        "SolarElectricityProductionProfile",
        "SpaceHeatingEnergyProfile",
        "Constants"
    ], 
    function(
        ElectricityConsumptionProfile,
        HotWaterHeatingEnergyProfile,
//        SolarElectricityProductionProfile,
        SpaceHeatingEnergyProfile,
        Constants
    ) {
        return {
            ElectricityConsumptionProfile     : ElectricityConsumptionProfile,
            HotWaterHeatingEnergyProfile      : HotWaterHeatingEnergyProfile,
//            SolarElectricityProductionProfile : SolarElectricityProductionProfile,
            SpaceHeatingEnergyProfile         : SpaceHeatingEnergyProfile,
            Constants                         : new Constants()
        };
});
