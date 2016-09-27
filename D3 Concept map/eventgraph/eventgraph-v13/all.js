var baseurl = "eventgraph/eventgraph-v13/";
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
    var data = getFakedEventData();
    //    var data = getFakedEventData2();
    loadChart(data);
}

function doTestData() {
    $.ajax({
        type: "GET",
        url: "data/EventGraphData_v4.json",
        dataType: "text",
        cache: false,
        success: function (data) {
            var data = JSON.parse(data);
            loadChart(data);
        },
        error: function (response) {
            console.log("error ");
            console.log(response.responseText);
        }
    });
}

function loadChart(data) {
    //chart 1
    var configVar = getConfigVariable();

    var container = document.getElementById("graph-1");
    configVar.container = container.getElementsByClassName("eventgraph-svg")[0];
    configVar.container_legend = container.getElementsByClassName("legend-svg")[0];
    configVar.container_buttons = container.getElementsByClassName("buttons-svg")[0];

    configVar.events = getEvents(configVar);

    configVar.data = processData(data);
    main_graph(configVar);
    legend(configVar);

    //chart 2
    var configVar = getConfigVariable();

    var container = document.getElementById("graph-2");
    configVar.container = container.getElementsByClassName("eventgraph-svg")[0];
    configVar.container_legend = container.getElementsByClassName("legend-svg")[0];
    configVar.container_buttons = container.getElementsByClassName("buttons-svg")[0];

    configVar.events = getEvents(configVar);
    configVar.data = processData(data);

    main_graph(configVar);
    legend(configVar);
}

main();