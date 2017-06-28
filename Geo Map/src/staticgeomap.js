var Mapael = require('./world_countries');

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

function getContextMenuFunction(contextMenuCommand, data) {
	return function (event) {
		var menuFN = d3.contextMenu(createContextMenuFuntion(contextMenuCommand, {
	    	getName: function (node_data) {return node_data.properties.name},
			getMenuData: function (node_data) {
				return {
					id: node_data.properties.name, 
					type: node_data.properties.type
				}
			}
	    }, false));
		
		d3.event = event;
		menuFN(data);
	}
}

function getTooltips(d) {
	var maybeShortenString = function(str) {
		if (str.length > 40 ) {
			return str.substring(0, 40) + "...";
		}
		return str;
	}
	
	var tip = "";     
    tip += d.properties.typeLabel + " " + maybeShortenString(d.properties.name) + "<br/>";
    tip += d.properties.longitudeLabel + " " + d.properties.longitude + "<br/>";
    tip += d.properties.latitudeLabel + " " + d.properties.latitude + "<br/>";
    if(d.properties.countryCodeLabel){ 
    	tip += d.properties.countryCodeLabel + " "+ d.properties.countryCode+ "<br/>";
    }
    if(d.properties.countryLabel){
    	tip += d.properties.countryLabel + " "+ d.properties.country+"<br/>";
    }
    if(d.properties.regionCode){
        tip += d.properties.regionCodeLabel + " "+ d.properties.regionCode+"<br/>";
    }
    if(d.properties.postalCode){
        tip += d.properties.postalCodeLabel + " "+ d.properties.postalCode+"<br/>";
    }
    if(d.properties.city){
        tip += d.properties.cityLabel + " "+ d.properties.city+"<br/>";
    }
    return tip; 
}

function drawGeoMapMapael(container, data) {
    var plots = {};
    for (var key in data.points) {
        var point = data.points[key];
        plots[key] = {
            longitude: point.geometry.coordinates[0],
            latitude: point.geometry.coordinates[1],
            tooltip: { content: getTooltips(point) },
            value: point.properties.type
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
                    latitude: line.geometry.coordinates[1][1],
                }
            ]
        }
    }
    
    var map = new Mapael(container, {
        map: {
        	name: "world_countries",
            defaultLink: {
                factor: 0.4,
            },
            defaultPlot: {
                size: 11,
            },
            afterInit: function (container, paper, areas, plots, options) {
                for (var key in plots) {
                    plots[key].mapElem["0"].id = "plot_" + key;
                    plots[key].mapElem["0"].mydata = { id: key };
                    plots[key].mapElem["0"].oncontextmenu = getContextMenuFunction(data.contextMenuCommand, data.points[key]);
                }
            }
        },
        plots: plots,
        links: links,
        legend: legend
    });
}

module.exports = drawGeoMapMapael;