if (window.phoenix == undefined || window.phoenix == null) {
	window.phoenix = {};
}

window.phoenix.rotate = function rotate(cx, cy, x, y, angle) {
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

window.phoenix.createArrow = function (x, y, size, direction) {
	var size2 = size / 2;
	var size4 = size / 4;
	var p = [];
	p[0] = {
		x: x + size2,
		y: y
	};
	p[1] = {
		x: x + size,
		y: y + size2
	};
	p[2] = {
		x: x + size4 * 3,
		y: y + size2
	};
	p[3] = {
		x: x + size4 * 3,
		y: y + size
	};
	p[4] = {
		x: x + size4,
		y: y + size
	};
	p[5] = {
		x: x + size4,
		y: y + size2
	};
	p[6] = {
		x: x,
		y: y + size2
	};

	var rotate = 0; //default direction > 0
	if (direction < 0) {
		rotate = 180;
	} else if (direction == 0) {
		rotate = -90;
	}

	var cx = x + size2;
	var cy = y + size2;
	for (var i = 0; i < 7; i++) {
		p[i] = phoenix.rotate(cx, cy, p[i].x, p[i].y, rotate);
	}

	return "M " + p[0].x + " " + p[0].y
		+ " L " + p[1].x + " " + p[1].y
		+ " L " + p[2].x + " " + p[2].y
		+ " L " + p[3].x + " " + p[3].y
		+ " L " + p[4].x + " " + p[4].y
		+ " L " + p[5].x + " " + p[5].y
		+ " L " + p[6].x + " " + p[6].y;
}

window.phoenix.drawTrendView = function drawTrendView(container, chartData, width, height) {
	var textColor = chartData.style.textColor;
	var m = [5, 5, 5, 5]; //top-right-bottom-left
	var headerHeight = height / 18 * 4;
	var bodyHeight = height / 18 * 6;
	var chartHeight = height / 18 * 8;

	var graph = d3.select(container).append("svg:svg")
		.attr("width", width)
		.attr("height", height)
		.attr("style", "")
		.append("svg:g");

	//draw header
	var title = chartData.title;
	graph.append("text")
		.attr("x", m[3])
		.attr("y", m[0] + headerHeight / 2)
		.attr("alignment-baseline", "middle")
		.attr("style", "font-size:26px;stroke-width:0;fill:" + textColor)
		.text(title);

	//draw body
	var data = chartData.data;
	var lastValue = data[data.length - 1];
	var fluctuation = lastValue - data[data.length - 2];

	graph.append("text")
		.attr("x", m[3])
		.attr("y", m[0] + headerHeight + bodyHeight / 2)
		.attr("alignment-baseline", "middle")
		.attr("style", "font-size:45px;stroke-width:0;fill:" + textColor)
		.text("" + lastValue);

	var rectSize = 40;
	var strokeColor = fluctuation == 0 ? "steelblue" : "red";
	graph.append("path")
		.attr("d", phoenix.createArrow(width - m[1] - rectSize * 3 / 2, m[0] + headerHeight, rectSize, fluctuation))
		.attr("style", "fill:" + strokeColor + ";stroke:" + strokeColor + ";stroke-width:0");

	graph.append("text")
		.attr("x", width - m[1] - rectSize)
		.attr("y", m[0] + headerHeight + rectSize + 10)
		.attr("alignment-baseline", "middle")
		.attr("text-anchor", "middle")
		.attr("style", "font-size:14px;stroke-width:0;fill:" + textColor)
		.text("" + fluctuation);

	//draw footer - line chart
	var w = width - m[1] - m[3];
	var h = chartHeight - m[0] - m[2];
	var maxOfData = Math.max.apply(Math, data);
	var minOfData = Math.min.apply(Math, data);
	var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
	var y = d3.scale.linear().domain([minOfData, maxOfData]).range([h, 0]);

	var line = d3.svg.line()
		.x(function (d, i) {
			return m[3] + x(i);
		})
		.y(function (d) {
			return height - chartHeight + m[0] + y(d);
		});

	graph.append("svg:path")
		.attr("d", line(data))
		.attr("stroke-width", 2)
		.attr("stroke", "steelblue")
		.attr("fill", "none");
}