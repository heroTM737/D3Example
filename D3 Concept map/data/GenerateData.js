function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getFakedEventData() {
    var nodes = [];
    var links = [];

    var pairEM = [
        {
            e: 50,
            m: 30
        },
        {
            e: 8,
            m: 3
        },
        {
            e: 100,
            m: 50
        },
        {
            e: 20,
            m: 10
        },
    ];
    var chosenIndex = 2;
    var numberOfEvent = pairEM[chosenIndex].e;
    var numberOfMachine = pairEM[chosenIndex].m;

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

    return {
        nodes: nodes,
        links: links
    };
}

function getFakedEventData2() {
    var nodes = [];
    var links = [];

    var testCollections = [
        {
            s: 1,
            e: 1,
            t: 40
        },
        {
            s: 10,
            e: 10,
            t: 10
        },
        {
            s: 20,
            e: 20,
            t: 20
        },
    ];
    var chosenIndex = 1;
    var numberOfSource = testCollections[chosenIndex].s;
    var numberOfEvent = testCollections[chosenIndex].e;
    var numberOfTarget = testCollections[chosenIndex].t;

    for (var i = 0; i < numberOfSource; i++) {
        var weight = Math.floor(Math.random() * 10);
        nodes.push({
            "id": "source" + i,
            "_weight": weight,
            "name": "source " + i,
            "typeLabel": "Attacker Address, Target Address ",
            "type": "source"
        });
    }

    for (var i = 0; i < numberOfTarget; i++) {
        var weight = Math.floor(Math.random() * 10);
        nodes.push({
            "id": "target" + i,
            "_weight": weight,
            "name": "target " + i,
            "typeLabel": "Attacker Address, Target Address ",
            "type": "target"
        });
    }

    for (var i = 0; i < numberOfEvent; i++) {
        var weight = Math.floor(Math.random() * 10);
        nodes.push({
            "id": "event" + i,
            "_weight": weight,
            "name": "event " + i,
            "typeLabel": "Name ",
            "type": "event"
        });
    }

    for (var i = 0; i < numberOfSource; i++) {
        for (var j = 0; j < numberOfEvent; j++) {
            var random = Math.floor(Math.random() * 10) > 5 ? true : false;
            if (random) {
                links.push({
                    "source": i,
                    "target": j + numberOfSource + numberOfTarget
                });
            }
        }
    }

    for (var i = 0; i < numberOfTarget; i++) {
        for (var j = 0; j < numberOfEvent; j++) {
            var random = Math.floor(Math.random() * 10) > 5 ? true : false;
            if (random) {
                links.push({
                    "source": j + numberOfSource + numberOfTarget,
                    "target": i + numberOfSource
                });
            }
        }
    }

    return {
        nodes: nodes,
        links: links
    };
}