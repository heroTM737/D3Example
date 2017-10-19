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

function createContextMenuFuntion(contextMenuCommand, valueProvider, includeCopy) {
	var contextMenuFunction = function(node_data) {
		var contextMenu = [];
	    
		var menuJSO = d3ChartActionCommand(contextMenuCommand, valueProvider.getMenuData(node_data));
		for (var i = 0; i < menuJSO.length; i++){
			//add header
			if (menuJSO[i].name != null && menuJSO[i].name != undefined && menuJSO[i].name != "") {
				contextMenu.push({title: menuJSO[i].name});
			}
			
			//add options
			var data = menuJSO[i].data;
			var menuItemAction = function(cmd){
				return function(elm, d, i){
					if (typeof valueProvider.onItemClick === "function") {
						valueProvider.onItemClick();
					}
					d3ChartActionCommand(cmd, valueProvider.getMenuData(node_data));
				}
			};
			for (var j = 0; j < data.length; j++){
				contextMenu.push({
					title: data[j].name,
					action: menuItemAction(data[j].cmd)
				});
			}
			
			//add devider if it is not the last group
			if (i < menuJSO.length - 1) {
				contextMenu.push({
		        	divider: true
		        });
			}
		}
	    
	    return contextMenu;
	}
	
	if (includeCopy) {
		return function(node_data) {
			var investigateArray = contextMenuFunction(node_data);
			
			//add divider
			investigateArray.push({divider: true});
			
			//add copy option
			var name = valueProvider.getName(node_data);
			investigateArray.push({
				title: 'copy to clipboard: <b>' + name + '</b>',
		        action: function (elm, d, i) {
		            copyToClipBoard(name);
		        }
			});
			
			return investigateArray;
		}
	}
	
	return contextMenuFunction;
}