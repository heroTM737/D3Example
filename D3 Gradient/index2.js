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

var line = d3.svg.line()
    .interpolate("bundle")
    .tension(0.1)
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    });

var svg = d3.select("body")
    .append("svg")
    .attr("width", "700px")
    .attr("height", "700px");

//define gradient
var defs = svg.append("defs");
var color1 = "blue";
var color2 = "red";
var linearGradient1 = defs.append("linearGradient").attr("id", "linearGradient1");
linearGradient1.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", color1)
    .attr("stop-stroke", "1");
linearGradient1.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", color2)
    .attr("stop-opacity", "0")
    .attr("stop-stroke", "3");

var linearGradient2 = defs.append("linearGradient").attr("id", "linearGradient2");
linearGradient2.append("stop").attr("offset", "0%").attr("stop-color", color2).attr("stop-opacity", "0");
linearGradient2.append("stop").attr("offset", "100%").attr("stop-color", color1);

var radialGradient = defs.append("radialGradient").attr("id", "radialGradient");
radialGradient.append("stop").attr("offset", "0%").attr("stop-color", "red");
radialGradient.append("stop").attr("offset", "100%").attr("stop-color", "red").attr("stop-opacity", "0");

var myline = function (d) {
    var r = 5;
    var data = "";
    data += "M " + d.source.x + " " + d.source.y;
    data += "C " + d.target.x + " " + d.source.y + " " + d.target.x + " " + d.source.y + " " + (d.target.x + r) + " " + (d.target.y + r);
    data += "L " + (d.target.x - r) + " " + (d.target.y - r);
    data += "C " + d.target.x + " " + d.source.y + " " + d.target.x + " " + d.source.y + " " + d.source.x + " " + d.source.y;

    return data;
}

var myline2 = function (d) {
    var r = 5;
    var data = "";
    data += "M " + d.source.x + " " + d.source.y;
    data += "C " + d.target.x + " " + d.source.y + " " + d.target.x + " " + d.source.y + " " + d.source.x + " " + d.source.y;
    data += "L " + d.source.x + " " + d.source.y;
    data += "C " + d.target.x + " " + d.source.y + " " + d.target.x + " " + d.source.y + " " + d.source.x + " " + d.source.y;

    return data;
}

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

var mylineTween = function (d, i, a) {
    var r = 5;

    var x0 = d.source.x;
    var x1 = d.target.x;
    var x2 = d.target.x;
    var x3 = d.target.x;

    var y0 = d.source.y;
    var y1 = d.source.y;
    var y2 = d.source.y;
    var y3 = d.target.y;

    return function (t) {
        var t1 = 1 - t;
        var tx = t1 * t1 * t1 * x0 + 3 * t1 * t1 * t * x1 + 3 * t1 * t * t * x2 + t * t * t * x3;
        var ty = t1 * t1 * t1 * y0 + 3 * t1 * t1 * t * y1 + 3 * t1 * t * t * y2 + t * t * t * y3;

        var c = computeControlPoint(d.source.x, d.source.y, tx, ty);
        var cx = c.x;
        var cy = c.y;

        // var cx = x0 + (x3 - x0) * t;
        // var cy = y0 + (y3 - y0) * t;

        // var cx = x3;
        // var cy = y0;

        var data = "";
        data += "M " + x0 + " " + y0;
        data += "C " + cx + " " + cy + " " + cx + " " + cy + " " + (tx + r) + " " + (ty + r);
        data += "L " + (tx - r) + " " + (ty - r);
        data += "C " + cx + " " + cy + " " + cx + " " + cy + " " + x0 + " " + y0;

        return data;
    };
}



var link = svg.selectAll(".link")
    .data(data).enter()
    .append("path")
    .attr("class", "link")
    .attr("stroke", "url(#linearGradient1)")
    .attr("d", "")
    .transition()
    .duration(1000)
    .ease("linear")
    .attrTween("d", mylineTween);

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