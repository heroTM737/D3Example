function center_graph(node_center, node_extend, configVar) {

    //define in use variables
    var node_radius = configVar.node_radius;

    var L0_circle_radius = configVar.L0_circle_radius;
    var L1_circle_radius = configVar.L1_circle_radius;
    var L2_circle_radius = configVar.L2_circle_radius;
    var L3_circle_radius = configVar.L3_circle_radius;

    var L1_min_radius = configVar.L1_min_radius;
    var L2_min_radius = configVar.L2_min_radius;

    var L0_radius = configVar.L0_radius;
    var L1_radius = configVar.L1_radius;
    var L2_radius = configVar.L2_radius;

    var L3_width = configVar.L3_width;
    var L3_margin = configVar.L3_margin;

    var c_marmin = 1;
    var text_node_margin = configVar.text_node_margin;
    var y_margin = configVar.y_margin;
    var radius = configVar.node_radius;
    var character_length = configVar.character_length;
    var padding_y = configVar.padding_y;
    var padding = configVar.padding;
    var shift_x = configVar.shift_x;
    var shift_y = configVar.shift_y;

    //computation
    var nodes_L1, step_angle;
    var start_angle = 0;
    if (node_center.type == "event") {
        nodes_L1 = node_center.sources.values().concat(node_center.targets.values());
        step_angle = 2 * Math.PI / (node_center.sources.values().length + node_center.targets.values().length);
        start_angle = Math.PI - (node_center.sources.size() - 1) * step_angle / 2;
    } else {
        nodes_L1 = node_center.related_events.values();
        step_angle = 2 * Math.PI / node_center.related_events.size();
    }

    var links = [];
    var nodes_L2 = [];

    L1_radius = Math.max(L1_min_radius, nodes_L1.length * (L1_circle_radius + c_marmin) / Math.PI + L1_circle_radius);
    L2_radius = 2 * L1_radius;
    extend_node_width = L2_circle_radius * 2 + text_node_margin + L3_width * character_length + padding_y;
    var svg_width = L2_radius * 2 + L2_circle_radius + padding * 2 + L3_margin * 2 + L3_width * 2;
    var svg_height = (L2_radius + L2_circle_radius + padding) * 2 + shift_y;
    node_center.x = svg_width / 2;
    node_center.y = L2_radius + L2_circle_radius + padding + shift_y;
    configVar.center.x = node_center.x;
    configVar.center.y = node_center.y;

    nodes_L1.forEach(function (node_L1, index) {
        var combine = {
            id: "c" + node_center.id + "" + node_L1.id,
            type: "combine",
            count: 0,
            center: node_center,
            source: node_L1
        }
        nodes_L2.push(combine);

        if (node_center.type == "event") {
            combine.count = node_L1.related_events.size() - 1;
            links.push({
                id: "from_" + node_L1.id + "_to_" + node_center.id,
                source: node_L1,
                target: node_center
            });

            links.push({
                id: "from_" + node_L1.id + "_to_" + combine.id,
                source: node_L1,
                target: combine
            });
        } else {
            if (node_center.type == "source") {
                combine.count = node_L1.targets.size();
            } else {
                combine.count = node_L1.sources.size();
            }

            links.push({
                id: "from_" + node_center.id + "_to_" + node_L1.id,
                source: node_center,
                target: node_L1
            });

            links.push({
                id: "from_" + combine.id + "_to_" + node_L1.id,
                source: combine,
                target: node_L1
            });
        }

        var angle = start_angle + index * step_angle;
        node_L1.x = node_center.x + Math.cos(angle) * L1_radius;
        node_L1.y = node_center.y + Math.sin(angle) * L1_radius;
        node_L1.a = angle / Math.PI * 180;

        combine.x = node_center.x + Math.cos(angle) * L2_radius;
        combine.y = node_center.y + Math.sin(angle) * L2_radius;
        combine.a = node_L1.a;
    });

    var nodes_L3 = [];
    var links_extend = [];
    var combine_source;
    var nodes_L3_height = 0;
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

        //extract combine source from nodes_L2
        if (node_extend != null && node_extend != undefined) {
            var combine_index = nodes_L1.indexOf(node_extend);
            if (combine_index >= 0) {
                combine_source = nodes_L2.splice(combine_index, 1)[0];
            }
        }

        var direction = 1;
        if (combine_source.x < node_center.x) {
            direction = -1;
        }

        var combine_transit = {
            x: node_center.x + (L2_radius + L2_circle_radius + 10) * direction,
            y: combine_source.y
        }

        //define coordinate
        nodes_L3_height = nodes_L3.length * (L3_circle_radius * 2 + y_margin) - y_margin;
        var base_y = combine_source.y - nodes_L3_height / 2;
        if (base_y + nodes_L3_height > node_center.y + L2_radius) {
            base_y = node_center.y + L2_radius - nodes_L3_height;
        }

        if (base_y < node_center.y - L2_radius) {
            base_y = node_center.y - L2_radius - L3_circle_radius;
        }

        nodes_L3.forEach(function (node_L3, index) {
            node_L3.x = node_center.x + (L2_radius + L2_circle_radius + L3_margin + L3_circle_radius) * direction;
            node_L3.y = base_y + L3_circle_radius + index * (L3_circle_radius * 2 + y_margin);

            links_extend.push({
                id: "from_" + combine_source.id + "_to_" + node_L3.id,
                source: combine_transit,
                target: node_L3
            });
        });
    }
    if (combine_source != null) {

        configVar.events.combine_highlight = function (d, state) {
            var container = configVar.container;
            if (d.id == node_extend.id) {
                d3.select(container).selectAll(".linkx").classed('link-highlight', state);
                d3.select(container).selectAll("#extend_line").classed('link-highlight', state);

                if (d.type == "event") {
                    d3.select(container).select("#from_" + combine_source.id + "_to_" + node_extend.id).classed('link-highlight', state);
                } else {
                    d3.select(container).select("#from_" + node_extend.id + "_to_" + combine_source.id).classed('link-highlight', state);
                }
            } else {
                var checkRelated = node_extend.related_nodes.get(d.id) != null;
                var checkNotCenter = d.id != node_center.id;
                var checkType = false;
                if (node_center.type == "event") {
                    if (d.type == node_center.type) {
                        checkType = true;
                    }
                } else {
                    if (d.type == "source" || d.type == "target" || d.type == "source_target") {
                        checkType = true;
                    }
                }

                if (checkRelated && checkNotCenter && checkType) {
                    var target_link_id = "from_" + combine_source.id + "_to_" + d.id;

                    //bring related link to front if highlight
                    if (state) {
                        d3.select(container).selectAll('.linkx').sort(function (a, b) {
                            return a.id == target_link_id;
                        });
                    }

                    //highlight related link
                    d3.select(container).selectAll(".linkx").classed('link-highlight', function (dl) {
                        return (dl.id == target_link_id) && state;
                    });

                    //highlight extend line
                    d3.select(container).selectAll("#extend_line").classed('link-highlight', state);

                    if (d.type == "event") {
                        d3.select(container).select("#from_" + node_extend.id + "_to_" + combine_source.id).classed('link-highlight', state);
                    } else {
                        d3.select(container).select("#from_" + combine_source.id + "_to_" + node_extend.id).classed('link-highlight', state);
                    }
                }
            }
        }
    }

    //clear
    d3.select(configVar.container).selectAll("*").remove();

    //render
    if (nodes_L3.length > 0) {
        svg_height = Math.max(svg_height, nodes_L3_height + padding * 2 + shift_y);
    }

    var svg = d3.select(configVar.container);
    svg.attr("viewBox", "0 0 " + svg_width + " " + svg_height);
    svg.attr("width", svg_width);
    svg.attr("height", svg_height);
    var L0_className = [];
    var L1_className = [];
    var L2_className = [];
    var L3_className = [];
    var isEventCenter = true;
    if (node_center.type == "event") {
        L0_className = ["event-group"];
        L1_className = ["machine-group"];
        L2_className = ["event-combine-group"];
        isEventCenter = true;
    } else if (node_center.type == "source") {
        L0_className = ["machine-group", "source"];
        L1_className = ["event-group"];
        L2_className = ["machine-combine-group", "target"];
        isEventCenter = false;
    } else {
        L0_className = ["machine-group", "target"];
        L1_className = ["event-group"];
        L2_className = ["machine-combine-group", "source"];
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

    if (combine_source != null) {
        var extend_curve = function (d) {
            var x1 = (d.source.x + d.target.x) / 2;
            var y1 = d.source.y;
            var x2 = x1;
            var y2 = y1;

            var m = "M " + d.source.x + " " + d.source.y;
            var c = "C " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + (d.target.x - L3_circle_radius * direction) + " " + d.target.y;

            return m + c;
        }

        var linkx = svg.append("g").selectAll("path")
            .data(links_extend)
            .enter().append("path")
            .attr("class", "link linkx")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("d", extend_curve);

        var extend_line = svg.append("line")
            .attr("id", "extend_line")
            .attr("x1", function (d) {
                return combine_source.x;
            })
            .attr("y1", function (d) {
                return combine_source.y;
            })
            .attr("x2", function (d) {
                return combine_transit.x;
            })
            .attr("y2", function (d) {
                return combine_transit.y;
            });
    }

    //draw L0 or center
    var node_L0_group = createGroup(configVar, "L0-group", L0_className, [node_center]);
    var node_L0 = draw_L0(node_L0_group, isEventCenter, configVar);

    //draw L1
    var node_L1_group = createGroup(configVar, "L1-group", L1_className, nodes_L1);
    var node_L1 = draw_L1(node_L1_group, isEventCenter, configVar);

    //draw L2
    var node_L2_group = createGroup(configVar, "L2-group", L2_className, nodes_L2, null, null, getEvents(configVar).node_combine_click);
    var node_L2 = draw_L2(node_L2_group, isEventCenter, configVar);
    var node_L2_text = node_L2_group.append("text")
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
            return d.count;
        });

    //draw L3
    var node_L3_group = createGroup(configVar, "L3-group", [], nodes_L3);
    var node_L3 = draw_L3(node_L3_group, isEventCenter, configVar);
    var node_L3_text = node_L3_group.append("text")
        .attr("class", "text")
        .attr('id', function (d) {
            return "x" + d.id;
        })
        .attr("alignment-baseline", "central")
        .attr("text-anchor", direction > 0 ? "start" : "end")
        .attr("x", function (d) {
            return d.x + (L3_circle_radius + text_node_margin) * direction;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function (d) {
            return shortenExtendText(d.data.name, configVar);
        });

    configVar.graphDescription = node_center.data.name;
    buttons(false, configVar);
}

function rotate_node(d, config) {
    if (d.a == null || d.a == undefined) {
        d.a = 0;
    }
    var rotate = d.x < config.center.x ? (d.a + 180) : d.a;
    rotate %= 360;
    rotate += " " + d.x + " " + d.y;
    return "rotate(" + rotate + ")";
}

function draw_L0(node_L0_group, isEventCenter, configVar) {
    var L0_circle_radius = configVar.L0_circle_radius;
    if (isEventCenter) {
        var node_L0 = node_L0_group.append("rect")
            .attr("class", "event")
            .attr('id', function (d) {
                return d.id;
            })
            .attr("x", function (d) {
                return d.x - L0_circle_radius;
            })
            .attr("y", function (d) {
                return d.y - L0_circle_radius;
            })
            .attr("width", L0_circle_radius * 2)
            .attr("height", L0_circle_radius * 2);
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
    /*
    var node_L0_text = node_L0_group.append("text")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("alignment-baseline", "central")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return shortenText(d.data.name, configVar);
        });
        */
}

function draw_L1(node_L1_group, isEventCenter, configVar) {
    var L1_circle_radius = configVar.L1_circle_radius;
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
            .attr("transform", function (d) {
                return rotate_node(d, configVar);
            })
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

function draw_L2(node_L2_group, isEventCenter, configVar) {
    var L2_circle_radius = configVar.L2_circle_radius;
    if (isEventCenter) {
        var node_L2 = node_L2_group.append("rect")
            .attr("class", "")
            .attr('id', function (d) {
                return d.id;
            })
            .attr("transform", function (d) {
                return rotate_node(d, configVar);
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
    } else {
        var node_L2 = node_L2_group.append("circle")
            .attr("class", "")
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
                return L2_circle_radius;
            });
    }
}

function draw_L3(node_L3_group, isEventCenter, configVar) {
    var radius = configVar.L3_circle_radius;
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

function createGroup(configVar, className, classNameExtend, data, mouseOver, mouseOut, click) {
    var menu = function (data) {
        if (data.type == "combine") {
            return [];
        }
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

    var mouseEvents = configVar.events;
    var node_mouseover = mouseEvents.node_mouseover;
    var node_mouseout = mouseEvents.node_mouseout;
    var node_click = mouseEvents.node_click;

    var node_group = d3.select(configVar.container).selectAll("." + className)
        .data(data)
        .enter().append("g")
        .attr("class", function (d) {
            var extendName = "";
            classNameExtend.forEach(function (node, index) {
                extendName += " " + node;
            });
            return className + extendName;
        })
        .attr('id', function (d) {
            return "g" + d.id;
        })
        .on("mouseover", mouseOver == undefined ? node_mouseover : mouseOver)
        .on("mouseout", mouseOut == undefined ? node_mouseout : mouseOut)
        .on("click", click == undefined ? node_click : click)
        .on("contextmenu", function (d, i) {
            if (d.type != "combine") {
                d3.contextMenu(menu)(d, i);
            }
        });

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