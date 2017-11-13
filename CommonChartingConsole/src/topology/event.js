let centerGraph = null;

function getEvents(configVar) {
    var container = configVar.container;
    var outer;

    var node_mouse = function (d, state) {
        if (d.type == "combine") {
            if (d.count == 0) {
                return;
            } else {
                d3.select(container).selectAll('#g' + d.id).style("cursor", state ? "pointer" : "normal");
            }
        }
        //hightlight current node
        d3.select(container).selectAll('#g' + d.id).classed('group-highlight', state);
        if (d.type != "combine") {
            if (state) {
                // bring related link to front
                d3.select(container).selectAll('.link').sort(function (a, b) {
                    return d.related_links.has(a.id);
                });
            }

            //hightlight related link
            d.related_links.values().forEach(function (link, index) {
                d3.select(container).selectAll('#' + link.id).classed('link-highlight', state);
            });

            //hight light related node
            d.related_nodes.forEach(function (key, node) {
                d3.select(container).selectAll('#g' + node.id).classed('group-highlight', state);
            });
        }

        if (!configVar.eventgraphIsMainGraphOn && configVar.node_center == d) {
            d3.select(container).selectAll('.graphBox').classed('graphBox-highlight', state);
            d3.select(container).selectAll('.graphText').classed('graphText-highlight', state);
        }
    }

    var combine_highlight = function (d, state) {}

    var node_mouseover = function (d) {
        node_mouse(d, true);
        outer.combine_highlight(d, true);
    }

    var node_mouseout = function (d) {
        node_mouse(d, false);
        outer.combine_highlight(d, false);
    }

    var node_click = function (d) {
        d3.event.stopPropagation();
        centerGraph(d, null, configVar);
        closeContextMenu();
    }

    var node_combine_click = function (d) {
        d3.event.stopPropagation();
        if (d.count > 0) {
            centerGraph(d.center, d.source, configVar);
        }
        closeContextMenu();
    }

    outer = {
        node_mouseover: node_mouseover,
        node_mouseout: node_mouseout,
        node_click: node_click,
        node_combine_click: node_combine_click,
        combine_highlight: combine_highlight,
    }

    return outer;
}

function closeContextMenu() {
    d3.select('.d3-context-menu').style('display', 'none');
}

module.exports = getEvents;

//need to move require under module.exports since we have circular dependency
centerGraph = require('./centerGraph');