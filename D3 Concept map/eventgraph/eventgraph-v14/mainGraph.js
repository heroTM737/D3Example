function main_graph(configVar) {
    configVar.eventgraphIsMainGraphOn = true;

    //define in use variables
    var source_machines = configVar.data.source_machines;
    var target_machines = configVar.data.target_machines;
    var events = configVar.data.events;

    var text_node_margin = configVar.text_node_margin;
    var machine_max_text_length_px = configVar.machine_max_text_length_px;
    var rw = configVar.rw;
    var rh = configVar.rh;
    var radius = configVar.node_radius;
    var y_margin = configVar.y_margin;
    var padding = configVar.padding;
    var shift_x = configVar.shift_x;
    var shift_y = configVar.shift_y;
    var center = {};

    //define links
    var links = d3.map();
    events.forEach(function (event_key, event) {
        event.sources.forEach(function (source_key, source) {
            var link = {
                id: "from_" + source.id + "_to_" + event.id,
                source: source,
                target: event
            }
            links.set(link.id, link);
        });

        event.targets.forEach(function (target_key, target) {
            var link = {
                id: "from_" + target.id + "_to_" + event.id,
                source: target,
                target: event
            }
            links.set(link.id, link);
        });
    });

    //define svg size
    var radius_by_events_size = events.size() * (rh + y_margin) / 2;
    var radius_by_event_width = rw;
    var radius_by_machine_size = Math.max(source_machines.size(), target_machines.size()) * (radius + y_margin) * 4 / Math.PI;
    center.radius = Math.max(radius_by_events_size, radius_by_event_width);
    center.radius = Math.max(center.radius, radius_by_machine_size);
    center.x = padding + shift_x + Math.min(center.radius, center.radius / 2 + 100) + text_node_margin + machine_max_text_length_px;
    center.y = padding + shift_y + center.radius + rh;
    configVar.center.x = center.x;
    configVar.center.y = center.y;
    var svg_width = shift_x + (padding + Math.min(center.radius, center.radius / 2 + 100) + text_node_margin + machine_max_text_length_px) * 2;
    var svg_height = shift_y + (padding + center.radius + rh) * 2;

    //define coordinate
    var max = d3.max([source_machines.size(), target_machines.size(), events.size()]);
    var event_start = center.y - Math.min(center.radius, events.size() * (rh + y_margin) / 2 - rh / 2);

    var angle, step_angle, base_angle;
    var ratio = 0.5;
    source_machines.values().forEach(function (node, index) {
        step_angle = Math.PI / source_machines.size();
        base_angle = step_angle / 2 - Math.PI / 2;
        angle = index * step_angle + base_angle;
        angle = angle * ratio;
        node.x = center.x - center.radius * Math.cos(angle);
        node.y = center.y - center.radius * Math.sin(angle);

        if (node.x < center.x - center.radius / 2) {
            node.x = node.x + center.radius / 2 - 100;
        }
    });

    target_machines.values().forEach(function (node, index) {
        step_angle = Math.PI / target_machines.size();
        base_angle = step_angle / 2 - Math.PI / 2;
        angle = index * step_angle + base_angle;
        angle = angle * ratio;
        node.x = center.x + center.radius * Math.cos(angle);
        node.y = center.y - center.radius * Math.sin(angle);

        if (node.x > center.x + center.radius / 2) {
            node.x = node.x - center.radius / 2 + 100;
        }
    });

    events.values().forEach(function (event, index) {
        event.x = center.x;
        event.y = event_start + index * (rh + y_margin);
    });

    //clear
    d3.select(configVar.container).selectAll("*").remove();

    //render
    var svg = d3.select(configVar.container);
    svg.attr("viewBox", "0 0 " + svg_width + " " + svg_height);
    svg.attr("width", svg_width);
    svg.attr("height", svg_height);

    configVar.events.combine_highlight = function (d, state) {};
    var node_mouseover = configVar.events.node_mouseover;
    var node_mouseout = configVar.events.node_mouseout;
    var node_click = configVar.events.node_click;

    var menu = function (data) {
        var name = data.data.name;
        return [
            {
                title: function (d) {
                    return 'copy to clipboard: <b>' + name + '</b>';
                },
                action: function (elm, d, i) {
                    copyToClipBoard(name);
                }
            }
        ]
    };
    var menuFN = d3.contextMenu(menu);

    var link = svg.selectAll("path ")
        .data(links.values())
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", diagonal(configVar));

    var source_group = svg.selectAll(".source-group")
        .data(source_machines.values())
        .enter().append("g")
        .attr("class", "source-group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", node_mouseover)
        .on("mouseout", node_mouseout)
        .on("click", node_click)
        .on("contextmenu", menuFN);

    var source_title = source_group.append("title")
        .text(function (d) {
            return d.data.name;
        });

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
        });

    var source_text = source_group.append("text")
        .attr("class", "text machine-text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("alignment-baseline", "central")
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "end")
        .attr("x", function (d) {
            return d.x - radius * 2;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return shortenMachineText(d.data.name, configVar);
        });

    var target_group = svg.selectAll(".target-group")
        .data(target_machines.values())
        .enter().append("g")
        .attr("class", "target-group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", node_mouseover)
        .on("mouseout", node_mouseout)
        .on("click", node_click)
        .on("contextmenu", menuFN);

    var target_title = target_group.append("title")
        .text(function (d) {
            return d.data.name;
        });

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
            return "x" + d.id;
        })
        .attr("alignment-baseline", "central")
        .attr("dominant-baseline", "central")
        .attr("x", function (d) {
            return d.x + radius * 2;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return shortenMachineText(d.data.name, configVar);
        });

    var event_group = svg.selectAll(".event-group")
        .data(events.values())
        .enter().append("g")
        .attr("class", "event-group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", node_mouseover)
        .on("mouseout", node_mouseout)
        .on("click", node_click)
        .on("contextmenu", menuFN);

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

    var event_title = event_group.append("title")
        .text(function (d) {
            return d.data.name;
        });

    var event_text = event_group.append("text")
        .attr("class", "text event-text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("dominant-baseline", "central")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return shortenEventText(d.data.name, configVar);
        });
}