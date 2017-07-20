var source = {
    x: 500,
    y: 350
}

var target = {
    x: Math.floor(Math.random() * 500),
    y: Math.floor(Math.random() * 500)
};

// var target = {
//     x: 300,
//     y: 500
// };

var data = [{ source, target }];

var svg = d3.select("body")
    .append("svg")
    .attr("width", "700px")
    .attr("height", "700px");

var color1 = "blue";
var defs = svg.append("defs");

var y1 = y1 = "";
if (source.y > target.y) {
    y1 = "0%";
    y2 = "100%";
} else {
    y1 = "100%";
    y2 = "0%";
}

var linearGradient = defs.append("linearGradient").attr("id", "linearGradient")
    .attr("x1", "0%")
    .attr("y1", y1)
    .attr("x2", "100%")
    .attr("y2", y2);
linearGradient.append("stop").attr("id", "stop0").attr("offset", "0%").attr("stop-color", color1).attr("stop-opacity", "0");
linearGradient.append("stop").attr("id", "stop1").attr("offset", "50%").attr("stop-color", color1).attr("stop-opacity", "0");
linearGradient.append("stop").attr("id", "stop2").attr("offset", "50%").attr("stop-color", color1).attr("stop-opacity", "1");
linearGradient.append("stop").attr("id", "stop3").attr("offset", "100%").attr("stop-color", color1).attr("stop-opacity", "1");

// var fx = fy = "";
// if (source.y > target.y) {
//     fx = fy = "0%";
// } else {
//     fx = "0%";
//     fy = "100%";
// }

// var radialGradient = defs.append("radialGradient").attr("id", "radialGradient")
//     .attr("fx", fx)
//     .attr("fy", fy)
//     .attr("cx", fx)
//     .attr("cy", fy)
//     .attr("r", "200%");
// radialGradient.append("stop").attr("id", "stop0").attr("offset", "000%").attr("stop-color", color1).attr("stop-opacity", "0");
// radialGradient.append("stop").attr("id", "stop1").attr("offset", "050%").attr("stop-color", color1).attr("stop-opacity", "0");
// radialGradient.append("stop").attr("id", "stop2").attr("offset", "050%").attr("stop-color", color1).attr("stop-opacity", "1");
// radialGradient.append("stop").attr("id", "stop3").attr("offset", "100%").attr("stop-color", color1).attr("stop-opacity", "1");

var computeControlPoint = function (x0, y0, x1, y1) {
    var d = 50;

    var cx = (x0 + x1) / 2;
    var cy = (y0 + y1) / 2;

    var a = y0 - y1;
    var b = x1 - x0;

    var x = d * Math.sqrt(a * a / (a * a + b * b)) + cx;
    var y = (x - cx) / a * b + cy;

    return { x: x, y: y }
}

var myline = function (d) {
    var r = 5;

    var x0 = d.source.x;
    var y0 = d.source.y;
    var tx = d.target.x;
    var ty = d.target.y;

    var c = computeControlPoint(d.source.x, d.source.y, d.target.x, d.target.y);
    var cx = c.x;
    var cy = c.y;

    var data = "";
    data += "M " + x0 + " " + y0;
    data += "C " + cx + " " + cy + " " + cx + " " + cy + " " + (tx - r) + " " + (ty - r);
    data += "L " + (tx + r) + " " + (ty + r);
    data += "C " + cx + " " + cy + " " + cx + " " + cy + " " + x0 + " " + y0;

    return data;
}

// var radientID = "url(#radialGradient)";
var radientID = "url(#linearGradient)";
var mylineTween = function (d, i, a) {
    var color = "blue";
    return function (t) {
        var p = 100 - t * 100;
        d3.select("#stop1").attr("offset", p + "%");
        d3.select("#stop2").attr("offset", p + "%");
        return radientID;
    };
}

var link = svg.selectAll(".link")
    .data(data).enter()
    .append("path")
    .attr("class", "link")
    .attr("d", myline)
    .attr("fill", radientID)
    .attr("stroke", radientID)
    .transition()
    .duration(2000)
    .ease("linear")
    .attrTween("fill", mylineTween);

var source_node = svg
    .append("circle")
    .datum(source)
    .attr("class", "node")
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", 5);

var target_node = svg
    .append("circle")
    .datum(target)
    .attr("class", "center")
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", 5);