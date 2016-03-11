//var data = [];
//
//for (var i = 0; i < 10; i++) {
//    var source = {
//        x: i * 10,
//        y: i * 10
//    };
//
//    var target = {
//        x: (i + 1) * 10,
//        y: (i + 1) * 10
//    };
//
//    data.push({
//        source: source,
//        target: target
//    });
//}

var data = [];

for (var i = 1; i < 4; i++) {
    data.push({
        x: i * 100,
        y: Math.floor(Math.random() * 1000)
    });
}

var line = d3.svg.line()
    .interpolate("monotone")
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    });

var svg = d3.select("body")
    .append("svg")
    .attr("width", "1000px")
    .attr("height", "1000px");

svg.datum(data).append("path")
    .attr("class", "link")
    .attr("d", line);

svg.selectAll("circle").data(data).enter().append("circle")
    .attr("class", "point")
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", 5);