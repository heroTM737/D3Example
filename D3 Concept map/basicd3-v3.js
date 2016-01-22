var links = [];

var sourceList = [
    {
        x: 10,
        y: 10
    },{
        x: 10,
        y: 110
    },{
        x: 200,
        y: 210
    },{
        x: 200,
        y: 310
    },{
        x: 100,
        y: 310
    },
];

var targetList = [
    {
        x: 100,
        y: 10
    },{
        x: 100,
        y: 110
    },{
        x: 100,
        y: 210
    },{
        x: 100,
        y: 310
    },
];

var numberOfLink = sourceList.length;
numberOfLink = 1;
for (var i = 0; i < numberOfLink; i++) {
    var is = Math.floor(Math.random() * sourceList.length);
    is = 3;
    var it = Math.floor(Math.random() * targetList.length);
    it =0;
    links.push({
        source: {
            x: sourceList[is].x,
            y: sourceList[is].y
        },
        target: {
            x: targetList[it].x,
            y: targetList[it].y
        }
    });
}

var radius = 5;

var svgContainer = d3.select("body")
 .append("svg")
 .attr("width", 1000)
 .attr("height", 1000);

svgContainer.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("refX", radius * 2)
    .attr("refY", radius)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0,0 V 10 L 10,5 Z");

var group = svgContainer.selectAll("g")
    .data(links)
    .enter().append("g")
    .attr("class", "link-outer");

var diagonal = d3.svg.diagonal()
    .source(function (d) {
        return {
            "x": d.source.y,
            "y": d.source.x
        };
    })
    .target(function (d) {
        return {
            "x": d.target.y,
            "y": d.target.x
        };
    })
    .projection(function (d) {
        return [d.y, d.x];
    });

//var diagonal = d3.svg.diagonal()
//    .projection(function (d) {
//        return [d.x, d.y];
//    });

var link = group.append("path")
    .attr("class", "link")
    .attr("d", diagonal)
    .attr("marker-end", "url(#arrowhead)");

var circleSources = group.append("circle")
    .attr("class", "circle")
    .attr("cx", function(d) {
      return d.source.x;
    })
    .attr("cy", function(d) {
      return d.source.y;
    })
    .attr("r", function(d) {
      return radius;
    });

var circleTargets = group.append("circle")
    .attr("class", "circle")
    .attr("cx", function(d) {
      return d.target.x;
    })
    .attr("cy", function(d) {
      return d.target.y;
    })
    .attr("r", function(d) {
      return radius;
    });