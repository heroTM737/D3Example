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

for (var i = 0; i < 10; i++) {
    var source = {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 1000)
    };

    //    var source = {
    //        x: 300,
    //        y: 300
    //    };

    data.push({
        source: source,
        target: center
    });
}

//var line = d3.svg.line.radial()
//    .interpolate("bundle")
//    .tension(0.85)
//    .radius(function (d) {
//        return d.y;
//    })
//    .angle(function (d) {
//        return d.x / 180 * Math.PI;
//    });

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
    .attr("width", "1000px")
    .attr("height", "1000px");

//var link = svg.selectAll(".link")
//    .data(data).enter()
//    .append("path")
//    .attr("class", "link")
//    .datum(function (d) {
//        return [
//            {
//                x: d.source.x,
//                y: d.source.y
//            },
//            {
//                x: d.target.x - center.r,
//                y: d.target.y
//            },
//            {
//                x: d.target.x,
//                y: d.target.y
//            }
//        ];
//    })
//    .attr("d", line);

var myline = function (d) {
    var m = "M " + d.source.x + " " + d.source.y;
    var c = "C " + (d.source.x + center.r) + " " + d.source.y + " " + (d.target.x - center.r) + " " + d.target.y + " " + d.target.x + " " + d.target.y;
    return m + c;
}
var link = svg.selectAll(".link")
    .data(data).enter()
    .append("path")
    .attr("class", "link")
    .attr("d", myline);

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