
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
            .attr("d", elem)
            .attr("style", "stroke:#ced8d0;fill:#f4f4e8");
    }

    //draw events map
    var number_of_link = 5;
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
    var SanFrancisco = world_countries.getCoords(event[0].latitude, event[0].longitude);
    var HaNoi = world_countries.getCoords(event[1].latitude, event[1].longitude);
    var duration = Math.floor(Math.random() * 1000) + 1000;
    var easefn = d3.easeLinear;

    var middle = {
        x: (HaNoi.x + SanFrancisco.x) / 2,
        y: (HaNoi.y + SanFrancisco.y) / 2,
    }

    isReverse = SanFrancisco.x - HaNoi.x < 0;
    var path_HaNoi_SanFrancisco = svg.append("path")
        .attr("stroke", isReverse ? "url(#linearGradient1)" : "url(#linearGradient2)")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("class", "");

    var repeat_path_HaNoi_SanFrancisco = () => {
        path_HaNoi_SanFrancisco
            .attr("d", "M " + HaNoi.x + " " + HaNoi.y + " L " + HaNoi.x + " " + HaNoi.y)

            .transition()
            .duration(duration / 10 * 3)
            .ease(easefn)
            .attr("d", "M " + HaNoi.x + " " + HaNoi.y + " L " + middle.x + " " + middle.y)

            .transition()
            .duration(duration / 10 * 3)
            .ease(easefn)
            .attr("d", "M " + middle.x + " " + middle.y + " L " + SanFrancisco.x + " " + SanFrancisco.y)

            .transition()
            .duration(duration / 10 * 4)
            .ease(easefn)
            .attr("d", "M " + SanFrancisco.x + " " + SanFrancisco.y + " L " + SanFrancisco.x + " " + SanFrancisco.y)

            .on("end", repeat_path_HaNoi_SanFrancisco);
    }
    repeat_path_HaNoi_SanFrancisco();

    var event_HaNoi_SanFrancisco = svg.append("circle")
        .attr("r", 2)
        .attr("style", "fill:blue");

    var repeat_circle_HaNoi_SanFrancisco = () => {
        event_HaNoi_SanFrancisco
            .attr("cx", HaNoi.x)
            .attr("cy", HaNoi.y)

            .transition()
            .duration(duration / 10 * 6)
            .ease(easefn)
            .attr("cx", SanFrancisco.x)
            .attr("cy", SanFrancisco.y)

            .transition()
            .duration(duration / 10 * 4)
            .attr("cx", SanFrancisco.x)
            .attr("cy", SanFrancisco.y)

            .on("end", repeat_circle_HaNoi_SanFrancisco);
    }
    repeat_circle_HaNoi_SanFrancisco();
}