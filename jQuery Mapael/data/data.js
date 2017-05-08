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

var source_color = "#01a982";
var target_color = "#241bf7";
var source_target_color = "red";

var color_white = {
    color: "#545454",
    fill: "#f4f4e8",
    stroke: "#ced8d0"
}

var color_dark = {
    color: "fff",
    fill: "#344955",
    stroke: "#2b3d47"
}

var pathname = window.location.pathname;
var splitted = pathname.split("/");
var filename = splitted[splitted.length - 1];
var color = filename == "index1.html" ? color_white : color_dark;

var legend = {
    plot: {
        title: "Geo Map Cities",
        titleAttrs: {
             fill: color.color
        },
        labelAttrs: {
            fill: color.color
        },
        slices: [
            {
                attrs: {
                    fill: source_color
                },
                label: "Source",
                sliceValue: "source",
                legendSpecificAttrs: {
                    r: 15
                }
            },
            {
                attrs: {
                    fill: target_color
                },
                label: "Target",
                sliceValue: "target",
                legendSpecificAttrs: {
                    r: 15,
                    fill: "red"
                }
            },
            {
                attrs: {
                    fill: source_target_color
                },
                label: "Source - Target",
                sliceValue: "source_target",
                legendSpecificAttrs: {
                    r: 15,
                    fill: "red"
                }
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
            attrs: {
                "stroke-width": 2
            },
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
            var color = "#000";
            if (city.type == "source") {
                color = source_color;
            } else if (city.type == "target") {
                color = target_color;
            } else if (city.type == "source_target") {
                color = source_target_color;
            }
            plots[city.name] = {
                longitude: city.longitude,
                latitude: city.latitude,
                tooltip: { content: city.name + " - " + city.type },
                text: { content: city.name },
                attrs: {
                    fill: color
                },
                value: city.type,
                cssClass: "tiendeptrai",
                size: 14
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