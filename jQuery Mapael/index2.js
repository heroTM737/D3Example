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

$(function () {

    var data = genData();

    $(".mapcontainer").mapael({
        map: {
            name: "world_countries",
            defaultArea: {
                attrs: {
                    fill: "#f4f4e8",
                    stroke: "#ced8d0"
                }
            },
            defaultLink: {
                factor: 0.4,
                attrsHover: {
                    stroke: "#a4e100"
                }
            },
            defaultPlot: {
                text: {
                    attrs: {
                        fill: "#000"
                    },
                    attrsHover: {
                        fill: "#000"
                    }
                },
                size: 12,
            },
            afterInit: function (container, paper, areas, plots, options) {
                for (var key in plots) {
                    plots[key].mapElem["0"].id = "plot_" + key;
                    plots[key].mapElem["0"].mydata = { id: key };
                    plots[key].mapElem["0"].oncontextmenu = onContextMenuShow;
                }
            }
        },
        legend: data.legend,
        plots: data.plots,
        links: data.links
    });

    setTimeout(() => {
        $(".mapcontainer").trigger('update', [{
            newPlots: {
                hochiminh: {
                    longitude: 106.660172,
                    latitude: 10.762622,
                    tooltip: { content: "Ho Chi Minh - empty" },
                    text: { content: "Ho Chi Minh" },
                    attrs: {
                        fill: "black"
                    },
                    value: "empty",
                    size: 14
                }
            },
            animDuration: 300
        }]);
    }, 2000);
});