var data = [
    {
        x: 100,
        y: 100,
        id: "source",
        class: "source",
    },
    {
        x: 300,
        y: 300,
        id: "target",
        class: "target"
    },
    {
        x: 100,
        y: 300,
        id: "control1",
        class: "control1"
    },
    {
        x: 300,
        y: 100,
        id: "control2",
        class: "control2"
    }

];

var link = [
    {
        source: data[0],
        target: data[1]
    }
]

var radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("width", "1000px")
    .attr("height", "1000px");

var extend_curve = function (d) {
    var source = data[0];
    var target = data[1];
    var controll1 = data[2];
    var controll2 = data[3];

    var m = "M " + source.x + " " + source.y;
    var c = "C " + controll1.x + " " + controll1.y + " " + controll2.x + " " + controll2.y + " " + target.x + " " + target.y;

    return m + c;
}

var drag = d3.behavior.drag();
drag.on('drag', function (d, i) {
    d.x = d3.event.x;
    d.y = d3.event.y;
    d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
    d3.select(".link").attr('d', extend_curve);
});

var link = svg.selectAll("path")
    .data(link)
    .enter().append("path")
    .attr("class", "link")
    .attr("id", function (d) {
        return d.id;
    })
    .attr("d", extend_curve);

var source = svg.selectAll("circle")
    .data(data).enter().append("circle")
    .attr("class", function (d) {
        return d.class;
    })
    .attr("id", function (d) {
        return d.id;
    })
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", radius)
    .call(drag);