var functionMap = {
    socviewmap: require('./socviewmap'),
    drawGeoMapMapael: require('./staticgeomap')
}

//bind function to window
for (var i in functionMap) {
    if (window[i] != undefined && window[i] != null) {
        console.log("function name conflict \"" + i + "\"");
    } else {
        window[i] = functionMap[i];
    }
}