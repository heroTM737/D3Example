function main_graph(data) {
    //bind action to go back to main graph when user clicks on white space
    d3.select(container).on("click", function () {
        main_graph(data);
    });

    var source_machines = data.source_machines;
    var target_machines = data.target_machines;
    var events = data.events;

    //define links
    var links = d3.map();
    events.forEach(function (event_key, event) {
        event.sources.forEach(function (source_key, source) {
            var link = {
                id: "from" + source.id + "to" + event.id,
                source: source,
                target: event
            }
            links.set(link.id, link);
        });

        event.targets.forEach(function (target_key, target) {
            var link = {
                id: "from" + event.id + "to" + target.id,
                source: event,
                target: target
            }
            links.set(link.id, link);
        });
    });

    //define coordinate
    var max = d3.max([source_machines.size(), target_machines.size(), events.size()]);
    var source_start = shift_y + (max - source_machines.size()) / 2 * (radius * 2 + y_margin);
    var target_start = shift_y + (max - target_machines.size()) / 2 * (radius * 2 + y_margin);
    var event_start = shift_y + (max - events.size()) / 2 * (rh + y_margin);

    center.radius = events.size() * (rh + y_margin) / 2;
    center.x = center.radius + shift_y + max_text_length * character_length;
    center.y = center.radius + shift_y;
    var svg_height = events.size() * (rh + y_margin) + shift_y * 2;
    var svg_width = svg_height + max_text_length * character_length * 2;

    var angle, step_angle, base_angle;
    var ratio = 0.5;
    source_machines.values().forEach(function (node, index) {
        step_angle = Math.PI / source_machines.size();
        base_angle = step_angle / 2 - Math.PI / 2;
        angle = index * step_angle + base_angle;
        angle = angle * ratio;
        node.x = center.x - center.radius * Math.cos(angle);
        node.y = center.y - center.radius * Math.sin(angle);
    });

    target_machines.values().forEach(function (node, index) {
        step_angle = Math.PI / target_machines.size();
        base_angle = step_angle / 2 - Math.PI / 2;
        angle = index * step_angle + base_angle;
        angle = angle * ratio;
        node.x = center.x + center.radius * Math.cos(angle);
        node.y = center.y - center.radius * Math.sin(angle);
    });

    events.values().forEach(function (event, index) {
        event.x = center.x;
        event.y = event_start + index * (rh + y_margin);
    });

    //clear
    d3.select(container).selectAll("*").remove();

    //render
    var svg = d3.select(container);
    svg.attr("viewBox", "0 0 " + svg_width + " " + svg_height);
    box.width = svg_width;
    box.height = svg_height;

    var link = svg.selectAll("path ")
        .data(links.values())
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", diagonal);

    var source_group = svg.selectAll(".source-group")
        .data(source_machines.values())
        .enter().append("g")
        .attr("class", "source-group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", node_mouseover)
        .on("mouseout", node_mouseout)
        .on("click", node_click);

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
        .attr("text-anchor", "end")
        .attr("x", function (d) {
            return d.x - radius * 2;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.data.name;
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
        .on("click", node_click);

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
        .attr("x", function (d) {
            return d.x + radius * 2;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.data.name;
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
        .on("click", node_click);

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
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return shortenText(d.data.name);
        });
}