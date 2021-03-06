var radius = 5;
var rw = 70;
var rh = 15;
var y_margin = 5;
var x_margin = 300;
var shift_x = 100;
var shift_y = 40;
var text_length = 80;

function runTest() {
    var data = getFakedEventData();
    processData(data);

    //            $.ajax({
    //                type: "GET",
    //                url: "data/EventGraphData.json",
    //                dataType: "text",
    //                cache: false,
    //                success: function (data) {
    //                    console.log("success");
    //                    var result = JSON.parse(data);
    //                    processData(result);
    //                },
    //                error: function (response) {
    //                    console.log("error ");
    //                    console.log(response.responseText);
    //                }
    //            });
}

function processData(data) {
    var source_machines = d3.map();
    var target_machines = d3.map();
    var events = d3.map();
    var links = [];

    var nodes_data = data.nodes;
    var links_data = data.links;

    nodes_data.forEach(function (node_data, index) {
        if (node_data.type == "event") {
            var id = "e" + index + "e";
            events.set(id, {
                id: id,
                related_links: d3.map(),
                related_nodes: d3.map(),
                data: node_data
            });
        }
    });

    links_data.forEach(function (link_data, index) {
        var source_index = link_data.source;
        var target_index = link_data.target;

        var link = {
            id: "from" + source_index + "to" + target_index
        };

        if (nodes_data[source_index].type == "source_target") {
            var s_id = "s" + source_index + "s";
            var source = source_machines.get(s_id);
            if (source == null) {
                source = {
                    id: s_id,
                    related_links: d3.map(),
                    related_nodes: d3.map(),
                    data: nodes_data[source_index]
                };
                source_machines.set(s_id, source);
            }

            var e_id = "e" + target_index + "e";
            link.id = "from" + s_id + "to" + e_id;

            var event = events.get(e_id);
            event.related_nodes.set(source.id, source);
            event.related_links.set(link.id, link);

            source.related_links.set(link.id, link);
            source.related_nodes.set(e_id, event);

            link.source = source;
            link.target = event;
        } else {
            var t_id = "t" + target_index + "t";
            var target = target_machines.get(t_id);
            if (target == null) {
                target = {
                    id: t_id,
                    related_links: d3.map(),
                    related_nodes: d3.map(),
                    data: nodes_data[target_index]
                };
                target_machines.set(t_id, target);
            }

            var e_id = "e" + source_index + "e";
            link.id = "from" + e_id + "to" + t_id;

            var event = events.get(e_id);
            event.related_nodes.set(target.id, target);
            event.related_links.set(link.id, link);

            link.source = event;
            link.target = target;

            target.related_links.set(link.id, link);
            target.related_nodes.set(e_id, event);
        }

        links.push(link);
    });

    events.values().forEach(function (event, event_index) {
        event.related_nodes.forEach(function (node_key, node) {
            event.related_nodes.forEach(function (node2_key, node2) {
                if (node.id != node2.id) {
                    node.related_nodes.set(node2.id, node2);
                }
            });

            event.related_links.forEach(function (link_key, link) {
                node.related_links.set(link.id, link);
            });
        });
    });

    //convert map to data array
    source_machines.values().forEach(function (node, index) {
        node.related_nodes = node.related_nodes.values();
    });

    target_machines.values().forEach(function (node, index) {
        node.related_nodes = node.related_nodes.values();
    });

    source_machines = source_machines.values();
    target_machines = target_machines.values();
    events = events.values();

    visualizeData(source_machines, target_machines, events, links);
}

function machine_mouseover(d) {
    // bring related link to front
    d3.selectAll('.link').sort(function (a, b) {
        return d.related_links.has(a.id);
    });

    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', true);
    });

    //hightlight current machine
    d3.selectAll('#' + d.id).classed('machine-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (node, index) {
        if (node.data.type == "source_target") {
            d3.selectAll('#' + node.id).classed('machine-highlight', true);
        } else {
            d3.selectAll('#' + node.id).classed('event-highlight', true);
        }
    });

    //show tooltips
    showTooltips(getTooltips(d), d);
}

function machine_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current machine
    d3.selectAll('#' + d.id).classed('machine-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (node, index) {
        if (node.data.type == "source_target") {
            d3.selectAll('#' + node.id).classed('machine-highlight', false);
        } else {
            d3.selectAll('#' + node.id).classed('event-highlight', false);
        }
    });

    //hide tooltips
    hideTooltips();
}

function event_mouseover(d) {
    // bring related link to front
    d3.selectAll('.link').sort(function (a, b) {
        return d.related_links.has(a.id);
    });

    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', true);
    });

    //hightlight text
    d3.selectAll('#text' + d.id).classed('event-text-highlight', true);

    //hightlight current event
    d3.selectAll('#' + d.id).classed('event-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        if (node.data.type == "source_target") {
            d3.selectAll('#' + node.id).classed('machine-highlight', true);
        } else {
            d3.selectAll('#' + node.id).classed('event-highlight', true);
        }
    });

    showTooltips(getTooltips(d), d);
}

function event_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current event
    d3.selectAll('#' + d.id).classed('event-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        if (node.data.type == "source_target") {
            d3.selectAll('#' + node.id).classed('machine-highlight', false);
        } else {
            d3.selectAll('#' + node.id).classed('event-highlight', false);
        }
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
    var id = d.id;

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
        var x = d.source.y;
        var y = d.source.x;
        if (d.source.data.type == "event") {
            y = y + rw / 2;
        }
        return {
            "x": x,
            "y": y
        };
    })
    .target(function (d) {
        var x = d.target.y;
        var y = d.target.x;
        if (d.target.data.type == "event") {
            y = y - rw / 2;
        }
        return {
            "x": x,
            "y": y
        };
    })
    .projection(function (d) {
        return [d.y, d.x];
    });

function visualizeDataMachine(source_machines, target_machines, events, links) {

}

function visualizeData(source_machines, target_machines, events, links) {
    var max = d3.max([source_machines.length, target_machines.length, events.length]);
    var source_start = shift_y + (max - source_machines.length) / 2 * (radius * 2 + y_margin);
    var target_start = shift_y + (max - target_machines.length) / 2 * (radius * 2 + y_margin);
    var event_start = shift_y + (max - events.length) / 2 * (rh + y_margin);

    //define coordinate
    var center = {};
    center.radius = 400;
    center.x = shift_x + x_margin;
    center.y = shift_y + center.radius;

    var angle;
    var ratio = 0.5;
    source_machines.forEach(function (node, index) {
        angle = (index + 1 - source_machines.length / 2) * Math.PI / source_machines.length;
        angle = angle * ratio;
        node.x = shift_x + center.radius - center.radius * Math.cos(angle);
        node.y = shift_y + center.radius - center.radius * Math.sin(angle);
    });

    target_machines.forEach(function (node, index) {
        angle = (index + 1 - target_machines.length / 2) * Math.PI / target_machines.length;
        angle = angle * ratio;
        node.x = shift_x + center.radius + center.radius * Math.cos(angle);
        node.y = shift_y + center.radius - center.radius * Math.sin(angle);
    });

    events.forEach(function (event, index) {
        event.x = shift_x + center.radius;
        event.y = event_start + index * (rh + y_margin);
    });



    //render
    var svg = d3.select("body")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 1000);

    var link = svg.selectAll("path")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", diagonal);

    var source = svg.selectAll("circle.source")
        .data(source_machines)
        .enter().append("circle")
        .attr("class", "machine source")
        .attr('id', function (d) {
            return d.id;
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

    var source_text = svg.selectAll("text.source")
        .data(source_machines)
        .enter()
        .append("text")
        .attr("class", "text machine-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("x", function (d) {
            return d.x - text_length;
        })
        .attr("y", function (d) {
            return d.y + radius;
        })
        .text(function (d) {
            return d.data.name;
        });

    var target = svg.selectAll("circle.target")
        .data(target_machines)
        .enter().append("circle")
        .attr("class", "machine target")
        .attr('id', function (d) {
            return d.id;
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

    var target_text = svg.selectAll("text.target")
        .data(target_machines)
        .enter()
        .append("text")
        .attr("class", "text machine-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("x", function (d) {
            return d.x + radius * 2;
        })
        .attr("y", function (d) {
            return d.y + radius;
        })
        .text(function (d) {
            return d.data.name;
        });

    var event = svg.selectAll("rect")
        .data(events)
        .enter().append("rect")
        .attr("class", "event")
        .attr('id', function (d) {
            return d.id;
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

    var event_text = svg.selectAll("text.event")
        .data(events)
        .enter()
        .append("text")
        .attr("class", "text event-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("x", function (d) {
            var length = d.data.name.length * 7
            return d.x - length / 2;
        })
        .attr("y", function (d) {
            return d.y + radius;
        })
        .text(function (d) {
            return d.data.name;
        });
}

runTest();