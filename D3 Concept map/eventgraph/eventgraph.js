$.ajax({
    type: "GET",
    url: "data/EventGraphData.json",
    dataType: "text",
    success: function (data, textStatus, jqXHR) {
        var result = JSON.parse(data);
        
        var circleList = [];
        var rectList = [];
        var links = [];
        
        for (var i in result.nodes){
//            console.log(result.nodes[i].type);
            if (result.nodes[i].type == "event") {
                circleList.push({
                    x: 300,
                    y: 50 + circleList.length * 15,
                    data: result.nodes[i]
                });
                result.nodes[i].cindex = circleList.length - 1;
            } else if (result.nodes[i].type == "source_target") {
                rectList.push({
                    x: 50 + (rectList.length % 2) * 500,
                    y: 100 + rectList.length * 200,
                    data: result.nodes[i]
                });
                result.nodes[i].cindex = rectList.length - 1;
            } 
        }
        
        for (var i in result.links) {
            var source = result.links[i].source;
            var target = result.links[i].target;
            var link = {
                source: {
                    x: 0,
                    y: 0
                },
                target: {
                    x: 0,
                    y: 0
                }
            };
            
            if (result.nodes[source].type == "event") {
                link.source.x = circleList[result.nodes[source].cindex].x;
                link.source.y = circleList[result.nodes[source].cindex].y;
            } else if (result.nodes[source].type == "source_target") {
                link.source.x = rectList[result.nodes[source].cindex].x;
                link.source.y = rectList[result.nodes[source].cindex].y;
            }
            
            if (result.nodes[target].type == "event") {
                link.target.x = circleList[result.nodes[target].cindex].x;
                link.target.y = circleList[result.nodes[target].cindex].y;
            } else if (result.nodes[target].type == "source_target") {
                link.target.x = rectList[result.nodes[target].cindex].x;
                link.target.y = rectList[result.nodes[target].cindex].y;
            }
            
            links.push(link);
        }
        
        visualizeData(circleList,  rectList, links);
    }
});

//$.ajax({
//    type: "GET",
//    url: "data/ExampleData.json",
//    dataType: "text",
//    success: function (data, textStatus, jqXHR) {
//        var result = JSON.parse(data);
//        
//        var circleList = result.circleList;
//        var rectList = result.rectList;
//        var links = [];
//        for (var i = 0; i < circleList.length; i++) {
//            for (var j = 0; j < rectList.length; j++) {
//                links.push({
//                    source: {
//                        x: circleList[i].x,
//                        y: circleList[i].y
//                    },
//                    target: {
//                        x: rectList[j].x,
//                        y: rectList[j].y
//                    }
//                });
//            }
//        }
//        
//        visualizeData(circleList, rectList, links);
//    }
//});

var radius = 5;
var rw = 20;
var rh = 20;

var diagonal = d3.svg.diagonal()
    .source(function (d) {
        return {
            "x": d.source.y,
            "y": d.source.x
        };
    })
    .target(function (d) {
        return {
            "x": d.target.y,
            "y": d.target.x
        };
    })
    .projection(function (d) {
        return [d.y, d.x];
    });

function rect_mouseover(d) {
    // bring to front
    var d_id = "x" + d.x + "xy" + d.y + "y";
    
	d3.selectAll('.link').sort(function(a, b){ 
        var s_id = "x" + a.source.x + "xy" + a.source.y + "y";
        var t_id = "x" + a.target.x + "xy" + a.target.y + "y";
        
        return (d_id == s_id) || (d_id == t_id); 
    });
    
    //hightlight
    var id = "x" + d.x + "xy" + d.y + "y";
    d3.selectAll('#' + id).classed('rect-highlight', true);
    
    d3.selectAll(".link[id*='s" + id + "']")
        .classed('link-highlight', true)
        .each(function(d, i) {
            var s_id = "x" + d.source.x + "xy" + d.source.y + "y";
            var t_id = "x" + d.target.x + "xy" + d.target.y + "y";

            d3.selectAll(".link[id*='s" + t_id + "']")
                .classed('link-highlight', true)
                .each(function(d, i) {
                    var target_id = "x" + d.target.x + "xy" + d.target.y + "y";
                    d3.select(".rect[id='" + target_id + "']").classed('rect-highlight', true);
                });
        });
    
    d3.selectAll(".link[id*='t" + id + "']")
        .classed('link-highlight', true)
        .each(function(d, i) {
            var s_id = "x" + d.source.x + "xy" + d.source.y + "y";
            var t_id = "x" + d.target.x + "xy" + d.target.y + "y";

            d3.selectAll(".link[id*='t" + s_id + "']")
                .classed('link-highlight', true)
                .each(function(d, i) {
                    var source_id = "x" + d.source.x + "xy" + d.source.y + "y";
                    d3.select(".rect[id='" + source_id + "']").classed('rect-highlight', true);
                });
        });
    
    //show tooltips
    showTooltips(getTooltips(d), d);
}

function rect_mouseout(d) {
    var id = "x" + d.x + "xy" + d.y + "y";
    var d_id = id;
    d3.selectAll('#' + id).classed('rect-highlight', false);
    
    d3.selectAll(".link[id*='s" + id + "']")
        .classed('link-highlight', false)
        .each(function(d, i) {
            var s_id = "x" + d.source.x + "xy" + d.source.y + "y";
            var t_id = "x" + d.target.x + "xy" + d.target.y + "y";

            d3.selectAll(".link[id*='s" + t_id + "']")
                .classed('link-highlight', false)
                .each(function(d, i) {
                    var target_id = "x" + d.target.x + "xy" + d.target.y + "y";
                    d3.select(".rect[id='" + target_id + "']").classed('rect-highlight', false);
                });
        });
    
    d3.selectAll(".link[id*='t" + id + "']")
        .classed('link-highlight', false)
        .each(function(d, i) {
            var s_id = "x" + d.source.x + "xy" + d.source.y + "y";
            var t_id = "x" + d.target.x + "xy" + d.target.y + "y";

            d3.selectAll(".link[id*='t" + s_id + "']")
                .classed('link-highlight', false)
                .each(function(d, i) {
                    var source_id = "x" + d.source.x + "xy" + d.source.y + "y";
                    d3.select(".rect[id='" + source_id + "']").classed('rect-highlight', false);
                });
        });
    
    hideTooltips();
}

function circle_mouseover(d) {
    // bring to front
    var d_id = "x" + d.x + "xy" + d.y + "y";
    
	d3.selectAll('.link').sort(function(a, b){ 
        var s_id = "x" + a.source.x + "xy" + a.source.y + "y";
        var t_id = "x" + a.target.x + "xy" + a.target.y + "y";
        
        return (d_id == s_id) || (d_id == t_id); 
    });
    
    //hightlight
    var id = "x" + d.x + "xy" + d.y + "y";
    d3.selectAll('#' + "x" + d.x + "y" + d.y).classed('circle-highlight', true);
    d3.selectAll(".link[id*='" + id + "']").classed('link-highlight', true);
    showTooltips(getTooltips(d), d);
}

function circle_mouseout(d) {
    var id = "x" + d.x + "xy" + d.y + "y";
    d3.selectAll('#' + id).classed('circle-highlight', false);
    d3.selectAll(".link[id*='" + id + "']").classed('link-highlight', false);
    hideTooltips();
}

var tooltip = d3.select(".tooltip");
if(tooltip.empty()){    		 
    tooltip = d3.select("body").append("div").attr("class", "tooltip");
}
tooltip.classed("hidden", true);

function getTooltips(d) {
    var tip = "";      			
    tip += d.data.typeLabel + ": ";
    tip += d.data.name;
    tip += "<br/>Count: "; // This needs to be localized.
    tip += d.data._weight;
    
    return tip;
}

function showTooltips(text, d) {
    var id = "x" + d.x + "xy" + d.y + "y";
    
    var top = $("#" + id).offset().top;
    var left = $("#" + id).offset().left + 10;
    if (d.data.type == "event") {
        top -= radius;
        left += radius;
    } else if (d.data.type == "source_target") {
        top -= rh;
        left += rw;
    }
    tooltip.classed("hidden", false);
    tooltip.attr("style", "top:" + top + "px;"+"left:" + left + "px");
    tooltip.html(text);
}

function hideTooltips() {
    tooltip.classed("hidden", true);
}

function visualizeData(circleList, rectList, links) {
    var svg = d3.select("body")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 1000);

    var link = svg.selectAll("path")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function (d) {
            return "s" +
                "x" + d.source.x + "x" +
                "y" + d.source.y + "y" +
                "t" +
                "x" + d.target.x + "x" +
                "y" + d.target.y + "y";
        })
        .attr("d", diagonal);

    var rectangle = svg.selectAll("rect")
        .data(rectList)
        .enter().append("rect")
        .attr("class", "rect")
        .attr('id', function (d) {
            return "x" + d.x + "xy" + d.y + "y";
        })
        .attr("x", function (d) {
            return d.x - rw / 2;
        })
        .attr("y", function (d) {
            return d.y - rh / 2;
        })
        .attr("width", rw)
        .attr("height", rh)
        .on("mouseover", rect_mouseover)
        .on("mouseout", rect_mouseout);

    var circle = svg.selectAll("circle")
        .data(circleList)
        .enter().append("circle")
        .attr("class", "circle")
        .attr('id', function (d) {
            return "x" + d.x + "xy" + d.y + "y";
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return radius;
        })
        .on("mouseover", circle_mouseover)
        .on("mouseout", circle_mouseout);
}