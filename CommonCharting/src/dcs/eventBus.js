let { highlightNode } = require('./highlight');

function createEventBus(dataBus) {
    let { tree, svg, root, update } = dataBus;
    let activeNode = null;

    function openAllHost(d) {
        let nodes = tree.nodes(root).reverse();
        nodes.forEach(function (d) {
            if (d.type == "HOST") {
                if (d.children == null) {
                    d.children = d._children;
                    d._children = null;
                    // update(d);
                }
            }
        });
        update(root);
    }

    function closeAllHost(d) {
        let nodes = tree.nodes(root).reverse();
        nodes.forEach(function (d) {
            if (d.type == "HOST") {
                if (d.children != null) {
                    d._children = d.children;
                    d.children = null;
                    // update(d);
                }
            }
        });
        update(root);
    }

    function clearHighlightNode() {
        if (activeNode != null) {
            activeNode = null;
        }
        highlightNode({ dataBus, node: root, statusKeep: false });
    }

    function clickNode(d) {
        d3.event.stopPropagation();
        activeNode = d;
        if (d.type != "HOST" && d.type != "MBUS_DATA" && d.type != "DCACHE") {
            showDetail(activeNode);
        }
        highlightNode({ dataBus, node: d, statusKeep: true });
    }

    function showDetail(d) {
        if (window.d3ChartActionCommand) {
            d3ChartActionCommand(cmd, d);
        }
    }

    function doubleClickNode(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }

    let eventBus = {
        fireEvent: (eventType, eventData) => {
            switch (eventType) {
                case "OPEN_ALL_HOST":
                    openAllHost(eventData);
                    break;
                case "CLOSE_ALL_HOST":
                    closeAllHost(eventData);
                    break;
                case "MOUSE_OVER_NODE": //fire only no active node
                    highlightNode({ dataBus, node: eventData, status: true });
                    break;
                case "MOUSE_OUT_NODE": //fire only no active node
                    highlightNode({ dataBus, node: eventData, status: false });
                    break;
                case "CLICK_NODE":
                    clickNode(eventData);
                    break;
                case "DOUBLE_CLICK_NODE":
                    doubleClickNode(eventData);
                    break;
                case "CLEAR_HIGHLIGHT_NODE":
                    clearHighlightNode();
                    break;
                default: console.log("No action defined for eventType = " + eventType);
            }
        }
    }

    return eventBus;
}

module.exports = { createEventBus };