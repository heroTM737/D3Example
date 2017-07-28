let Mapael = require('./world_countries');
let world_countries = Mapael.maps.world_countries;
var { getLinkId } = require('./getId');

let cp1d = 50;
let cp2d = 5;
let color1 = "rgba(255,0,0,1)";
let color2 = "rgba(255,0,0,0)";
let easefn = "linear";
let duration = Math.floor(Math.random() * 1000) + 1000;

let computeControlPoint1 = function (x0, y0, x1, y1) {
    let cx = (x0 + x1) / 2;
    let cy = (y0 + y1) / 2;
    let a = y0 - y1;
    let b = x1 - x0;
    let delta = Math.sqrt(1 / (a * a + b * b))
    let x = cp1d * a * delta + cx;
    let y = cp1d * b * delta + cy;
    return { x: x, y: y }
}

let computeControlPoint2 = function (x0, y0, x1, y1) {
    let cx = x1;
    let cy = y1;
    let a = y0 - y1;
    let b = x1 - x0;
    let delta = Math.sqrt(1 / (a * a + b * b))
    let x = cp2d * a * delta + cx;
    let y = cp2d * b * delta + cy;
    return { x: x, y: y }
}

let genCurve = function (d) {
    let sx = d.source.x;
    let sy = d.source.y;
    let tx = d.target.x;
    let ty = d.target.y;

    let c1 = computeControlPoint1(sx, sy, tx, ty);
    let c1x = c1.x;
    let c1y = c1.y;

    let c2 = computeControlPoint2(sx, sy, tx, ty);
    let c2x = c2.x;
    let c2y = c2.y;

    let data = "";
    data += "M " + sx + " " + sy;
    data += "C " + c1x + " " + c1y + " " + c2x + " " + c2y + " " + tx + " " + ty;
    data += "L " + c2x + " " + c2y;
    data += "C " + c2x + " " + c2y + " " + c1x + " " + c1y + " " + sx + " " + sy;

    return data;
}

function shootEventStatic(svg, event) {
    let source = world_countries.getCoords(event.source.latitude, event.source.longitude);
    let target = world_countries.getCoords(event.target.latitude, event.target.longitude);
    event.source.x = source.x;
    event.source.y = source.y;
    event.target.x = target.x;
    event.target.y = target.y;

    let dx = Math.abs(target.x - source.x);
    let dy = Math.abs(target.y - source.y);

    let x1 = (source.x + target.x) / 2;
    let x2 = x1;
    let y1 = (source.y + target.y) / 2;
    let y2 = y1;

    let s = 0;
    if (dx < dy) {
        target.y < source.y ? s = 1 : s = -1;
        y1 = source.y + s * cp2d;
        y2 = target.y - s * cp2d;
    } else {
        target.x < source.x ? s = 1 : s = -1;
        x1 = source.x + s * cp2d;
        x2 = target.x - s * cp2d;
    }
    let timeStamp = new Date().getTime();
    let randomID = Math.floor(Math.random() * 100000);
    let gradientID = "linearGradient_" + timeStamp + "_" + randomID;
    let staticGroup = svg.append("g").attr("id", getLinkId(event));
    let defs = staticGroup.append("defs");
    let linearGradient = defs.append("linearGradient")
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

    let gradientID_url = "url(#" + gradientID + ")";
    let mylineTween = function (d, i, a) {
        return function (t) {
            let p = t * 100;
            d3.select("#" + gradientID).select("#stop1").attr("offset", p + "%");
            d3.select("#" + gradientID).select("#stop2").attr("offset", p + "%");
            return gradientID_url;
        };
    }

    let link = staticGroup
        .append("path")
        .datum(event)
        .attr("class", "link")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", genCurve)
        .attr("stroke", gradientID_url)
        .attr("fill", gradientID_url)
        .transition()
        .duration(duration)
        .ease(easefn)
        .attrTween("stroke", mylineTween);
}

module.exports = shootEventStatic;