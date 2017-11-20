$(document).ready(() => {
    var conainer = document.getElementById("tree");
    var data = genData();
    var tree = dcs(conainer, data, 700, 850);
    setTimeout(() => {
        data.data[0].children[0].children.push(genNode("later"));
        tree.update(data);
    }, 2000);

    var legendContainer = document.getElementById("legendContainer");
    createLegend(legendContainer);
    window.showLegend = function (show) {
        if (show) {
            $(legendContainer).addClass("fuckon");
        } else {
            $(legendContainer).removeClass("fuckon");
        }
    }
});

function createLegend(container) {
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