define(["underscore", "d3", "jquery", "tipsy"], function(_, d3, $) {
    return function(element, dataSource) {
        var height = 100;
        var width = 270;

        var paddingLeft = 40;
        var paddingTop = 5;
        
        var labelDecimals = 2;
        var horizLinesCount = 6;
        var quantileCount = 2;

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

            for (var c=1; c < count; c++) {
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

        var drawQuantiles = function(total) {
            chart
                .selectAll("text.quantile")
                .data(getQuantiles(horizLinesCount, total))
                .enter()
                .append("text")
                .attr("class", "quantile")
                .text(function(d,i) {
                    return ((i + 1) % quantileCount === 0 ? d : "");
                })
                .attr("text-anchor", "end")
                .attr("x", paddingLeft-2)
                .attr("y", function(d, i) { return paddingTop + 5 + i * (getColumnMaxHeight() / horizLinesCount); });
        };

        var layers;

        this.draw = function() {
            var series = dataSource.getData();
            var total = series.total;

            var columnAreaWidth = width - paddingLeft;
            var columnAreaHeight = height - paddingTop;
            var columnWidth = columnAreaWidth / dataSource.numDataPoints();

            // value lines
            chart
                .selectAll("line.value")
                .data(createHorizLines(height, horizLinesCount, paddingTop))
                .enter()
                .append("line")
                .attr("class", "value")
                .attr("x1", paddingLeft)
                .attr("y1", function(d) { return d; })
                .attr("x2", width)
                .attr("y2", function(d) { return d; })
                .style("stroke-width", 1)
                .attr("shape-rendering", "crispEdges");

            // categories
            chart
                .selectAll("text.category")
                .data(function(d, i) {
                    return _.range(1, _.max(_(dataSource.getData()).map(function(it) {
                        return it.length;
                    })) + 1);
                })
                .enter()
                .append("text")
                .text(String)
                .attr("class", "category")
                .attr("y", height - 2)
                .attr("x", function(d, i) { return paddingLeft + i * columnWidth; });

            layers = chart
                .selectAll("g.layer")
                .data(dataSource.getSeries())
                .enter()
                .append("g")
                .attr("class", function(d) {
                    return "layer " + d;
                });

            layers
                .selectAll("rect")
                .data(function(d) {
                    return series[d]; 
                })
                .enter()
                .append("rect")
                .datum(function(d) {
                    return series[d];
                })
                .attr("title", function(d) {
                    return d;
                })
                .attr("y", newyCoordFn(total))
                .attr("x", function(d, i) { return paddingLeft + i * columnWidth; })
                .attr("width", columnWidth)
                .attr("height", newHeightFn(total))
                .each(function() {
                    $(this).tipsy({ gravity: 's' });
                });

            drawQuantiles(series.total);

            return this;
        };

        this.redraw = function() {
            var series = dataSource.getData();
            var data = series.total;

            drawQuantiles(series.total);

            layers.selectAll("rect")
                 .data(function(d) {
                    return series[d];
                 })
                 .transition()
                 .duration(500)
                 .attr("height", newHeightFn(data))
                 .attr("y", newyCoordFn(data))
                 .attr("title", function(d) {
                    return Math.round(d / 1000) + 'kWh';
                });
        };
    };
});