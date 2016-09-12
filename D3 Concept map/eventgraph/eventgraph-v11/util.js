var diagonal = d3.svg.diagonal()
    .source(function (d) {
        var x = d.source.y;
        var y = d.source.x;
        if (d.source.data.type == "event") {
            y = y + rw / 2;
        }
        return {
            "x": x,
            "y": y
        };
    })
    .target(function (d) {
        var x = d.target.y;
        var y = d.target.x;
        if (d.target.data.type == "event") {
            y = y - rw / 2;
        }
        return {
            "x": x,
            "y": y
        };
    })
    .projection(function (d) {
        return [d.y, d.x];
    });

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
    //fast, easy, work for all browser but require extra action
    //    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);

    //feel better for user but work only in modern browser
    $("body").append("<textarea id='temporaryHiddenInput'></textarea>");
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

    $('#temporaryHiddenInput').remove();
}

function shortenText(text) {
    if (text.length > max_text_length) {
        return text.substr(0, max_text_length - 3) + "...";
    }
    return text;
}

function shortenExtendText(text) {
    if (text.length > extend_text_length) {
        return text.substr(0, extend_text_length - 3) + "...";
    }
    return text;
}

function shortenEventText(text) {
    if (text.length > event_max_text_length) {
        return text.substr(0, event_max_text_length - 3) + "...";
    }
    return text;
}

function shortenMachineText(text) {
    if (text.length > machine_max_text_length) {
        return text.substr(0, machine_max_text_length - 3) + "...";
    }
    return text;
}