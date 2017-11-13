var btn_w = 100;
var btn_h = 25;
var btn_m = 10;

function createButton(svg, x, y, text) {
    var btnGroup = svg.append("g")
        .attr("class", "btn-host");

    btnGroup.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", btn_w)
        .attr("height", btn_h);

    btnGroup.append("text")
        .attr("x", x + btn_w / 2)
        .attr("y", y + btn_h / 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(text);

    return btnGroup;
}

module.exports = {createButton, btn_w, btn_h, btn_m};