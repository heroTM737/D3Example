$(document).ready(() => {
    var refreshInterval = 3000;
    var conainer = document.getElementById("tree");
    var data = genData();
    var tree_json = JSON.stringify(data);
    var tree = dcs(conainer, data, 700, 850);

    var update = function () {
        var data = JSON.parse(tree_json);
        var root = data.data[0];
        var hostIndex = -1;

        //remove node
        if (Math.random() > 0.5) {
            hostIndex = Math.floor(Math.random() * 10) % count_host;
            var children = root.children[hostIndex].children;
            if (children && children.length > 0) {
                root.children[hostIndex].children.splice(0, 1);
            }
        }

        //add node
        if (Math.random() > 0.5) {
            hostIndex = Math.floor(Math.random() * 10) % count_host;
            if (!root.children[hostIndex].children) {
                root.children[hostIndex].children = [];
            }
            root.children[hostIndex].children.push(genNode("later"));
        }

        //renew status
        travelTree(root, node => {
            var type = node.type;
            if (type != "HOST" && type != "CLUSTER") {
                var statusIndex = Math.floor(Math.random() * statusType.length);
                var newStatus = statusType[statusIndex];
                node.status = newStatus;
            }
        });

        tree_json = JSON.stringify(data);

        //update the tree
        tree.update(data);

        //restart timer
        setTimeout(update, refreshInterval);
    }

    setTimeout(update, refreshInterval);

    createLegend();
});

function travelTree(root, callback) {
    callback(root);
    if (root._children) {
        root.children = root._children;
        root._children = null;
    }
    var children = root.children;
    if (children && children.length > 0) {
        children.forEach(child => travelTree(child, callback));
    }
}

function createLegend(container) {
    var container = document.getElementById("legendContainer");
    window.showLegend = function (show) {
        if (show) {
            $(legendContainer).addClass("fuckon");
        } else {
            $(legendContainer).removeClass("fuckon");
        }
    }

    var r = 15;
    var margin_left = 15;
    var item_h = 45;
    var svg_w = 270;
    var svg_h = item_h * 10;

    var svg = d3.select(container).append("svg");
    svg.attr("width", svg_w).attr("height", svg_h);

    for (var i = 1; i < 10; i++) {
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", item_h * i)
            .attr("x2", svg_w)
            .attr("y2", item_h * i)
            .attr("shape-rendering", "crispEdges");
    }

    var circles = [
        {
            class: "correlator",
            text: "Correlator",
            type: "C"
        },
        {
            class: "aggregator",
            text: "Aggregator",
            type: "A"
        },
        {
            class: "messagebus",
            text: "Message Bus",
            type: "MB"
        },
        {
            class: "persistor",
            text: "Persistor",
            type: "P"
        },
        {
            class: "dcache",
            text: "D_Cache",
            type: "D"
        },
        {
            class: "active",
            text: "Active/Normal"
        },
        {
            class: "warning",
            text: "Warning"
        },
        {
            class: "error",
            text: "Error"
        },
        {
            class: "host",
            text: "Host"
        },
        {
            class: "cluster",
            text: "Cluster"
        },
    ];

    for (var i = 0; i < circles.length; i++) {
        var node = circles[i];
        var nodeGroup = svg.append("g")
            .attr("class", "node " + node.class)
        nodeGroup.append("circle")
            .attr("cx", margin_left + r)
            .attr("cy", item_h * i + item_h / 2)
            .attr("r", r);
        nodeGroup.append("text")
            .attr("x", margin_left + r)
            .attr("y", item_h * i + item_h / 2)
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .text(node.type);
        nodeGroup.append("text")
            .attr("x", margin_left * 2 + r * 2)
            .attr("y", item_h * i + item_h / 2)
            .attr("dy", "0.35em")
            .text(node.text);
        nodeGroup.append("title").text(node.text);
    }

}