var baseurl = "eventgraph/eventgraph-v16/";
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

function getTextConstants(nation) {
    var en = {
        event: "Event Node",
        sourceNode: "Source Node",
        targetNode: "Target Node",
        centerNode: "Investigating Node"
    }

    var fr = {
        event: "Event in France",
        sourceNode: "Source Node in France",
        targetNode: "Target Node in France",
        centerNode: "Investigating Node in France"
    }

    switch (nation) {
    case "fr":
        return fr;
    default:
        return en;
    }
}

function drawEventGraph(data) {
    var numberOfChart = 1;
    var percent = Math.floor(100 / numberOfChart);

    $.ajax({
        type: "GET",
        url: "eventgraph/template/template_3.html",
        dataType: "text",
        cache: false,
        success: function (result) {
            for (var i = 0; i < numberOfChart; i++) {
                var id = "graph-" + (i + 1);

                //append html
                var html = result.substring(0);
                html = html.replace("#", (i + 1));
                $("body").append(html);
                $(".graph-container").css("width", "calc(" + percent + "% - 1px)");

                //create parameter for graph
                var configVar = getConfigVariable();

                var container = document.getElementById(id);
                configVar.container = container.getElementsByClassName("eventgraph-svg")[0];
                configVar.container_legend = container.getElementsByClassName("legend-svg")[0];
                configVar.container_buttons = container.getElementsByClassName("buttons-svg")[0];

                configVar.textConstants = getTextConstants("en");
                configVar.containerWidth = $("#" + id).width();
                configVar.containerHeight = $("#" + id).height();

                configVar.events = getEvents(configVar);
                configVar.data = processData(data);

                //create graph
                main_graph(configVar);
                legend(configVar);
            }
        },
        error: function (response) {
            console.log("error ");
            console.log(response.responseText);
        }
    });
}

function getTemplate() {

}

main();