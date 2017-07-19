var center = {
    x: 500,
    y: 500,
    r: 50
}

var center2 = {
    x: center.x - center.r,
    y: center.y,
    r: center.r
}

var data = [];

for (var i = 0; i < 1; i++) {
    var source = {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500)
    };

    // var source = {
    //     x: 300,
    //     y: 300
    // };

    data.push({
        source: center,
        target: source
    });
}

var svg = d3.select("body")
    .append("svg")
    .attr("width", "700px")
    .attr("height", "700px");

var color1 = "blue";
var defs = svg.append("defs");
var linearGradient3 = defs.append("linearGradient").attr("id", "linearGradient3");
linearGradient3.append("stop").attr("offset", "0%").attr("stop-color", color1).attr("stop-opacity", "0");
linearGradient3.append("stop").attr("id", "stop1").attr("offset", "50%").attr("stop-color", color1).attr("stop-opacity", "0");
linearGradient3.append("stop").attr("id", "stop2").attr("offset", "51%").attr("stop-color", color1).attr("stop-opacity", "1");
linearGradient3.append("stop").attr("offset", "100%").attr("stop-color", color1).attr("stop-opacity", "1");

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
    data += "C " + cx + " " + cy + " " + cx + " " + cy + " " + (tx + r) + " " + (ty + r);
    data += "L " + (tx - r) + " " + (ty - r);
    data += "C " + cx + " " + cy + " " + cx + " " + cy + " " + x0 + " " + y0;

    return data;
}

var mylineTween = function (d, i, a) {
    var color = "blue";
    return function (t) {
        var p = 100 - t * 100;
        d3.select("#stop1").attr("offset", p + "%");
        d3.select("#stop2").attr("offset", p + "%");
        return "url(#linearGradient3)";
    };
}

var link = svg.selectAll(".link")
    .data(data).enter()
    .append("path")
    .attr("class", "link")
    .attr("d", myline)
    .attr("fill", "url(#linearGradient3)")
    .attr("stroke", "url(#linearGradient3)")
    .transition()
    .duration(2000)
    .ease("linear")
    .attrTween("fill", mylineTween);

var point = svg.selectAll(".point")
    .data(data).enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", function (d) {
        return d.source.x;
    })
    .attr("cy", function (d) {
        return d.source.y;
    })
    .attr("r", 5);

var point = svg.selectAll(".center")
    .data([center]).enter()
    .append("circle")
    .attr("class", "center")
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", 5);

var point = svg.selectAll(".center2")
    .data([center2]).enter()
    .append("circle")
    .attr("class", "center")
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", 5);