if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        "SystemElectricityConsumption",
        "HotWaterHeatingEnergyProfile",
        "SystemHotWaterHeatingEnergyConsumption",
        "SystemSpaceHeatingEnergyConsumption",
        "SystemHotWaterHeatingEnergyProduction",
        "SystemSpaceHeatingEnergyProduction",
        "SystemElectricityProduction",
        "SystemElectricityBalance",
        "SystemHotWaterHeatingEnergyBalance",
        "SystemSpaceHeatingEnergyBalance",
        "Constants"
    ], 
    function(
        SystemElectricityConsumption,
        HotWaterHeatingEnergyProfile,
        SystemHotWaterHeatingEnergyConsumption,
        SystemSpaceHeatingEnergyConsumption,
        SystemHotWaterHeatingEnergyProduction,
        SystemSpaceHeatingEnergyProduction,
        SystemElectricityProduction,
        SystemElectricityBalance,
        SystemHotWaterHeatingEnergyBalance,
        SystemSpaceHeatingEnergyBalance,
        Constants
    ) {
        return {
            SystemElectricityConsumption     : SystemElectricityConsumption,
            HotWaterHeatingEnergyProfile      : HotWaterHeatingEnergyProfile,
            SystemHotWaterHeatingEnergyConsumption
                                              : SystemHotWaterHeatingEnergyConsumption,
            SystemSpaceHeatingEnergyConsumption
                                              : SystemSpaceHeatingEnergyConsumption,
            SystemHotWaterHeatingEnergyProduction
                                              : SystemHotWaterHeatingEnergyProduction,
            SystemSpaceHeatingEnergyProduction
                                              : SystemSpaceHeatingEnergyProduction,
            SystemElectricityProduction       : SystemElectricityProduction,
            SystemElectricityBalance          : SystemElectricityBalance,
            SystemHotWaterHeatingEnergyBalance
                                              : SystemHotWaterHeatingEnergyBalance,
            SystemSpaceHeatingEnergyBalance
                                              : SystemSpaceHeatingEnergyBalance,
            Constants                         : new Constants()
        };
});
