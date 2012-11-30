define([
        "underscore", 
        "d3", 
        "jquery",
        "chart.utilities",
        "tipsy"
    ], function(_, d3, $, Utils) {
    return function(element, dataSource, options) {
        var height = 100,
            width = (options && options.width) || 270,
            columnAreaWidth = width - 60,
            self = this,

            paddingLeft = 40,
            paddingTop = 5,
            paddingBottom = 16,
            chartHeight = height - paddingBottom,
            columnGap = 2,

            zeroPoint = 84,
        
            labelDecimals = 2,
            horizLinesCount = 4,
            quantileCount = 2;

            chart = d3.select(element)
                      .attr("width", width)
                      .attr("height", height);

        var getColumnMaxHeight = function() {
            return chartHeight - paddingTop;
        };

        var datumHeight = function(data, d, range) {
            var height = Utils.height(d, getColumnMaxHeight(), range.max, range.min);
            //var height = Utils.heightOfElement(data, d, getColumnMaxHeight());
            return (isNaN(height) ? 0 : height);
        };

        var newHeightFn = function(data, range) {
            return function(d) {
                return datumHeight(data, d, range);
            };
        };

        var newyCoordFn = function(data, range) {
            return function(d) {
                var zeroPoint = Utils.zeroPointOffset(data, getColumnMaxHeight(), range.max, range.min) + paddingTop + 1;
                if (d < 0) {
                    return zeroPoint;
                } else {
                    return zeroPoint - datumHeight(data, d, range) - 1;
                }
            };
        };

        var createHorizLines = function (range, count, paddingTop) {
            var lines   = Utils.quantilesBetween(range.max, range.min, horizLinesCount),
                offsets = Utils.offsets(lines, chartHeight - paddingTop, range.max, range.min);

            return _.map(offsets, function(it) {
                return it + paddingTop;
            });
        };        

        var drawQuantiles = function(range) {
            var quantileText = function(d,i) {
                return Math.round(d);
            };

            var i = 0,
                lines = _.filter(
                    Utils.quantilesBetween(range.max, range.min, horizLinesCount), 
                    function(it) {
                        return (i++ % quantileCount === 0);
                    }),
                offsets = Utils.offsets(lines, chartHeight - paddingTop, range.max, range.min);

            var quants = 
                d3.select(element)
                    .selectAll("text.quantile")
                    .data(lines);

            quants
                .attr("x", paddingLeft-20)
                .attr("y", function(d, i) {
                    return offsets[i] + 8;
                 })
                .text(quantileText);

            quants.enter()
                .append("text")
                .text(quantileText)
                .attr("class", "quantile")
                .attr("text-anchor", "middle")
                .attr("x", paddingLeft-20)
                .attr("y", function(d, i) { 
                    return offsets[i] + 8;
                });

            quants.exit().remove();
        };

        var onclickdelegate = function() {
            self.onclick.apply(self.onclick, arguments);
        };

        var drawValuelines = function(range) {
            // zero point
            var zeroPoint = getColumnMaxHeight() + paddingTop;
            if (range.max !== range.min) {
                zeroPoint = Utils.offset(0, getColumnMaxHeight(), range.max, range.min) + paddingTop;
            }
            var zeroLine = d3.select(element)
                                .selectAll("line.zero")
                                .data([ zeroPoint ]);

        
            zeroLine
                .enter()
                .insert("line", ":first-child")
                .attr("class", "zero")
                .attr("x1", paddingLeft)
                .attr("y1", function(d) { return d; })
                .attr("x2", width)
                .attr("y2", function(d) { return d; })
                .style("stroke-width", 1)
                .attr("shape-rendering", "crispEdges");


            zeroLine
                .transition()
                .duration(500)
                .attr("y1", function(d) { return d; })
                .attr("y2", function(d) { return d; })
                .attr("class", "zero");

            var valueLines = d3.select(element)
                        .selectAll("line.value")
                        .data(createHorizLines(range, horizLinesCount, paddingTop));

            valueLines
                .enter()
                .insert("line", ":first-child")
                .attr("class", "value")
                .attr("x1", paddingLeft)
                .attr("y1", function(d) { return d; })
                .attr("x2", width)
                .attr("y2", function(d) { return d; })
                .style("stroke-width", 1)
                .attr("shape-rendering", "crispEdges");

            valueLines
                .transition()
                .duration(500)
                .attr("y1", function(d) { return d; })
                .attr("y2", function(d) { return d; });

            valueLines.exit().remove();
        };

        this.onclick = function() {};

        this.draw = function() {
            var series = dataSource.getData(),
                total = series.total,
                range = dataSource.getRange();

            //var columnAreaWidth = width - paddingLeft;
            var columnAreaHeight = height - paddingTop;
            var columnWidth = columnAreaWidth / dataSource.numDataPoints();

            // categories
            var categories = chart
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
                .attr("x", function(d, i) { return paddingLeft + 10 + i * columnWidth + (columnWidth / 2) - 5; });

            var layers = 
                 d3.select(element)
                    .selectAll("g.layer")
                    .data(dataSource.getSeries());

            layers.enter()
                .append("g")
                .attr("class", function(d) {
                    return "layer " + d;
                });

            layers.exit().remove();
            
            d3.select(element).selectAll("g.layer").each(function(name) {
                var data = series[name];
                if (typeof data[0] !== "number") {
                    return;
                }

                var rect = d3.select(this)
                            .selectAll("rect")
                            .data(data);

                rect.enter()
                    .append("rect")
                    .attr("y", newyCoordFn(data, range))
                    .attr("x", function(d, i) {
                        return paddingLeft + 10 + i * columnWidth; })
                    .attr("width", columnWidth - columnGap)
                    .attr("height", newHeightFn(data, range));


                rect.exit().remove();

                rect.on("click", onclickdelegate)
                    .attr("title", function(d) {
                        return d;
                    })
                    .transition()
                    .duration(500)
                    .attr("y", newyCoordFn(data, range))
                    .attr("x", function(d, i) {
                        return paddingLeft + 10 + i * columnWidth; 
                    })
                    .attr("width", columnWidth - columnGap)
                    .attr("height", newHeightFn(data, range))
                    .attr("class", function(d) {
                        return d < 0 ? "negative": "";
                    }).each(function() {
                        $(this).tipsy({ gravity: 's' });
                    });
            });

            
            drawValuelines(range);

            if (options.showQuantiles) {
                drawQuantiles(range);
            }

            return this;
        };

        this.redraw = function() {
            this.draw();
        };
    };
});