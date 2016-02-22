var radius = 5;
var rw = 10;
var rh = 10;
var y_margin = 5;
var x_margin = 300;
var shift_x = 40;
var shift_y = 40;

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
        //        node_data.id = node_data.id.split(' ').join('_');
        if (node_data.type == "event") {
            var id = "e" + index + "e";
            events.set(id, {
                id: id,
                related_links: [],
                related_nodes: []
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
                    related_nodes: d3.map()
                };
                source_machines.set(s_id, source);
            }

            var e_id = "e" + target_index + "e";
            var event = events.get(e_id);
            event.related_nodes.push(source);
            event.related_links.push(link);

            link.source = source;
            link.target = event;
            link.id = "from" + s_id + "to" + e_id;

            source.related_links.set(link.id, link);
            source.related_nodes.set(e_id, event);
        } else {
            var t_id = "t" + target_index + "t";
            var target = target_machines.get(t_id);
            if (target == null) {
                target = {
                    id: t_id,
                    related_links: d3.map(),
                    related_nodes: d3.map()
                };
                target_machines.set(t_id, target);
            }

            var e_id = "e" + source_index + "e";
            var event = events.get(e_id);
            event.related_nodes.push(target);
            event.related_links.push(link);

            link.source = event;
            link.target = target;
            link.id = "from" + e_id + "to" + t_id;

            target.related_links.set(link.id, link);
            target.related_nodes.set(e_id, event);
        }

        links.push(link);
    });

    events.values().forEach(function (event, event_index) {
        var node0 = event.related_nodes[0];
        var node1 = event.related_nodes[1];
        node0.related_nodes.set(node1.id, node1);
        node1.related_nodes.set(node0.id, node0);

        event.related_nodes.forEach(function (node, node_index) {
            event.related_links.forEach(function (link, link_index) {
                node.related_links.set(link.id, link);
            });
        });
    });

    //convert map to data array
    source_machines.values().forEach(function (node, index) {
        node.related_nodes = node.related_nodes.values();
        node.related_links = node.related_links.values();
    });

    target_machines.values().forEach(function (node, index) {
        node.related_nodes = node.related_nodes.values();
        node.related_links = node.related_links.values();
    });

    source_machines = source_machines.values();
    target_machines = target_machines.values();
    events = events.values();

    visualizeData(source_machines, target_machines, events, links);
}

function machine_mouseover(d) {
    var m_id = d.id;

    // bring related link to front
    d3.selectAll('.link').sort(function (a, b) {
        var s_id = a.source.id;
        var t_id = a.target.id;

        return (m_id == s_id) || (m_id == t_id);
    });

    //hightlight related link
    d.related_links.forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', true);
    });

    //hightlight current machine
    d3.selectAll('#' + m_id).classed('machine-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (node, index) {
        d3.selectAll('#' + node.id).classed('machine-highlight', true);
    });

    //show tooltips
    //    showTooltips(getTooltips(d), d);
}

function machine_mouseout(d) {
    var m_id = d.id;

    //hightlight related link
    d.related_links.forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current machine
    d3.selectAll('#' + m_id).classed('machine-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (node, index) {
        d3.selectAll('#' + node.id).classed('machine-highlight', false);
    });

    //hide tooltips
    //    hideTooltips();
}

function event_mouseover(d) {
    var e_id = d.id;

    // bring related link to front
    d3.selectAll('.link').sort(function (a, b) {
        var s_id = a.source.id;
        var t_id = a.target.id;

        return (e_id == s_id) || (e_id == t_id);
    });

    //hightlight related link
    d.related_links.forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', true);
    });

    //hightlight current event
    d3.selectAll('#' + e_id).classed('event-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (node, index) {
        d3.selectAll('#' + node.id).classed('machine-highlight', true);
    });

    //    showTooltips(getTooltips(d), d);
}

function event_mouseout(d) {
    var e_id = d.id;

    //hightlight related link
    d.related_links.forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current event
    d3.selectAll('#' + e_id).classed('event-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (node, index) {
        d3.selectAll('#' + node.id).classed('machine-highlight', false);
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

function visualizeData(source_machines, target_machines, events, links) {
    var max = d3.max([source_machines.length, target_machines.length, events.length]);
    var source_start = shift_y + (max - source_machines.length) / 2 * (radius * 2 + y_margin);
    var target_start = shift_y + (max - target_machines.length) / 2 * (radius * 2 + y_margin);
    var event_start = shift_y + (max - events.length) / 2 * (rh + y_margin);

    //define coordinate
    var center = {};
    center.radius = max / 2 * (rh + y_margin);
    center.x = shift_x + x_margin;
    center.y = shift_y + center.radius;

    var angle;
    source_machines.forEach(function (node, index) {
        angle = (index + 1 - source_machines.length / 2) * Math.PI / source_machines.length;
        angle = angle * 0.5;
        node.x = shift_x + center.radius - center.radius * Math.cos(angle);
        node.y = shift_y + center.radius - center.radius * Math.sin(angle);
    });

    target_machines.forEach(function (node, index) {
        angle = (index + 1 - target_machines.length / 2) * Math.PI / target_machines.length;
        angle = angle * 0.5;
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

}

runTest();