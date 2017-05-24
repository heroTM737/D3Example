var cities = [
    {
        name: "Paris",
        latitude: 48.86,
        longitude: 2.3444
    },
    {
        name: "New York",
        latitude: 40.667,
        longitude: -73.833
    },
    {
        name: "San Francisco",
        latitude: 37.792032,
        longitude: -122.394613
    },
    {
        name: "Roma",
        latitude: 41.827637,
        longitude: 12.462732
    },
    {
        name: "Miami",
        latitude: 25.789125,
        longitude: -80.205674
    },
    {
        name: "Tokyo",
        latitude: 35.687418,
        longitude: 139.692306
    },
    {
        name: "Sydney",
        latitude: -33.917,
        longitude: 151.167
    },
    {
        name: "Ha Noi",
        latitude: 21.028511,
        longitude: 105.804817
    },
    {
        name: "Ho Chi Minh",
        longitude: 106.660172,
        latitude: 10.762622
    }
];

var legend = {
    plot: {
        labelAttrs: {
            cssClass: "legend_label"
        },
        slices: [
            {
                label: "Source",
                sliceValue: "source",
                cssClass: "plot source"
            },
            {
                label: "Target",
                sliceValue: "target",
                cssClass: "plot target"
            },
            {
                label: "Source - Target",
                sliceValue: "source_target",
                cssClass: "plot source_target"
            }
        ]
    }
}

function genData() {
    //create links
    var links = {};
    var number_of_link = 5;
    var sources = [];
    var targets = [];
    for (var i = 0; i < number_of_link; i++) {
        var si = Math.floor(Math.random() * cities.length);
        var ti;
        do {
            ti = Math.floor(Math.random() * cities.length);
        } while (ti == si)
        sources.push(si);
        targets.push(ti);

        var link_name = cities[si].name + "_" + cities[ti].name;
        var factor = Math.floor(Math.random() * 5 + 1) / 10;
        // var factor = 0;
        links[link_name] = {
            factor: factor,
            between: [cities[si].name, cities[ti].name],
            tooltip: { content: link_name }
        }
    }

    for (var i = 0; i < cities.length; i++) {
        cities[i].type = "empty";
    }

    for (var i = 0; i < sources.length; i++) {
        cities[sources[i]].type = "source";
    }

    for (var i = 0; i < targets.length; i++) {
        var city = cities[targets[i]];
        if (city.type == "source") {
            city.type += "_target";
        } else {
            city.type = "target";
        }
    }

    //create plots
    var plots = {};
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        if (city.type != "empty") {
            plots[city.name] = {
                longitude: city.longitude,
                latitude: city.latitude,
                tooltip: { content: city.name + " - " + city.type },
                text: { 
                    content: city.name,
                    cssClass: "node_text"
                },
                value: city.type
            }
        }
    }

    // console.log(plots);
    // console.log(links);

    return {
        plots: plots,
        links: links,
        legend: legend
    }
}