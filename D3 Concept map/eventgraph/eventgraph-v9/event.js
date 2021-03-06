function node_mouseover(d) {
    if (d.type == "event") {
        event_mouseover(d);
    } else if (d.type == "source" || d.type == "target") {
        machine_mouseover(d);
    }
}

function node_mouseout(d) {
    if (d.type == "event") {
        event_mouseout(d);
    } else if (d.type == "source" || d.type == "target") {
        machine_mouseout(d);
    }
}

function node_click(d) {
    d3.event.stopPropagation();
    center_graph(d, null);
}

function node_combine_click(d) {
    d3.event.stopPropagation();
    center_graph(d.center, d.source);
}

function machine_mouseover(d) {
    // bring related link to front
    d3.selectAll('.link').sort(function (a, b) {
        return d.related_links.has(a.id);
    });

    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', true);
    });



    //hightlight current machine
    d3.selectAll('#g' + d.id).classed('group-highlight', true);

    //hight light related nodes
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#g' + node.id).classed('group-highlight', true);
    });
}

function machine_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current machine
    d3.selectAll('#g' + d.id).classed('group-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#g' + node.id).classed('group-highlight', false);
    });
}

function event_mouseover(d) {
    // bring related link to front
    d3.selectAll('.link').sort(function (a, b) {
        return d.related_links.has(a.id);
    });

    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', true);
    });

    //hightlight current event
    d3.selectAll('#g' + d.id).classed('group-highlight', true);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#g' + node.id).classed('group-highlight', true);
    });
}

function event_mouseout(d) {
    //hightlight related link
    d.related_links.values().forEach(function (link, index) {
        d3.selectAll('#' + link.id).classed('link-highlight', false);
    });

    //hightlight current event
    d3.selectAll('#g' + d.id).classed('group-highlight', false);

    //hight light related machine
    d.related_nodes.forEach(function (key, node) {
        d3.selectAll('#g' + node.id).classed('group-highlight', false);
    });
}