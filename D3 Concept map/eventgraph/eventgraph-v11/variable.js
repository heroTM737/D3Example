var shift_x = 0;
var shift_y = 0;
var y_margin = 5;
var x_margin = 300;
var c_marmin = 1;

var event_max_text_length = 25;
var machine_max_text_length = 40;
var max_text_length = 9;
var character_length = 8;
var extend_text_length = Math.max(event_max_text_length, machine_max_text_length);
var current_data_max_machine_text_length = 0;
var current_data_max_event_text_length = 0;

var padding = 10;
var padding_y = 20;
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
var radius = 10;
var rw = (event_max_text_length + 3) * character_length + 10;
var rh = 44;

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

//current data
var eventgraphCurrentData;