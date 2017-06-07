var data = {
    cities: [
        {
            name: "Paris",
            countryName: "France",
            latitude: 48.86,
            longitude: 2.3444
        },
        {
            name: "New York",
            countryName: "US",
            latitude: 40.667,
            longitude: -73.833
        },
        {
            name: "San Francisco",
            countryName: "US",
            latitude: 37.792032,
            longitude: -122.394613
        },
        {
            name: "Roma",
            countryName: "Italia",
            latitude: 41.827637,
            longitude: 12.462732
        },
        {
            name: "Miami",
            countryName: "US",
            latitude: 25.789125,
            longitude: -80.205674
        },
        {
            name: "Tokyo",
            countryName: "Japan",
            latitude: 35.687418,
            longitude: 139.692306
        },
        {
            name: "Sydney",
            countryName: "Australia",
            latitude: -33.917,
            longitude: 151.167
        },
        {
            name: "Ha Noi",
            countryName: "Viet Nam",
            latitude: 21.028511,
            longitude: 105.804817
        },
        {
            name: "Ho Chi Minh",
            countryName: "Viet Nam",
            longitude: 106.660172,
            latitude: 10.762622
        }
    ]
}

$(document).ready(function () {
    var refreshTime = 300;
    var number_of_event = 3;
    var cities = data.cities;

    var genEvents = function () {
        var events = [];
        for (var i = 0; i < number_of_event; i++) {
            var r1 = Math.floor(Math.random() * cities.length);
            var r2 = null;
            do {
                r2 = Math.floor(Math.random() * cities.length);
            } while (r2 == r1)

            events.push({
                source: cities[r1],
                target: cities[r2]
            });
        }

        return events;
    }


    var threatMap = window.createThreatMap(document.getElementsByClassName("mapcontainer")[0], genEvents(), 1000, 400);

    var autoRefresh = function() {
        setTimeout(function(){
            threatMap.update(genEvents());
            autoRefresh();
        }, refreshTime)
    }
    autoRefresh();

});
