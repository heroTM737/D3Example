var radius = 5;
var rw = 70;
var rh = 15;
var y_margin = 5;
var x_margin = 300;
var shift_x = 100;
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
    d3.select("svg").on("click", visualizeData.bind(null, source_machines, target_machines, events, links));
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
    d3.selectAll('#group' + d.id).classed('group-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (node, index) {
        d3.selectAll('#group' + node.id).classed('group-highlight', true);
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
    d3.selectAll('#group' + d.id).classed('group-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (node, index) {
        d3.selectAll('#group' + node.id).classed('group-highlight', false);
    });

    //hide tooltips
    hideTooltips();
}

function machine_click(d) {
    d3.event.stopPropagation();
    hideTooltips();
    visualizeDataMachine(d);
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

    //hightlight current event
    d3.selectAll('#group' + d.id).classed('group-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#group' + node.id).classed('group-highlight', true);
    });

    showTooltips(getTooltips(d), d);
}

function event_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current event
    d3.selectAll('#group' + d.id).classed('group-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#group' + node.id).classed('group-highlight', false);
    });

    hideTooltips();
}

function event_click(d) {
    d3.select("svg").selectAll("*").remove();
    hideTooltips();
    visualizeDataMachine(d);
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

var diagonal_machine = d3.svg.diagonal()
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

var svg = d3.select("body")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000);

function visualizeDataMachine(d) {
    //clear
    d3.select("svg").selectAll("*").remove();

    //define coordinate
    var center = {};
    center.x = shift_x + x_margin;
    center.y = shift_y + 400;
    center.radius = 150;


    d.x = center.x;
    d.y = center.y;

    var links = [];
    var events = [];
    var targets = d3.map();
    d.related_nodes.forEach(function (node, index) {
        if (node.data.type == "event") {
            events.push(node);

            links.push({
                id: "from" + d.id + "to" + node.id,
                source: d,
                target: node
            });
        } else {
            targets.set(node.id, node);
        }
    });

    var base_angle = 2 * Math.PI / events.length;
    for (var i = 0; i < events.length; i++) {
        events[i].x = center.x + Math.cos(i * base_angle) * center.radius;
        events[i].y = center.y + Math.sin(i * base_angle) * center.radius;
        events[i].sx = center.x + Math.cos(i * base_angle) * center.radius * 2;
        events[i].sy = center.y + Math.sin(i * base_angle) * center.radius * 2;
        events[i].a = i * base_angle / Math.PI * 180;

        events[i].related_nodes.values().forEach(function (node, index) {
            if (targets.has(node.id)) {
                var related_count = {
                    x: events[i].sx,
                    y: events[i].sy
                }
                links.push({
                    id: "from" + events[i].id + "to" + node.id,
                    source: events[i],
                    target: related_count
                });
            }
        });
    }

    targets = targets.values();

    //render
    var svg = d3.select("svg");

    var link = svg.selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("x1", function (d) {
            return d.source.x;
        })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });

    var source_group = svg.selectAll(".source-group")
        .data([d])
        .enter().append("g")
        .attr("class", "machine-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var source_machine = source_group.append("circle")
        .attr("class", "machine")
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
            return center.radius - 50;
        });

    var target_group = svg.selectAll(".target-group")
        .data(events)
        .enter().append("g")
        .attr("class", "machine-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var target_machine = target_group.append("circle")
        .attr("class", "machine")
        .attr('id', function (d) {
            return d.id;
        })
        .attr("cx", function (d) {
            return d.sx;
        })
        .attr("cy", function (d) {
            return d.sy;
        })
        .attr("r", function (d) {
            return 15;
        });

    var target_text = target_group.append("text")
        .attr("class", "text machine-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            return d.x < center.x ? "rotate(" + (d.a + 180) + " " + d.sx + " " + d.sy + ")" : "rotate(" + d.a + " " + d.sx + " " + d.sy + ")";
        })
        .attr("x", function (d) {
            return d.sx;
        })
        .attr("y", function (d) {
            return d.sy;
        })
        .text(function (d) {
            return d.related_nodes.size();
        });

    var event_group = svg.selectAll(".event-group")
        .data(events)
        .enter().append("g")
        .attr("class", "event-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", event_mouseover)
        .on("mouseout", event_mouseout)
        .on("click", event_click);

    var event = event_group.append("circle")
        .attr("class", "machine")
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
        });



    var event_textbg = event_group.append("text")
        .attr("class", "text textbg")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("text-anchor", function (d) {
            return d.x < center.x ? "end" : "start";
        })
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            return d.x < center.x ? "rotate(" + (d.a + 180) + " " + d.x + " " + d.y + ")translate(-8)" : "rotate(" + d.a + " " + d.x + " " + d.y + ")translate(8)";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.data.name;
        });

    var event_text = event_group.append("text")
        .attr("class", "text event-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("text-anchor", function (d) {
            return d.x < center.x ? "end" : "start";
        })
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            return d.x < center.x ? "rotate(" + (d.a + 180) + " " + d.x + " " + d.y + ")translate(-8)" : "rotate(" + d.a + " " + d.x + " " + d.y + ")translate(8)";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.data.name;
        });
}

function visualizeData(source_machines, target_machines, events, links) {
    //clear
    d3.select("svg").selectAll("*").remove();

    //define coordinate
    var max = d3.max([source_machines.length, target_machines.length, events.length]);
    var source_start = shift_y + (max - source_machines.length) / 2 * (radius * 2 + y_margin);
    var target_start = shift_y + (max - target_machines.length) / 2 * (radius * 2 + y_margin);
    var event_start = shift_y + (max - events.length) / 2 * (rh + y_margin);

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
    var svg = d3.select("svg");
    svg.attr("height", events.length * (rh + y_margin) + shift_y);

    var link = svg.selectAll("path")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", diagonal);

    var source_group = svg.selectAll(".source-group")
        .data(source_machines)
        .enter().append("g")
        .attr("class", "source-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var source_machine = source_group.append("circle")
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

    var source_text = source_group.append("text")
        .attr("class", "text machine-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("text-anchor", "end")
        .attr("x", function (d) {
            return d.x - radius * 2;
        })
        .attr("y", function (d) {
            return d.y + radius;
        })
        .text(function (d) {
            return d.data.name;
        });

    var target_group = svg.selectAll(".target-group")
        .data(target_machines)
        .enter().append("g")
        .attr("class", "target-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var target_machine = target_group.append("circle")
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
        });

    var target_text = target_group.append("text")
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

    var event_group = svg.selectAll(".event-group")
        .data(events)
        .enter().append("g")
        .attr("class", "event-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", event_mouseover)
        .on("mouseout", event_mouseout)
        .on("click", null);

    var event = event_group.append("rect")
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
        .attr("height", rh);

    var event_text = event_group.append("text")
        .attr("class", "text event-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.data.name;
        });
}

runTest();