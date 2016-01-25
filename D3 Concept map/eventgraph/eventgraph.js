//$.ajax({
//    type: "GET",
//    url: "data/ExampleData.txt",
//    dataType: "text",
//    success: function (data, textStatus, jqXHR) {
//        var result = JSON.parse(data);
//        for (var i in result.nodes){
//            console.log(result.nodes[i].type);    
//        }
//    }
//});

var circleList = [
    {
        x: 300,
        y: 50
    }, {
        x: 300,
        y: 100
    }, {
        x: 300,
        y: 150
    }, {
        x: 300,
        y: 200
    }, {
        x: 300,
        y: 250
    }, {
        x: 300,
        y: 300
    }, {
        x: 300,
        y: 350
    }, {
        x: 300,
        y: 400
    }, {
        x: 300,
        y: 450
    }, {
        x: 50,
        y: 50
    }
];

var rectList = [
    {
        x: 50,
        y: 50
    }, {
        x: 550,
        y: 150
    }
];

var links = [];
for (var i = 0; i < circleList.length; i++) {
    for (var j = 0; j < rectList.length; j++) {
        links.push({
            source: {
                x: circleList[i].x,
                y: circleList[i].y
            },
            target: {
                x: rectList[j].x,
                y: rectList[j].y
            }
        });
        
        links.push({
            source: {
                x: rectList[j].x,
                y: rectList[j].y
            },
            target: {
                x: circleList[i].x,
                y: circleList[i].y
            }
        });
    }
}

var radius = 5;
var rw = 200;
var rh = 100;

var svg = d3.select("body")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000);


svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("refX", radius * 2)
    .attr("refY", radius)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0,0 V 10 L 10,5 Z");

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

var link = svg.selectAll("path")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal)
//    .attr("marker-end", "url(#arrowhead)");



var rectangle = svg.selectAll("rect")
    .data(rectList)
    .enter().append("rect")
    .attr("class", "rect")
    .attr("x", function (d) {
        return d.x - rw / 2;
    })
    .attr("y", function (d) {
        return d.y - rh / 2;
    })
    .attr("width", rw)
    .attr("height", rh);
var circle = svg.selectAll("circle")
    .data(circleList)
    .enter().append("circle")
    .attr("class", "circle")
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", function (d) {
        return radius;
    });