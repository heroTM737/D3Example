function simpleLineChart(container, data, width, height) {
    //clean container
    d3.select(container).selectAll("*").remove();

    //init variable
    let w = width - 6;
    let h = height - 6;
    let startX = 0;
    let startY = 0;
    let endX = w;
    let endY = h;
    let path_fill = null;
    // let path = null;

    let svg = d3.select(container).append("svg").attr("width", width).attr("height", height);
    let lineGroup = svg.append("g").attr("transform", "translate(3, 3)");

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

        if (path_fill == null) {
            path_fill = lineGroup.append("path")
                .attr("d", line(data) + "   L" + endX + "," + (endY + 1) + "L" + startX + "," + (endY + 1) + "Z")
                .attr("class", "trendLineChartFill");

            // path = lineGroup.append("path")
            //     .attr("d", line(data))
            //     .attr("class", "trendLineChart");
        } else {
            path_fill.transition()
                .duration(500)
                .ease("linear")
                .attr("d", line(data) + "   L" + endX + "," + (endY + 1) + "L" + startX + "," + (endY + 1) + "Z");

            // path.transition()
            //     .duration(500)
            //     .ease("linear")
            //     .attr("d", line(data));
        }
    }

    update(data);

    return { update };
}

module.exports = simpleLineChart;
