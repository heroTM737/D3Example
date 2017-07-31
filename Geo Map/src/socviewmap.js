var Mapael = require('./world_countries');
var shootEventStatic = require('./shootEventStatic');
var shootEventDynamic = require('./shootEventDynamic');
var { getLocationId, getLinkId } = require('./getId');

var world_countries = Mapael.maps.world_countries;
var location_r = 2;

var queue = [];
var isShooting = false;

var getTooltips = function (location) {
    var tooltips = "";
    if (location.address) {
        tooltips += "Address: " + location.address + " \n";
    }
    if (location.countryName) {
        tooltips += "Country: " + location.countryName + " \n";
    }
    if (location.city) {
        tooltips += "City: " + location.city;
    }
    return tooltips;
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

var shootEvent = function (locationGroup, eventGroup, staticGroup, event) {
    if (event.type == "static") {
        if (staticGroup.select("#" + getLinkId(event)).empty()) {
            shootEventStatic(staticGroup, event);
        }
    } else {
        shootEventDynamic(eventGroup, event);
    }
}

var shootAllEvent = function (locationList, locationGroup, eventGroup, staticGroup) {
    var interval = setInterval(function () {
        if (queue.length > 0) {
            isShooting = true;
            var event = queue.shift();
            locationList = checkThenAddLocation(locationGroup, locationList, event.source);
            locationList = checkThenAddLocation(locationGroup, locationList, event.target);
            shootEvent(locationGroup, eventGroup, staticGroup, event);
        } else {
            isShooting = false;
            clearInterval(interval);
        }
    }, 200);
}

var socviewmap = function (container, events) {
    //clean container
    d3.select(container).selectAll("*").remove();

    //create svg
    var svg = d3.select(container).append("svg")
        .attr("height", "100%")
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

    var linearGradient3 = defs.append("linearGradient").attr("id", "linearGradient3");
    linearGradient3.append("stop").attr("offset", "0%").attr("stop-color", color1).attr("stop-opacity", "1");
    linearGradient3.append("stop").attr("offset", "50%").attr("stop-color", color1).attr("stop-opacity", "1");
    linearGradient3.append("stop").attr("offset", "51%").attr("stop-color", color1).attr("stop-opacity", "0");
    linearGradient3.append("stop").attr("offset", "100%").attr("stop-color", color1).attr("stop-opacity", "0");

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

    var locationGroup = svg.append("g").attr("class", "locationGroup");
    var eventGroup = svg.append("g").attr("class", "eventGroup");
    var staticGroup = svg.append("g").attr("class", "staticGroup");
    var locationList = [];

    var update = function (events) {
        for (var i = events.length - 1; i >= 0; i--) {
            queue.push(events[i]);
        }

        if (!isShooting) {
            shootAllEvent(locationList, locationGroup, eventGroup, staticGroup);
        }
    }

    if (events != undefined && events != null) {
        update(events);
    }

    var remove = function (events) {
        for (var i in events) {
            var event = events[i];
            if (event.type == "static") {
                var group = staticGroup.select("#" + getLinkId(event));
                group.transition()
                    .duration(1000)
                    .ease("linear")
                    .attr("opacity", 0)
                    .each("end", (d) => {
                        group.remove();
                    });
            }
        }
    }

    return { update, remove }
}

module.exports = socviewmap;
