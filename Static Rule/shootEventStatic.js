var cp1d = 50;
var cp2d = 5;
var color1 = "rgba(255,0,0,1)";
var color2 = "rgba(255,0,0,0)";

var computeControlPoint1 = function (x0, y0, x1, y1) {
    var cx = (x0 + x1) / 2;
    var cy = (y0 + y1) / 2;
    var a = y0 - y1;
    var b = x1 - x0;
    var delta = Math.sqrt(1 / (a * a + b * b))
    var x = cp1d * a * delta + cx;
    var y = cp1d * b * delta + cy;
    return { x: x, y: y }
}

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

var genCurve = function (d) {
    var sx = d.source.x;
    var sy = d.source.y;
    var tx = d.target.x;
    var ty = d.target.y;

    var c1 = computeControlPoint1(sx, sy, tx, ty);
    var c1x = c1.x;
    var c1y = c1.y;

    var c2 = computeControlPoint2(sx, sy, tx, ty);
    var c2x = c2.x;
    var c2y = c2.y;

    var data = "";
    data += "M " + sx + " " + sy;
    data += "C " + c1x + " " + c1y + " " + c2x + " " + c2y + " " + tx + " " + ty;
    data += "L " + c2x + " " + c2y;
    data += "C " + c2x + " " + c2y + " " + c1x + " " + c1y + " " + sx + " " + sy;

    return data;
}

function shootEvent(svg, event) {
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
    var linearGradient = defs.append("linearGradient")
        .attr("id", gradientID)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2);
    linearGradient.append("stop").attr("id", "stop0").attr("offset", "0%").attr("stop-color", color1);
    linearGradient.append("stop").attr("id", "stop1").attr("offset", "0%").attr("stop-color", color1);
    linearGradient.append("stop").attr("id", "stop2").attr("offset", "0%").attr("stop-color", color2);
    linearGradient.append("stop").attr("id", "stop3").attr("offset", "100%").attr("stop-color", color2);

    var gradientID_url = "url(#" + gradientID + ")";
    var mylineTween = function (d, i, a) {
        return function (t) {
            var p = t * 100;
            d3.select("#" + gradientID).select("#stop1").attr("offset", p + "%");
            d3.select("#" + gradientID).select("#stop2").attr("offset", p + "%");
            return gradientID_url;
        };
    }

    var link = svg
        .append("path")
        .datum(event)
        .attr("class", "link")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", genCurve)
        .attr("stroke", gradientID_url)
        .attr("fill", gradientID_url)
        .transition()
        .duration(2000)
        .ease("linear")
        .attrTween("stroke", mylineTween);

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
        .attr("r", cp2d);

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
        .attr("r", cp2d);
}