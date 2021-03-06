var nodeType = ["CORRELATOR", "AGGREGATOR", "MBUS_DATA", "MANAGER", "DCACHE"];
// var statusType = ["active", "warning", "error"]; //temporary hide warning status
var statusType = ["active", "error"];

var count = 0;
function genNode(suffix) {
  var typeIndex = Math.floor(Math.random() * nodeType.length);
  var type = nodeType[typeIndex];

  var statusIndex = Math.floor(Math.random() * statusType.length);
  var status = statusType[statusIndex];
  var id = type.toLowerCase() + "_" + suffix + "_" + count++;
  var node = {
    id: id,
    dataId: id,
    name: id,
    type: type,
    status: status
  }

  return node;
}

// var count_host = 10;
// var max_count_node = 5;

var count_host = 5;
var max_count_node = 3;

function genData() {
  count = 0;
  count_host = Math.floor(Math.random() * 10) % 5 + 2;

  var cluster = {
    id: "CLUSTER",
    dataId: "CLUSTER",
    name: "cluster",
    type: "CLUSTER",
    children: []
  }

  for (var i = 0; i < count_host; i++) {
    var host = {
      id: "host_" + i,
      dataId: "host_" + i,
      name: "host_" + i,
      type: "HOST",
      children: []
    }
    cluster.children.push(host);

    var count_node = Math.floor(Math.random() * max_count_node) + 2;
    for (var j = 0; j < count_node; j++) {
      host.children.push(genNode(i));
    }
  }

  return {
    data: [cluster],
    cmd: "cmd"
  };
}

