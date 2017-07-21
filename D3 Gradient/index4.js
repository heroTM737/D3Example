// var source = {
//     x: Math.floor(Math.random() * 500),
//     y: Math.floor(Math.random() * 500)
// }

// var target = {
//     x: Math.floor(Math.random() * 500),
//     y: Math.floor(Math.random() * 500)
// };

// var source = {
//     x: 300,
//     y: 300
// }

// var target = {
//     x: 500,
//     y: 100
// };

// var data = [{ source, target }];

var center = { x: 300, y: 300 };
var targets = [
    {
        x: center.x + 100,
        y: center.y + 200
    },
    {
        x: center.x + 200,
        y: center.y + 100
    },
    {
        x: center.x - 100,
        y: center.y - 200
    },
    {
        x: center.x - 200,
        y: center.y - 100
    },
    {
        x: center.x + 100,
        y: center.y - 200
    },
    {
        x: center.x + 200,
        y: center.y - 100
    },
    {
        x: center.x - 100,
        y: center.y + 200
    },
    {
        x: center.x - 200,
        y: center.y + 100
    },
    {
        x: center.x,
        y: center.y + 200
    },
    {
        x: center.x,
        y: center.y - 200
    },
    {
        x: center.x + 200,
        y: center.y
    },
    {
        x: center.x - 200,
        y: center.y
    },
    {
        x: center.x + 200,
        y: center.y + 200
    },
    {
        x: center.x + 200,
        y: center.y - 200
    },
    {
        x: center.x - 200,
        y: center.y + 200
    },
    {
        x: center.x - 200,
        y: center.y - 200
    }
];

var data = [];
for (var i in targets) {
    data.push({
        source: center,
        target: targets[i]
    });
}

var myline = function (d) {
    var data = "";
    data += "M " + d.source.x + " " + d.source.y;
    data += " L " + d.target.x + " " + d.target.y;
    return data;
}

var computeControlPoint = function (x0, y0, x1, y1) {
    var d = 50;

    var cx = (x0 + x1) / 2;
    var cy = (y0 + y1) / 2;

    var a = y0 - y1;
    var b = x1 - x0;
    var delta = Math.sqrt(1 / (a * a + b * b))
    var x = d * a * delta + cx;
    var y = d * b * delta + cy;

    return { x: x, y: y }
}

var cp2d = 5;
var computeControlPoint2 = function (x0, y0, x1, y1) {
    var cx = x1;
    var cy = y1;

    var a = y0 - y1;
    var b = x1 - x0;
    var delta = Math.sqrt(1 / (a * a + b * b))
    var x = cp2d * a * delta + cx;
    var y = cp2d * b * delta + cy;

    return { x: x, y: y }
}

var myline2 = function (d) {
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
    data += "C " + cx + " " + cy + " " + cx + " " + cy + " " + tx + " " + ty;

    return data;
}

var myline3 = function (d) {
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

var myline4 = function (d) {
    var x0 = d.source.x;
    var y0 = d.source.y;
    var tx = d.target.x;
    var ty = d.target.y;

    var c = computeControlPoint(d.source.x, d.source.y, d.target.x, d.target.y);
    var cx = c.x;
    var cy = c.y;

    var c2 = computeControlPoint2(d.source.x, d.source.y, d.target.x, d.target.y);
    var c2x = c2.x;
    var c2y = c2.y;

    var data = "";
    data += "M " + x0 + " " + y0;
    data += "C " + cx + " " + cy + " " + c2x + " " + c2y + " " + tx + " " + ty;
    data += "L " + c2x + " " + c2y;
    data += "C " + c2x + " " + c2y + " " + cx + " " + cy + " " + x0 + " " + y0;

    return data;
}

var svg = d3.select("body")
    .append("svg")
    .attr("width", "600px")
    .attr("height", "600px");

var color1 = "rgba(255,0,0,1)";
var color2 = "rgba(255,0,0,0)";

// var color1 = "rgba(255,0,0,1)";
// var color2 = "rgba(255,255,255,1)";

// var color1 = "rgba(255,255,255,1)";
// var color2 = "rgba(255,0,0,1)";

var step = 5;

data.forEach(function (e, i) {
    shootEvent(e);
})

function shootEvent(event) {
    var source = event.source;
    var target = event.target;
    var dx = Math.abs(target.x - source.x);
    var dy = Math.abs(target.y - source.y);

    var x1 = x2 = (source.x + target.x) / 2;
    var y1 = y2 = (source.y + target.y) / 2;
    var s = 0;
    if (dx < dy) {
        target.y < source.y ? s = 1 : s = -1;
        y1 = source.y + s * cp2d;
        y2 = target.y - s * cp2d;
    } else {
        target.x < source.x ? s = 1 : s = -1;
        x1 = source.x + s * cp2d;
        x2 = target.x - s * cp2d;
    }
    var timeStamp = new Date().getTime();
    var randomID = Math.floor(Math.random() * 100000);
    var gradientID = "linearGradient_" + timeStamp + "_" + randomID;
    var defs = svg.append("defs");
    var opacity = "1";
    var linearGradient = defs.append("linearGradient")
        .attr("id", gradientID)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2);
    linearGradient.append("stop").attr("id", "stop0").attr("offset", "0%").attr("stop-color", color1).attr("stop-opacity", opacity);
    linearGradient.append("stop").attr("id", "stop1").attr("offset", "0%").attr("stop-color", color1).attr("stop-opacity", opacity);
    linearGradient.append("stop").attr("id", "stop2").attr("offset", "0%").attr("stop-color", color2).attr("stop-opacity", "1");
    linearGradient.append("stop").attr("id", "stop3").attr("offset", "0%").attr("stop-color", color2).attr("stop-opacity", opacity);
    linearGradient.append("stop").attr("id", "stop4").attr("offset", "100%").attr("stop-color", color2).attr("stop-opacity", opacity);

    var gradientID_url = "url(#" + gradientID + ")";
    var mylineTween = function (d, i, a) {
        return function (t) {
            var p = t * 100;
            d3.select("#" + gradientID).select("#stop1").attr("offset", p + "%");
            d3.select("#" + gradientID).select("#stop2").attr("offset", (p + step) + "%");
            d3.select("#" + gradientID).select("#stop3").attr("offset", (p + step * 2) + "%");
            return gradientID_url;
        };
    }

    var link = svg
        .append("path")
        .datum(event)
        .attr("class", "link")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", myline4)
        .attr("stroke", gradientID_url)
        .attr("fill", gradientID_url);

    function repeat() {
        link
            .transition()
            .duration(2000)
            .ease("linear")
            .attrTween("stroke", mylineTween)
            .each("end", function () {
                // repeat();
            });
    }
    repeat();

    var source_node = svg
        .append("circle")
        .datum(source)
        .attr("class", "node source")
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
        .attr("class", "node target")
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", 5);
}