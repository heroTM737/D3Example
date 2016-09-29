var baseurl = "eventgraph/eventgraph-v14/";
var scriptList = [
    "util.js",
    "variable.js",
    "legend.js",
    "processData.js",
    "event.js",
    "centerGraph.js",
    "mainGraph.js",
];

//load all widgets in scriptList
scriptList.forEach(function (entry) {
    $.ajax({
        url: baseurl + entry,
        dataType: "script",
        async: false
    });
});

function main() {
    doFakedData();
    //    doTestData();
}

function doFakedData() {
    //    var data = getFakedEventData();
    var data = getFakedEventData2();
    drawEventGraph(data);
}

function doTestData() {
    $.ajax({
        type: "GET",
        url: "data/EventGraphData_v4.json",
        dataType: "text",
        cache: false,
        success: function (data) {
            var data = JSON.parse(data);
            drawEventGraph(data);
        },
        error: function (response) {
            console.log("error ");
            console.log(response.responseText);
        }
    });
}

function getTextConstants() {
    return {
        centerNode: "center node in France",
        event: "event in France",
        mainGraph: "main graph in France",
        sourceNode: "source node in France",
        targetNode: "target node in France",
        home: "home in France"
    }
}

function drawEventGraph(data) {
    //chart 1
    var configVar = getConfigVariable();

    var container = document.getElementById("graph-1");
    configVar.container = container.getElementsByClassName("eventgraph-svg")[0];
    configVar.container_legend = container.getElementsByClassName("legend-svg")[0];
    configVar.container_buttons = container.getElementsByClassName("buttons-svg")[0];

    configVar.textConstants = getTextConstants();
    configVar.events = getEvents(configVar);
    configVar.data = processData(data);

    main_graph(configVar);

    //chart 2
    var configVar = getConfigVariable();

    var container = document.getElementById("graph-2");
    configVar.container = container.getElementsByClassName("eventgraph-svg")[0];
    configVar.container_legend = container.getElementsByClassName("legend-svg")[0];
    configVar.container_buttons = container.getElementsByClassName("buttons-svg")[0];

    configVar.textConstants = getTextConstants();
    configVar.events = getEvents(configVar);
    configVar.data = processData(data);

    main_graph(configVar);
}

main();