var shift_x = 0;
var shift_y = 0;
var y_margin = 4;
var x_margin = 300;
var c_marmin = 1;
var max_text_length = 10;
var character_length = 7;
var padding = 10;
var unlimit_text_length = 0;
var box = {
    x: 0,
    y: 0,
    width: 1000,
    height: 1000
}

var center = {
    x: shift_x + x_margin,
    y: shift_y + 700,
    radius: 300
};

var text_node_margin = 5;
var radius = 9;
var rw = 150;
var rh = 22;

//center graph
var node_node_margin = center.radius;
var L0_radius = 0;
var L0_circle_radius = 50;
var L1_circle_radius = radius;
var L1_radius = L0_circle_radius + text_node_margin + L1_circle_radius;
var L1_min_radius = L0_circle_radius * 2 + L1_circle_radius;
var L2_radius = L1_radius * 2;
var L2_circle_radius = 15;
var L3_circle_radius = 10;
var svg_view_width = 1000;
var svg_view_height = svg_view_width;
var extend_node_width = L2_circle_radius * 2 + text_node_margin + max_text_length * character_length;
var center_extend_margin = L1_radius;