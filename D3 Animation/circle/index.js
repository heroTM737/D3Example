var svg = d3.select("svg");
var cx = 100;
var cy = 100;
var r = 50;
var sx = cx - r;
var sy = cy - r;
var ex = cx + r;
var ey = cy + r;
var duration = 5000;

var rotateFn = function (t) {
    var a = t * 360;
    return "rotate(" + a + " " + cx + " " + cy + ")";
}

var circle = svg.append("circle")
    .attr("cx", sx)
    .attr("cy", sy)
    .attr("r", 1);

var path = svg.append("path")
    .attr("stroke", "url(#grad1)")
    .attr("d", "M" + sx + " " + sy + "A40 40 0 1 0 " + ex + " " + ey);

var infiniteRotate = function () {
    circle
        .transition()
        .ease("linear")
        .duration(duration)
        .attrTween("transform", function (d) {
            return rotateFn;
        });

    path
        .transition()
        .ease("linear")
        .duration(duration)
        .attrTween("transform", function (d) {
            return rotateFn;
        })
        .each("end", infiniteRotate);
}
infiniteRotate();