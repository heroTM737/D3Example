function genData() {
  var persistor = {
    name: "persistor",
    type: "persistor",
    children: []
  }

  var count_host = 5;
  var count_ca = 3;
  var count_host_child = 5;

  for (var i = 0; i < count_host; i++) {
    var host = {
      name: "host_" + i,
      type: "host",
      children: []
    }
    for (var j = 0; j < count_host_child; j++) {
      host.children.push({
        name: "correlator_" + j,
        type: "correlator"
      });
    }
    for (var j = 0; j < count_host_child; j++) {
      host.children.push({
        name: "aggregator_" + j,
        type: "aggregator"
      });
    }
    persistor.children.push(host);
  }

  for (var i = 0; i < count_ca; i++) {
    persistor.children.push({
      name: "correlator_" + i,
      type: "correlator"
    });
  }

  for (var i = 0; i < count_ca; i++) {
    persistor.children.push({
      name: "aggregator_" + i,
      type: "aggregator"
    });
  }

  return [persistor];
}

