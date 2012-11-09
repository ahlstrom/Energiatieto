define(['app', 'models/selectedbuildings', 'models/buildinginfomodel'], function(Application, SelectedBuildings, Building) {
    Application.start();

    var bldng = new Building({
        byggid: "12345",
        averageRadiation: "250",
        roofArea: "250",
        address: "Osoite"
    });

    SelectedBuildings.add(bldng);

    SelectedBuildings.trigger("select", bldng);
});