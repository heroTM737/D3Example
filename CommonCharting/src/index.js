var functionMap = {
    socviewmap: require('./geomap/socviewmap'),
    drawGeoMapMapael: require('./geomap/staticgeomap'),
    dcs: require('./dcs/dcs'),
    simpleLineChart: require('./chart/simpleLineChart'),
    topology: require('./topology/topology')
}

//bind function to window
for (var i in functionMap) {
    if (window[i] != undefined && window[i] != null) {
        console.log("function name conflict \"" + i + "\"");
    } else {
        window[i] = functionMap[i];
    }
}
