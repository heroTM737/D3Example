var text_node_margin = 5;

var event_max_text_length_char = 25;
var machine_max_text_length_char = 40;
var max_text_length = 9;
var character_length = 7;
var L3_text_length_char = Math.max(event_max_text_length_char, machine_max_text_length_char);
var machine_max_text_length_px = machine_max_text_length_char * character_length + text_node_margin * 2;

var rw = (event_max_text_length_char + 3) * character_length + 10;
var rh = 22;
var padding = 10;
var node_radius = 10;
var legend_height = (node_radius * 2 + padding) * 3 + padding;

//center graph
var L0_circle_radius = 50;
var L1_circle_radius = 10;
var L2_circle_radius = 15;
var L3_circle_radius = 10;

var L1_min_radius = L0_circle_radius * 2 + L1_circle_radius;
var L2_min_radius = L0_circle_radius * 2 + L1_circle_radius;

var L0_radius = 0;
var L1_radius = L1_min_radius;
var L2_radius = L1_radius * 2;

var L3_width = L2_circle_radius * 2 + text_node_margin + L3_text_length_char * character_length;
var L3_margin = L1_radius;

module.exports = {
    //define constants
    shift_x: 0,
    shift_y: legend_height,
    padding: padding,
    y_margin: 5,
    padding_y: 20,
    node_radius: node_radius,
    text_node_margin: text_node_margin,
    event_max_text_length_char: event_max_text_length_char,
    machine_max_text_length_char: machine_max_text_length_char,
    max_text_length: max_text_length,
    character_length: character_length,
    machine_max_text_length_px: machine_max_text_length_px,
    //declare variables to be used or changed 
    data: {},
    center: {
        x: 0,
        y: 0,
        radius: 0
    },
    svg_width: 0,
    svg_height: 0,
    //main graph
    rw: rw,
    rh: rh,
    //center graph
    L0_radius: L0_radius,
    L1_radius: L1_radius,
    L2_radius: L2_radius,
    L1_min_radius: L1_radius,
    L2_min_radius: L2_radius,
    L0_circle_radius: L0_circle_radius,
    L1_circle_radius: L1_circle_radius,
    L2_circle_radius: L2_circle_radius,
    L3_circle_radius: L3_circle_radius,
    L3_width: L3_width,
    L3_margin: L3_margin,
    L3_text_length_char: L3_text_length_char
}