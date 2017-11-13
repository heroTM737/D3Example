function genData() {
    var data = [];

    for (var i = 0; i < 10; i++) {
        var random = Math.floor(Math.random() * 1000);
		var random = Math.random();
        var sign = Math.random() > 0.5 ? 1 : -1;
        data.push("" + (random * sign));
    }
	
	console.log(data);

    return data;
}

var width = 50;
var height = 10;
var refreshTime = 2000;
var container = document.getElementById("container");
var updater = simpleLineChart(container, genData(), width, height);

setInterval(function () {
    updater.update(genData());
}, refreshTime);

