var Mapael = require('./world_countries');

var world_countries = Mapael.maps.world_countries;
var location_r = 2;
var location_r_shoot = 10;
var queue = [];
var isShooting = false;

var getLocationId = function (location) {
    var id = "lat" + location.latitude + "long" + location.longitude;
    id = id.split("-").join("m");
    id = id.split(".").join("p");
    return id;
}

var getTooltips = function (location) {
    return location.countryName;
}

var shootAllEvent = function (svg, locationGroup, locationList) {
    var interval = setInterval(function () {
        if (queue.length > 0) {
            isShooting = true;
            var event = queue.shift();
            locationList = checkThenAddLocation(locationGroup, locationList, event.source);
            locationList = checkThenAddLocation(locationGroup, locationList, event.target);
            shootEvent(svg, event);
        } else {
            isShooting = false;
            clearInterval(interval);
        }
    }, 200);
}

var shootEvent = function (svg, event) {
    var Source = world_countries.getCoords(event.source.latitude, event.source.longitude);
    var Target = world_countries.getCoords(event.target.latitude, event.target.longitude);

    //config animation
    var duration = Math.floor(Math.random() * 1000) + 1000;
    var duration3 = duration / 10 * 3;
    var duration4 = duration / 10 * 4;
    var duration6 = duration / 10 * 6;
    var easefn = "linear";

    var sourceId = getLocationId(event.source);
    var targetId = getLocationId(event.target);

    d3.select("#" + sourceId)
        .transition()
        .duration(duration6)
        .ease(easefn)
        .attr("r", location_r_shoot)

        .transition()
        .duration(duration6)
        .ease(easefn)
        .attr("r", location_r);

    var middle = {
        x: (Target.x + Source.x) / 2,
        y: (Target.y + Source.y) / 2,
    }

    var isReverse = Source.x - Target.x > 0;
    var path_Source_Target = svg.append("path")
        .attr("stroke", isReverse ? "url(#linearGradient1)" : "url(#linearGradient2)")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("class", "link-gradient")
        .attr("d", "M " + Source.x + " " + Source.y + " L " + Source.x + " " + Source.y)

        .transition()
        .duration(duration3)
        .ease(easefn)
        .attr("d", "M " + Source.x + " " + Source.y + " L " + middle.x + " " + middle.y)

        .transition()
        .duration(duration3)
        .ease(easefn)
        .attr("d", "M " + middle.x + " " + middle.y + " L " + Target.x + " " + Target.y)

        .transition()
        .duration(duration4)
        .ease(easefn)
        .attr("d", "M " + Target.x + " " + Target.y + " L " + Target.x + " " + Target.y)

        .each("end", function () { this.remove(); });

    var event_Source_Target = svg.append("circle")
        .attr("r", 2)
        .attr("style", "fill:orange")
        .attr("cx", Source.x)
        .attr("cy", Source.y)

        .transition()
        .duration(duration6)
        .ease(easefn)
        .attr("cx", Target.x)
        .attr("cy", Target.y)

        .each("end", function () {
            this.remove();
            d3.select("#" + targetId)
                .transition()
                .duration(duration6)
                .ease(easefn)
                .attr("r", location_r_shoot)

                .transition()
                .duration(duration6)
                .ease(easefn)
                .attr("r", location_r);
        });
}

var checkThenAddLocation = function (locationGroup, locationList, location) {
    var id = getLocationId(location);
    var isEmpty = locationGroup.select("#" + id).empty();

    if (isEmpty) {
        locationList.push(location);
        var city = world_countries.getCoords(location.latitude, location.longitude);
        var group = locationGroup.append("g");
        group.append("circle")
            .attr("id", id)
            .attr("cx", city.x)
            .attr("cy", city.y)
            .attr("r", location_r)
            .attr("fill", "url(#radialGradient)");
        group.append("title").text(getTooltips(location));
    }

    return locationList;
}

var socviewmap = function (container, events, width, height) {
    //clean container
    d3.select(container).selectAll("*").remove();

    //create svg
    width = width ? width : world_countries.width;
    height = height ? height : world_countries.height;
    var svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "0 0 " + world_countries.width + " " + world_countries.height);

    //define gradient
    var defs = svg.append("defs");
    var color1 = "orange";
    var color2 = "yellow";
    var linearGradient1 = defs.append("linearGradient").attr("id", "linearGradient1");
    linearGradient1.append("stop").attr("offset", "0%").attr("stop-color", color1);
    linearGradient1.append("stop").attr("offset", "100%").attr("stop-color", color2).attr("stop-opacity", "0");

    var linearGradient2 = defs.append("linearGradient").attr("id", "linearGradient2");
    linearGradient2.append("stop").attr("offset", "0%").attr("stop-color", color2).attr("stop-opacity", "0");
    linearGradient2.append("stop").attr("offset", "100%").attr("stop-color", color1);

    var radialGradient = defs.append("radialGradient").attr("id", "radialGradient");
    radialGradient.append("stop").attr("offset", "0%").attr("stop-color", "red");
    radialGradient.append("stop").attr("offset", "100%").attr("stop-color", "red").attr("stop-opacity", "0");

    //draw world_countries
    var worldCountryGroup = svg.append("g").attr("class", "worldCountryGroup");
    var elems = world_countries.elems;
    for (var i in elems) {
        var elem = elems[i];
        worldCountryGroup
            .append("path")
            .attr("class", "map_path")
            .attr("d", elem);
    }

    var eventGroup = svg.append("g").attr("class", "eventGroup");
    var locationGroup = svg.append("g").attr("class", "locationGroup");
    var locationList = [];

    var update = function (events) {
        for (var i = events.length - 1; i >= 0; i--) {
            queue.push(events[i]);
        }

        if (!isShooting) {
            shootAllEvent(svg, locationGroup, locationList);
        }
    }

    if (events != undefined && events != null) {
        update(events);
    }

    return {
        update: update
    }
}

//bind function to window
if (window.socviewmap != undefined && window.socviewmap != null) {
    alert("function name conflict \"socviewmap\"");
} else {
    window.socviewmap = socviewmap;
}

module.exports = socviewmap;
