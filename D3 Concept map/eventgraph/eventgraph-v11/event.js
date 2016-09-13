function node_mouseover(d) {
    if (d.type == "event") {
        event_mouseover(d);
    } else if (d.type == "source" || d.type == "target") {
        machine_mouseover(d);
    }
    combine_highlight_mouseover(d);
}

function node_mouseout(d) {
    if (d.type == "event") {
        event_mouseout(d);
    } else if (d.type == "source" || d.type == "target") {
        machine_mouseout(d);
    }
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

function machine_mouseover(d) {
    // bring related link to front
    d3.select(container).selectAll('.link').sort(function (a, b) {
        return d.related_links.has(a.id);
    });

    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.select(container).selectAll('#' + link.id).classed('link-highlight', true);
    });

    //hightlight current machine
    d3.select(container).selectAll('#g' + d.id).classed('group-highlight', true);

    //hight light related nodes
    d.related_nodes.forEach(function (key, node) {
        d3.select(container).selectAll('#g' + node.id).classed('group-highlight', true);
    });
}

function machine_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.select(container).selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current machine
    d3.select(container).selectAll('#g' + d.id).classed('group-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.select(container).selectAll('#g' + node.id).classed('group-highlight', false);
    });
}

function event_mouseover(d) {
    // bring related link to front
    d3.select(container).selectAll('.link').sort(function (a, b) {
        return d.related_links.has(a.id);
    });

    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.select(container).selectAll('#' + link.id).classed('link-highlight', true);
    });

    //hightlight current event
    d3.select(container).selectAll('#g' + d.id).classed('group-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.select(container).selectAll('#g' + node.id).classed('group-highlight', true);
    });
}

function event_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.select(container).selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current event
    d3.select(container).selectAll('#g' + d.id).classed('group-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.select(container).selectAll('#g' + node.id).classed('group-highlight', false);
    });
}

var combine_highlight_mouseover = function () {

}

var combine_highlight_mouseout = function () {

}