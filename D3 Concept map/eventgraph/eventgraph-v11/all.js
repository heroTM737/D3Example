var baseurl = "eventgraph/eventgraph-v11/";
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

var container = document.getElementById("eventgraph");
var container_legend = document.getElementById("legend");
var container_buttons = document.getElementById("buttons");

function main() {
    //    doFakedData();
    doTestData();

    legend();
}

function doFakedData() {
    var data = getFakedEventData();
    start(data);
}

function doTestData() {
    $.ajax({
        type: "GET",
        url: "data/EventGraphData_v4.json",
        dataType: "text",
        cache: false,
        success: function (data) {
            var data = JSON.parse(data);
            start(data);
        },
        error: function (response) {
            console.log("error ");
            console.log(response.responseText);
        }
    });
}

function start(data) {
    var processedData = processData(data);
    eventgraphCurrentData = processedData;
    main_graph(processedData);
}

main();