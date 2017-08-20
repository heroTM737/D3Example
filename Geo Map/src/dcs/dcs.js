let { createButton, btn_w, btn_h, btn_m } = require('./buttons');

var diagonal = d3.svg.diagonal()
    .projection(function (d) { return [d.y, d.x]; });

function mapTypeToCharacter(type) {
    switch (type) {
        case "correlator": return "C";
        case "aggregator": return "A";
        case "messagebus": return "MB";
        case "persistor": return "P";
        case "dcache": return "DC";
    }
    return "";
}

//define common variable
var margin = { top: 5, right: 5, bottom: 5, left: 60 };
var width = 550 - margin.right - margin.left;
var height = 800 - margin.top - margin.bottom;
var node_r = 15;
var duration = 750;

function dcs(treeData) {
    var count = 0;
    var root;
    var activeNode = null;
    var eventBus = null;

    var tree = d3.layout.tree().size([height, width]);

    var svg = d3.select("#tree").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .on("click", function (d) { eventBus.fireEvent("CLEAR_HIGHLIGHT_NODE", d); })
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    root = treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;

    function openAllHost(d) {
        var nodes = tree.nodes(root).reverse();
        nodes.forEach(function (d) {
            if (d.type == "host") {
                if (d.children == null) {
                    d.children = d._children;
                    d._children = null;
                    // update(d);
                }
            }
        });
        update(root);
    }

    function closeAllHost(d) {
        var nodes = tree.nodes(root).reverse();
        nodes.forEach(function (d) {
            if (d.type == "host") {
                if (d.children != null) {
                    d._children = d.children;
                    d.children = null;
                    // update(d);
                }
            }
        });
        update(root);
    }

    function clearHighlightNode() {
        if (activeNode != null) {
            activeNode = null;
        }
        highlightNode({ node: root, status: false, statusKeep: false });
    }

    var eventBus = {
        fireEvent: (eventType, eventData) => {
            switch (eventType) {
                case "OPEN_ALL_HOST":
                    openAllHost(eventData);
                    break;
                case "CLOSE_ALL_HOST":
                    closeAllHost(eventData);
                    break;
                case "MOUSE_OVER_NODE":
                    highlightNode({ node: eventData, status: true });
                    break;
                case "MOUSE_OUT_NODE":
                    highlightNode({ node: eventData, status: false });
                    break;
                case "CLICK_NODE":
                    break;
                case "CLEAR_HIGHLIGHT_NODE":
                    clearHighlightNode();
                    break;
                case "DOUBLE_CLICK_NODE":
                    break;
                default: console.log("No action defined for eventType = " + eventType);
            }
        }
    }

    var btnOpenGroup = createButton(svg, 0, 0, "Open all host");
    btnOpenGroup.on("click", openAllHost);

    var btnCloseGroup = createButton(svg, btn_w + btn_m, 0, "Close all host");
    btnCloseGroup.on("click", closeAllHost);

    update(root);

    function update(source) {
        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) { d.y = d.depth * 180; });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                d.links = [];
                return d.id || (d.id = ++count);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", function (d) {
                var className = "node " + d.type;
                if (d.children) {
                    className += " close";
                } else if (d._children) {
                    className += " open";
                }
                if (d.status) {
                    className += " " + d.status;
                }
                return className;
            })
            .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .attr("id", function (d) { return "node" + d.id; })
            .on("mouseover", function (d) { eventBus.fireEvent("MOUSE_OVER_NODE", d); })
            .on("mouseout", function (d) { eventBus.fireEvent("MOUSE_OUT_NODE", d); })
            .on("click", click)
            .on("dblclick", dblclick);

        nodeEnter.append("circle")
            .attr("r", 1e-6);

        nodeEnter.append("text")
            .attr("x", "0")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d) { return mapTypeToCharacter(d.type); })
            .style("fill-opacity", 1e-6);

        nodeEnter.append("text")
            .attr("x", function (d) { return d.children || d._children ? -(node_r + 5) : (node_r + 5); })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6);

        nodeEnter.append("title")
            .text(function (d) { return d.name; })

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", node_r);

        nodeUpdate.selectAll("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                d.id = "from" + d.source.id + "to" + d.target.id;
                d.source.links.push(d);
                d.target.links.push(d);
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("id", function (d) { return d.id })
            .attr("d", function (d) {
                var o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            })
            .on("mouseover", function (d) { eventBus.fireEvent("MOUSE_OVER_NODE", d.target); })
            .on("mouseout", function (d) { eventBus.fireEvent("MOUSE_OUT_NODE", d.target); });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Toggle children on double click.
    function dblclick(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }

    // highlight node on click
    function click(d) {
        d3.event.stopPropagation();
        activeNode = d;
        showDetail(d);
        highlightNode({ node: activeNode, statusKeep: true });
    }

    function showDetail(d) {
        $("#detail").html("<div>" + d.name + "</div>");
    }

    function highlightNode(config) {
        config.className = "node-fade";
        config.classNameKeep = "node-fade-keep";

        var statusKeep = config.statusKeep;
        if (statusKeep != undefined && statusKeep != null) {
            //remove highlight fade out class
            travelDownHighlight({ ...config, status: false, node: root });

            //set fade out all node
            travelDownHighlight({ ...config, status: null, node: root });

            //remove fade out selected node
            travelUpHighlight({ ...config, statusKeep: false });
            travelDownHighlight({ ...config, statusKeep: false });

            config.classNameKeep = "node-highlight";
            //remove highlight all node
            travelDownHighlight({ ...config, status: null, statusKeep: false, node: root });

            //highlight selected node
            travelUpHighlight({ ...config });
            travelDownHighlight({ ...config });
        } else {
            var status = config.status;
            if (activeNode == null && status != undefined && status != null) {
                //set fade out all node
                travelDownHighlight({ ...config, node: root });

                //remove fade out selected node
                travelUpHighlight({ ...config, status: false });
                travelDownHighlight({ ...config, status: false });

                config.className = "node-highlight";
                //remove highlight all node
                travelDownHighlight({ ...config, status: false, node: root });

                //highlight selected node
                travelUpHighlight({ ...config });
                travelDownHighlight({ ...config });
            }
        }
    }

    function travelUpHighlight(config) {
        var node = config.node;
        var parent = node.parent;

        highlightMyNode(config);
        if (parent) {
            highlightMyLink({
                ...config,
                source: parent,
                target: node
            });
            travelUpHighlight({ ...config, node: parent });
        }
    }

    function travelDownHighlight(config) {
        var node = config.node;
        var children = node.children;

        highlightMyNode(config);
        if (children) {
            children.forEach(function (e, i) {
                highlightMyLink({
                    ...config,
                    source: node,
                    target: e
                });
                travelDownHighlight({ ...config, node: e });
            });
        }
    }

    function highlightMyLink(config) {
        var link_id = "#from" + config.source.id + "to" + config.target.id;
        highlightById({ ...config, id: link_id });
    }

    function highlightMyNode(config) {
        var node_id = "#node" + config.node.id;
        highlightById({ ...config, id: node_id });
    }

    function highlightById({ id, status, className, statusKeep, classNameKeep }) {
        if (status != undefined && status != null) {
            d3.select(id).classed(className, status);
        }
        if (statusKeep != undefined && statusKeep != null) {
            d3.select(id).classed(classNameKeep, statusKeep);
        }
    }
}

module.exports = dcs;