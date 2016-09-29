function legend(configVar) {
    var svg = d3.select(configVar.container);

    var radius = configVar.node_radius;
    var padding = 10;
    var x = radius + padding;
    var y = radius + padding;
    var margin = 10;

    var w = radius * 2 + 100 + padding * 2;
    var h = (radius * 2 + margin) * 3 - margin + padding * 2;

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
        .text("source node");

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
        .text("target node");

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
        .text("event");
}

function buttons(eventgraphIsMainGraphOn, configVar) {
    var svg = d3.select(configVar.container);

    var radius = configVar.node_radius;
    var padding = 5;
    var button_width = 44;

    var group = svg.append("g")
        .attr("class", "buttons-group");

    var homeGroup = group.append("g")
        .attr("class", function () {
            return "homeGroup " + (eventgraphIsMainGraphOn ? "on" : "off")
        })
        .on("click", function () {
            main_graph(configVar);
        });

    var homeButton = homeGroup.append("rect")
        .attr("class", "eventgraph-button")
        .attr("x", configVar.center.x - button_width / 2)
        .attr("y", padding)
        .attr("width", button_width)
        .attr("height", radius * 2)
        .attr("rx", 5)
        .attr("ry", 5);

    var homeText = homeGroup.append("text")
        .attr("x", configVar.center.x)
        .attr("y", padding + radius)
        .attr("alignment-baseline", "central")
        .attr("text-anchor", "middle")
        .text("home");

    var graphText = homeGroup.append("text")
        .attr("x", configVar.center.x)
        .attr("y", padding + radius * 3)
        .attr("alignment-baseline", "central")
        .attr("text-anchor", "middle")
        .text(configVar.graphDescription);

}