var nodeType = ["correlator", "aggregator", "messagebus", "persistor", "dcache"];
var statusType = ["active", "warning", "error"];

function genNode(suffix) {
  var typeIndex = Math.floor(Math.random() * nodeType.length);
  var type = nodeType[typeIndex];

  var statusIndex = Math.floor(Math.random() * statusType.length);
  var status = statusType[typeIndex];

  return {
    name: type + "_" + suffix,
    type: type,
    status: status
  }
}

// var count_host = 10;
// var max_count_node = 5;

var count_host = 5;
var max_count_node = 3;

function genData() {
  var cluster = {
    name: "cluster",
    type: "cluster",
    children: []
  }

  for (var i = 0; i < count_host; i++) {
    var host = {
      name: "host_" + i,
      type: "host",
      children: []
    }
    cluster.children.push(host);

    var count_node = Math.floor(Math.random() * max_count_node) + 2;
    for (var j = 0; j < count_node; j++) {
      host.children.push(genNode(j));
    }
  }

  return [cluster];
}

