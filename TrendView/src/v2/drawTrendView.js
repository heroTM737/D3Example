(function () {
	var drawTrendView = function drawTrendView(container, chartData, width, height) {
		//clear container
		d3.select(container).selectAll("*").remove();

		//init variable
		var unit = chartData.unit;
		var newUnit = unit;
		var formatterCommand = chartData.formatterCommand;
		var m = [5, 5, 5, 5]; //top-right-bottom-left
		var headerHeight = height / 12 * 5;
		var chartHeight = height / 12 * 7;
		chartHeight = chartHeight >= 20 ? chartHeight : 20;
		var rectSize = 30;

		var graph = d3.select(container).append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "trendview")
			.append("g");

		//draw header
		var title = chartData.title;
		var titleGroup = graph.append("g").attr("class", "titleGroup");
		titleGroup.append("text")
			.attr("x", m[3])
			.attr("y", m[0] + headerHeight / 2)
			.attr("alignment-baseline", "middle")
			.text(title);

		//draw body
		var lastValueGroup = graph.append("g").attr("class", "lastValueGroup");
		var arrowGroup = graph.append("g").attr("class", "arrowGroup");
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
			var fluctuation = lastValue - currentData[currentData.length - 2];
			//update last value
			lastValueGroup.selectAll("*").remove();
			if (formatterCommand != undefined && formatterCommand != null) {
				var formatted = d3ChartActionCommand(formatterCommand, lastValue);
				lastValue = formatted.value;
				newUnit = formatted.unit;
			} else {
				newUnit = unit;
			}
			lastValueGroup.append("text")
				.attr("x", width / 2)
				.attr("y", m[0] + headerHeight / 2)
				.attr("alignment-baseline", "middle")
				.attr("text-anchor", "middle")
				.text(lastValue + " " + newUnit);

			//update fluctuation
			fluctuationGroup.selectAll("*").remove();
			if (-1 < fluctuation && fluctuation < 1) {
				fluctuation = 0;
			}
			if (fluctuation != 0) {
				if (formatterCommand != undefined && formatterCommand != null) {
					var formatted = d3ChartActionCommand(formatterCommand, fluctuation);
					fluctuation = formatted.value;
					newUnit = formatted.unit;
				}
			} else {
				newUnit = unit;
			}
			
			fluctuationGroup.append("text")
				.attr("x", width - m[1])
				.attr("y", m[0] + headerHeight / 2)
				.attr("alignment-baseline", "middle")
				.attr("text-anchor", "end")
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