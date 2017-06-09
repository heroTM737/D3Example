(function () {
	var rotate = function rotate(cx, cy, x, y, angle) {
		var radians = (Math.PI / 180) * angle,
			cos = Math.cos(radians),
			sin = Math.sin(radians),
			nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
			ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
		return {
			x: nx,
			y: ny
		};
	}

	var createArrow = function (x, y, size, direction) {
		var size2 = size / 2;
		var size10 = size / 10;
		var x1 = x + size10;
		var x2 = x + size10 * 3;
		var x3 = x + size2;
		var x4 = x + size10 * 7;
		var x5 = x + size10 * 9;
		var y1 = y;
		var y2 = y + size2;
		var y3 = y + size;
		var p = [];
		p[0] = {x: x3, y: y1};
		p[1] = {x: x5, y: y2};
		p[2] = {x: x4, y: y2};
		p[3] = {x: x4, y: y3};
		p[4] = {x: x2, y: y3};
		p[5] = {x: x2, y: y2};
		p[6] = {x: x1, y: y2};

		var rotateValue = 0; //default direction > 0
		if (direction < 0) {
			rotateValue = 180;
		} else if (direction == 0) {
			rotateValue = -90;
		}

		var cx = x + size2;
		var cy = y + size2;
		for (var i = 0; i < 7; i++) {
			p[i] = rotate(cx, cy, p[i].x, p[i].y, rotateValue);
		}

		return "M " + p[0].x + " " + p[0].y
			+ " L " + p[1].x + " " + p[1].y
			+ " L " + p[2].x + " " + p[2].y
			+ " L " + p[3].x + " " + p[3].y
			+ " L " + p[4].x + " " + p[4].y
			+ " L " + p[5].x + " " + p[5].y
			+ " L " + p[6].x + " " + p[6].y;
	}

	var drawTrendView = function drawTrendView(container, chartData, width, height) {
		//clear container
		d3.select(container).selectAll("*").remove();

		//init variable
		var unit = chartData.unit;
		var newUnit = unit;
		var formatterCommand = chartData.formatterCommand;
		var m = [5, 5, 5, 5]; //top-right-bottom-left
		var headerHeight = height / 12 * 4;
		var bodyHeight = height / 12 * 6;
		var chartHeight = height / 12 * 2;
		chartHeight = chartHeight >= 20 ? chartHeight : 20;
		var rectSize = 30;

		var graph = d3.select(container).append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "trendview")
			.append("g");

		//draw header
		var title = chartData.title;
		var titleGroup = graph.append("g").attr("id", "titleGroup");
		titleGroup.append("text")
			.attr("x", m[3])
			.attr("y", m[0] + headerHeight / 2)
			.attr("alignment-baseline", "middle")
			.text(title);

		//draw body
		var lastValueGroup = graph.append("g").attr("id", "lastValueGroup");
		var arrowGroup = graph.append("g").attr("id", "arrowGroup");
		var fluctuationGroup = graph.append("g").attr("id", "fluctuationGroup");
		var lineGroup = graph.append("g").attr("id", "lineGroup");
		var path = null;
		var arrow = null;
		var arrow_x = width - m[1] - rectSize * 1.5;
		var arrow_y = m[0];
		var arrow_cx = arrow_x + rectSize / 2;
		var arrow_cy = arrow_y + rectSize / 2;
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
				.attr("x", m[3])
				.attr("y", headerHeight + bodyHeight / 2)
				.attr("alignment-baseline", "middle")
				.text(lastValue + " " + newUnit);

			//update arrow
			var strokeColor = null;
			if (fluctuation < 0) {
				strokeColor = "red";
			} else if (fluctuation == 0) {
				strokeColor = "steelblue";
			} else if (fluctuation > 0) {
				strokeColor = "green";
			}
			if (arrow == null) {
				arrow = arrowGroup.append("path")
					.attr("d", createArrow(arrow_x, arrow_y, rectSize, fluctuation))
					.attr("stroke-width", 0)
					.attr("style", "fill:" + strokeColor + ";stroke:" + strokeColor)
					.attr("transform", "rotate(0 " + arrow_cx + " " + arrow_cy + ")");
			} else {
				var rotateValue = 180; //default fluctuation < 0
				if (fluctuation == 0) {
					rotateValue = 90;
				} else if (fluctuation > 0) {
					rotateValue = 0;
				}
				currentRotate = arrow.attr("transform");
				nextRotate = "rotate(" + rotateValue + " " + arrow_cx + " " + arrow_cy + ")";
				var tween = function (d, i, a) {
					return d3.interpolateString(currentRotate, nextRotate);
				}
				arrow
					.transition()
					.duration(500)
					.ease("linear")
					.attr("style", "fill:" + strokeColor + ";stroke:" + strokeColor)
					.attr("d", createArrow(arrow_x, arrow_y, rectSize, fluctuation));
			}


			//update fluctuation
			fluctuationGroup.selectAll("*").remove();
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
				.attr("x", width - rectSize - m[1])
				.attr("y", m[0] + rectSize + 15)
				.attr("alignment-baseline", "middle")
				.attr("text-anchor", "middle")
				.text((fluctuation > 0 ? "+" : "") + fluctuation + (fluctuation != 0 ? " " + newUnit : ""));

			//update line chart
			var w = width - m[1] - m[3];
			w = w - rectSize * 2 - 5;
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