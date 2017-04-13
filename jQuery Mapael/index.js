var mapaelPlots = {
    'paris': {
        size: 1,
        latitude: 48.86,
        longitude: 2.3444,
        tooltip: { content: "Paris<br />Population: 500000000" },
        text: { content: 'Paris' }
    },
    'newyork': {
        latitude: 40.667,
        longitude: -73.833,
        tooltip: { content: "New york<br />Population: 200001" },
        text: { content: 'New York' }
    },
    'sanfrancisco': {
        latitude: 37.792032,
        longitude: -122.394613,
        tooltip: { content: "San Francisco" },
        text: { content: 'San Francisco' }
    },
    'roma': {
        latitude: 41.827637,
        longitude: 12.462732,
        tooltip: { content: "Roma" },
        text: { content: 'Roma' }
    },
    'miami': {
        latitude: 25.789125,
        longitude: -80.205674,
        tooltip: { content: "Miami" },
        text: { content: 'Miami' }
    },
    'tokyo': {
        latitude: 35.687418,
        longitude: 139.692306,
        text: { content: 'Tokyo' }
    },
    'sydney': {
        latitude: -33.917,
        longitude: 151.167,
        text: { content: 'Sydney' }
    },
    'hanoi': {
        latitude: 21.028511,
        longitude: 105.804817,
        text: { content: 'Ha Noi' }
    }
}
// Links allow you to connect plots between them
var mapaelLinks = {
    'newyork-miami': {
        factor: -0.3,
        between: ['newyork', 'miami'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "New-York -> Miami" }
    },
    'miami-sanfrancisco': {
        factor: -0.3,
        between: ['miami', 'sanfrancisco'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "Miami - San Francisco" }
    },
    'sanfrancisco-paris': {
        factor: -0.3,
        between: ['sanfrancisco', 'paris'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "San Francisco -> Paris" }
    },
    'paris-roma': {
        factor: -0.3,
        between: ['paris', 'roma'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "Paris -> Roma" }
    },
    'roma-hanoi': {
        factor: -0.3,
        between: ['roma', 'hanoi'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "Roma -> Ha Noi" }
    },
    'roma-hanoi': {
        factor: -0.3,
        between: ['roma', 'hanoi'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "Roma -> Ha Noi" }
    },
    'hanoi-tokyo': {
        factor: -0.3,
        between: ['hanoi', 'tokyo'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "Ha Noi -> Tokyo" }
    },
    'tokyo-sydney': {
        factor: -0.3,
        between: ['tokyo', 'sydney'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "Tokyo -> Sydney" }
    },
    'sydney-newyork': {
        factor: -0.3,
        between: ['sydney', 'newyork'],
        attrs: {
            "stroke-width": 2
        },
        tooltip: { content: "Sydney -> New York" }
    }
}
var mapaelMap = {
    name: "world_countries",
    defaultArea: {
        attrs: {
            fill: "#f4f4e8"
            , stroke: "#ced8d0"
        }
    }
    // Default attributes can be set for all links
    , defaultLink: {
        factor: 0.4
        , attrsHover: {
            stroke: "#a4e100"
        }
    }
    , defaultPlot: {
        text: {
            attrs: {
                fill: "#000"
            },
            attrsHover: {
                fill: "#000"
            }
        }
    },
    afterInit: function (container, paper, areas, plots, options) {
        for (var key in plots) {
            plots[key].mapElem["0"].id = "plot_" + key;
            plots[key].mapElem["0"].mydata = { id: key };
            plots[key].mapElem["0"].oncontextmenu = onContextMenuShow;
        }
    }
}

function createContextMenu(mydata) {
    return [
        {
            title: 'Create Channel [' + mydata.id + ']',
            action: function (elm, d, i) {
                console.log('Item #1 clicked!');
                console.log('The data for this circle is: ' + d);
            },
            disabled: false // optional, defaults to false
        },
        {
            title: ' Analytics quick search [' + mydata.id + ']',
            action: function (elm, d, i) {
                console.log('You have clicked the second item!');
                console.log('The data for this circle is: ' + d);
            }
        }
    ];
}

function onContextMenuShow(event) {
    d3.event = event;
    d3.contextMenu(createContextMenu(event.target.mydata))(event);
}

function drawGeoMap(container, data) {
    var plots = {};
    for (var key in data.points) {
        var point = data.points[key];
        plots[key] = {
            longitude: point.geometry.coordinates[0],
            latitude: point.geometry.coordinates[1],
            tooltip: { content: point.properties.country },
            text: { content: point.properties.city }
        }
    }

    var links = {};
    for (var key in data.lines) {
        var line = data.lines[key];
        links[key] = {
            factor: -0.3,
            between: [
                {
                    longitude: line.geometry.coordinates[0][0],
                    latitude: line.geometry.coordinates[0][1],
                },
                {
                    longitude: line.geometry.coordinates[1][0],
                    latitude: line.geometry.coordinates[1][0],
                }
            ],
            attrs: {
                "stroke-width": 5
            },
            tooltip: { content: key }
        }
    }

    $(container).mapael({
        map: mapaelMap,
        plots: plots,
        links: links
    });
}

$.getJSON("data/data1.json", function (data) {
    drawGeoMap($(".mapcontainer"), data);
});

