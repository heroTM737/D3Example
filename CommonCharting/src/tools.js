let compareLocation = function (location1, location2) {
    return (
        location1.longitude == location2.longitude &&
        location1.latitude == location2.latitude
    );
}

let compareEvent = function (event1, event2) {
    return (
        compareLocation(event1.source, event2.source) &&
        compareLocation(event1.target, event2.target)
    );
}

let compareCountry = function (country1, country2) {
    return country1 == country2;
}

let getLocationId = (location) => {
    let id = "lat" + location.latitude + "long" + location.longitude;
    id = id.split("-").join("m");
    id = id.split(".").join("p");
    return id;
}

let getLinkId = (event) => {
    let source = "lon" + event.source.longitude + "lat" + event.source.latitude;
    let target = "lon" + event.target.longitude + "lat" + event.target.latitude;
    let id = (source + target).split(".").join("p");
    id = id.split("-").join("m");
    return id;
}

module.exports = { compareLocation, compareEvent, compareCountry, getLocationId, getLinkId };