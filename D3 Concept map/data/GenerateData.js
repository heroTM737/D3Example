function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getFakedEventData() {
    var nodes = [];
    var links = [];

    var numberOfEvent = 40;
    var numberOfMachine = 10;

    for (var i = 0; i < numberOfEvent; i++) {
        var weight = Math.floor(Math.random() * 10);
        nodes.push({
            "id": "id" + i,
            "_weight": weight,
            "name": "event " + i,
            "typeLabel": "Name ",
            "type": "event"
        });
    }

    for (var i = numberOfEvent; i < (numberOfEvent + numberOfMachine); i++) {
        var weight = Math.floor(Math.random() * 2000);
        nodes.push({
            "id": "id" + i,
            "_weight": weight,
            "name": "machine " + i,
            "typeLabel": "Attacker Address, Target Address ",
            "type": "source_target"
        });
    }

    for (var i = 0; i < numberOfEvent; i++) {
        var link_event = i;

        //generate source
        var number_of_source = Math.floor(Math.random() * (numberOfMachine / 2));
        if (number_of_source < 1) {
            number_of_source = 1;
        }
        var link_machine_source = Math.floor(Math.random() * numberOfMachine) + numberOfEvent;
        var source = d3.map();
        for (var j = 0; j < number_of_source; j++) {
            while (source.has(link_machine_source)) {
                link_machine_source = Math.floor(Math.random() * numberOfMachine) + numberOfEvent;
            }
            source.set(link_machine_source, true);

            if (link_machine_source) {
                links.push({
                    "source": link_machine_source,
                    "target": link_event
                });
            }
        }

        //generate target
        var number_of_target = Math.floor(Math.random() * (numberOfMachine / 2));
        if (number_of_target < 1) {
            number_of_target = 1;
        }
        var link_machine_target = Math.floor(Math.random() * numberOfMachine) + numberOfEvent;
        var target = d3.map();
        for (var j = 0; j < number_of_target; j++) {
            while (target.has(link_machine_target)) {
                link_machine_target = Math.floor(Math.random() * numberOfMachine) + numberOfEvent;
            }
            target.set(link_machine_target, true);

            if (link_machine_target) {
                links.push({
                    "source": link_event,
                    "target": link_machine_target
                });
            }
        }
    }

    var container = {};
    container.nodes = nodes;
    container.links = links;

    return container;
}