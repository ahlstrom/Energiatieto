define(["d3"], function(d3) {
    return function(element, dataSource) {
        var height = 100;
        var width = 300;

        var paddingLeft = 40;
        var paddingTop = 5;
        
        var labelDecimals = 2;
        var horizLinesCount = 3;

        var chart = d3.select(element)
                      .attr("width", width)
                      .attr("height", height);

        var getColumnMaxHeight = function() {
            return height - paddingTop;
        };

        var newHeightFn = function(data) {
            return function(d) {
                var maxHeight = Math.max.apply(this, data);
                if (maxHeight === 0) {
                    return 0;
                } else {
                    return (d / maxHeight) * getColumnMaxHeight();
                }
            };
        };

        var newyCoordFn = function(data) {
            return function(d) {
                return height - newHeightFn(data)(d);
            };
        };

        var createHorizLines = function (height, count, paddingTop) {
            var lines = [];
            for (var y=paddingTop; y<height; y += (height - paddingTop) / count)
                lines.push(Math.round(y));
            return lines;
        };        

        var getQuantiles = function (count, data) {
            var quantiles = [];
            
            var maxValue = Math.max.apply(this, data);            
            var interval = maxValue / count;
            
            var value = maxValue;

            for (var c=0; c < count; c++) {
                quantiles.push(value);
                value -= interval;
            }

            return quantiles;
        };

        var formatValue = function(value) {
            if (value <= 0)
                return "";
            else {
                return Math.round(value / 1000);
            }
        };

        this.draw = function() {
            var data = dataSource.getData();

            var columnAreaWidth = width - paddingLeft;
            var columnAreaHeight = height - paddingTop;
            var columnWidth = columnAreaWidth / data.length;

            chart
                .selectAll("line")
                .data(createHorizLines(height, horizLinesCount, paddingTop))
                .enter()
                .append("line")
                .attr("x1", paddingLeft)
                .attr("y1", function(d) { return d; })
                .attr("x2", width)
                .attr("y2", function(d) { return d; })
                .style("stroke-width", 1)
                .style("stroke", "rgb(160,160,160)")
                .attr("shape-rendering", "crispEdges");                

            chart
                 .selectAll("rect")
                 .data(data)
                 .enter()
                 .append("rect")
                 .attr("y", newyCoordFn(data))
                 .attr("x", function(d, i) { return paddingLeft + i * columnWidth; })
                 .attr("width", columnWidth)
                 .attr("height", newHeightFn(data));

            chart
                .selectAll("text")
                .data(getQuantiles(horizLinesCount, data))
                .enter()
                .append("text")
                .text(formatValue)
                .attr("font-size", "10px")
                .attr("fill", "black")
                .attr("text-anchor", "end")
                .attr("x", paddingLeft-2)
                .attr("y", function(d, i) { return paddingTop + 5 + i * (getColumnMaxHeight() / horizLinesCount); });

            return this;
        };

        this.redraw = function() {
            var data = dataSource.getData();

            chart
                .selectAll("text")
                .data(getQuantiles(horizLinesCount, data))
                .text(formatValue);

            chart.selectAll("rect")
                 .data(data)
                 .transition()
                 .duration(500)
                 .delay(function(d, i) { return i * 20; })
                 .attr("height", newHeightFn(data))
                 .attr("y", newyCoordFn(data));                
        };
    };
});