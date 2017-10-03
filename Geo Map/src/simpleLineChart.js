function simpleLineChart(container, data, w, h) {
    let w = width;
    let h = height;
    let startX = 0;
    let startY = 0;
    let endX = w;
    let endY = h;
    let path_fill = null;
    let path = null;

    let update = function (data) {
        let maxOfData = Math.max.apply(Math, data);
        let minOfData = Math.min.apply(Math, data);
        let x = d3.scale.linear().domain([0, data.length - 1]).range([0, (endX - startX)]);
        let y = d3.scale.linear().domain([minOfData, maxOfData]).range([(endY - startY), 0]);
    
        let line = d3.svg.line()
            .x(function (d, i) {
                return x(i);
            })
            .y(function (d) {
                return y(d);
            })
            .interpolate("monotone");

        if (path == null) {
            path_fill = lineGroup.append("path")
            	.attr("d", line(currentData) + "   L" + endX + "," + endY + "L" + startX + "," + startY + "Z")
            	.attr("class", "trendLineChartFill");

            path = lineGroup.append("path")
                .attr("d", line(currentData))
                .attr("class", "trendLineChart");
        } else {
            path_fill.transition()
            	.duration(500)
            	.ease("linear")
            	.attr("d", line(currentData) + "   L" + endX + "," + endY + "L" + startX + "," + startY + "Z");

            path.transition()
                .duration(500)
                .ease("linear")
                .attr("d", line(currentData));
        }
    }

    update(data);

    return { update };
}

module.exports = simpleLineChart;
