let Mapael = require('./world_countries');
let shootEventStatic = require('./shootEventStatic');
let shootEventDynamic = require('./shootEventDynamic');
let { getLocationId, getLinkId } = require('./tools');
let { compareLocation, compareEvent, compareCountry } = require('./tools');
var { location_r, location_r_hl, location_r_shoot } = require('./variables');

let world_countries = Mapael.maps.world_countries;

let queue = [];
let isShooting = false;

let getTooltips = function (location) {
    let tooltips = "";
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

let checkThenAddLocation = function (locationGroup, locationList, location) {
    let id = getLocationId(location);
    let isEmpty = locationGroup.select("#" + id).empty();

    if (isEmpty) {
        locationList.push(location);
        let city = world_countries.getCoords(location.latitude, location.longitude);
        let group = locationGroup.append("g");
        group.append("circle")
            .attr("id", id)
            .attr("class", "location")
            .attr("cx", city.x)
            .attr("cy", city.y)
            .attr("r", location_r)
            .attr("fill", "url(#radialGradient)");
        group.append("title").text(getTooltips(location));
    }

    return locationList;
}

let shootEvent = function (locationGroup, eventGroup, staticGroup, event) {
    if (event.type == "static") {
        let eventExist = !staticGroup.select("#" + getLinkId(event)).empty();
        let isDumb = compareLocation(event.source, event.target);
        if (!eventExist && !isDumb) {
            shootEventStatic(staticGroup, event);
        }
    } else {
        shootEventDynamic(eventGroup, locationGroup, event);
    }
}

let shootAllEvent = function (locationList, locationGroup, eventGroup, staticGroup) {
    let interval = setInterval(function () {
        if (queue.length > 0) {
            isShooting = true;
            let event = queue.shift();
            locationList = checkThenAddLocation(locationGroup, locationList, event.source);
            locationList = checkThenAddLocation(locationGroup, locationList, event.target);
            shootEvent(locationGroup, eventGroup, staticGroup, event);
        } else {
            isShooting = false;
            clearInterval(interval);
        }
    }, 200);
}

let markLocation = function (locationGroup, locationList, location, status) {
    checkThenAddLocation(locationGroup, locationList, location);
    let id = getLocationId(location);
    let node = locationGroup.select("#" + id);

    if (location.type != undefined && location.type != null) {
        node.classed(location.type, status);
    }

    let isSource = node.classed("source");
    let isTarget = node.classed("target");
    let isSourceTarget = isSource && isTarget;
    node.classed("source_target", isSourceTarget);

    let gradient = "url(#radialGradient)";
    if (isSourceTarget) {
        gradient = "url(#radialGradientSourceTarget)";
    } else if (isSource) {
        gradient = "url(#radialGradientSource)";
    } else if (isTarget) {
        gradient = "url(#radialGradientTarget)";
    }

    node.classed("highlight", status)
        .attr("fill", gradient)
        .transition()
        .duration(1000)
        .ease("linear")
        .attr("r", (isSource || isTarget) ? location_r_hl : location_r);
}

let filterGroup = function (oldList, newList, compareFn) {
    for (let i in newList) {
        let j = 0;
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

let socviewmap = function (container, data) {
    //clean container
    d3.select(container).selectAll("*").remove();

    //create svg
    let svg = d3.select(container).append("svg")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + world_countries.width + " " + world_countries.height);

    //define gradient
    let defs = svg.append("defs");
    let color1 = "orange";
    let color2 = "yellow";
    let linearGradient1 = defs.append("linearGradient").attr("id", "linearGradient1");
    linearGradient1.append("stop").attr("offset", "0%").attr("stop-color", color1);
    linearGradient1.append("stop").attr("offset", "100%").attr("stop-color", color2).attr("stop-opacity", "0");

    let linearGradient2 = defs.append("linearGradient").attr("id", "linearGradient2");
    linearGradient2.append("stop").attr("offset", "0%").attr("stop-color", color2).attr("stop-opacity", "0");
    linearGradient2.append("stop").attr("offset", "100%").attr("stop-color", color1);

    let radialGradient = defs.append("radialGradient").attr("id", "radialGradient");
    radialGradient.append("stop").attr("offset", "0%").attr("stop-color", "red");
    radialGradient.append("stop").attr("offset", "100%").attr("stop-color", "red").attr("stop-opacity", "0");

    let radialGradientSource = defs.append("radialGradient").attr("id", "radialGradientSource");
    radialGradientSource.append("stop").attr("offset", "0%").attr("stop-color", "red");
    radialGradientSource.append("stop").attr("offset", "100%").attr("stop-color", "red").attr("stop-opacity", "0");

    let radialGradientTarget = defs.append("radialGradient").attr("id", "radialGradientTarget");
    radialGradientTarget.append("stop").attr("offset", "0%").attr("stop-color", "green");
    radialGradientTarget.append("stop").attr("offset", "100%").attr("stop-color", "green").attr("stop-opacity", "0");

    let radialGradientSourceTarget = defs.append("radialGradient").attr("id", "radialGradientSourceTarget");
    radialGradientSourceTarget.append("stop").attr("offset", "0%").attr("stop-color", "orange");
    radialGradientSourceTarget.append("stop").attr("offset", "100%").attr("stop-color", "orange").attr("stop-opacity", "0");

    //draw world_countries
    let worldCountryGroup = svg.append("g").attr("class", "worldCountryGroup");
    let elems = world_countries.elems;
    for (let i in elems) {
        worldCountryGroup
            .append("path")
            .attr("class", "area")
            .attr("id", "CountryCode" + i)
            .attr("d", elems[i]);
    }

    let eventGroup = svg.append("g").attr("class", "eventGroup");
    let staticGroup = svg.append("g").attr("class", "staticGroup");
    let locationGroup = svg.append("g").attr("class", "locationGroup");
    let locationList = [];

    let updateEvents = function (events) {
        for (let i = events.length - 1; i >= 0; i--) {
            queue.push(events[i]);
        }

        if (!isShooting) {
            shootAllEvent(locationList, locationGroup, eventGroup, staticGroup);
        }
    }

    let topRules = [];
    let updateTopRules = function (rules) {
        topRules = filterGroup(topRules, rules, compareEvent);

        //remove old static events
        for (let i in topRules) {
            let event = topRules[i];
            if (event.type == "static") {
                let group = staticGroup.select("#" + getLinkId(event));
                group.transition()
                    .duration(1000)
                    .ease("linear")
                    .attr("opacity", 0)
                    .remove();
            }
        }

        //create new static events
        topRules = rules;
        updateEvents(topRules);
    }

    let topCountryCodes = {};
    let updateTopCountries = function (codes) {
        for (let key in codes) {
            let list = topCountryCodes[key];
            if (list == undefined || list == null) {
                list = [];
            }
            list = filterGroup(list, codes[key], compareCountry);

            //unhighlight old countries
            for (let i in list) {
                worldCountryGroup.select("#CountryCode" + list[i]).classed("highlight", false);
            }

            //highlight all selected countries
            list = codes[key];
            for (let i in list) {
                worldCountryGroup.select("#CountryCode" + list[i]).classed("highlight", true);
            }

            //assign back
            topCountryCodes[key] = list;
        }
    }


    let topLocations = {};
    let updateTopLocations = function (locations) {
        for (let key in locations) {
            let list = topLocations[key];
            if (list == undefined || list == null) {
                list = [];
            }
            list = filterGroup(list, locations[key], compareLocation);

            //unhighlight old locations
            for (let i in list) {
                markLocation(locationGroup, locationList, list[i], false);
            }

            //highlight all selected location
            list = locations[key];
            for (let i in list) {
                markLocation(locationGroup, locationList, list[i], true);
            }

            //assign back
            topLocations[key] = list;
        }
    }

    let update = function (data) {
        if (data != undefined && data != null) {
            if (data.logConsole != undefined && data.logConsole != null && data.logConsole) { console.log(data); }
            if (data.logConsoleText != undefined && data.logConsoleText != null && data.logConsoleText) { console.log(JSON.stringify(data)); }
            if (data.events != undefined && data.events != null) { updateEvents(data.events); }
            if (data.rules != undefined && data.rules != null) { updateTopRules(data.rules); }
            if (data.locations != undefined && data.locations != null) { updateTopLocations(data.locations); }
            if (data.countries != undefined && data.countries != null) { updateTopCountries(data.countries); }
        }
    }

    update(data);

    return { update }
}

module.exports = socviewmap;
