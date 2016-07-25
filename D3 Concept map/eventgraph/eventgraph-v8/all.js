var baseurl = "eventgraph/eventgraph-v8/";
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

function main() {
    //    doFakedData();
    doTestData();
}

function doFakedData() {
    var data = getFakedEventData();
    processData(data);
}

function doTestData() {
    $.ajax({
        type: "GET",
        url: "data/EventGraphData_v3.json",
        dataType: "text",
        cache: false,
        success: function (data) {
            var result = JSON.parse(data);
            processData(result);
        },
        error: function (response) {
            console.log("error ");
            console.log(response.responseText);
        }
    });
}

main();