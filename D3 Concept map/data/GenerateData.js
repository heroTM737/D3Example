function getFakedEventData() {
    var nodes = [];
    var links = [];
    
    var numberOfEvent = 50;
    var numberOfMachine = 20;
    var numberOfLink = 50;
    
    for (var i = 0; i < 50; i++) {
        var weight = Math.floor(Math.random() * 10);
        nodes.push({
            "id": "id" + i,
            "_weight": weight,
            "name": "name" + i,
            "typeLabel": "Name ",
            "type": "event"
        });
    }

    for (var i = numberOfEvent; i < (numberOfEvent + numberOfMachine); i++) {
        var weight = Math.floor(Math.random() * 2000);
        nodes.push({
            "id": "id" + i,
            "_weight": weight,
            "name": "machine" + i,
            "typeLabel": "Attacker Address, Target Address ",
            "type": "source_target"
        });
    }
    
    for (var i = 0; i < numberOfEvent; i++) {
        var link_machine_source = Math.floor(Math.random() * numberOfMachine) + numberOfEvent;
        var link_event = i;
        var link_machine_target = Math.floor(Math.random() * numberOfMachine) + numberOfEvent;
        
        links.push({
            "source": link_machine_source,
            "target": link_event
        });
        
        links.push({
            "source": link_event,
            "target": link_machine_target
        });
    }
    
    var container = {};
    container.nodes = nodes;
    container.links = links;
    
    return container;
}