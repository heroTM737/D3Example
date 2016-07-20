function processData(data) {
    var source_machines = d3.map();
    var target_machines = d3.map();
    var events = d3.map();
    var links = d3.map();

    var nodes_data = data.nodes;
    var links_data = data.links;

    nodes_data.forEach(function (node_data, index) {
        if (node_data.type == "event") {
            var id = "e" + index + "e";
            events.set(id, {
                id: id,
                type: "event",
                related_links: d3.map(),
                related_nodes: d3.map(),
                sources: d3.map(),
                targets: d3.map(),
                data: node_data
            });
        }
    });

    links_data.forEach(function (link_data, index) {
        var source_index = link_data.source;
        var target_index = link_data.target;

        var link = {
            id: "from" + source_index + "to" + target_index
        };

        if (nodes_data[source_index].type == "source_target" || nodes_data[source_index].type == "source" || nodes_data[source_index].type == "target") {
            var s_id = "s" + source_index + "s";
            var source = source_machines.get(s_id);
            if (source == null) {
                source = {
                    id: s_id,
                    type: "source",
                    related_links: d3.map(),
                    related_nodes: d3.map(),
                    related_events: d3.map(),
                    related_machines: d3.map(),
                    data: nodes_data[source_index]
                };
                source_machines.set(s_id, source);
            }

            var e_id = "e" + target_index + "e";
            link.id = "from" + s_id + "to" + e_id;

            var event = events.get(e_id);
            event.related_nodes.set(source.id, source);
            event.related_links.set(link.id, link);
            event.sources.set(source.id, source);

            source.related_links.set(link.id, link);
            source.related_nodes.set(e_id, event);
            source.related_events.set(e_id, event);

            link.source = source;
            link.target = event;
        } else {
            var t_id = "t" + target_index + "t";
            var target = target_machines.get(t_id);
            if (target == null) {
                target = {
                    id: t_id,
                    type: "target",
                    related_links: d3.map(),
                    related_nodes: d3.map(),
                    related_events: d3.map(),
                    related_machines: d3.map(),
                    data: nodes_data[target_index]
                };
                target_machines.set(t_id, target);
            }

            var e_id = "e" + source_index + "e";
            link.id = "from" + e_id + "to" + t_id;

            var event = events.get(e_id);
            event.related_nodes.set(target.id, target);
            event.related_links.set(link.id, link);
            event.targets.set(target.id, target);

            target.related_links.set(link.id, link);
            target.related_nodes.set(e_id, event);
            target.related_events.set(e_id, event);

            link.source = event;
            link.target = target;
        }

        links.set(link.id, link);
    });

    var link_id = "id";
    events.values().forEach(function (event, event_index) {
        event.sources.forEach(function (source_key, source) {
            event.targets.forEach(function (target_key, target) {
                source.related_nodes.set(target.id, target);
                source.related_machines.set(target.id, target);

                target.related_nodes.set(source.id, source);
                target.related_machines.set(source.id, source);

                link_id = "from" + event.id + "to" + target.id;
                source.related_links.set(link_id, links.get(link_id));

                link_id = "from" + source.id + "to" + event.id;
                target.related_links.set(link_id, links.get(link_id));
            });
        });
    });

    //draw main graph
    main_graph(source_machines, target_machines, events);

    //bind action to go back to main graph when user clicks on white space
    d3.select("svg").on("click", main_graph.bind(null, source_machines, target_machines, events));
}