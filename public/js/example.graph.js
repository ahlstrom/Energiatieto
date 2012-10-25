(function() {
    "use strict";

    window.onload = function() {

        var RandomDataSource = function(points, max) {
            this.getData = function() {
                var newData = [];
                for (var i = 0; i < points; i++) {
                    newData.push(Math.random() * max);
                }
                return newData;
            };
        };


        var Chart = function(selector, dataSource) {
            var height = 100;
            var width = 300;

            var chart = d3.select(document.getElementById(selector))
                          .append("svg")
                          .attr("width", width)
                          .attr("height", height);


            var newHeightFn = function(data) {
                return function(d) {
                    return (d / Math.max.apply(this, data)) * height;
                };
            };

            var newyCoordFn = function(data) {
                return function(d) {
                    return height - newHeightFn(data)(d);
                };
            };

            this.draw = function() {
                var data = dataSource.getData();

                chart
                     .selectAll("rect")
                     .data(data)
                     .enter()
                     .append("rect")
                     .attr("y", newyCoordFn(data))
                     .attr("x", function(d, i) { return i * (width / data.length); })
                     .attr("width", width / data.length)
                     .attr("height", newHeightFn(data));

                return this;
            };

            this.redraw = function() {
                var data = dataSource.getData();

                chart.selectAll("rect")
                     .data(data)
                     .transition()
                     .duration(500)
                     .attr("height", newHeightFn(data))
                     .attr("y", newyCoordFn(data));
            };
        };

        var kulutus = new Chart("kulutus", new RandomDataSource(12, 50)).draw();
        var tuotanto = new Chart("tuotanto", new RandomDataSource(12, 50)).draw();
        var erotus = new Chart("erotus", new RandomDataSource(12, 50)).draw();

        setInterval(function() {
            kulutus.redraw();
            tuotanto.redraw();
            erotus.redraw();
        }, 2000);
    };
})();