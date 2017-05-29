function genData() {
    var data = [];

    for (var i = 0; i < 30; i++) {
        var random = Math.floor(Math.random() * 100);
        data.push(random);
    }

    return data;
}

var width = 280;
var height = 180;
var refreshTime = 1000;
function createChart(i, width, height) {
    var container = document.getElementById("trendViewContainer" + i);
    var chartData = {
        title: "Example " + i,
        data: genData(i),
        style: {
            textColor: "steelblue"
        }
    }
    var updater = drawTrendView(container, chartData, width, height);
    setInterval(function () {
        updater.update(genData());
    }, refreshTime);
}

function checkThenDraw() {
    for (var i = 1; i < 4; i++) {
        createChart(i, width, height);
    }
}
checkThenDraw();


