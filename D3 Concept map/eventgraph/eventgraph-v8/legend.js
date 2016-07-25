function legend() {
    var svg = d3.select("svg");

    var x = 30;
    var y = 30;
    var margin = 10;

    var legend_group = svg.append("g")
        .attr("class", "legend-group")
        .attr("transform", "translate(" + (box.width - (x + radius + margin + 150)) + ", 1)");

    var machine_source = legend_group.append("circle")
        .attr("class", "machine source")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", radius);

    var machine_source_text = legend_group.append("text")
        .attr("class", "text event-text")
        .attr("alignment-baseline", "central")
        .attr("x", x + radius + margin)
        .attr("y", y)
        .text("source node");

    var machine_target = legend_group.append("circle")
        .attr("class", "machine target")
        .attr("cx", x)
        .attr("cy", y * 2)
        .attr("r", radius);

    var machine_target_text = legend_group.append("text")
        .attr("class", "text event-text")
        .attr("alignment-baseline", "central")
        .attr("x", x + radius + margin)
        .attr("y", y * 2)
        .text("target node");

    var event = legend_group.append("rect")
        .attr("class", "event")
        .attr("x", x - radius)
        .attr("y", y * 3 - radius)
        .attr("width", radius * 2)
        .attr("height", radius * 2);

    var event_text = legend_group.append("text")
        .attr("class", "text event-text")
        .attr("alignment-baseline", "central")
        .attr("x", x + radius + margin)
        .attr("y", y * 3)
        .text("event");
}