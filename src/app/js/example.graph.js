define(["chart"], function(Chart) {
    "use strict";

    var RandomDataSource = function(points, max) {
        this.getData = function() {
            var newData = [];
            for (var i = 0; i < points; i++) {
                newData.push(Math.random() * max);
            }
            return newData;
        };
    };

    var $ = function(el) {
        return document.getElementById(el);
    };

    var kulutus = new Chart($("kulutus"), new RandomDataSource(12, 50)).draw();
    var tuotanto = new Chart($("tuotanto"), new RandomDataSource(12, 50)).draw();
    var erotus = new Chart($("erotus"), new RandomDataSource(12, 50)).draw();

    setInterval(function() {
        kulutus.redraw();
        tuotanto.redraw();
        erotus.redraw();
    }, 2000);
});