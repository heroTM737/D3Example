function legend() {
    var svg = d3.select(container_legend);

    var padding = 10;
    var x = radius + padding;
    var y = radius + padding;
    var margin = 10;

    var w = radius * 2 + 100 + padding * 2;
    var h = (radius * 2 + margin) * 3 - margin + padding * 2;
    svg.attr("width", w)
        .attr("height", h)
        .attr("viewBox", "0 0 " + w + " " + h)
        .attr("shape-rendering", "geometricPrecision");

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

var eventgraphAutoRefreshState = true;

function buttons(eventgraphIsMainGraphOn) {
    var svg = d3.select(container_buttons);
    svg.selectAll("*").remove();

    var padding = 5;
    var x = radius + padding;
    var y = radius + padding;
    var margin = 10;

    var w = radius * 2 + 100 + padding * 2;
    var h = (radius * 2 + margin) * 3 - margin + padding * 2;
    svg.attr("width", w)
        .attr("height", h)
        .attr("viewBox", "0 0 " + w + " " + h)
        .attr("shape-rendering", "geometricPrecision");

    var group = svg.append("g")
        .attr("class", "buttons-group");

    var playGroup = group.append("g")
        .attr("class", "playGroup")
        .on("click", function () {
            eventgraphAutoRefreshState = !eventgraphAutoRefreshState;
            buttons(eventgraphIsMainGraphOn);
        });

    var playButton = playGroup.append("rect")
        .attr("class", "eventgraph-button")
        .attr("x", x - radius)
        .attr("y", y - radius)
        .attr("width", radius * 2)
        .attr("height", radius * 2)
        .attr("rx", 5)
        .attr("ry", 5);
    if (eventgraphAutoRefreshState) {
        playGroup.append("path")
            .attr("d", function () {
                var p1 = (x - radius / 2) + " " + (y - radius / 2);
                var p2 = (x - radius / 2) + " " + (y + radius / 2);
                var p3 = (x + radius / 2) + " " + (y);

                return "M " + p1 + " L " + p2 + " L " + p3 + " L " + p1;
            });
    } else {
        playGroup.append("rect")
            .attr("x", x - radius * 3 / 8)
            .attr("y", y - radius / 2)
            .attr("width", radius / 4)
            .attr("height", radius);

        playGroup.append("rect")
            .attr("x", x + radius / 8)
            .attr("y", y - radius / 2)
            .attr("width", radius / 4)
            .attr("height", radius);
    }

    var homeGroup = group.append("g")
        .attr("class", function () {
            return "homeGroup " + (eventgraphIsMainGraphOn ? "on" : "off")
        })
        .on("click", function () {
            main_graph(eventgraphCurrentData);
        });

    var homeButton = homeGroup.append("rect")
        .attr("class", "eventgraph-button")
        .attr("x", x + radius * 2)
        .attr("y", y - radius)
        .attr("width", 43)
        .attr("height", radius * 2)
        .attr("rx", 5)
        .attr("ry", 5);

    var homeText = homeGroup.append("text")
        .attr("x", x + radius * 2 + padding)
        .attr("y", y)
        .attr("alignment-baseline", "central")
        .attr("text-anchor", "left")
        .text("home");

}