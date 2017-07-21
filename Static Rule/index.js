var center = { x: 300, y: 300 };
var jump = 100;
var targets = [];
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
        var target = {
            x: center.x + jump * (i - 2),
            y: center.y + jump * (j - 2)
        }
        var a = Math.abs(center.x - target.x);
        var b = Math.abs(center.y - target.y); var d = Math.sqrt()
        if (a * a + b * b >= 4 * jump * jump) {
            targets.push(target)
        }
    }
}
var data = [];
for (var i in targets) {
    data.push({
        source: center,
        target: targets[i]
    });
}

var svg = d3.select("body")
    .append("svg")
    .attr("width", "600px")
    .attr("height", "600px");

data.forEach(function (e, i) {
    shootEvent(svg, e);
})