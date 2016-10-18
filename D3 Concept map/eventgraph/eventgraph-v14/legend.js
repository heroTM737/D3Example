function legend(configVar) {
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

function buttons(configVar) {
    if (!configVar.eventgraphIsMainGraphOn) {
        var svg = d3.select(configVar.container);

        var margin = 5;
        var originalHomeImageSize = 98;
        var scale = 0.3;
        var text = configVar.textConstants.centerNode + ": " + configVar.graphDescription;
        var textWidth = text.length * configVar.character_length;
        var textHeight = 15;

        var group = svg.append("g")
            .attr("class", "buttons-group");

        var homeGroup = group.append("g")
            .attr("class", function () {
                return "homeGroup";
            })
            .on("click", function () {
                main_graph(configVar);
            });

        var homeButton = homeGroup.append("circle")
            .attr("class", "homeButton")
            .attr("cx", configVar.center.x)
            .attr("cy", margin + originalHomeImageSize * scale / 2)
            .attr("r", originalHomeImageSize * scale / 2);

        var homeImage = homeGroup.append("path")
            .attr("class", "homeImage")
            .attr("transform", function (d) {
                var tx = configVar.center.x / scale - originalHomeImageSize / 2;
                var ty = margin / scale;
                return "scale(" + scale + ") translate(" + tx + " " + ty + ")";
            })
            .attr("d", "M50,30.8l17.4,13.6v24.5H55.3V53.8H44.8v15.2H32.7V44.4L50,30.8z M67.4,44.6 M50,1C22.9,1,1,22.9,1,50s21.9,49,49,49s49-21.9,49-49S77.1,1,50,1z");

        var graphBox = group.append("rect")
            .attr("class", function () {
                var additionalClassName = "";
                if (configVar.node_center.type == "event") {
                    additionalClassName = "graphBoxEvent"
                } else if (configVar.node_center.type == "source") {
                    additionalClassName = "graphBoxSource"
                } else {
                    additionalClassName = "graphBoxTarget"
                }
                return "graphBox " + additionalClassName;
            })
            .attr("x", configVar.center.x - textWidth / 2)
            .attr("y", originalHomeImageSize * scale + margin + textHeight / 2)
            .attr("width", textWidth)
            .attr("height", textHeight + margin * 2);

        var text_y = originalHomeImageSize * scale + margin * 2 + textHeight;
        var graphText = group.append("text")
            .attr("class", "graphText")
            .attr("x", configVar.center.x)
            .attr("y", text_y)
            //            .attr("alignment-baseline", "central")
            //            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return text;
            });

        var item = graphText[0][0];
        var item_h = item.getBoundingClientRect().height;
        item.setAttribute("y", text_y + item_h / 4);
    }
}