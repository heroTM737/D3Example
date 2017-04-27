function genData(fluctation) {
    var data = [];

    for (var i = 0; i < 29; i++) {
        var random = Math.floor(Math.random() * 100);
        data.push(random);
    }

    var d = 0;
    if (fluctation > 0) {
        d = 1;
    } else if (fluctation < 0) {
        d = -1;
    }

    var random = Math.floor(Math.random() * 100);
    data.push(data[28] + d * random);

    return data;
}

function checkThenDraw() {
    if (phoenix.drawTrendView != null && phoenix.drawTrendView != undefined) {
        var width = 280;
        var height = 180;
        for (var i = -1; i < 2; i++) {
            var container = document.getElementById("trendViewContainer" + (i + 2));
            var chartData = {
                title: "Example " + (i + 2),
                data: genData(i)
            }
            phoenix.drawTrendView(container, chartData, width, height);
        }
    } else {
        setTimeout(checkThenDraw, 500);
    }
}
checkThenDraw();
