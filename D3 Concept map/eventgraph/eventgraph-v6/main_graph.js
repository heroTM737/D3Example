function main_graph(source_machines, target_machines, events) {
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
    });

    //clear
    d3.select("svg").selectAll("*").remove();

    //define coordinate
    var max = d3.max([source_machines.sizes(), target_machines.sizes(), events.sizes()]);
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
        .on("click", event_click);

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