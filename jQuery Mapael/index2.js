
$(document).ready(function () {
    var world_countries = $.mapael.maps.world_countries;
    var svg = d3.select(".mapcontainer").append("svg").attr("viewBox", "0 0 " + world_countries.width + " " + world_countries.height);

    //define gradient
    var defs = svg.append("defs");
    var linearGradient1 = defs.append("linearGradient").attr("id", "linearGradient1");
    linearGradient1.append("stop").attr("offset", "0%").attr("stop-color", "red");
    linearGradient1.append("stop").attr("offset", "100%").attr("stop-color", "yellow").attr("stop-opacity", "0");

    var linearGradient2 = defs.append("linearGradient").attr("id", "linearGradient2");
    linearGradient2.append("stop").attr("offset", "0%").attr("stop-color", "yellow").attr("stop-opacity", "0");
    linearGradient2.append("stop").attr("offset", "100%").attr("stop-color", "red");

    //draw world_countries
    var elems = world_countries.elems;

    for (var i in elems) {
        var elem = elems[i];
        svg.append("path")
            .attr("class", "map-path")
            .attr("d", elem);
    }

    //draw events map
    var number_of_link = 10;
    var links = [];
    for (var i = 0; i < number_of_link; i++) {
        var r1 = Math.floor(Math.random() * cities.length);
        var r2 = null;
        do {
            r2 = Math.floor(Math.random() * cities.length);
        } while (r2 == r1)
        
        links.push([r1, r2]);
    }

    for (var i = 0; i < number_of_link; i++) {
        var source = cities[links[i][0]];
        var target = cities[links[i][1]];
        shootEvent(svg, [source, target]);
    }

    for (var i = 0; i < cities.length; i++) {
        var city = world_countries.getCoords(cities[i].latitude, cities[i].longitude);
        svg.append("circle")
            .attr("cx", city.x)
            .attr("cy", city.y)
            .attr("r", 5)
            .attr("style", "fill:red");
    }
    
});

function shootEvent(svg, event) {
    var world_countries = $.mapael.maps.world_countries;
    var Source = world_countries.getCoords(event[0].latitude, event[0].longitude);
    var Target = world_countries.getCoords(event[1].latitude, event[1].longitude);

    //config animation
    var duration = Math.floor(Math.random() * 1000) + 1000;
    var easefn = d3.easeLinear;

    var middle = {
        x: (Target.x + Source.x) / 2,
        y: (Target.y + Source.y) / 2,
    }

    isReverse = Source.x - Target.x > 0;
    var path_Source_Target = svg.append("path")
        .attr("stroke", isReverse ? "url(#linearGradient1)" : "url(#linearGradient2)")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("class", "");

    //loop running path
    var repeat_path_Source_Target = () => {
        path_Source_Target
            .attr("d", "M " + Source.x + " " + Source.y + " L " + Source.x + " " + Source.y)

            .transition()
            .duration(duration / 10 * 3)
            .ease(easefn)
            .attr("d", "M " + Source.x + " " + Source.y + " L " + middle.x + " " + middle.y)

            .transition()
            .duration(duration / 10 * 3)
            .ease(easefn)
            .attr("d", "M " + middle.x + " " + middle.y + " L " + Target.x + " " + Target.y)

            .transition()
            .duration(duration / 10 * 4)
            .ease(easefn)
            .attr("d", "M " + Target.x + " " + Target.y + " L " + Target.x + " " + Target.y)

            .on("end", repeat_path_Source_Target);
    }
    repeat_path_Source_Target();

    //loop running circle
    var event_Source_Target = svg.append("circle")
        .attr("r", 2)
        .attr("style", "fill:blue");

    var repeat_circle_Source_Target = () => {
        event_Source_Target
            .attr("cx", Source.x)
            .attr("cy", Source.y)

            .transition()
            .duration(duration / 10 * 6)
            .ease(easefn)
            .attr("cx", Target.x)
            .attr("cy", Target.y)

            .transition()
            .duration(duration / 10 * 4)
            .ease(easefn)
            .attr("cx", Target.x)
            .attr("cy", Target.y)

            .on("end", repeat_circle_Source_Target);
    }
    repeat_circle_Source_Target();
}