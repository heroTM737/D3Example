var event_center_graph = function (d) {
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
    var nodes_L1 = [];
    var nodes_L2 = [];

    //compute L1
    nodes_L1 = d.related_nodes.values();
    var base_angle = 2 * Math.PI / nodes_L1.length;
    nodes_L1.forEach(function (machine, machine_index) {
        machine.x = center.x + Math.cos(machine_index * base_angle) * center.radius;
        machine.y = center.y + Math.sin(machine_index * base_angle) * center.radius;
        machine.sx = center.x + Math.cos(machine_index * base_angle) * center.radius * 2;
        machine.sy = center.y + Math.sin(machine_index * base_angle) * center.radius * 2;
        machine.a = machine_index * base_angle / Math.PI * 180;
    });
    nodes_L1 = d.related_nodes.values();

    //compute L2
    nodes_L1.forEach(function (machine, index) {
        var related_count = {
            id: "c" + d.id + "a" + machine.id,
            x: machine.sx,
            y: machine.sy

        }

        nodes_L2.push(related_count);

        links.push({
            id: "from" + d.id + "to" + machine.id,
            source: d,
            target: machine
        });

        links.push({
            id: "from" + machine.id + "to" + related_count.id,
            source: machine,
            target: related_count
        });
    });

    //render
    var svg = d3.select("svg");

    //nodes function
    var L3_click = function (group) {
        d3.event.stopPropagation();
        hideTooltips();

        var nodes_L3 = [];
        group.related_nodes.forEach(function (node, node_index) {
            if (node.data.type == "event" && node.id != d.id) {
                nodes_L3.push({
                    id: node.id,
                    data: node.data,
                    x: 0,
                    y: 0
                });
            }
        });

        var step_angle = 2 * Math.PI / (nodes_L3.length + nodes_L2.length);
        var base_angle = group.a - nodes_L3.length / 2 * step_angle;
        nodes_L3.forEach(function (machine, machine_index) {
            machine.x = center.x + Math.cos(machine_index * step_angle + base_angle) * center.radius * 2;
            machine.y = center.y + Math.sin(machine_index * step_angle + base_angle) * center.radius * 2;
            machine.a = machine_index * step_angle / Math.PI * 180;
        });

        nodes_L1.forEach(function (machine, machine_index) {
            var index = nodes_L3.length + machine_index;
            machine.sx = center.x + Math.cos(index * step_angle + base_angle) * center.radius * 2;
            machine.sy = center.y + Math.sin(index * step_angle + base_angle) * center.radius * 2;
            machine.a = index * step_angle / Math.PI * 180;
        });

        var node_L3_group = svg.selectAll(".L3-group")
            .data(nodes_L3)
            .enter().append("g")
            .attr("class", "event-group")
            .attr('id', function (d) {
                return "group" + d.id;
            })
            .on("mouseover", event_mouseover)
            .on("mouseout", event_mouseout)
            .on("click", event_click);

        var node_L3 = node_L3_group.append("rect")
            .attr("class", "event")
            .attr('id', function (d) {
                return d.id;
            })
            .attr("x", function (d) {
                console.log(d);
                return d.x - L2_radius / 2;
            })
            .attr("y", function (d) {
                return d.y - L2_radius / 2;
            })
            .attr("width", L2_radius)
            .attr("height", L2_radius);

        svg.selectAll(".L2-group").remove();
        var node_L2_group = svg.selectAll(".L2-group")
            .data(nodes_L1)
            .enter().append("g")
            .attr("class", "event-group L2-group")
            .attr('id', function (d) {
                return "group" + d.id;
            })
            .on("mouseover", machine_mouseover)
            .on("mouseout", machine_mouseout)
            .on("click", null);

        var node_L2 = node_L2_group.append("rect")
            .attr("class", "event")
            .attr('id', function (d) {
                return d.id;
            })
            .attr("x", function (d) {
                return d.sx - L2_radius;
            })
            .attr("y", function (d) {
                return d.sy - L2_radius;
            })
            .attr("width", L2_radius * 2)
            .attr("height", L2_radius * 2);
    }

    //draw links
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

    //draw center
    var node_L0_group = svg.selectAll(".event-group")
        .data([d])
        .enter().append("g")
        .attr("class", "event-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var node_L0 = node_L0_group.append("rect")
        .attr("class", "event")
        .attr('id', function (d) {
            return d.id;
        })
        .attr("x", function (d) {
            return center.x - center.radius / 2;
        })
        .attr("y", function (d) {
            return center.y - center.radius / 2;
        })
        .attr("width", center.radius)
        .attr("height", center.radius);

    //draw L1
    var node_L1_group = svg.selectAll(".machine-group")
        .data(nodes_L1)
        .enter().append("g")
        .attr("class", "machine-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var node_L1 = node_L1_group.append("circle")
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

    var node_L1_textbg = node_L1_group.append("text")
        .attr("class", "text textbg")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("text-anchor", function (d) {
            return d.x < center.x ? "end" : "start";
        })
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            var translate = rh / 2 + text_node_margin;
            translate = d.x < center.x ? -translate : translate;
            return "rotate(" + rotate + ")translate(" + translate + ")";
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

    var node_L1_text = node_L1_group.append("text")
        .attr("class", "text event-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("text-anchor", function (d) {
            return d.x < center.x ? "end" : "start";
        })
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            var translate = rh / 2 + text_node_margin;
            translate = d.x < center.x ? -translate : translate;
            return "rotate(" + rotate + ")translate(" + translate + ")";
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

    //draw L2
    var node_L2_group = svg.selectAll(".L2-group")
        .data(nodes_L1)
        .enter().append("g")
        .attr("class", "event-group L2-group")
        .attr('id', function (d) {
            return "group" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", L3_click);

    var node_L2 = node_L2_group.append("rect")
        .attr("class", "event")
        .attr('id', function (d) {
            return d.id;
        })
        .attr("x", function (d) {
            return d.sx - L2_radius;
        })
        .attr("y", function (d) {
            return d.sy - L2_radius;
        })
        .attr("width", L2_radius * 2)
        .attr("height", L2_radius * 2);

    var node_L2_text = node_L2_group.append("text")
        .attr("class", "text machine-text")
        .attr('id', function (d) {
            return "text" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.sx < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.sx + " " + d.sy;
            return "rotate(" + rotate + ")";
        })
        .attr("x", function (d) {
            return d.sx;
        })
        .attr("y", function (d) {
            return d.sy;
        })
        .text(function (d) {
            var count = 0;
            d.related_nodes.forEach(function (node, index) {
                if (node.data.type == "event") {
                    count++;
                }
            });
            return count - 1;
        });
}