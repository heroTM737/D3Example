var Mapael = require('./world_countries');
var shootEventStatic = require('./shootEventStatic');
var shootEventDynamic = require('./shootEventDynamic');
var { getLocationId, getLinkId } = require('./getId');

var world_countries = Mapael.maps.world_countries;
var location_r = 2;
var location_r_hl = 5;

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

var markLocation = function (locationGroup, locationList, location, status) {
    checkThenAddLocation(locationGroup, locationList, location);
    var id = getLocationId(location);
    locationGroup.select("#" + id)
        .classed("highlight", true)
        .attr("fill", status ? "red" : "url(#radialGradient)")
        .transition()
        .duration(1000)
        .ease("linear")
        .attr("r", status ? location_r_hl : location_r);
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

var compareCountry = function (country1, country2) {
    return country1 == country2;
}

var filterGroup = function (oldList, newList, compareFn) {
    for (var i in newList) {
        var j = 0;
        while (j < oldList.length) {
            if (compareFn(newList[i], oldList[j])) {
                oldList.splice(j, 1);
                break;
            }
            j++;
        }
    }
    return oldList;
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

    var radialGradient = defs.append("radialGradient").attr("id", "radialGradient");
    radialGradient.append("stop").attr("offset", "0%").attr("stop-color", "red");
    radialGradient.append("stop").attr("offset", "100%").attr("stop-color", "red").attr("stop-opacity", "0");

    //draw world_countries
    var worldCountryGroup = svg.append("g").attr("class", "worldCountryGroup");
    var elems = world_countries.elems;
    for (var i in elems) {
        worldCountryGroup
            .append("path")
            .attr("class", "map_path")
            .attr("id", "CountryCode" + i)
            .attr("d", elems[i]);
    }

    var locationGroup = svg.append("g").attr("class", "locationGroup");
    var eventGroup = svg.append("g").attr("class", "eventGroup");
    var staticGroup = svg.append("g").attr("class", "staticGroup");
    var locationList = [];

    var updateEvents = function (events) {
        for (var i = events.length - 1; i >= 0; i--) {
            queue.push(events[i]);
        }

        if (!isShooting) {
            shootAllEvent(locationList, locationGroup, eventGroup, staticGroup);
        }
    }

    if (events != undefined && events != null) {
        updateEvents(events);
    }

    var topEvents = [];
    var updateTopEvents = function (newEvents) {
        topEvents = filterGroup(topEvents, newEvents, compareEvent);

        //remove old static events
        for (var i in topEvents) {
            var event = topEvents[i];
            if (event.type == "static") {
                var group = staticGroup.select("#" + getLinkId(event));
                group.transition()
                    .duration(1000)
                    .ease("linear")
                    .attr("opacity", 0)
                    .remove();
            }
        }

        //create new static events
        topEvents = newEvents;
        updateEvents(topEvents);
    }

    var topCountryCodes = [];
    var updateTopCountries = function (codes) {
        topCountryCodes = filterGroup(topCountryCodes, codes, compareCountry);

        //unhighlight old countries
        for (var i in topCountryCodes) {
            worldCountryGroup.select("#CountryCode" + topCountryCodes[i]).classed("highlight", false);
        }

        //highlight all selected countries
        topCountryCodes = codes;
        for (var i in topCountryCodes) {
            worldCountryGroup.select("#CountryCode" + topCountryCodes[i]).classed("highlight", true);
        }
    }


    var topLocations = [];
    var updateTopLocations = function (locations) {
        topLocations = filterGroup(topLocations, locations, compareLocation);

        //unhighlight old locations
        for (var i in topLocations) {
            markLocation(locationGroup, locationList, topLocations[i], false);
        }

        //highlight all selected location
        topLocations = locations;
        for (var i in topLocations) {
            markLocation(locationGroup, locationList, topLocations[i], true);
        }
    }

    return { updateEvents, updateTopEvents, updateTopCountries, updateTopLocations }
}

module.exports = socviewmap;
