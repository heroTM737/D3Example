let { createButton, btn_w, btn_h, btn_m } = require('./buttons');
let { highlightNode } = require('./highlight');

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

    var dataBus = {tree, svg, root};

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
        highlightNode({ dataBus, node: root, status: false });
    }

    function clickNode(d) {
        d3.event.stopPropagation();
        activeNode = d;
        showDetail(activeNode);
        highlightNode({ dataBus, node: d, status: true });
    }

    function doubleClickNode(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
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
                case "MOUSE_OVER_NODE": //fire only no active node
                    if (activeNode == null) {
                        highlightNode({ dataBus, node: eventData, status: true });
                    }
                    break;
                case "MOUSE_OUT_NODE": //fire only no active node
                    if (activeNode == null) {
                        highlightNode({ dataBus, node: eventData, status: false });
                    }
                    break;
                case "CLICK_NODE":
                    clickNode(eventData);
                    break;
                case "DOUBLE_CLICK_NODE":
                    doubleClickNode(eventData);
                    break;
                case "CLEAR_HIGHLIGHT_NODE":
                    clearHighlightNode();
                    break;
                default: console.log("No action defined for eventType = " + eventType);
            }
        }
    }

    // var btnOpenGroup = createButton(svg, 0, 0, "Open all host");
    // btnOpenGroup.on("click", openAllHost);

    // var btnCloseGroup = createButton(svg, btn_w + btn_m, 0, "Close all host");
    // btnCloseGroup.on("click", closeAllHost);

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
            .on("click", (d) => eventBus.fireEvent("CLICK_NODE", d))
            .on("dblclick", (d) => eventBus.fireEvent("DOUBLE_CLICK_NODE", d));

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

    function showDetail(d) {
        $("#detail").html("<div>" + d.name + "</div>");
    }
}

module.exports = dcs;