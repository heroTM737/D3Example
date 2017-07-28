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

module.exports = { getLocationId, getLinkId };