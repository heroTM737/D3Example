function dcs(treeData) {
    var margin = { top: 5, right: 5, bottom: 5, left: 60 },
        width = 550 - margin.right - margin.left,
        height = 800 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.y, d.x]; });

    var svg = d3.select("#tree").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .on("click", function (d) {
            if (activeNode != null) {
                activeNode = null;
                highlightNode({ node: root, status: false, statusKeep: false });
            }
        })
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    root = treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;

    var activeNode = null;

    var btnOpenGroup = svg.append("g")
        .attr("class", "btn-host")
        .on("click", function (d) {
            var nodes = tree.nodes(root).reverse();
            nodes.forEach(function (d) {
                if (d.type == "host") {
                    if (d.children == null) {
                        d.children = d._children;
                        d._children = null;
                    }
                }
            });
            update(root);
        });

    btnOpenGroup.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 25);

    btnOpenGroup.append("text")
        .attr("x", 50)
        .attr("y", 17)
        .attr("text-anchor", "middle")
        .text("Open all host");

    var btnCloseGroup = svg.append("g")
        .attr("class", "btn-host")
        .on("click", function (d) {
            var nodes = tree.nodes(root).reverse();
            nodes.forEach(function (d) {
                if (d.type == "host") {
                    if (d.children != null) {
                        d._children = d.children;
                        d.children = null;
                    }
                }
            });
            update(root);
        });

    btnCloseGroup.append("rect")
        .attr("x", 110)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 25);

    btnCloseGroup.append("text")
        .attr("x", 160)
        .attr("y", 17)
        .attr("text-anchor", "middle")
        .text("Close all host");

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
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", function (d) { return "node " + d.type; })
            .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .attr("id", function (d) { return "node" + d.id; })
            .on("mouseover", function (d) { highlightNode({ node: d, status: true }); })
            .on("mouseout", function (d) { highlightNode({ node: d, status: false }); })
            .on("click", click)
            .on("dblclick", dblclick);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .attr("class", function (d) { return d._children ? "close" : "open"; });

        nodeEnter.append("title")
            .text(function (d) { return d.name; })

        nodeEnter.append("text")
            .attr("x", function (d) { return d.children || d._children ? -13 : 13; })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6)
            .attr("class", function (d) {
                if (d.url != null) { return 'hyper'; }
            })
            .on("click", click);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 10)
            .attr("class", function (d) { return d._children ? "close" : "open"; });

        nodeUpdate.select("text")
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
            .on("mouseover", function (d) { highlightNode({ node: d.target, status: true }); })
            .on("mouseout", function (d) { highlightNode({ node: d.target, status: false }); });

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
        } else {
            var status = config.status;
            if (activeNode == null && status != undefined && status != null) {
                //set fade out all node
                travelDownHighlight({ ...config, node: root });

                //remove fade out selected node
                travelUpHighlight({ ...config, status: false });
                travelDownHighlight({ ...config, status: false });
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