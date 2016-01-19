var links = [
  {
    source: {x:10,  y:10},
    target: {x:100,  y:100}
  }
];
var strokeWidth = 2;
var stroke = "blue"
var svgContainer = d3.select("body")
 .append("svg")
 .attr("width", 200)
 .attr("height", 200);

var diagonal = d3.svg.diagonal()
    .source(function(d) { return {"x":d.source.y, "y":d.source.x}; })
    .target(function(d) { return {"x":d.target.y, "y":d.target.x}; })
    .projection(function(d) { return [d.y, d.x]; });

var link = svgContainer.selectAll(".link")
       .data(links)
       .enter().append("path")
       .attr("class", "link")
       .attr("d", diagonal)
       .attr("stroke", stroke)
       .attr("stroke-width", strokeWidth);

var diagonal2 = d3.svg.diagonal()
   .source(function(d) { return {"x":d.source.y, "y":d.source.x}; })
   .target(function(d) { return {"x":d.target.y, "y":d.target.x}; })
   .projection(function(d) { return [d.x, d.y]; });

var link2 = svgContainer.selectAll(".link2")
      .data(links)
      .enter().append("path")
      .attr("class", "link2")
      .attr("d", diagonal2)
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("fill", "none");
