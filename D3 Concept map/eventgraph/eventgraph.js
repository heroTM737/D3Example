$.ajax({
    type: "GET",
    url: "data/ExampleData.txt",
    dataType: "text",
    success: function (data, textStatus, jqXHR) {
        var result = JSON.parse(data);
        for (var i in result.nodes){
            console.log(result.nodes[i].type);
        }
    }
});