(function () {
	var defaultFluctationFunction = function (value1, value2) {
		return {
			value: value2 - value1,
			unit: ""
		}
	}
	var defaultFormatFunction = function(value, unit) {
		return {
			value: value,
			unit: unit
		}
	};
	var drawTrendView = function drawTrendView(container, chartData, width, height, options) {
		//clear container
		d3.select(container).selectAll("*").remove();

		//init variable
		var unit = chartData.unit;
		var newUnit = unit;
		var formatterCommand = chartData.formatterCommand;
		var m = [5, 5, 5, 5]; //top-right-bottom-left
		var chartHeight = height / 2;
		chartHeight = chartHeight >= 20 ? chartHeight : 20;

		var graph = d3.select(container).append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "trendview")
			.append("g");

		var options = options ? options : {};
		var fluctationFunction = options.fluctationFunction ? options.fluctationFunction : defaultFluctationFunction;

		//draw header
		var title = chartData.title;
		var titleGroup = graph.append("g").attr("class", "titleGroup");
		var fluctuationGroup = graph.append("g").attr("class", "fluctuationGroup");
		var lineGroup = graph.append("g").attr("class", "lineGroup");
		var path = null;
		var currentData = [];
		var number_of_entries = 12;
		for (var i = 0; i < number_of_entries; i++) {
			currentData.push(0);
		}

		var update = function (data, formatted) {
			for (var i in data) {
				currentData.shift();
				currentData.push(Number(data.shift()));
			}

			var lastValue = currentData[currentData.length - 1];
			var fluctuation = fluctationFunction(currentData[currentData.length - 2], lastValue);
			var fluctuationValue = fluctuation.value;

			//update last value
			titleGroup.selectAll("*").remove();
			if (formatterCommand != undefined && formatterCommand != null) {
				var formatted = d3ChartActionCommand(formatterCommand, lastValue);
				lastValue = formatted.value;
				newUnit = formatted.unit;
			} else {
				newUnit = unit;
			}
			titleGroup.append("text")
				.attr("x", m[3])
				.attr("y", m[0])
				.attr("alignment-baseline", "hanging")
				.text(title + "   " + lastValue + " " + newUnit);

			//update fluctuation
			fluctuationGroup.selectAll("*").remove();
			if (-1 < fluctuationValue && fluctuationValue < 1) {
				fluctuationValue = 0;
			}
			if (fluctuationValue != 0) {
				if (formatterCommand != undefined && formatterCommand != null) {
					var formatted = d3ChartActionCommand(formatterCommand, fluctuation);
					fluctuation = formatted.value;
					newUnit = formatted.unit;
				}
			} else {
				newUnit = unit;
			}
			var fluctationColor = "green"; //default fluctuation > 0
			if (fluctuation == 0) {
				fluctationColor = "blue";
			} else if (fluctuation < 0) {
				fluctationColor = "red";
			}

			fluctuationGroup.append("text")
				.attr("x", width - m[1])
				.attr("y", m[0])
				.attr("alignment-baseline", "hanging")
				.attr("text-anchor", "end")
				.attr("fill", fluctationColor)
				.text((fluctuation > 0 ? "+" : "") + fluctuation + (fluctuation != 0 ? " " + newUnit : ""));

			//update line chart
			var w = width - m[1] - m[3];
			var h = chartHeight - m[0] - m[2];
			var maxOfData = Math.max.apply(Math, currentData);
			var minOfData = Math.min.apply(Math, currentData);
			var x = d3.scale.linear().domain([0, currentData.length - 1]).range([0, w]);
			var y = d3.scale.linear().domain([minOfData, maxOfData]).range([h, 0]);

			var line = d3.svg.line()
				.x(function (d, i) {
					return m[3] + x(i);
				})
				.y(function (d) {
					return height - chartHeight + m[0] + y(d);
				});

			if (path == null) {
				path = lineGroup.append("path")
					.attr("d", line(currentData))
					.attr("class", "trendLineChart")
					.attr("shape-rendering", "geometricPrecision")
					.attr("stroke-linejoin", "round");
			} else {
				path.transition()
					.duration(500)
					.ease("linear")
					.attr("d", line(currentData));
			}

		}
		update(chartData.data);

		return {
			update: update
		}
	}

	//bind function to window
	if (window.drawTrendView != undefined && window.drawTrendView != null) {
		alert("function name conflict \"drawTrendView\"");
	} else {
		window.drawTrendView = drawTrendView;
	}
})();