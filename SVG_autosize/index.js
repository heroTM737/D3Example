var padding = 10;
var svg = d3.select("#svg");

var group = svg.append("g").attr("id", "svgContentContainer");
group.append("circle")
    .attr("x", 0)
    .attr("y", 0)
    .attr("r", 100);

var svgJS = document.getElementsByTagName("svg")[0];
var bbox = svgJS.getBBox();
svgJS.setAttribute("width", bbox.width);
svgJS.setAttribute("height", bbox.height);

group.attr("transform", "translate(" + (-bbox.x + padding) + " " + (-bbox.y + padding) + ")")

var bbox = svgJS.getBBox();
svgJS.setAttribute("width", bbox.width + padding * 2);
svgJS.setAttribute("height", bbox.height + padding * 2);