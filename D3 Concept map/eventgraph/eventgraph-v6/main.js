function main() {
    doFakedData();
    //    doTestData();
}

function doFakedData() {
    var data = getFakedEventData();
    processData(data);
}

function doTestData() {
    $.ajax({
        type: "GET",
        url: "data/EventGraphData.json",
        dataType: "text",
        cache: false,
        success: function (data) {
            console.log("success");
            var result = JSON.parse(data);
            processData(result);
        },
        error: function (response) {
            console.log("error ");
            console.log(response.responseText);
        }
    });
}