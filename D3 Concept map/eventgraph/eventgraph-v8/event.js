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

    //show tooltips
    showTooltips(getTooltips(d), d);
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

    //hide tooltips
    hideTooltips();
}

function machine_click(d) {
    d3.event.stopPropagation();
    hideTooltips();
    machine_center_graph(d);
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

    showTooltips(getTooltips(d), d);
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

    hideTooltips();
}

function event_click(d) {
    d3.event.stopPropagation();
    hideTooltips();
    event_center_graph(d);
}