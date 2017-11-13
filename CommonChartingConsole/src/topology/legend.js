function eventGraphLegend(configVar) {
    var svg = d3.select(configVar.container_legend);

    var textConstants = configVar.textConstants;

    var radius = configVar.node_radius;
    var padding = 10;
    var x = radius + padding;
    var y = radius + padding;
    var margin = 10;

    var w = radius * 2 + 100 + padding * 2;
    var h = (radius * 2 + margin) * 3 - margin + padding * 2;

    var svg_width = x + radius + margin + textConstants.sourceNode.length * configVar.character_length + margin;
    var svg_height = margin + (radius * 2 + margin) * 3;
    svg.attr("width", svg_width).attr("height", svg_height);

    var legend_group = svg.append("g")
        .attr("class", "legend-group");

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
        .text(textConstants.sourceNode);

    var machine_target = legend_group.append("circle")
        .attr("class", "machine target")
        .attr("cx", x)
        .attr("cy", padding + radius * 2 + margin + radius)
        .attr("r", radius);

    var machine_target_text = legend_group.append("text")
        .attr("class", "text event-text")
        .attr("alignment-baseline", "central")
        .attr("x", x + radius + margin)
        .attr("y", padding + radius * 2 + margin + radius)
        .text(textConstants.targetNode);

    var event = legend_group.append("rect")
        .attr("class", "event")
        .attr("x", x - radius)
        .attr("y", padding + (radius * 2 + margin) * 2)
        .attr("width", radius * 2)
        .attr("height", radius * 2);

    var event_text = legend_group.append("text")
        .attr("class", "text event-text")
        .attr("alignment-baseline", "central")
        .attr("x", x + radius + margin)
        .attr("y", padding + (radius * 2 + margin) * 2 + radius)
        .text(textConstants.event);
}

module.exports = eventGraphLegend;
