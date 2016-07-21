function center_graph(node_center, node_extend) {
    var nodes_L1;
    var step_angle;
    if (node_center.type == "event") {
        nodes_L1 = node_center.sources.values().concat(node_center.targets.values());
        step_angle = 2 * Math.PI / (node_center.sources.values().length + node_center.targets.values().length);
    } else {
        nodes_L1 = node_center.related_events.values();
        step_angle = 2 * Math.PI / node_center.related_events.size();
    }

    var links = [];
    var nodes_L2 = [];


    //define coordinate
    L1_radius = nodes_L1.length * L1_circle_radius / Math.PI + L1_circle_radius * 2;
    L1_radius = Math.max(L1_radius, L0_circle_radius * 2);
    L1_radius = Math.max(L1_radius, max_text_length * character_length * 2);
    L2_radius = 2 * L1_radius;
    svg_view_width = L2_radius * 2 + max_text_length * character_length + 30;
    svg_view_height = svg_view_width;
    node_center.x = svg_view_width / 2;
    node_center.y = svg_view_height / 2;
    center.x = node_center.x;
    center.y = node_center.y;

    nodes_L1.forEach(function (node_L1, index) {
        var combine = {
            id: "c" + node_center.id + "" + node_L1.id,
            count: 0,
            center: node_center,
            source: node_L1
        }
        nodes_L2.push(combine);

        if (node_center.type == "source") {
            combine.count = node_L1.targets.size();

            links.push({
                id: "from" + node_center.id + "to" + node_L1.id,
                source: node_center,
                target: node_L1
            });

            links.push({
                id: "from" + node_L1.id + "to" + combine.id,
                source: node_L1,
                target: combine
            });
        } else if (node_center.type == "target") {
            combine.count = node_L1.sources.size();

            links.push({
                id: "from" + node_L1.id + "to" + node_center.id,
                source: node_L1,
                target: node_center
            });

            links.push({
                id: "from" + combine.id + "to" + node_L1.id,
                source: combine,
                target: node_L1
            });
        } else {
            combine.count = node_L1.related_events.size() - 1;

            links.push({
                id: "from" + node_L1.id + "to" + node_center.id,
                source: node_L1,
                target: node_center
            });

            links.push({
                id: "from" + combine.id + "to" + node_L1.id,
                source: combine,
                target: node_L1
            });
        }

        node_L1.x = node_center.x + Math.cos(index * step_angle) * L1_radius;
        node_L1.y = node_center.y + Math.sin(index * step_angle) * L1_radius;
        node_L1.a = index * step_angle / Math.PI * 180;

        combine.x = node_center.x + Math.cos(index * step_angle) * L2_radius;
        combine.y = node_center.y + Math.sin(index * step_angle) * L2_radius;
        combine.a = node_L1.a;
    });

    var nodes_L3 = [];
    var links_extend = [];
    if (node_extend != null && node_extend != undefined) {
        switch (node_center.type) {
        case "source":
            nodes_L3 = node_extend.targets.values();
            break;
        case "target":
            nodes_L3 = node_extend.sources.values();
            break;
        case "event":
            nodes_L3 = node_extend.related_events.values();
            break;
        }

        //remove center node
        for (var i = 0; i < nodes_L3.length; i++) {
            if (nodes_L3[i].id == node_center.id) {
                nodes_L3.splice(i, 1);
                break;
            }
        }

        var combine_source;
        for (var i = 0; i < nodes_L2.length; i++) {
            if (nodes_L2[i].source.id == node_extend.id) {
                combine_source = nodes_L2[i];
                break;
            }
        }

        //define coordinate
        nodes_L3.forEach(function (node_L3, index) {
            node_L3.x = svg_view_width + L1_radius;
            node_L3.y = shift_y + index * (L3_circle_radius * 2 + y_margin + 6);

            links_extend.push({
                id: "from" + combine_source.id + "to" + node_L3.id,
                source: combine_source,
                target: node_L3
            });
        });
    }

    //clear
    d3.select("svg").selectAll("*").remove();
    legend();

    //render
    var extend_width = 0;
    if (nodes_L3.length > 0) {
        extend_width = L1_radius + L3_circle_radius * 2 + text_node_margin + max_text_length * character_length;
    }
    if (nodes_L3.length > 0) {
        var extend_height = shift_y * 2 + (L3_circle_radius * 2 + y_margin + 6) * nodes_L3.length;
        svg_view_height = Math.max(extend_height, svg_view_height);
    }
    var svg = d3.select("svg");
    svg.attr("viewBox", "0 0 " + (svg_view_width + extend_width) + " " + svg_view_height);
    var classNameExtend = "";
    var isEventCenter = true;
    if (node_center.type == "event") {
        classNameExtend = "event-group";
        isEventCenter = true;
    } else {
        classNameExtend = "machine-group";
        isEventCenter = false;
    }

    //draw links
    var link = svg.append("g").selectAll("line")
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

    var link_extend = svg.append("g").selectAll("path ")
        .data(links_extend)
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", diagonal_extend);

    //draw L0 or center
    var node_L0_group = createGroup("L0-group", classNameExtend, [node_center]);
    var node_L1 = draw_L0(node_L0_group, isEventCenter);

    //draw L1
    var node_L1_group = createGroup("L1-group", classNameExtend, nodes_L1);
    var node_L1 = draw_L1(node_L1_group, isEventCenter);
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
            return shortenText(d.data.name);
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
        .attr("transform", rotate_text)
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return shortenText(d.data.name);
        });

    //draw L2
    var node_L2_group = createGroup("L2-group", classNameExtend, nodes_L2, null, null, node_combine_click);
    var node_L2 = draw_L2(node_L2_group, isEventCenter);
    var node_L2_text = node_L2_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", rotate_node)
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.count;
        });

    //draw L3
    var node_L3_group = createGroup("L3-group", classNameExtend, nodes_L3);
    var node_L3 = draw_L3(node_L3_group, isEventCenter);
    var node_L3_text = node_L3_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("alignment-baseline", "central")
        .attr("x", function (d) {
            return d.x + L3_circle_radius + text_node_margin;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.data.name;
        });
}

function rotate_text(d) {
    var rotate = d.x < center.x ? (d.a + 180) : d.a;
    rotate += " " + d.x + " " + d.y;
    var translate = rh / 2 + text_node_margin;
    translate = d.x < center.x ? -translate : translate;
    return "rotate(" + rotate + ")translate(" + translate + ")";
}

function rotate_node(d) {
    if (d.a == null || d.a == undefined) {
        d.a = 0;
    }
    var rotate = d.x < center.x ? (d.a + 180) : d.a;
    rotate += " " + d.x + " " + d.y;
    return "rotate(" + rotate + ")";
}

function draw_L0(node_L0_group, isEventCenter) {
    if (isEventCenter) {
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
    } else {
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
    }
}

function draw_L1(node_L1_group, isEventCenter) {
    if (isEventCenter) {
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
    } else {
        var node_L1 = node_L1_group.append("rect")
            .attr("class", "event")
            .attr('id', function (d) {
                return d.id;
            })
            .attr("transform", rotate_node)
            .attr("x", function (d) {
                return d.x - L1_circle_radius;
            })
            .attr("y", function (d) {
                return d.y - L1_circle_radius;
            })
            .attr("width", L1_circle_radius * 2)
            .attr("height", L1_circle_radius * 2);
    }
}

function draw_L2(node_L2_group, isEventCenter) {
    if (isEventCenter) {
        var node_L2 = node_L2_group.append("rect")
            .attr("class", "event")
            .attr('id', function (d) {
                return d.id;
            })
            .attr("transform", rotate_node)
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
    } else {
        var node_L2 = node_L2_group.append("circle")
            .attr("class", "event")
            .attr('id', function (d) {
                return d.id;
            })
            .attr("transform", rotate_node)
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            .attr("r", function (d) {
                return L2_circle_radius;
            });
    }
}

function draw_L3(node_L3_group, isEventCenter) {
    var radius = L3_circle_radius;
    if (isEventCenter) {
        var node_L3 = node_L3_group.append("rect")
            .attr("class", "event")
            .attr('id', function (d) {
                return d.id;
            })
            .attr("x", function (d) {
                return d.x - radius;
            })
            .attr("y", function (d) {
                return d.y - radius;
            })
            .attr("width", function (d) {
                return radius * 2;
            })
            .attr("height", function (d) {
                return radius * 2;
            });
    } else {
        var node_L3 = node_L3_group.append("circle")
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
            });
    }
}

function createGroup(className, classNameExtend, data, mouseOver, mouseOut, click) {
    var node_group = svg.selectAll("." + className)
        .data(data)
        .enter().append("g")
        .attr("class", className + " " + classNameExtend)
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", mouseOver == undefined ? node_mouseover : mouseOver)
        .on("mouseout", mouseOut == undefined ? node_mouseout : mouseOut)
        .on("click", click == undefined ? node_click : click);

    var node_title = node_group.append("title")
        .text(function (d) {
            if (d.data != null) {
                return d.data.name;
            } else {
                return d.count;
            }

        });

    return node_group;
}