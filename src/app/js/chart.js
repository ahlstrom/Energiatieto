define(["d3"], function(d3) {
    return function(element, dataSource) {
        var height = 100;
        var width = 300;

        var chart = d3.select(element)
                      .attr("width", width)
                      .attr("height", height);


        var newHeightFn = function(data) {
            return function(d) {
                var maxHeight = Math.max.apply(this, data);
                if (maxHeight === 0) {
                    return 0;
                } else {
                    return (d / maxHeight) * height;
                }
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
});