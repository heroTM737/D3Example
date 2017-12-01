let { createButton, btn_w, btn_h, btn_m } = require('./buttons');
let { createEventBus } = require('./eventBus');
let { travelTree } = require('./../tm');

let diagonal = d3.svg.diagonal()
    .projection(function (d) { return [d.y, d.x]; });

function mapTypeToCharacter(type) {
    switch (type) {
        case "CORRELATOR": return "C";
        case "AGGREGATOR": return "A";
        case "MBUS_DATA": return "MB";
        case "MANAGER": return "P";
        case "DCACHE": return "DC";
    }
    return "";
}

//define common letiable
let margin = { top: 5, right: 5, bottom: 5, left: 60 };
let node_r = 15;
let duration = 750;

function dcs(container, data, width, height) {
    //clean container
    d3.select(container).selectAll("*").remove();
    width = width - margin.right - margin.left;
    height = height - margin.top - margin.bottom;

    let treeData = null;
    let cmd = null;
    let root = null;
    let nodeMap = null;
    let count = 0;
    let tree = d3.layout.tree().size([height, width]);
    let eventBus = null;
    let activeNode = null;

    let svg = d3.select(container).append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .on("click", d => eventBus.fireEvent("CLEAR_HIGHLIGHT_NODE", d))
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // let btnOpenGroup = createButton(svg, 0, 0, "Open all host");
    // btnOpenGroup.on("click", d => eventBus.fireEvent("OPEN_ALL_HOST", d));

    // let btnCloseGroup = createButton(svg, btn_w + btn_m, 0, "Close all host");
    // btnCloseGroup.on("click", d => eventBus.fireEvent("CLOSE_ALL_HOST", d));

    reset(data);

    function reset(newData) {
        treeData = newData.data;
        if (treeData == undefined || treeData == null || treeData.length < 1) {
            return {};
        }
        cmd = newData.cmd;
        count = 0;
        root = treeData[0];
        root.x0 = height / 2;
        root.y0 = 0;

        nodeMap = {};
        travelTree(root, node => {
            nodeMap[node.dataId] = node;
            node.waitClick = null;
        });

        let dataBus = { tree, svg, root, update, nodeMap, cmd };
        eventBus = createEventBus(dataBus);

        update(root);

        //keep highlight state
        if (activeNode) {
            let newActiveNode = nodeMap[activeNode.dataId];
            if (newActiveNode) {
                activeNode = newActiveNode;
                eventBus.fireEvent("CLICK_NODE", activeNode);
            } else {
                eventBus.fireEvent("CLEAR_HIGHLIGHT_NODE", null);
            }
        }

    }

    function update(source) {
        // Compute the new tree layout.
        let nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth
        nodes.forEach(d => d.y = d.depth * 180);

        // Update the nodes…
        let node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                d.links = [];
                return d.id || (d.id = ++count);
            });

        // Enter any new nodes at the parent's previous position.
        let nodeEnter = node.enter().append("g")
            .attr("class", function (d) {
                let className = "node " + d.type.toLowerCase();
                if (d.children) {
                    className += " open";
                } else if (d.temp_children) {
                    className += " close";
                }
                if (d.status) {
                    className += " " + d.status;
                }
                return className;
            })
            .attr("transform", d => {
                if (d.parent && d.parent.x0) {
                    return "translate(" + d.parent.y0 + "," + d.parent.x0 + ")";
                } else {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                }
            })
            .attr("id", d => { return "node" + d.id; })
            .on("mouseover", d => eventBus.fireEvent("MOUSE_OVER_NODE", d))
            .on("mouseout", d => eventBus.fireEvent("MOUSE_OUT_NODE", d))
            .on("click", d => {
                if (d.waitClick) {
                    window.clearTimeout(d.waitClick);
                    d.waitClick = null;
                    eventBus.fireEvent("DOUBLE_CLICK_NODE", d);
                } else {
                    d.waitClick = setTimeout(() => {
                        activeNode = d;
                        d.waitClick = null;
                        eventBus.fireEvent("CLICK_NODE", d);
                    }, 300);
                }
                d3.event.stopPropagation();
            });

        nodeEnter.append("circle")
            .attr("r", 1e-6);

        //center sign
        nodeEnter.append("text")
            .attr("x", "0")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d) { return mapTypeToCharacter(d.type); })
            .style("fill-opacity", 1e-6);

        //name text 
        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.type == "HOST" ? 0 : (d.children || d.temp_children ? -(node_r + 5) : (node_r + 5));
            })
            .attr("y", function (d) {
                return d.type == "HOST" ? node_r : 0;
            })
            .attr("dy", function (d) {
                return d.type == "HOST" ? "1em" : ".35em";
            })
            .attr("text-anchor", function (d) {
                return d.type == "HOST" ? "middle" : (d.children || d.temp_children ? "end" : "start");
            })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6);

        //tooltip
        nodeEnter.append("title")
            .text(function (d) { return d.name; })

        // Transition nodes to their new position.
        let nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", node_r);

        nodeUpdate.selectAll("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        let nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                if (d.parent && nodeMap[d.parent.id]) {
                    parent = nodeMap[d.parent.id];
                    return "translate(" + parent.y + "," + parent.x + ")";
                } else {
                    return "translate(" + source.y + "," + source.x + ")";
                }
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        svg.selectAll(".node").attr("class", function (d) {
            let className = "node " + d.type.toLowerCase();
            if (d.children) {
                className += " open";
            } else if (d.temp_children) {
                className += " close";
            }
            if (d.status) {
                className += " " + d.status;
            }
            return className;
        });

        // Update the links…
        let link = svg.selectAll("path.link")
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
                let o = null;
                if (d.source.x0) {
                    o = { x: d.source.x0, y: d.source.y0 };
                } else {
                    o = { x: source.x0, y: source.y0 };
                }
                return diagonal({ source: o, target: o });
            })
            .on("mouseover", function (d) { eventBus.fireEvent("MOUSE_OVER_NODE", d.target); })
            .on("mouseout", function (d) { eventBus.fireEvent("MOUSE_OUT_NODE", d.target); });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting links to the source's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                let node = nodeMap[d.source.id];
                let o = null;
                if (node) {
                    o = { x: node.x, y: node.y };
                } else {
                    o = { x: d.source.x, y: d.source.y };
                }
                return diagonal({ source: o, target: o });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    function updateTree(newData) {
        travelTree(newData.data[0], node => {
            var currentNode = nodeMap[node.dataId];
            if (currentNode) {
                node.x = currentNode.x;
                node.y = currentNode.y;
                node.x0 = currentNode.x0;
                node.y0 = currentNode.y0;
                node.open = currentNode.open;

                if (currentNode.temp_children) {
                    node.temp_children = node.children;
                    node.children = null;
                }
            }
        });
        reset(newData);
    }

    return { update: updateTree };
}

module.exports = dcs;