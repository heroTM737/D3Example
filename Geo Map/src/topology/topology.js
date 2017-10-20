let configVar = require('./variable');
let mainGraph = require('./mainGraph');
let eventGraphLegend = require('./legend');
let getEvents = require('./event');
let processData = require('./processData');

function topology (container, data, width, height) {
    var svg = d3.select(container).append("svg");
    var svg_legend = d3.select(container).append("svg");
    configVar.container = svg;
    configVar.container_legend = svg_legend;

    configVar.textConstants = data.textConstants;
    configVar.containerWidth = width;
    configVar.containerHeight = height;
    configVar.events = getEvents(configVar);
    configVar.data = processData(data.json);

    mainGraph(configVar);
    eventGraphLegend(configVar);
}