var container = document.getElementById("eventgraph");
var width = 1758;
var height = 371;
d3.select(container).attr("width", width);
d3.select(container).attr("height", height);
d3.select(container).attr("viewBox", "0 0 1500 1500");
var json;
var zoomEnabled = false;
$.ajax({
    type: "GET",
    url: "data/EventGraphData_v3.json",
    dataType: "text",
    async: false,
    success: function (data) {
        json = JSON.parse(data);
    },
    error: function (response) {
        console.log("error ");
        console.log(response.responseText);
    }
});
var w = width,
    h = height,
    maxNodes = 1000;

var lastTranslate = [width / 2, height / 2];
var lastScale = 1;

var tooltip = d3.select(".tooltip-div");
if (tooltip.empty()) {
    tooltip = d3.select("body").append("div").attr("class", "tooltip-div");
}

var getTooltip = function (d) {
    var tip = "";
    tip += d.typeLabel + ": ";
    tip += d.name;
    tip += "<br/>Count: "; // This needs to be localized.
    tip += d._weight;
    return tip;
};

var vis = d3.select(container)
    .call(d3.behavior.zoom().on("zoom",
        function () {
            //$wnd.alert(self.@com.arcsight.module.chart.thirdparty.d3.D3ChartBase::zoomEnabled);
            if (zoomEnabled) {
                return;
            }

            if (d3.event.translate) {
                if (Math.abs(d3.event.translate[0]) >= width * 0.8 * lastScale) {
                    if (d3.event.translate[0] < 0) {
                        d3.event.translate[0] = -1 * width * 0.8;
                    } else {
                        d3.event.translate[0] = width * 0.8;
                    }
                }
                if (Math.abs(d3.event.translate[1]) >= height * 0.8 * lastScale) {
                    if (d3.event.translate[1] < 0) {
                        d3.event.translate[1] = -1 * height * 0.8;
                    } else {
                        d3.event.translate[1] = height * 0.8;
                    }
                }
                lastTranslate = d3.event.translate;
            } else {
                return;
            }

            // default
            if (d3.event.scale) {
                lastScale = d3.event.scale;
            }

            vis.attr("transform", "translate(" + lastTranslate + ") scale(" + lastScale + ")");

        }
    ))
    .append("svg:g").attr("id", "graph");


var self = this;

//vis.on("dblclick ", function () {
//    return self.@com.arcsight.module.chart.thirdparty.d3.D3EventGraph::graphEventCallback(Lcom / google / gwt / core / client / JavaScriptObject; Ljava / lang / String; Ljava / lang / String;)(d3.event, d3.event.type, null);
//});

var charge = d3.scale.linear().domain([1, maxNodes]).range([-600, -10]);
var distance = d3.scale.linear().domain([1, maxNodes]).range([200, 2]);
var force = d3.layout.force()
    .charge(charge(json.nodes.length))
    .linkDistance(distance(json.nodes.length))
    .nodes(json.nodes)
    .links(json.links)
    .gravity(.05)
    .size([w, h])
    .start();

vis.force = force;
vis.zoomEnabled = false;

function extractWeight(n) {
    return n._weight;
}

var weights = json.nodes.map(extractWeight);
var maxWeight = d3.max(weights);
var minWeight = d3.min(weights);

var maxRadius = d3.scale.linear().domain([1, maxNodes]).range([40, 4]);
var eventRadius = d3.scale.linear().domain([minWeight, maxWeight]).range([4, maxRadius(json.nodes.length)]);
var hostRadius = d3.scale.linear().domain([minWeight, maxWeight]).range([4, maxRadius(json.nodes.length)]);

function radius(obj) {
    var r = 4;
    if (obj.type == "event") {
        r = eventRadius(obj._weight);
    } else {
        r = hostRadius(obj._weight);
    }
    return r;
}

var path = vis.append("svg:g")
    .attr("class", "links")
    .selectAll("path")
    .data(json.links)
    .enter().append("svg:path")
    .attr("class", "link")
    .attr("marker-end", "url(#Triangle)");

var node = vis.selectAll("g.node")
    .data(json.nodes)
    .enter().append("svg:g")
    .attr("class", function (d) { //HiepDT: 1st, distinguish node type
        if (d.type == "source_target") {
            if (d.name == "NULL")
                return "sourceNode"; //Where art thou? Prolly somewhere in the middle?
            else
                return "sourceNodeNotNull";
        } else {
            if (d.name == "Monitor Event")
                return "monitorNode"; //Bottom
            else if (d.type == "target")
                return "target"; //Right most?
            else if (d.type == "source")
                return "source"; //Left most
            else
                return "node"; //Line up
        }
    });

node.append("svg:circle")
    .attr("class", function (d) {
        if (radius(d) > 18) {
            return d.type + "-node";
        } else {
            return d.type + "-node-small";
        }
    })
    .attr("id", function (d) {
        return d.name;
    })
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", function (d) {
        return radius(d);
    })
    //    .on("dblclick ", function (d, i) {
    //        self.@com.arcsight.module.chart.thirdparty.d3.D3EventGraph::graphEventCallback(Lcom / google / gwt / core / client / JavaScriptObject; Ljava / lang / String; Ljava / lang / String;)(d3.event, d3.event.type, d.name);
    //    })
    .on("mouseover", function (d) {
        //Show the tooltip for 6 seconds and then hide it
        tooltip.transition().style("visibility", "visible").transition().delay(6000).style("visibility", "hidden");
        tooltip.html(getTooltip(d));
    })
    .on("mousemove", function (d) {
        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    })
    .on("mouseout", function (d) {
        return tooltip.style("visibility", "hidden");
    }).call(force.drag);

node.filter(function (d) {
        return d.type != "event" && radius(d) > 12;
    })
    .append("svg:image")
    .attr("class", "computer")
    .attr("xlink:href", "images/computer.png")
    .attr("x", function (d) {
        return -(radius(d) - 10) + "px"
    })
    .attr("y", function (d) {
        return -(radius(d) - 10) + "px"
    })
    .attr("width", function (d) {
        return 2 * radius(d) - 20 + "px"
    })
    .attr("height", function (d) {
        return 2 * radius(d) - 20 + "px"
    })
    //    .on("dblclick ", function (d, i) {
    //        self.@com.arcsight.module.chart.thirdparty.d3.D3EventGraph::graphEventCallback(Lcom / google / gwt / core / client / JavaScriptObject; Ljava / lang / String; Ljava / lang / String;)(d3.event, d3.event.type, d.name);
    //        d3.event.stopPropagation();
    //    })
    .call(force.drag);

var linkHash = function (obj1, obj2) {
    return obj1.name + obj2.name;
};

var linkMap = {};

json.links.forEach(function (o, i) {
    linkMap[linkHash(o.source, o.target)] = o;
});
var max_height = 0;
force.on("tick", function (e) {
    var k = 20 * e.alpha;
    var w = d3.select(container).attr("width");
    var h = d3.select(container).attr("height");
    var i = 0;
    var r = 0;
    vis.selectAll("g.node").attr("transform", function (d) {
        d.x = w / 2; //Hiepdt
        d.y = (i += radius(d) * 4);
        if (d.y > max_height) {
            max_height = d.y;
        }
        return "translate(" + d.x + "," + d.y + ")";
    });

    vis.selectAll("g.source").attr("transform", function (d) {
        d.x = (radius(d) * 2); //Hiepdt
        //      		d.y = h/2;
        return "translate(" + d.x + "," + d.y + ")";
    });


    vis.selectAll("g.sourceNode").attr("transform", function (d) {
        d.x = (radius(d) * 2); //Hiepdt
        //      		d.y = h/2;
        return "translate(" + d.x + "," + d.y + ")";
    });

    vis.selectAll("g.sourceNodeNotNull").attr("transform", function (d) {
        d.x = w - (radius(d) * 2); //Hiepdt
        //      		d.y = h/2;
        return "translate(" + d.x + "," + d.y + ")";
    });
    //  		
    vis.selectAll("g.monitorNode").attr("transform", function (d) {
        d.x = w / 2; //Hiepdt
        d.y = i + (radius(d) + 20) < h ? i + (radius(d) + 20) : h - (radius(d) * 2);
        return "translate(" + d.x + "," + d.y + ")";
    });


    ////  		
    vis.selectAll("g.target").attr("transform", function (d) {
        d.x = w / 2 + ((w) / 4); //Hiepdt
        //      		d.y = h/2;
        return "translate(" + d.x + "," + d.y + ")";
    });

    path.attr("d", function (d) {
        //
        // If there are two edges between nodes n1 and n2, use an arc edge so the two edges can be
        // distinguished by the user
        //
        var x0 = d.source.x;
        var y0 = d.source.y;
        var x1 = d.target.x;
        var y1 = d.target.y;

        var dx = x1 - x0,
            dy = y1 - y0;

        var r0 = radius(d.source);
        var r1 = radius(d.target);

        var a1 = Math.atan(dy / dx);
        var a2 = Math.PI / 2 - a1;

        if (x1 > x0) {
            x0 = x0 + r0 * Math.cos(a1);
            y0 = y0 + r0 * Math.sin(a1);
            x1 = x1 - r1 * Math.sin(a2);
            y1 = y1 - r1 * Math.cos(a2);
        } else {
            x0 = x0 - r0 * Math.cos(a1);
            y0 = y0 - r0 * Math.sin(a1);
            x1 = x1 + r1 * Math.sin(a2);
            y1 = y1 + r1 * Math.cos(a2);
        }

        var index = linkHash(d.target, d.source);
        if (typeof linkMap[index] !== 'undefined') {
            var dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + x0 + "," + y0 + "A" + dr + "," + dr + " 0 0,1 " + x1 + "," + y1;
        }
        //Only one edge between n1 and n2, use a straight line
        else {
            return "M" + x0 + "," + y0 + "L" + x1 + "," + y1;
        }
    });
    d3.select(container).attr("viewBox", "0 0 " + width + " " + (max_height + 30));
});