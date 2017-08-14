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
            topRules.push(event);
        }

        topRules.push({
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
            locations.push({...location, type: type});
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

});
