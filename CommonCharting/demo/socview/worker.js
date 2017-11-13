var interval = null;
this.onmessage = function (event) {
    if (event.data.run) {
        interval = setInterval(function () {
            postMessage(null);
        }, 200);
    } else {
        clearInterval(interval);
    }
};