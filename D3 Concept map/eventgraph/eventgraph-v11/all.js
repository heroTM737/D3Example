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

document.getElementById("eventgraph-container").style.height = (document.documentElement.clientHeight - 100) + "px";
window.onresize = function (event) {
    document.getElementById("eventgraph-container").style.height = (document.documentElement.clientHeight - 100) + "px";
};
var container = document.getElementById("eventgraph");
var container_legend = document.getElementById("legend");

function main() {
    doFakedData();
    //    doTestData();

    legend();
}

function doFakedData() {
    var data = getFakedEventData();
    var processedData = processData(data);
    main_graph(processedData);
}

function doTestData() {
    $.ajax({
        type: "GET",
        url: "data/EventGraphData_v3.json",
        dataType: "text",
        cache: false,
        success: function (data) {
            var data = JSON.parse(data);
            var processedData = processData(data);
            main_graph(processedData);
        },
        error: function (response) {
            console.log("error ");
            console.log(response.responseText);
        }
    });
}

main();