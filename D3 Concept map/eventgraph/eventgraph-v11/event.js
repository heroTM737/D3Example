function node_mouseover(d) {
    // bring related link to front
    d3.select(container).selectAll('.link').sort(function (a, b) {
        return d.related_links.has(a.id);
    });

    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.select(container).selectAll('#' + link.id).classed('link-highlight', true);
    });

    //hightlight current node
    d3.select(container).selectAll('#g' + d.id).classed('group-highlight', true);

    //hight light related node
    d.related_nodes.forEach(function (key, node) {
        d3.select(container).selectAll('#g' + node.id).classed('group-highlight', true);
    });
    
    combine_highlight_mouseover(d);
}

function node_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.select(container).selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current node
    d3.select(container).selectAll('#g' + d.id).classed('group-highlight', false);

    //hight light related node
    d.related_nodes.forEach(function (key, node) {
        d3.select(container).selectAll('#g' + node.id).classed('group-highlight', false);
    });
    
    combine_highlight_mouseout(d);
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

var combine_highlight_mouseover = function () {

}

var combine_highlight_mouseout = function () {

}