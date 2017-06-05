function genData() {
    var data = [];

    for (var i = 0; i < 1; i++) {
        var random = Math.floor(Math.random() * 100);
        data.push(random);
    }

    return data;
}

var width = 400;
var height = 120;
var refreshTime = 1000;
function createChart(i, width, height) {
    var container = document.getElementById("trendViewContainer" + i);
    var chartData = {
        title: "Example " + i,
        data: [genData()],
        style: {
            textColor: "#000"
        }
    }
    var updater = drawTrendView(container, chartData, width, height);
    setInterval(function () {
        updater.update([genData()]);
    }, refreshTime);
}

function checkThenDraw() {
    for (var i = 1; i < 2; i++) {
        createChart(i, width, height);
    }
}
checkThenDraw();


