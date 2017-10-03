(function () {
	var defaultFluctuationFunction = function (value1, value2, unit) {
		var value = value2 - value1;
		value = Math.round(value * 100) / 100;
		return {
			value: value,
			unit: unit
		}
	}
	var defaultFormatFunction = function (value, unit) {
		return {
			value: Math.round(value * 100) / 100,
			unit: unit
		}
	};
	var drawTrendView = function drawTrendView(container, chartData, width, height) {
		//clear container
		d3.select(container).selectAll("*").remove();

		//init variable
		var unit = chartData.unit;
		var lastValueUnit = unit;
		var m = [5, 5, 5, 5]; //top-right-bottom-left
		var chartHeight = (height - m[0] - m[2]) / 2;
		chartHeight = chartHeight >= 20 ? chartHeight : 20;

		var fluctuationFunction = chartData.fluctuationFunction ? chartData.fluctuationFunction : defaultFluctuationFunction;
		var formatFunction = chartData.formatFunction ? chartData.formatFunction : defaultFormatFunction;
		var hideLineChart = chartData.hideLineChart ? chartData.hideLineChart : false;

		//create svg
		var graph = d3.select(container).append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "trendview")
			.append("g");

		//init group and data
		var title = chartData.title;
		var titleGroup = graph.append("g").attr("class", "titleGroup");
		var fluctuationGroup = graph.append("g").attr("class", "fluctuationGroup");
		var lineGroup = graph.append("g").attr("class", "lineGroup");
		var path = null;
		var path_fill = null;
		var formatted = null;
		var currentData = [];
		var number_of_entries = 12;
		for (var i = 0; i < number_of_entries; i++) {
			currentData.push(0);
		}

		//update function
		var update = function (data, formatted) {
			for (var i in data) {
				currentData.shift();
				var value = data.shift();
				if (value instanceof Number) {
					currentData.push(value);
				} else {
					currentData.push(Number(value.split(",").join("")));
				}
			}

			var lastValue = currentData[currentData.length - 1];
			var fluctuation = fluctuationFunction(currentData[currentData.length - 2], lastValue, unit);
			var fluctuationValue = fluctuation.value;
			var fluctuationUnit = fluctuation.unit;

			//update last value
			titleGroup.selectAll("*").remove();
			formatted = formatFunction(lastValue, unit);
			lastValue = formatted.value;
			lastValueUnit = formatted.unit;
			var titleElement = titleGroup.append("text")
				.attr("x", m[3])
				.attr("y", height / 2)
				.attr("dy", ".35em")
				.text(title + "   " + lastValue + " " + lastValueUnit);
			if (!hideLineChart) {
				//update fluctuation
				fluctuationGroup.selectAll("*").remove();
				formatted = formatFunction(fluctuationValue, fluctuationUnit);
				fluctuationValue = formatted.value;
				fluctuationUnit = formatted.unit;
				var fluctuationColor = "green"; //default fluctuation > 0
				if (fluctuationValue == 0) {
					fluctuationColor = "blue";
				} else if (fluctuationValue < 0) {
					fluctuationColor = "red";
				}

				var fluctuationElement = fluctuationGroup.append("text")
					.attr("x", width - m[1])
					.attr("y", m[0] * 2)
					.attr("dy", "0.5em")
					.attr("text-anchor", "end")
					.attr("fill", fluctuationColor)
					.text((fluctuationValue > 0 ? "+" : "") + fluctuationValue + " " + fluctuationUnit);

				//update line chart
				var w = 70;
				var h = chartHeight;
				var maxOfData = Math.max.apply(Math, currentData);
				var minOfData = Math.min.apply(Math, currentData);
				var x = d3.scale.linear().domain([0, currentData.length - 1]).range([0, w]);
				var y = d3.scale.linear().domain([minOfData, maxOfData]).range([h, 0]);

				var line = d3.svg.line()
					.x(function (d, i) {
						return width - m[1] - w + x(i);
					})
					.y(function (d) {
						return height - m[2] - h + y(d);
					})
					.interpolate("monotone");

				var startX = width - m[1] - w + x(0);
				var startY = height - m[2];
				var endX = width - m[1] - w + x(currentData.length - 1);
				var endY = height - m[2];

				if (path == null) {
					// path_fill = lineGroup.append("path")
					// 	.attr("d", line(currentData) + "   L" + endX + "," + endY + "L" + startX + "," + startY + "Z")
					// 	.attr("class", "trendLineChartFill");

					path = lineGroup.append("path")
						.attr("d", line(currentData))
						.attr("class", "trendLineChart");
				} else {
					// path_fill.transition()
					// 	.duration(500)
					// 	.ease("linear")
					// 	.attr("d", line(currentData) + "   L" + endX + "," + endY + "L" + startX + "," + startY + "Z");

					path.transition()
						.duration(500)
						.ease("linear")
						.attr("d", line(currentData));
				}
			}
		}
		update(chartData.data);

		return {
			update: update
		}
	}

	//bind function to window
	if (window.drawTrendView != undefined && window.drawTrendView != null) {
		console.log("function name conflict \"drawTrendView\"");
	} else {
		window.drawTrendView = drawTrendView;
	}
})();