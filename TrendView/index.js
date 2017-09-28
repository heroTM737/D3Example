function genData() {
    var data = [];

    for (var i = 0; i < 1; i++) {
        var random = Math.floor(Math.random() * 1000);
        var sign = Math.random() > 0.5 ? 1 : -1;
        data.push("" + (random * sign));
    }

    return data;
    // return [0];
}

var width = 356;
var height = 50;
var refreshTime = 2000;
function createChart(i, width, height) {
    var container = document.getElementById("trendViewContainer" + i);
    var chartData = {
        title: "Example " + i,
        unit: "kb",
        data: genData()
    }
    var updater = drawTrendView(container, chartData, width, height);
    setInterval(function () {
        updater.update(genData());
    }, refreshTime);
}

function checkThenDraw() {
    for (var i = 1; i < 2; i++) {
        createChart(i, width, height);
    }
}
checkThenDraw();


