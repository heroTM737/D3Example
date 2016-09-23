function getEvents(configVar) {
    var container = configVar.container;

    var node_mouse = function (d, state) {
        //hightlight current node
        d3.select(container).selectAll('#g' + d.id).classed('group-highlight', state);

        if (d.type) {
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
    }

    var combine_highlight = function (d, state) {}

    var node_mouseover = function (d) {
        node_mouse(d, true);
        combine_highlight(d, true);
    }

    var node_mouseout = function (d) {
        node_mouse(d, false);
        combine_highlight(d, false);
    }

    var node_click = function (d) {
        d3.event.stopPropagation();
        center_graph(d, null, configVar);
        closeContextMenu();
    }

    var node_combine_click = function (d) {
        d3.event.stopPropagation();
        if (d.count > 0) {
            center_graph(d.center, d.source, configVar);
        }
        closeContextMenu();
    }

    return {
        node_mouseover: node_mouseover,
        node_mouseout: node_mouseout,
        node_click: node_click,
        node_combine_click: node_combine_click,
        combine_highlight: combine_highlight,
    }
}

function closeContextMenu() {
    d3.select('.d3-context-menu').style('display', 'none');
}