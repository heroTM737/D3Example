var svg = d3.select("body")
    .append("svg")
    .attr("width", "1000px")
    .attr("height", "1000px");

var diagonal = d3.svg.diagonal()
    .source(function (d) {
        var x = d.source.y;
        var y = d.source.x;
        if (d.source.data.type == "event") {
            y = y + rw / 2;
        }
        return {
            "x": x,
            "y": y
        };
    })
    .target(function (d) {
        var x = d.target.y;
        var y = d.target.x;
        if (d.target.data.type == "event") {
            y = y - rw / 2;
        }
        return {
            "x": x,
            "y": y
        };
    })
    .projection(function (d) {
        return [d.y, d.x];
    });

function getTooltips(d) {
    var tip = "";
    tip += d.data.typeLabel + ": ";
    tip += d.data.name;
    tip += "<br/>Count: "; // This needs to be localized.
    tip += d.data._weight;

    return tip;
}

function getTooltipDiv() {
    var tooltip = d3.select(".tooltip");
    if (tooltip.empty()) {
        tooltip = d3.select("body").append("div").attr("class", "tooltip");
        tooltip.classed("hidden", true);
    }

    return tooltip;
}

function showTooltips(text, d) {
    var tooltip = getTooltipDiv();

    var id = d.id;

    var top = $("#" + id).offset().top;
    var left = $("#" + id).offset().left + 10;
    if (d.data.type == "event") {
        top -= rh;
        left += rw;
    } else if (d.data.type == "source_target") {
        top -= radius;
        left += radius;
    }
    //    tooltip.classed("hidden", false);
    tooltip.attr("style", "top:" + top + "px;" + "left:" + left + "px");
    tooltip.html(text);
}

function hideTooltips() {
    var tooltip = getTooltipDiv();
    tooltip.classed("hidden", true);
}

var scriptList = [
    "eventgraph/eventgraph-v6/main.js",
    "eventgraph/eventgraph-v6/variable.js",
    "eventgraph/eventgraph-v6/processData.js",
    "eventgraph/eventgraph-v6/center_graph.js",
    "eventgraph/eventgraph-v6/main_graph.js",
];

//load all widgets in scriptList
scriptList.forEach(function (entry) {
    $.ajax({
        url: entry,
        dataType: "script",
        async: false
    });
});

main();