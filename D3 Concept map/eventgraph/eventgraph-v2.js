var radius = 5;
var rw = 20;
var rh = 10;

function runFakedEventData() {
    var result = getFakedEventData();

    var machines = [];
    var events = [];
    var links = [];

    for (var i in result.nodes){
        if (result.nodes[i].type == "event") {
            events.push({
                x: 300,
                y: 50 + events.length * (rh + 5),
                data: result.nodes[i]
            });
            result.nodes[i].cindex = events.length - 1;
        } else if (result.nodes[i].type == "source_target") {
            machines.push({
                x: 50 + (machines.length % 2) * 500,
                y: 100 + machines.length * radius * 2,
                data: result.nodes[i]
            });
            result.nodes[i].cindex = machines.length - 1;
        } 
    }

    for (var i in result.links) {
        var source = result.links[i].source;
        var target = result.links[i].target;
        var link = {
            source: {
                x: 0,
                y: 0
            },
            target: {
                x: 0,
                y: 0
            }
        };

        if (result.nodes[source].type == "event") {
            link.source.x = events[result.nodes[source].cindex].x;
            link.source.y = events[result.nodes[source].cindex].y;
        } else if (result.nodes[source].type == "source_target") {
            link.source.x = machines[result.nodes[source].cindex].x;
            link.source.y = machines[result.nodes[source].cindex].y;
        }

        if (result.nodes[target].type == "event") {
            link.target.x = events[result.nodes[target].cindex].x;
            link.target.y = events[result.nodes[target].cindex].y;
        } else if (result.nodes[target].type == "source_target") {
            link.target.x = machines[result.nodes[target].cindex].x;
            link.target.y = machines[result.nodes[target].cindex].y;
        }

        links.push(link);
    }

    visualizeData(events, machines, links);
}

function processData(data) {
    
}

function machine_mouseover(d) {
    // bring to front
    var d_id = "x" + d.x + "xy" + d.y + "y";

    d3.selectAll('.link').sort(function (a, b) {
        var s_id = "x" + a.source.x + "xy" + a.source.y + "y";
        var t_id = "x" + a.target.x + "xy" + a.target.y + "y";

        return (d_id == s_id) || (d_id == t_id);
    });

    //hightlight
    var id = "x" + d.x + "xy" + d.y + "y";
    d3.selectAll('#' + id).classed('machine-highlight', true);

    d3.selectAll(".link[id*='s" + id + "']")
        .classed('link-highlight', true)
        .each(function (d, i) {
            var s_id = "x" + d.source.x + "xy" + d.source.y + "y";
            var t_id = "x" + d.target.x + "xy" + d.target.y + "y";

            d3.selectAll(".event[id*='" + t_id + "']").classed('event-highlight', true);

            d3.selectAll(".link[id*='s" + t_id + "']")
                .classed('link-highlight', true)
                .each(function (d, i) {
                    var target_id = "x" + d.target.x + "xy" + d.target.y + "y";
                    d3.select(".machine[id='" + target_id + "']").classed('machine-highlight', true);
                });
        });

    d3.selectAll(".link[id*='t" + id + "']")
        .classed('link-highlight', true)
        .each(function (d, i) {
            var s_id = "x" + d.source.x + "xy" + d.source.y + "y";
            var t_id = "x" + d.target.x + "xy" + d.target.y + "y";

            d3.selectAll(".event[id*='" + s_id + "']").classed('event-highlight', true);

            d3.selectAll(".link[id*='t" + s_id + "']")
                .classed('link-highlight', true)
                .each(function (d, i) {
                    var source_id = "x" + d.source.x + "xy" + d.source.y + "y";
                    d3.select(".machine[id='" + source_id + "']").classed('machine-highlight', true);
                });
        });

    //show tooltips
    showTooltips(getTooltips(d), d);
}

function machine_mouseout(d) {
    var id = "x" + d.x + "xy" + d.y + "y";
    var d_id = id;
    d3.selectAll('#' + id).classed('machine-highlight', false);

    d3.selectAll(".link[id*='s" + id + "']")
        .classed('link-highlight', false)
        .each(function (d, i) {
            var s_id = "x" + d.source.x + "xy" + d.source.y + "y";
            var t_id = "x" + d.target.x + "xy" + d.target.y + "y";

            d3.selectAll(".event[id*='" + t_id + "']").classed('event-highlight', false);

            d3.selectAll(".link[id*='s" + t_id + "']")
                .classed('link-highlight', false)
                .each(function (d, i) {
                    var target_id = "x" + d.target.x + "xy" + d.target.y + "y";
                    d3.select(".machine[id='" + target_id + "']").classed('machine-highlight', false);
                });
        });

    d3.selectAll(".link[id*='t" + id + "']")
        .classed('link-highlight', false)
        .each(function (d, i) {
            var s_id = "x" + d.source.x + "xy" + d.source.y + "y";
            var t_id = "x" + d.target.x + "xy" + d.target.y + "y";

            d3.selectAll(".event[id*='" + s_id + "']").classed('event-highlight', false);

            d3.selectAll(".link[id*='t" + s_id + "']")
                .classed('link-highlight', false)
                .each(function (d, i) {
                    var source_id = "x" + d.source.x + "xy" + d.source.y + "y";
                    d3.select(".machine[id='" + source_id + "']").classed('machine-highlight', false);
                });
        });

    hideTooltips();
}

function event_mouseover(d) {
    // bring to front
    var d_id = "x" + d.x + "xy" + d.y + "y";

    d3.selectAll('.link').sort(function (a, b) {
        var s_id = "x" + a.source.x + "xy" + a.source.y + "y";
        var t_id = "x" + a.target.x + "xy" + a.target.y + "y";

        return (d_id == s_id) || (d_id == t_id);
    });

    //hightlight
    var id = "x" + d.x + "xy" + d.y + "y";
    d3.selectAll('#' + "x" + d.x + "xy" + d.y + "y").classed('event-highlight', true);

    d3.selectAll(".link[id*='t" + id + "']")
        .classed('link-highlight', true)
        .each(function (d, i) {
            var source_id = "x" + d.source.x + "xy" + d.source.y + "y";
            d3.select(".machine[id='" + source_id + "']").classed('machine-highlight', true);
        });

    d3.selectAll(".link[id*='s" + id + "']")
        .classed('link-highlight', true)
        .each(function (d, i) {
            var target_id = "x" + d.target.x + "xy" + d.target.y + "y";
            d3.select(".machine[id='" + target_id + "']").classed('machine-highlight', true);
        });

    showTooltips(getTooltips(d), d);
}

function event_mouseout(d) {
    var id = "x" + d.x + "xy" + d.y + "y";
    d3.selectAll('#' + id).classed('event-highlight', false);

    d3.selectAll(".link[id*='t" + id + "']")
        .classed('link-highlight', false)
        .each(function (d, i) {
            var source_id = "x" + d.source.x + "xy" + d.source.y + "y";
            d3.select(".machine[id='" + source_id + "']").classed('machine-highlight', false);
        });

    d3.selectAll(".link[id*='s" + id + "']")
        .classed('link-highlight', false)
        .each(function (d, i) {
            var target_id = "x" + d.target.x + "xy" + d.target.y + "y";
            d3.select(".machine[id='" + target_id + "']").classed('machine-highlight', false);
        });

    hideTooltips();
}

var tooltip = d3.select(".tooltip");
if (tooltip.empty()) {
    tooltip = d3.select("body").append("div").attr("class", "tooltip");
}
tooltip.classed("hidden", true);

function getTooltips(d) {
    var tip = "";
    tip += d.data.typeLabel + ": ";
    tip += d.data.name;
    tip += "<br/>Count: "; // This needs to be localized.
    tip += d.data._weight;

    return tip;
}

function showTooltips(text, d) {
    var id = "x" + d.x + "xy" + d.y + "y";

    var top = $("#" + id).offset().top;
    var left = $("#" + id).offset().left + 10;
    if (d.data.type == "event") {
        top -= rh;
        left += rw;
    } else if (d.data.type == "source_target") {
        top -= radius;
        left += radius;
    }
    tooltip.classed("hidden", false);
    tooltip.attr("style", "top:" + top + "px;" + "left:" + left + "px");
    tooltip.html(text);
}

function hideTooltips() {
    tooltip.classed("hidden", true);
}

var diagonal = d3.svg.diagonal()
    .source(function (d) {
        return {
            "x": d.source.y,
            "y": d.source.x
        };
    })
    .target(function (d) {
        return {
            "x": d.target.y,
            "y": d.target.x
        };
    })
    .projection(function (d) {
        return [d.y, d.x];
    });

function visualizeData(events, machines, links) {
    var svg = d3.select("body")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 1000);
    console.log(links);
    var link = svg.selectAll("path")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return "s" +
                "x" + d.source.x + "x" +
                "y" + d.source.y + "y" +
                "t" +
                "x" + d.target.x + "x" +
                "y" + d.target.y + "y";
        })
        .attr("d", diagonal);

    var machine = svg.selectAll("circle")
        .data(machines)
        .enter().append("circle")
        .attr("class", "machine")
        .attr('id', function (d) {
            return "x" + d.x + "xy" + d.y + "y";
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return radius;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout);

    var event = svg.selectAll("rect")
        .data(events)
        .enter().append("rect")
        .attr("class", "event")
        .attr('id', function (d) {
            return "x" + d.x + "xy" + d.y + "y";
        })
        .attr("x", function (d) {
            return d.x - rw / 2;
        })
        .attr("y", function (d) {
            return d.y - rh / 2;
        })
        .attr("width", rw)
        .attr("height", rh)
        .on("mouseover", event_mouseover)
        .on("mouseout", event_mouseout);
}

runFakedEventData();