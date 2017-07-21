var getLocationId = function (location) {
    var id = "lat" + location.latitude + "long" + location.longitude;
    id = id.split("-").join("m");
    id = id.split(".").join("p");
    return id;
}

module.exports = getLocationId;