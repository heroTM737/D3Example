var baseurl = "eventgraph/eventgraph-v9/";
var scriptList = [
    "util.js",
    "variable.js",
    "legend.js",
    "processData.js",
    "event.js",
    "center_graph.js",
    "main_graph.js",
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