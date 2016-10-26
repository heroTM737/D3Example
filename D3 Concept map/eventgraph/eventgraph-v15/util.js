var diagonal = function (configVar) {
    var rw = configVar.rw;
    var diagonal = d3.svg.diagonal()
        .source(function (d) {
            var x = d.source.y;
            var y = d.source.x;
            return {
                "x": x,
                "y": y
            };
        })
        .target(function (d) {
            var x = d.target.y;
            var y = d.target.x;
            if (d.source.type == "source") {
                y = y - rw / 2;
            } else {
                y = y + rw / 2;
            }
            return {
                "x": x,
                "y": y
            };
        })
        .projection(function (d) {
            return [d.y, d.x];
        });
    return diagonal;
}

var diagonalTween = function (configVar) {
    var cx = configVar.center.x;
    var cy = configVar.center.y;
    var rw = configVar.rw;

    return function (d, i, a) {
        return function (t) {
            var diagonal = d3.svg.diagonal()
                .source(function (d) {
                    var x = cy + (d.source.y - cy) * t;
                    var y = cx + (d.source.x - cx) * t;
                    return {
                        "x": x,
                        "y": y
                    };
                })
                .target(function (d) {
                    var x = cy + (d.target.y - cy) * t;
                    var y = cx + (d.target.x - cx) * t;
                    if (d.source.type == "source") {
                        y = y - rw * t / 2;
                    } else {
                        y = y + rw * t / 2;
                    }
                    return {
                        "x": x,
                        "y": y
                    };
                })
                .projection(function (d) {
                    return [d.y, d.x];
                });

            return diagonal(d, i);
        }
    }
}

function shortenText(text, configVar) {
    if (text.length > configVar.max_text_length) {
        return text.substr(0, configVar.max_text_length - 3) + "...";
    }
    return text;
}

function shortenExtendText(text, configVar) {
    if (text.length > configVar.L3_text_length_char) {
        return text.substr(0, configVar.L3_text_length_char - 3) + "...";
    }
    return text;
}

function shortenEventText(text, configVar) {
    if (text.length > configVar.event_max_text_length_char) {
        return text.substr(0, configVar.event_max_text_length_char - 3) + "...";
    }
    return text;
}

function shortenMachineText(text, configVar) {
    if (text.length > configVar.machine_max_text_length_char) {
        return text.substr(0, configVar.machine_max_text_length_char - 3) + "...";
    }
    return text;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function genArc(radius, startAngle, endAngle) {
    var arc = d3.svg.arc()
        .innerRadius(radius)
        .outerRadius(radius)
        .startAngle(deg2rad(startAngle))
        .endAngle(deg2rad(endAngle))

    return arc;
}

function copyToClipBoard(text) {
    var id = "temporaryHiddenInput"
    $("body").append("<textarea id='" + id + "'></textarea>");
    var copyTextarea = $('#temporaryHiddenInput');
    copyTextarea.html(text);
    copyTextarea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    $("#" + id).remove();
}