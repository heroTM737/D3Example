$(document).ready(function () {
    var cities = data.cities;
    var countries = data.countries;

    var compareCountry = function (country1, country2) {
        return country1 == country2;
    }

    var compareLocation = function (location1, location2) {
        return (
            location1.longitude == location2.longitude &&
            location1.latitude == location2.latitude
        );
    }

    var compareEvent = function (event1, event2) {
        return (
            compareLocation(event1.source, event2.source) &&
            compareLocation(event1.target, event2.target)
        );
    }

    var checkExist = function (event, list, compareFn) {
        for (var i in list) {
            if (compareFn(event, list[i])) {
                return true;
            }
        }
        return false;
    }

    var genEvent = function () {
        var r1 = Math.floor(Math.random() * cities.length);
        var r2 = null;
        do {
            r2 = Math.floor(Math.random() * cities.length);
        } while (r2 == r1)
        return {
            source: cities[r1],
            target: cities[r2]
        }
    }

    var number_of_event = 5;
    var genEvents = function () {
        var events = [];
        for (var i = 0; i < number_of_event; i++) {
            var event = genEvent();
            event.type = "dynamic";
            events.push(event);
        }
        return events;
    }

    var number_of_static_event = 5;
    var genStaticEvents = function () {
        var topRules = [];
        for (var i = 0; i < number_of_static_event; i++) {
            var event;
            do {
                event = genEvent();
            } while (checkExist(event, topRules, compareEvent))
            event.type = "static";
            event.name = "rule_" + i;
            topRules.push(event);
        }

        topRules.push({
            name: "rule_deptrai",
            source: {
                longitude: -118.2019,
                latitude: 33.75421
            },
            target: {
                longitude: -122.04421,
                latitude: 37.6393
            },
            type: "static"
        });

        return topRules;
    }

    var number_of_country = 5;
    var genCountryCodes = function () {
        var countryCodes = [];
        for (var i = 0; i < number_of_country; i++) {
            var code = null;
            do {
                code = countries[Math.floor(Math.random() * countries.length)];
            } while (checkExist(code, countryCodes, compareCountry))
            countryCodes.push(code);
        }
        return countryCodes;
    }

    var number_of_location = 5;
    var genLocations = function (type) {
        var locations = [];
        for (var i = 0; i < number_of_location; i++) {
            var location = null;
            do {
                location = cities[Math.floor(Math.random() * cities.length)];
            } while (checkExist(location, locations, compareLocation))
            locations.push({ ...location, type: type });
        }
        return locations;
    }

    //initiate map
    var socviewmap = window.socviewmap(document.getElementsByClassName("geomap")[0], null);

    //auto refresh
    var update = function () {
        //update dynamic event
        socviewmap.update({
            // update dynamic event
            events: genEvents(),
            // update static event
            rules: genStaticEvents(),
            // update top countries
            countries: {
                source: genCountryCodes(),
                target: genCountryCodes()
            },
            //update top locations
            locations: {
                source: genLocations("source"),
                target: genLocations("target")
            }
        });
    }

    update();
    setInterval(update, 2000);
    var legendContainer = document.getElementById("legendContainer");
    createLegend(legendContainer);
    window.showLegend = function (show) {
        if (show) {
            $(legendContainer).addClass("fuckon");
        } else {
            $(legendContainer).removeClass("fuckon");
        }
    }

});

function createLegend(container) {
    var item_h = 45;
    var margin_left = 15;
    var location_r = 10;
    var svg_w = 270;
    var svg_h = item_h * 6;

    var svg = d3.select(container).append("svg");
    svg.attr("width", svg_w).attr("height", svg_h);

    for (var i = 1; i < 6; i++) {
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", item_h * i)
            .attr("x2", svg_w)
            .attr("y2", item_h * i)
            .attr("shape-rendering", "crispEdges");
    }

    var circles = [
        {
            class: "location",
            fill: "url(#radialGradient)",
            text: "Node"
        },
        {
            class: "location source highlight",
            fill: "url(#radialGradientSource)",
            text: "Top Source Node"
        },
        {
            class: "location target highlight",
            fill: "url(#radialGradientTarget)",
            text: "Top Destination Node"
        },
        {
            class: "location source target source_target highlight",
            r: location_r,
            fill: "url(#radialGradientSourceTarget)",
            text: "Top Source & Destination Node"
        },
    ];

    for (var i = 0; i < circles.length; i++) {
        var node = circles[i];
        var nodeGroup = svg.append("g")
        nodeGroup.append("circle")
            .attr("class", node.class)
            .attr("cx", margin_left + location_r)
            .attr("cy", item_h * i + item_h / 2)
            .attr("r", location_r)
            .attr("fill", node.fill);
        nodeGroup.append("text")
            .attr("x", margin_left * 2 + location_r * 2)
            .attr("y", item_h * i + item_h / 2)
            .attr("alignment-baseline", "middle")
            .text(node.text);
        nodeGroup.append("title").text(node.text);
    }

    var eventGroup = svg.append("g");
    var x1 = margin_left + location_r;
    var x2 = x1 + 150;
    var y1 = item_h * 4 + item_h * 2 / 3;
    eventGroup.append("path")
        .attr("stroke", "url(#linearGradient1)")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("class", "link-gradient")
        .attr("d", "M " + x1 + " " + y1 + " L " + x2 + " " + (y1 + 1)); //using same y will fuck up gradient so keep it 1 px
    eventGroup.append("circle")
        .attr("cx", x1)
        .attr("cy", y1)
        .attr("r", 2)
        .attr("fill", "#55aae6");
    eventGroup.append("text")
        .attr("x", margin_left * 2 + location_r * 2)
        .attr("y", item_h * 4 + item_h / 3)
        .attr("alignment-baseline", "middle")
        .text("Event");
    eventGroup.append("title").text("Event");

    var ruleGroup = svg.append("g");
    ruleGroup.append("path")
        .attr("class", "link-grow")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("fill", "red")
        .attr("stroke", "red")
        .attr("d", genCurve({
            source: {
                x: margin_left + location_r + 100,
                y: item_h * 5 + 30
            },
            target: {
                x: margin_left + location_r,
                y: item_h * 5 + 30
            }
        }));
    ruleGroup.append("text")
        .attr("x", margin_left * 2 + location_r * 2)
        .attr("y", item_h * 5 + item_h / 2)
        .attr("alignment-baseline", "middle")
        .text("Rule");
    ruleGroup.append("title").text("Rule");
}

let cp1dMax = 30;
let cp2d = 5;
let color1 = "rgba(255,0,0,1)";
let color2 = "rgba(255,0,0,0)";
let easefn = "linear";
let duration = Math.floor(Math.random() * 1000) + 1000;

let computeControlPoint1 = function (x0, y0, x1, y1) {
    let cp1d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) / 2;
    cp1d = cp1d > cp1dMax ? cp1dMax : cp1d;
    let cx = (x0 + x1) / 2;
    let cy = (y0 + y1) / 2;
    let a = y1 - y0;
    let b = x0 - x1;
    let delta = Math.sqrt(1 / (a * a + b * b));
    let x = cp1d * a * delta + cx;
    let y = cp1d * b * delta + cy;
    return { x: x, y: y }
}

let computeControlPoint2 = function (x0, y0, x1, y1) {
    let cx = x1;
    let cy = y1;
    let a = y0 - y1;
    let b = x1 - x0;
    let delta = Math.sqrt(1 / (a * a + b * b));
    let x = cp2d * a * delta + cx;
    let y = cp2d * b * delta + cy;
    return { x: x, y: y }
}

let genCurve = function (d) {
    let sx = d.source.x;
    let sy = d.source.y;
    let tx = d.target.x;
    let ty = d.target.y;

    let c1 = computeControlPoint1(sx, sy, tx, ty);
    let c1x = c1.x;
    let c1y = c1.y;

    let c2 = computeControlPoint2(sx, sy, tx, ty);
    let c2x = c2.x;
    let c2y = c2.y;

    let data = "";
    data += "M " + sx + " " + sy;
    data += "C " + c1x + " " + c1y + " " + c2x + " " + c2y + " " + tx + " " + ty;
    data += "L " + c2x + " " + c2y;
    data += "C " + c2x + " " + c2y + " " + c1x + " " + c1y + " " + sx + " " + sy;

    return data;
}