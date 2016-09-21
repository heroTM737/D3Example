function node_mouseover(d) {
    node_mouse(d, true);
    combine_highlight(d, true);
}

function node_mouseout(d) {
    node_mouse(d, false);
    combine_highlight(d, false);
}

function node_mouse(d, state) {
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

    //hightlight current node
    d3.select(container).selectAll('#g' + d.id).classed('group-highlight', state);

    //hight light related node
    d.related_nodes.forEach(function (key, node) {
        d3.select(container).selectAll('#g' + node.id).classed('group-highlight', state);
    });
}

function node_click(d) {
    d3.event.stopPropagation();
    center_graph(d, null);
    closeContextMenu();
}

function node_combine_click(d) {
    d3.event.stopPropagation();
    if (d.count > 0) {
        center_graph(d.center, d.source);
    }
    closeContextMenu();
}

function closeContextMenu() {
    d3.select('.d3-context-menu').style('display', 'none');
}

var combine_highlight = function (d, state) {

}