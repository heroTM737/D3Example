// training.js
var treeData = genData();
var margin = { top: 5, right: 5, bottom: 5, left: 60 },
    width = 700 - margin.right - margin.left,
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
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;

var activeNode = null;

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
        .on("mouseover", function (d) { highlightNode(d, true); })
        .on("mouseout", function (d) { highlightNode(d, false); })
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
        .on("mouseover", function (d) { highlightLink(d, true); })
        .on("mouseout", function (d) { highlightLink(d, false); })
        .on("click", click);

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

// Toggle children on click.
function dblclick(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);

    if (activeNode != null) {
        highlightNode(activeNode, false, false);
    }
}

function click(d) {
    $("#detail").html("<div>" + d.name + "</div>");

    if (activeNode != null) {
        highlightNode(activeNode, false, false);
    }
    activeNode = d;
    highlightNode(activeNode, true, true);
}

function highlightLink(link, status, statusKeep) {
    highlightMyLink(link.source, link.target, status, statusKeep);
    travelUpHighlight(link.source, status, statusKeep);
    travelDownHighlight(link.target, status, statusKeep);

    // d3.select("#tree").selectAll('.link').sort(function (a, b) {
    //     return a.id == "id";
    // });
}

function highlightNode(node, status, statusKeep) {
    travelUpHighlight(node, status, statusKeep);
    travelDownHighlight(node, status, statusKeep);

    // d3.select("#tree").selectAll('.link').sort(function (a, b) {
    //     return a.id == "id";
    // });
}

function travelUpHighlight(node, status, statusKeep) {
    highlightMyNode(node, status, statusKeep);
    if (node.parent) {
        highlightMyLink(node.parent, node, status, statusKeep);
        travelUpHighlight(node.parent, status, statusKeep);
    }
}

function travelDownHighlight(node, status, statusKeep) {
    highlightMyNode(node, status, statusKeep);
    if (node.children) {
        node.children.forEach(function (e, i) {
            highlightMyLink(node, e, status, statusKeep);
            travelDownHighlight(e, status, statusKeep);
        });
    }
}

function highlightMyLink(source, target, status, statusKeep) {
    var link_id = "#from" + source.id + "to" + target.id;
    d3.select(link_id).classed("highlight", status);
    if (statusKeep != undefined && statusKeep != null) {
        d3.select(link_id).classed("highlightKeep", statusKeep);
    }
}

function highlightMyNode(node, status, statusKeep) {
    var node_id = "#node" + node.id;
    d3.select(node_id).classed("highlight", status);
    if (statusKeep != undefined && statusKeep != null) {
        d3.select(node_id).classed("highlightKeep", statusKeep);
    }
}





