$(document).ready(function () {
    var refreshTime = 300;
    var number_of_event = 3;

    var genEvents = function () {
        var events = [];
        for (var i = 0; i < number_of_event; i++) {
            var r1 = Math.floor(Math.random() * cities.length);
            var r2 = null;
            do {
                r2 = Math.floor(Math.random() * cities.length);
            } while (r2 == r1)

            events.push({
                source: cities[r1],
                target: cities[r2]
            });
        }

        return events;
    }


    var threatMap = createThreatMap(document.getElementsByClassName("mapcontainer")[0], 500, 500, genEvents());

    var autoRefresh = function() {
        setTimeout(function(){
            threatMap.update(genEvents());
            autoRefresh();
        }, refreshTime)
    }
    autoRefresh();

});