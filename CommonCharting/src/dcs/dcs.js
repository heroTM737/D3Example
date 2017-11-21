let { createButton, btn_w, btn_h, btn_m } = require('./buttons');
let { highlightNode } = require('./highlight');
let { createEventBus } = require('./eventBus');

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

    let treeData = data.data;
    if (treeData == undefined || treeData == null || treeData.length < 1) {
        return {};
    }
    let cmd = data.cmd;
    width = width - margin.right - margin.left;
    height = height - margin.top - margin.bottom;
    let count = 0;

    let root = treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;

    let tree = d3.layout.tree().size([height, width]);

    let svg = d3.select(container).append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .on("click", function (d) { eventBus.fireEvent("CLEAR_HIGHLIGHT_NODE", d); })
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    let dataBus = { tree, svg, root };
    let eventBus = createEventBus(dataBus);

    // let btnOpenGroup = createButton(svg, 0, 0, "Open all host");
    // btnOpenGroup.on("click", d => eventBus.fireEvent("OPEN_ALL_HOST", d));

    // let btnCloseGroup = createButton(svg, btn_w + btn_m, 0, "Close all host");
    // btnCloseGroup.on("click", d => eventBus.fireEvent("CLOSE_ALL_HOST", d));

    update(root);

    function update(source) {
        // Compute the new tree layout.
        let nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth
        nodes.forEach(function (d) { d.y = d.depth * 180; });

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
                } else if (d._children) {
                    className += " close";
                }
                if (d.status) {
                    className += " " + d.status;
                }
                return className;
            })
            .attr("transform", d => { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .attr("id", d => { return "node" + d.id; })
            .on("mouseover", d => eventBus.fireEvent("MOUSE_OVER_NODE", d))
            .on("mouseout", d => eventBus.fireEvent("MOUSE_OUT_NODE", d))
            .on("click", d => eventBus.fireEvent("CLICK_NODE", d))
            .on("dblclick", d => eventBus.fireEvent("DOUBLE_CLICK_NODE", d));

        nodeEnter.append("circle")
            .attr("r", 1e-6);

        nodeEnter.append("text")
            .attr("x", "0")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d) { return mapTypeToCharacter(d.type); })
            .style("fill-opacity", 1e-6);

        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.type == "HOST" ? 0 : (d.children || d._children ? -(node_r + 5) : (node_r + 5));
            })
            .attr("y", function (d) {
                return d.type == "HOST" ? node_r : 0;
            })
            .attr("dy", function (d) {
                return d.type == "HOST" ? "1em" : ".35em";
            })
            .attr("text-anchor", function (d) {
                return d.type == "HOST" ? "middle" : (d.children || d._children ? "end" : "start");
            })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6);

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
            .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        svg.selectAll(".node").attr("class", function (d) {
            let className = "node " + d.type.toLowerCase();
            if (d.children) {
                className += " open";
            } else if (d._children) {
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
                let o = { x: source.x0, y: source.y0 };
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
                let o = { x: source.x, y: source.y };
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
        if (window.d3ChartActionCommand) {
            d3ChartActionCommand(cmd, d);
        }
    }

    return { update };
}

module.exports = dcs;