var svg = d3.select("svg");
var mySquare = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 30);

document.getElementById('button').onclick = function () {
    mySquare.transition()
        .duration(1000)
        .ease("bounce")
        .attr("x", function (d) {
            return 100;
        });
}

console.log(d3.interpolate(1, 10)(5));