var data = {
    cities: [
        {
            name: "Paris",
            city: "Paris",
            countryName: "France",
            latitude: 48.86,
            longitude: 2.3444
        },
        {
            name: "New York",
            city: "New York",
            countryName: "US",
            latitude: 40.667,
            longitude: -73.833
        },
        {
            name: "San Francisco",
            city: "San Francisco",
            countryName: "US",
            latitude: 37.792032,
            longitude: -122.394613
        },
        {
            name: "Roma",
            city: "Roma",
            countryName: "Italia",
            latitude: 41.827637,
            longitude: 12.462732
        },
        {
            name: "Miami",
            city: "Miami",
            countryName: "US",
            latitude: 25.789125,
            longitude: -80.205674
        },
        {
            name: "Tokyo",
            city: "Tokyo",
            countryName: "Japan",
            latitude: 35.687418,
            longitude: 139.692306
        },
        {
            name: "Sydney",
            city: "Sydney",
            countryName: "Australia",
            latitude: -33.917,
            longitude: 151.167
        },
        {
            name: "Ha Noi",
            city: "Ha Noi",
            countryName: "Viet Nam",
            latitude: 21.028511,
            longitude: 105.804817
        },
        {
            name: "Ho Chi Minh",
            city: "Ho Chi Minh",
            countryName: "Viet Nam",
            longitude: 106.660172,
            latitude: 10.762622
        }
    ]
}

$(document).ready(function () {
    var refreshTime = 2000;
    var cities = data.cities;

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

            autoRefresh();
        }, refreshTime)
    }
    autoRefresh();

});
