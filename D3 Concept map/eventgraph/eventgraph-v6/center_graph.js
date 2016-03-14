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
    d3.selectAll('#g' + d.id).classed('group-highlight', true);

    //hight light related nodes
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#g' + node.id).classed('group-highlight', true);
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
    d3.selectAll('#g' + d.id).classed('group-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#g' + node.id).classed('group-highlight', false);
    });

    //hide tooltips
    hideTooltips();
}

function machine_click(d) {
    d3.event.stopPropagation();
    hideTooltips();
    machine_center_graph(d);
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
    d3.selectAll('#g' + d.id).classed('group-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#g' + node.id).classed('group-highlight', true);
    });

    showTooltips(getTooltips(d), d);
}

function event_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current event
    d3.selectAll('#g' + d.id).classed('group-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#g' + node.id).classed('group-highlight', false);
    });

    hideTooltips();
}

function event_click(d) {
    d3.event.stopPropagation();
    hideTooltips();
    event_center_graph(d);
}

function machine_center_graph(node_center) {
    //clear
    d3.select("svg").selectAll("*").remove();

    //define coordinate
    node_center.x = center.x;
    node_center.y = center.y;

    var links = [];
    var nodes_L1 = node_center.related_events.values();
    var nodes_L2 = [];
    var step_angle = 2 * Math.PI / node_center.related_events.size();

    nodes_L1.forEach(function (event, index) {
        var combine = {
            id: "c" + node_center.id + "" + event.id,
            count: 0,
            source: event
        }
        nodes_L2.push(combine);

        if (node_center.type == "source") {
            combine.count = event.targets.size();

            links.push({
                id: "from" + node_center.id + "to" + event.id,
                source: node_center,
                target: event
            });

            links.push({
                id: "from" + event.id + "to" + combine.id,
                source: event,
                target: combine
            });
        } else {
            combine.count = event.sources.size();

            links.push({
                id: "from" + event.id + "to" + node_center.id,
                source: event,
                target: node_center
            });

            links.push({
                id: "from" + combine.id + "to" + event.id,
                source: combine,
                target: event
            });
        }

        event.x = center.x + Math.cos(index * step_angle) * L1_radius;
        event.y = center.y + Math.sin(index * step_angle) * L1_radius;
        event.a = index * step_angle / Math.PI * 180;

        combine.x = center.x + Math.cos(index * step_angle) * L2_radius;
        combine.y = center.y + Math.sin(index * step_angle) * L2_radius;
        combine.a = event.a;
    });

    //render
    var svg = d3.select("svg");

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

    //draw L0 or center
    var node_L0_group = svg.selectAll(".L0-group")
        .data([node_center])
        .enter().append("g")
        .attr("class", "machine-group L0-group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var node_L0 = node_L0_group.append("circle")
        .attr("class", function (d) {
            return "machine " + (d.type == "source" ? "source" : "target");
        })
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
            return L0_circle_radius;
        });

    var node_L0_text = node_L0_group.append("text")
        .attr("class", "text")
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
            return d.data.name;
        });

    var node_L0_texttp = node_L0_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y + 15;
        })
        .text(function (d) {
            return d.type;
        });

    //draw L1
    var node_L1_group = svg.selectAll(".L1_group")
        .data(nodes_L1)
        .enter().append("g")
        .attr("class", "event-group L1_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", event_mouseover)
        .on("mouseout", event_mouseout)
        .on("click", event_click);

    var node_L1 = node_L1_group.append("rect")
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
            return d.x - L1_circle_radius;
        })
        .attr("y", function (d) {
            return d.y - L1_circle_radius;
        })
        .attr("width", L1_circle_radius * 2)
        .attr("height", L1_circle_radius * 2);

    var node_L1_textbg = node_L1_group.append("text")
        .attr("class", "text textbg")
        .attr('id', function (d) {
            return "xbg" + d.id;
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
            return "x" + d.id;
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
    var machine_combine_click = function (d) {
        d3.event.stopPropagation();
        hideTooltips();
        machine_center_graph_extend(node_center, d);
    }

    var node_L2_group = svg.selectAll(".L2_group")
        .data(nodes_L2)
        .enter().append("g")
        .attr("class", "group L2_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", null)
        .on("mouseout", null)
        .on("click", machine_combine_click);

    var node_L2 = node_L2_group.append("circle")
        .attr("class", "event")
        .attr('id', function (d) {
            return d.id;
        })
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            return "rotate(" + rotate + ")";
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return L2_circle_radius;
        });

    var node_L2_text = node_L2_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            return "rotate(" + rotate + ")";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.count;
        });


}

function machine_center_graph_extend(node_center, combine_extend) {
    var node_extend = combine_extend.source;
    //clear
    d3.select("svg").selectAll("*").remove();

    //define coordinate
    node_center.x = center.x;
    node_center.y = center.y;

    var links = [];
    var linkxs = [];
    var nodes_L1 = node_center.related_events.values();
    var nodes_L2 = [];
    var nodes_L2x = [];

    if (node_center.type == "source") {
        nodes_L2x = node_extend.targets.values();
    } else {
        nodes_L2x = node_extend.sources.values();
    }

    var node_extend_index = 0;
    var step_angle = 2 * Math.PI / (nodes_L1.length + nodes_L2x.length - 1);
    var base_angle = 0;
    var base_angle_before = 0;
    var base_angle_after = node_extend.a * Math.PI / 180 + step_angle * (nodes_L2x.length - 1) / 2;
    for (var i = 0; i < nodes_L1.length; i++) {
        if (nodes_L1[i].id == node_extend.id) {
            node_extend_index = i;
            var normal = node_extend_index * step_angle;
            var expect = node_extend.a * Math.PI / 180 - step_angle * (nodes_L2x.length - 1) / 2;
            base_angle_before = expect - normal;
            break;
        }
    }
    var index = 0;
    for (var i = 0; i < nodes_L1.length; i++) {
        if (i == node_extend_index) {
            if (node_center.type == "source") {
                links.push({
                    id: "from" + node_center.id + "to" + node_extend.id,
                    source: node_center,
                    target: node_extend
                });
            } else {
                links.push({
                    id: "from" + node_extend.id + "to" + node_center.id,
                    source: node_extend,
                    target: node_center
                });
            }
            continue;
        }

        if (i < node_extend_index) {
            index = i;
            base_angle = base_angle_before;
        } else {
            index = i - node_extend_index;
            base_angle = base_angle_after;
        }

        nodes_L1[i].x = center.x + Math.cos(base_angle + index * step_angle) * L1_radius;
        nodes_L1[i].y = center.y + Math.sin(base_angle + index * step_angle) * L1_radius;
        nodes_L1[i].a = (base_angle + index * step_angle) / Math.PI * 180;

        var combine = {
            id: "c" + node_center.id + "" + nodes_L1[i].id,
            count: 0,
            source: nodes_L1[i]
        };

        combine.x = center.x + Math.cos(base_angle + index * step_angle) * L2_radius;
        combine.y = center.y + Math.sin(base_angle + index * step_angle) * L2_radius;
        combine.a = nodes_L1[i].a;

        nodes_L2.push(combine);

        var event = nodes_L1[i];
        if (node_center.type == "source") {
            combine.count = event.targets.size();

            links.push({
                id: "from" + node_center.id + "to" + event.id,
                source: node_center,
                target: event
            });

            links.push({
                id: "from" + event.id + "to" + combine.id,
                source: event,
                target: combine
            });
        } else {
            combine.count = event.sources.size();

            links.push({
                id: "from" + event.id + "to" + node_center.id,
                source: event,
                target: node_center
            });

            links.push({
                id: "from" + combine.id + "to" + event.id,
                source: combine,
                target: event
            });
        }
    }

    base_angle = node_extend.a * Math.PI / 180 - step_angle * (nodes_L2x.length - 1) / 2;
    for (var i = 0; i < nodes_L2x.length; i++) {
        nodes_L2x[i].x = center.x + Math.cos(base_angle + i * step_angle) * L2_radius;
        nodes_L2x[i].y = center.y + Math.sin(base_angle + i * step_angle) * L2_radius;
        nodes_L2x[i].a = (base_angle + i * step_angle) / Math.PI * 180;

        if (node_center.type == "source") {
            linkxs.push({
                id: "from" + node_extend.id + "to" + nodes_L2x[i].id,
                source: node_extend,
                target: nodes_L2x[i]
            });
        } else {
            linkxs.push({
                id: "from" + nodes_L2x[i].id + "to" + node_extend.id,
                source: nodes_L2x[i],
                target: node_extend
            });
        }
    }

    //render
    var svg = d3.select("svg");

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

    var extend_curve = function (d) {
        var source, target;
        if (node_center.type == "source") {
            source = d.source;
            target = d.target;
        } else {
            source = d.target;
            target = d.source;
        }

        var x1 = center.x + Math.cos(source.a * Math.PI / 180) * ((L1_radius + L2_radius) / 2);
        var y1 = center.y + Math.sin(source.a * Math.PI / 180) * ((L1_radius + L2_radius) / 2);
        var x2 = (d.source.x + d.target.x) / 2;
        var y2 = (d.source.y + d.target.y) / 2;

        var m = "M " + source.x + " " + source.y;
        var c = "C " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + target.x + " " + target.y;

        return m + c;
    }

    var linkx = svg.selectAll("path ")
        .data(linkxs)
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", extend_curve);

    //draw L0 or center
    var node_L0_group = svg.selectAll(".L0-group")
        .data([node_center])
        .enter().append("g")
        .attr("class", "machine-group L0-group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var node_L0 = node_L0_group.append("circle")
        .attr("class", function (d) {
            return "machine " + (d.type == "source" ? "source" : "target");
        })
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
            return L0_circle_radius;
        });

    var node_L0_text = node_L0_group.append("text")
        .attr("class", "text")
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
            return d.data.name;
        });

    var node_L0_texttp = node_L0_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y + 15;
        })
        .text(function (d) {
            return d.type;
        });

    //draw L1
    var node_L1_group = svg.selectAll(".L1_group")
        .data(nodes_L1)
        .enter().append("g")
        .attr("class", "event-group L1_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", event_mouseover)
        .on("mouseout", event_mouseout)
        .on("click", event_click);

    var node_L1 = node_L1_group.append("rect")
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

    var node_L1_textbg = node_L1_group.append("text")
        .attr("class", "text textbg")
        .attr('id', function (d) {
            return "xbg" + d.id;
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
            return "x" + d.id;
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
    var machine_combine_click = function (d) {
        d3.event.stopPropagation();
        hideTooltips();
        machine_center_graph_extend(node_center, d);
    }

    var node_L2_group = svg.selectAll(".L2_group")
        .data(nodes_L2)
        .enter().append("g")
        .attr("class", "group L2_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", null)
        .on("mouseout", null)
        .on("click", machine_combine_click);

    var node_L2 = node_L2_group.append("circle")
        .attr("class", "event")
        .attr('id', function (d) {
            return d.id;
        })
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            return "rotate(" + rotate + ")";
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return L2_circle_radius;
        });

    var node_L2_text = node_L2_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            return "rotate(" + rotate + ")";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.count;
        });

    //draw L2x
    var node_L2x_group = svg.selectAll(".node_L2x_group")
        .data(nodes_L2x)
        .enter().append("g")
        .attr("class", "machine-group node_L2x_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var node_L2x = node_L2x_group.append("circle")
        .attr("class", function (d) {
            return "machine " + (d.type == "source" ? "source" : "target");
        })
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

    var node_L2x_text = node_L2x_group.append("text")
        .attr("class", "text machine-text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", function (d) {
            return d.x < center.x ? "end" : "start";
        })
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            var translate = radius / 2 + text_node_margin;
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

function event_center_graph(node_center) {
    //clear
    d3.select("svg").selectAll("*").remove();

    //define coordinate
    node_center.x = center.x;
    node_center.y = center.y;

    var links = [];
    var nodes_L1 = [];
    var nodes_L2 = [];

    node_center.sources.forEach(function (key, machine) {
        nodes_L1.push(machine);

        links.push({
            id: "from" + machine.id + "to" + node_center.id,
            source: machine,
            target: node_center
        });
    });

    node_center.targets.forEach(function (key, machine) {
        nodes_L1.push(machine);

        links.push({
            id: "from" + node_center.id + "to" + machine.id,
            source: node_center,
            target: machine
        });
    });

    var step_angle = 2 * Math.PI / nodes_L1.length;
    nodes_L1.forEach(function (machine, index) {
        machine.x = center.x + Math.cos(index * step_angle) * L1_radius;
        machine.y = center.y + Math.sin(index * step_angle) * L1_radius;
        machine.a = index * step_angle / Math.PI * 180;

        var combine = {
            id: "c" + node_center.id + "" + machine.id,
            count: (machine.related_events.size() - 1),
            source: machine
        }
        combine.x = center.x + Math.cos(index * step_angle) * L2_radius;
        combine.y = center.y + Math.sin(index * step_angle) * L2_radius;
        combine.a = machine.a;
        nodes_L2.push(combine);

        links.push({
            id: "from" + combine.id + "to" + machine.id,
            source: combine,
            target: machine
        });
    });

    //render
    var svg = d3.select("svg");

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

    //draw L0 or center
    var node_L0_group = svg.selectAll(".L0-group")
        .data([node_center])
        .enter().append("g")
        .attr("class", "machine-group L0-group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", null);

    var node_L0 = node_L0_group.append("rect")
        .attr("class", "machine")
        .attr('id', function (d) {
            return d.id;
        })
        .attr("x", function (d) {
            return d.x - L0_circle_radius / 2;
        })
        .attr("y", function (d) {
            return d.y - L0_circle_radius / 2;
        })
        .attr("width", L0_circle_radius)
        .attr("height", L0_circle_radius);

    var node_L0_text = node_L0_group.append("text")
        .attr("class", "text")
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
            return d.data.name;
        });

    //draw L1
    var node_L1_group = svg.selectAll(".L1_group")
        .data(nodes_L1)
        .enter().append("g")
        .attr("class", "machine-group L1_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var node_L1_textbg = node_L1_group.append("text")
        .attr("class", "text textbg")
        .attr('id', function (d) {
            return "xbg" + d.id;
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
            return "x" + d.id;
        })
        .attr("text-anchor", function (d) {
            return d.x < center.x ? "end" : "start";
        })
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            var translate = L1_circle_radius + text_node_margin;
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

    var node_L1_texttp = node_L1_group.append("text")
        .attr("class", "text event-text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", function (d) {
            return d.x < center.x ? "end" : "start";
        })
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            var translate = L1_circle_radius + text_node_margin;
            translate = d.x < center.x ? -translate : translate;
            return "rotate(" + rotate + ")translate(" + translate + ")";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y + 20;
        })
        .text(function (d) {
            return d.type;
        });

    var node_L1 = node_L1_group.append("circle")
        .attr("class", function (d) {
            return "machine " + (d.type == "source" ? "source" : "target");
        })
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
            return L1_circle_radius;
        });

    //draw L2
    var event_combine_click = function (d) {
        d3.event.stopPropagation();
        hideTooltips();
        event_center_graph_extend(node_center, d);
    }

    var node_L2_group = svg.selectAll(".L2_group")
        .data(nodes_L2)
        .enter().append("g")
        .attr("class", "group L2_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", null)
        .on("mouseout", null)
        .on("click", event_combine_click);

    var node_L2 = node_L2_group.append("rect")
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
            return d.x - L2_circle_radius;
        })
        .attr("y", function (d) {
            return d.y - L2_circle_radius;
        })
        .attr("width", function (d) {
            return L2_circle_radius * 2;
        })
        .attr("height", function (d) {
            return L2_circle_radius * 2;
        });

    var node_L2_text = node_L2_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            return "rotate(" + rotate + ")";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.count;
        });
}

function event_center_graph_extend(node_center, combine_extend) {
    var node_extend = combine_extend.source;
    //clear
    d3.select("svg").selectAll("*").remove();

    //define coordinate
    node_center.x = center.x;
    node_center.y = center.y;

    var links = [];
    var linkxs = [];
    var nodes_L1 = node_center.related_nodes.values();
    var nodes_L2 = [];
    var nodes_L2x = [];

    node_extend.related_events.forEach(function (key, event) {
        if (event.id != node_center.id) {
            nodes_L2x.push(event);
        }
    });

    var node_extend_index = 0;
    var step_angle = 2 * Math.PI / (nodes_L1.length + nodes_L2x.length - 1);
    var base_angle = 0;
    var base_angle_before = 0;
    var base_angle_after = node_extend.a * Math.PI / 180 + step_angle * (nodes_L2x.length - 1) / 2;
    for (var i = 0; i < nodes_L1.length; i++) {
        if (nodes_L1[i].id == node_extend.id) {
            node_extend_index = i;
            var normal = node_extend_index * step_angle;
            var expect = node_extend.a * Math.PI / 180 - step_angle * (nodes_L2x.length - 1) / 2;
            base_angle_before = expect - normal;
            break;
        }
    }
    var index = 0;
    for (var i = 0; i < nodes_L1.length; i++) {
        if (i == node_extend_index) {
            if (node_extend.type == "target") {
                links.push({
                    id: "from" + node_center.id + "to" + node_extend.id,
                    source: node_center,
                    target: node_extend
                });
            } else {
                links.push({
                    id: "from" + node_extend.id + "to" + node_center.id,
                    source: node_extend,
                    target: node_center
                });
            }
            continue;
        }

        if (i < node_extend_index) {
            index = i;
            base_angle = base_angle_before;
        } else {
            index = i - node_extend_index;
            base_angle = base_angle_after;
        }

        nodes_L1[i].x = center.x + Math.cos(base_angle + index * step_angle) * L1_radius;
        nodes_L1[i].y = center.y + Math.sin(base_angle + index * step_angle) * L1_radius;
        nodes_L1[i].a = (base_angle + index * step_angle) / Math.PI * 180;

        var combine = {
            id: "c" + node_center.id + "" + nodes_L1[i].id,
            count: 0,
            source: nodes_L1[i]
        };

        combine.x = center.x + Math.cos(base_angle + index * step_angle) * L2_radius;
        combine.y = center.y + Math.sin(base_angle + index * step_angle) * L2_radius;
        combine.a = nodes_L1[i].a;

        nodes_L2.push(combine);

        var machine = nodes_L1[i];
        combine.count = machine.related_events.size() - 1;
        if (machine.type == "target") {
            links.push({
                id: "from" + node_center.id + "to" + machine.id,
                source: node_center,
                target: machine
            });

            links.push({
                id: "from" + combine.id + "to" + machine.id,
                source: combine,
                target: machine
            });
        } else {
            links.push({
                id: "from" + machine.id + "to" + node_center.id,
                source: machine,
                target: node_center
            });

            links.push({
                id: "from" + machine.id + "to" + combine.id,
                source: machine,
                target: combine
            });
        }
    }

    base_angle = node_extend.a * Math.PI / 180 - step_angle * (nodes_L2x.length - 1) / 2;
    for (var i = 0; i < nodes_L2x.length; i++) {
        nodes_L2x[i].x = center.x + Math.cos(base_angle + i * step_angle) * L2_radius;
        nodes_L2x[i].y = center.y + Math.sin(base_angle + i * step_angle) * L2_radius;
        nodes_L2x[i].a = (base_angle + i * step_angle) / Math.PI * 180;

        if (node_extend.type == "source") {
            linkxs.push({
                id: "from" + node_extend.id + "to" + nodes_L2x[i].id,
                source: node_extend,
                target: nodes_L2x[i]
            });
        } else {
            linkxs.push({
                id: "from" + nodes_L2x[i].id + "to" + node_extend.id,
                source: nodes_L2x[i],
                target: node_extend
            });
        }
    }

    //render
    var svg = d3.select("svg");

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

    var extend_curve = function (d) {
        var source, target;
        if (d.source.type == "event") {
            source = d.target;
            target = d.source;
        } else {
            source = d.source;
            target = d.target;
        }

        var x1 = center.x + Math.cos(source.a * Math.PI / 180) * ((L1_radius + L2_radius) / 2);
        var y1 = center.y + Math.sin(source.a * Math.PI / 180) * ((L1_radius + L2_radius) / 2);
        var x2 = (d.source.x + d.target.x) / 2;
        var y2 = (d.source.y + d.target.y) / 2;

        var m = "M " + source.x + " " + source.y;
        var c = "C " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + target.x + " " + target.y;

        return m + c;
    }

    var linkx = svg.selectAll("path ")
        .data(linkxs)
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", extend_curve);

    //draw L0 or center
    var node_L0_group = svg.selectAll(".L0-group")
        .data([node_center])
        .enter().append("g")
        .attr("class", "machine-group L0-group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", event_mouseover)
        .on("mouseout", event_mouseout)
        .on("click", event_click);

    var node_L0 = node_L0_group.append("rect")
        .attr("class", "event")
        .attr('id', function (d) {
            return d.id;
        })
        .attr("x", function (d) {
            return d.x - L0_circle_radius / 2;
        })
        .attr("y", function (d) {
            return d.y - L0_circle_radius / 2;
        })
        .attr("width", L0_circle_radius)
        .attr("height", L0_circle_radius);

    var node_L0_text = node_L0_group.append("text")
        .attr("class", "text")
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
            return d.data.name;
        });

    //draw L1
    var node_L1_group = svg.selectAll(".L1_group")
        .data(nodes_L1)
        .enter().append("g")
        .attr("class", "event-group L1_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", event_mouseover)
        .on("mouseout", event_mouseout)
        .on("click", event_click);

    var node_L1 = node_L1_group.append("circle")
        .attr("class", function (d) {
            return "machine " + (d.type == "source" ? "source" : "target");
        })
        .attr('id', function (d) {
            return d.id;
        })
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            return "rotate(" + rotate + ")";
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", L1_circle_radius);

    var node_L1_textbg = node_L1_group.append("text")
        .attr("class", "text textbg")
        .attr('id', function (d) {
            return "xbg" + d.id;
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
            return "x" + d.id;
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
    var event_combine_click = function (d) {
        d3.event.stopPropagation();
        hideTooltips();
        console.log("event_combine_click");
        event_center_graph_extend(node_center, d);
    }

    var node_L2_group = svg.selectAll(".L2_group")
        .data(nodes_L2)
        .enter().append("g")
        .attr("class", "group L2_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", null)
        .on("mouseout", null)
        .on("click", event_combine_click);

    var node_L2 = node_L2_group.append("rect")
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
            return d.x - L2_circle_radius;
        })
        .attr("y", function (d) {
            return d.y - L2_circle_radius;
        })
        .attr("width", L2_circle_radius * 2)
        .attr("height", L2_circle_radius * 2);

    var node_L2_text = node_L2_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            return "rotate(" + rotate + ")";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.count;
        });

    //draw L2x
    var node_L2x_group = svg.selectAll(".node_L2x_group")
        .data(nodes_L2x)
        .enter().append("g")
        .attr("class", "machine-group node_L2x_group")
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", machine_mouseover)
        .on("mouseout", machine_mouseout)
        .on("click", machine_click);

    var node_L2x = node_L2x_group.append("rect")
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

    var node_L2x_text = node_L2x_group.append("text")
        .attr("class", "text machine-text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", function (d) {
            return d.x < center.x ? "end" : "start";
        })
        .attr("alignment-baseline", "central")
        .attr("transform", function (d) {
            var rotate = d.x < center.x ? (d.a + 180) : d.a;
            rotate += " " + d.x + " " + d.y;
            var translate = radius / 2 + text_node_margin;
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