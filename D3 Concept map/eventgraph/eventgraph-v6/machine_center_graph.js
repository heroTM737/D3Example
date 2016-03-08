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
            return d.related_nodes.size() - 1;
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
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            return "rotate(" + rotate + ")";
        })
        .attr("x", function (d) {
            return d.x - rh / 2;
        })
        .attr("y", function (d) {
            return d.y - rh / 2;
        })
        .attr("width", rh)
        .attr("height", rh);

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
}