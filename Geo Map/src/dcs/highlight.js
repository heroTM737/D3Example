function highlightNode(config) {
    let { dataBus, status, statusKeep } = config;
    if (statusKeep != undefined && statusKeep != null) {
        doHighlight(config, "node-fade-keep", "node-highlight-keep", statusKeep);
    } else if (status != undefined && status != null) {
        doHighlight(config, "node-fade", "node-highlight", status);
    }
}

function doHighlight(config, fadeClassName, highlightClassName, status) {
    //fade out all node
    travelDownHighlight({
        ...config,
        node: config.dataBus.root,
        className: {
            [fadeClassName]: status,
            [highlightClassName]: false
        }
    });

    //highlight selected node
    let newConfig = {
        ...config,
        className: {
            [fadeClassName]: false,
            [highlightClassName]: status
        }
    }
    travelUpHighlight(newConfig);
    travelDownHighlight(newConfig);
}

function travelUpHighlight(config) {
    var node = config.node;
    var parent = node.parent;

    highlightMyNode(config);
    if (parent) {
        highlightMyLink({
            ...config,
            source: parent,
            target: node
        });
        travelUpHighlight({ ...config, node: parent });
    }
}

function travelDownHighlight(config) {
    var node = config.node;
    var children = node.children;

    highlightMyNode(config);
    if (children) {
        children.forEach(function (e, i) {
            highlightMyLink({
                ...config,
                source: node,
                target: e
            });
            travelDownHighlight({ ...config, node: e });
        });
    }
}

function highlightMyLink(config) {
    var link_id = "#from" + config.source.id + "to" + config.target.id;
    highlightById({ ...config, id: link_id });
}

function highlightMyNode(config) {
    var node_id = "#node" + config.node.id;
    highlightById({ ...config, id: node_id });
}

function highlightById({ dataBus, id, className }) {
    var node = dataBus.svg.select(id);
    for (var key in className) {
        node.classed(key, className[key]);
    }
}

module.exports = { highlightNode };