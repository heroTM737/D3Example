function genData() {
  var cluster = {
    name: "cluster",
    type: "cluster",
    children: []
  }

  // var count_host = 10;
  // var count_persistor = 5;

  var count_host = 5;
  var count_persistor = 3;

  for (var i = 0; i < count_host; i++) {
    var host = {
      name: "host_" + i,
      type: "host",
      children: []
    }
    cluster.children.push(host);
  }

  var persistorIndex = Math.floor(Math.random() * count_host);

  for (var i = 0; i < persistorIndex; i++) {
    var host = cluster.children[i];
    for (var j = 0; j < count_persistor; j++) {
      host.children.push({
        name: "correlator_" + j,
        type: "correlator"
      });
    }
  }

  for (var i = persistorIndex + 1; i < count_host; i++) {
    var host = cluster.children[i];
    for (var j = 0; j < count_persistor; j++) {
      host.children.push({
        name: "aggregator_" + j,
        type: "aggregator"
      });
    }
  }

  var persistor = cluster.children[persistorIndex];
  persistor.name = "persistor";
  persistor.type = "persistor";

  for (var j = 0; j < count_persistor; j++) {
    persistor.children.push({
      name: "correlator_" + j,
      type: "correlator"
    });
  }

  for (var j = 0; j < count_persistor; j++) {
    persistor.children.push({
      name: "aggregator" + j,
      type: "aggregator"
    });
  }

  return [cluster];
}

