$(document).ready(function () {
    var refreshTime = 2000;
    var cities = data.cities;
    var countries = data.countries;

    var checkEventExist = function (event, list) {
        for (var i in list) {
            var source = list[i].source;
            var target = list[i].target;

            if (
                event.source.longitude == source.longitude ||
                event.source.latitude == source.latitude ||
                event.target.longitude == target.longitude ||
                event.target.latitude == target.latitude
            ) {
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
            target: cities[r2],
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

    var topRules = [];
    var genStaticEvents = function () {
        while (topRules.length < 6) {
            var event = null;
            do {
                event = genEvent();
            } while (checkEventExist(event, topRules))
            event.type = "static";
            topRules.push(event);
        }
    }

    var number_of_country = 5;
    var genCountriesCode = function () {
        var countryCodes = [];
        for (var i = 0; i < number_of_country; i++) {
            var index = Math.floor(Math.random() * countries.length);
            countryCodes.push(countries[index]);
        }
        return countryCodes;
    }

    var events = genEvents();
    var socviewmap = window.socviewmap(document.getElementsByClassName("mapcontainer")[0], events);
    genStaticEvents();
    socviewmap.update(topRules);

    var autoRefresh = function () {
        setTimeout(function () {
            //update dynamic event
            events = genEvents();
            socviewmap.update(events);

            //update static event
            socviewmap.remove([topRules.shift()]);
            genStaticEvents();
            socviewmap.update(topRules);

            socviewmap.highlightCountry(genCountriesCode());

            autoRefresh();
        }, refreshTime)
    }
    autoRefresh();

});
