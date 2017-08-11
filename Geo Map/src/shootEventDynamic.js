var Mapael = require('./world_countries');
var { getLocationId } = require('./tools');

var world_countries = Mapael.maps.world_countries;
var location_r_shoot = 10;
var location_r_hl = 3;
var location_r = 2;
var easefn = "linear";

var animateLocation = function (locationGroup, id, duration) {
    var node = locationGroup.select("#" + id);
    if (!node.empty()) {
        var node_r = node.classed("highlight") ? location_r_hl : location_r;

        locationGroup.select("#" + id)
        .transition()
        .duration(duration)
        .ease(easefn)
        .attr("r", location_r_shoot)
        .transition()
        .duration(duration)
        .ease(easefn)
        .attr("r", node_r);
    }
}

var shootEventDynamic = function (eventGroup, locationGroup, event) {
    var Source = world_countries.getCoords(event.source.latitude, event.source.longitude);
    var Target = world_countries.getCoords(event.target.latitude, event.target.longitude);

    //config animation
    var duration = Math.floor(Math.random() * 1000) + 1000;
    var duration3 = duration / 10 * 3;
    var duration4 = duration / 10 * 4;
    var duration6 = duration / 10 * 6;

    var sourceId = getLocationId(event.source);
    var targetId = getLocationId(event.target);

    animateLocation(locationGroup, sourceId, duration6);

    var middle = {
        x: (Target.x + Source.x) / 2,
        y: (Target.y + Source.y) / 2,
    }

    var isReverse = Source.x - Target.x > 0;
    var path_Source_Target = eventGroup.append("path")
        .attr("stroke", isReverse ? "url(#linearGradient1)" : "url(#linearGradient2)")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("class", "link-gradient")
        .attr("d", "M " + Source.x + " " + Source.y + " L " + Source.x + " " + Source.y)

        .transition()
        .duration(duration3)
        .ease(easefn)
        .attr("d", "M " + Source.x + " " + Source.y + " L " + middle.x + " " + middle.y)

        .transition()
        .duration(duration3)
        .ease(easefn)
        .attr("d", "M " + middle.x + " " + middle.y + " L " + Target.x + " " + Target.y)

        .transition()
        .duration(duration4)
        .ease(easefn)
        .attr("d", "M " + Target.x + " " + Target.y + " L " + Target.x + " " + Target.y)

        .remove();

    var event_Source_Target = eventGroup.append("circle")
        .attr("r", 2)
        .attr("style", "fill:orange")
        .attr("cx", Source.x)
        .attr("cy", Source.y)

        .transition()
        .duration(duration6)
        .ease(easefn)
        .attr("cx", Target.x)
        .attr("cy", Target.y)

        .each("end", function () {
            animateLocation(locationGroup, targetId, duration6);
        })
        .remove();;
}

module.exports = shootEventDynamic;