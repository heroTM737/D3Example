function main() {
    //    doFakedData();
    doTestData();
}

function doFakedData() {
    var data = getFakedEventData();
    processData(data);
}

function doTestData() {
    $.ajax({
        type: "GET",
        url: "data/EventGraphData_v3.json",
        dataType: "text",
        cache: false,
        success: function (data) {
            var result = JSON.parse(data);
            processData(result);
        },
        error: function (response) {
            console.log("error ");
            console.log(response.responseText);
        }
    });
}