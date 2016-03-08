var svg = d3.select("body")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000);

var scriptList = [
    "eventgraph/eventgraph-v6/runTest.js",
    "eventgraph/eventgraph-v6/variable.js",
    "eventgraph/eventgraph-v6/processData.js",
    "eventgraph/eventgraph-v6/function.js",
    "eventgraph/eventgraph-v6/main_graph.js",
//    "eventgraph/eventgraph-v6/machine_center_graph.js ",
    //    "eventgraph/eventgraph-v6/event_center_graph.js",
];

//load all widgets in scriptList
scriptList.forEach(function (entry) {
    $.ajax({
        url: entry,
        dataType: "script",
        async: false
    });
});

runTest();