var lineData = [{
  x: 10,
  y: 10
}, {
  x: 100,
  y: 100
}];

var links = [
  {
    source: {x:10,  y:10},
    target: {x:100,  y:100}
  },
  {
    source: {x:10,  y:100},
    target: {x:100,  y:100}
  },
  {
    source: {x:10,  y:190},
    target: {x:100,  y:100}
  }
];

var strokeWidth = 2;
var stroke = "blue"
var radius = 5;

var svgContainer = d3.select("body")
 .append("svg")
 .attr("width", 1000)
 .attr("height", 1000);

var triangle = svgContainer.selectAll("path")
    .data(lineData)
    .enter().append("path")
    .attr("class", "link-head")
    .attr("transform", function(d) { return "translate(" + (d.x - radius * 2) + "," + d.y + ") rotate(90 0 0)"; })
    .attr("d", d3.svg.symbol().type("triangle-up"));

var diagonal = d3.svg.diagonal()
    .source(function(d) { return {"x":d.source.y, "y":d.source.x};})
    .target(function(d) { return {"x":d.target.y, "y":d.target.x - radius * 2};})
    .projection(function(d) { return [d.y, d.x]; });

var link = svgContainer.selectAll(".link")
       .data(links)
       .enter().append("path")
       .attr("class", "link")
       .attr("d", diagonal)
       .attr("stroke", stroke)
       .attr("stroke-width", strokeWidth);



var circles = svgContainer.selectAll("circle")
  .data(lineData)
  .enter()
  .append("circle");

var circleAttributes = circles
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("r", function(d) {
      return radius;
    })
    .style("fill", function(d) {
      return "red";
    });