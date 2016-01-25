//The data for our line
var lineData = [{
  "x": 5,
  "y": 5
}, {
  "x": 50,
  "y": 100
}, {
  "x": 100,
  "y": 100
}, {
  "x": 150,
  "y": 40
}, {
  "x": 200,
  "y": 5
}, {
  "x": 250,
  "y": 60
}];
lineData = [{
  "x": 10,
  "y": 10
}, {
  "x": 100,
  "y": 100
}];
var svgContainer = d3.select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

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
      return 3;
    })
    .style("fill", function(d) {
      return "blue";
    });
//This is the accessor function we talked about above
var lineFunction = d3.svg.line()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
  .interpolate("monotone");

//The line SVG Path we draw
var lineGraph = svgContainer.append("path")
  .attr("d", lineFunction(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");
