// var data = [
//     ["Division 1", "violet", 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5],
//     ["Division 2", "indigo", 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4],
//     ["Division 3", "blue", 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
//     ["Division 4", "green", 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2],
//     ["Division 5", "yellow", 5, 1, 6, 1, 7, 1, 8, 1, 9, 1, 9, 1]
// ];

// var label = ["Requirement", "Bidding", "Review", "Approval", "Contract", "Development", "Test", "Open", "Maintain", "Evaluation", "Some Phase", "Some Phase"];

var data = [
    ["Division 1", "violet", 1,	0,	0,	0,	2,	1,	0,	0,	0,	0],
    ["Division 2", "indigo", 1,	1,	0,	1,	0,	0,	0,	1,	0,	1],
    ["Division 3", "blue", 0,	0,	1,	0,	0,	0,	0,	1,	0,	1],
    ["Division 4", "green", 1,	0,	2,	0,	0,	0,	1,	0,	1,	0]
];

var label = ["Requirement", "Bidding", "Review", "Approval", "Contract", "Development", "Test", "Open", "Maintain", "Evaluation"];

//define variable
var width = 700;
var height = 700;
let startX = 100;
let startY = 100;
let endX = width - 100;
let endY = height - 100;

//prepare data
var dataSize = data.length;
var rowSize = data[0].length;
var rowDataSize = label.length;
var maxOfData = -1;
var minOfData = 0;
for (var i = 1; i < dataSize; i++) {
    for (var j = 2; j < rowSize; j++) {
        data[i][j] = data[i - 1][j] + data[i][j];
        if (data[i][j] > maxOfData) {
            maxOfData = data[i][j];
        }
    }
}

var x = d3.scale.linear().domain([0, rowDataSize - 1]).range([0, (endX - startX)]);
var y = d3.scale.linear().domain([minOfData, maxOfData]).range([(endY - startY), 0]);

var line = d3.svg.line()
    .x(function (d, i) {
        return startX + x(i);
    })
    .y(function (d) {
        return startY + y(d);
    })
    .interpolate("monotone");

//draw
var svg = d3.select("#container").append("svg")
    .attr("class", "stackArea")
    .attr("width", width)
    .attr("height", height);

for (var i = dataSize - 1; i >= 0; i--) {
    var rowData = data[i].slice(2, data[i].length);

    var group = svg.append("g");

    var text = group.append("text")
        .text(data[i][0])
        .attr("text-anchor", "end")
        .attr("x", startX - 5)
        .attr("y", startY + y(rowData[0]))
        .attr("dy", "0em");

    var path_fill = group.append("path")
        .attr("d", line(rowData) + "   L" + endX + "," + (endY + 1) + "L" + startX + "," + (endY + 1) + "Z")
        .attr("class", "stackAreaFill")
        .attr("fill", data[i][1]);

    var path = group.append("path")
        .attr("d", line(rowData))
        .attr("class", "stackAreaLine");
}

var xLabelGroup = svg.append("g");
for (var i = 0; i < rowDataSize; i++) {
    var text = xLabelGroup.append("text")
        .text(label[i])
        .attr("x", startX + x(i))
        .attr("y", endY + 20)
        .attr("transform", "rotate(45 " + (startX + x(i)) + " " + (endY + 20) + ")");
}