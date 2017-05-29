/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
    cities: [
        {
            name: "Paris",
            latitude: 48.86,
            longitude: 2.3444
        },
        {
            name: "New York",
            latitude: 40.667,
            longitude: -73.833
        },
        {
            name: "San Francisco",
            latitude: 37.792032,
            longitude: -122.394613
        },
        {
            name: "Roma",
            latitude: 41.827637,
            longitude: 12.462732
        },
        {
            name: "Miami",
            latitude: 25.789125,
            longitude: -80.205674
        },
        {
            name: "Tokyo",
            latitude: 35.687418,
            longitude: 139.692306
        },
        {
            name: "Sydney",
            latitude: -33.917,
            longitude: 151.167
        },
        {
            name: "Ha Noi",
            latitude: 21.028511,
            longitude: 105.804817
        },
        {
            name: "Ho Chi Minh",
            longitude: 106.660172,
            latitude: 10.762622
        }
    ]
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Mapael = __webpack_require__( 5);

var world_countries = Mapael.maps.world_countries;

var shootEvent = function (svg, event) {
    var Source = world_countries.getCoords(event.source.latitude, event.source.longitude);
    var Target = world_countries.getCoords(event.target.latitude, event.target.longitude);

    //config animation
    var duration = Math.floor(Math.random() * 1000) + 1000;
    var duration3 = duration / 10 * 3;
    var duration4 = duration / 10 * 4;
    var duration6 = duration / 10 * 6;
    var easefn = d3.easeLinear;

    var middle = {
        x: (Target.x + Source.x) / 2,
        y: (Target.y + Source.y) / 2,
    }

    var isReverse = Source.x - Target.x > 0;
    var path_Source_Target = svg.append("path")
        .attr("stroke", isReverse ? "url(#linearGradient1)" : "url(#linearGradient2)")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("class", "link-gradient")
        .attr("d", "M " + Source.x + " " + Source.y + " L " + Source.x + " " + Source.y)

        .transition()
        .duration(duration3)
        .ease(easefn)
        .attr("d", "M " + Source.x + " " + Source.y + " L " + middle.x + " " + middle.y)

        .transition()
        .duration(duration3)
        .ease(easefn)
        .attr("d", "M " + middle.x + " " + middle.y + " L " + Target.x + " " + Target.y)

        .transition()
        .duration(duration4)
        .ease(easefn)
        .attr("d", "M " + Target.x + " " + Target.y + " L " + Target.x + " " + Target.y)

        .each("end", function () { this.remove(); });

    var event_Source_Target = svg.append("circle")
        .attr("r", 2)
        .attr("style", "fill:blue")
        .attr("cx", Source.x)
        .attr("cy", Source.y)

        .transition()
        .duration(duration6)
        .ease(easefn)
        .attr("cx", Target.x)
        .attr("cy", Target.y)

        .transition()
        .duration(duration4)
        .ease(easefn)
        .attr("cx", Target.x)
        .attr("cy", Target.y)

        .each("end", function () { this.remove(); });
}

var checkThenAddLocation = function (locationGroup, locationList, location) {
    var id = "lat" + location.latitude + "long" + location.longitude;
    id = id.split("-").join("m");
    id = id.split(".").join("p");
    var isEmpty = locationGroup.select("#" + id).empty();

    if (isEmpty) {
        locationList.push(location);
        var city = world_countries.getCoords(location.latitude, location.longitude);
        locationGroup.append("circle")
            .attr("id", id)
            .attr("cx", city.x)
            .attr("cy", city.y)
            .attr("r", 5)
            .attr("style", "fill:red");
    }

    return locationList;
}

var createThreatMap = function (container, events, width, height) {
    //clean container
    d3.select(container).select("*").remove();

    //create svg
    var svg = d3.select(container).append("svg").attr("viewBox", "0 0 " + world_countries.width + " " + world_countries.height);

    //define gradient
    var defs = svg.append("defs");
    var color1 = "blue";
    var color2 = "yellow";
    var linearGradient1 = defs.append("linearGradient").attr("id", "linearGradient1");
    linearGradient1.append("stop").attr("offset", "0%").attr("stop-color", color1);
    linearGradient1.append("stop").attr("offset", "100%").attr("stop-color", color2).attr("stop-opacity", "0");

    var linearGradient2 = defs.append("linearGradient").attr("id", "linearGradient2");
    linearGradient2.append("stop").attr("offset", "0%").attr("stop-color", color2).attr("stop-opacity", "0");
    linearGradient2.append("stop").attr("offset", "100%").attr("stop-color", color1);

    //draw world_countries
    var worldCountryGroup = svg.append("g").attr("class", "worldCountryGroup");
    var elems = world_countries.elems;
    for (var i in elems) {
        var elem = elems[i];
        worldCountryGroup
            .append("path")
            .attr("class", "map_path")
            .attr("d", elem);
    }

    var eventGroup = svg.append("g").attr("class", "eventGroup");
    var locationGroup = svg.append("g").attr("class", "locationGroup");
    // var eventGroup = svg.append("g").attr("class", "eventGroup");
    var locationList = [];
    var update = function (events) {
        for (var i in events) {
            var event = events[i];
            locationList = checkThenAddLocation(locationGroup, locationList, event.source);
            locationList = checkThenAddLocation(locationGroup, locationList, event.target);
            shootEvent(eventGroup, event);
        }
    }
    update(events);

    return {
        update: update
    }
}

//bind function to window
if (window.createThreatMap != undefined && window.createThreatMap != null) {
    alert("function name conflict \"createThreatMap\"");
} else {
    window.createThreatMap = createThreatMap;
}

module.exports = createThreatMap;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var ThreatMap = __webpack_require__(1);
var data = __webpack_require__(0);

$(document).ready(function () {
    var refreshTime = 300;
    var number_of_event = 3;
    var cities = data.cities;

    var genEvents = function () {
        var events = [];
        for (var i = 0; i < number_of_event; i++) {
            var r1 = Math.floor(Math.random() * cities.length);
            var r2 = null;
            do {
                r2 = Math.floor(Math.random() * cities.length);
            } while (r2 == r1)

            events.push({
                source: cities[r1],
                target: cities[r2]
            });
        }

        return events;
    }


    var threatMap = ThreatMap(document.getElementsByClassName("mapcontainer")[0], genEvents(), 500, 500);

    var autoRefresh = function() {
        setTimeout(function(){
            threatMap.update(genEvents());
            autoRefresh();
        }, refreshTime)
    }
    autoRefresh();

});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 *
 * Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
 * Requires jQuery, raphael.js and jquery.mousewheel
 *
 * Version: 2.1.0
 *
 * Copyright (c) 2017 Vincent Brouté (https://www.vincentbroute.fr/mapael)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 *
 * Thanks to Indigo744
 *
 */
(function (factory) {
    module.exports = factory($, __webpack_require__(4), $);
}(function ($, Raphael, mousewheel) {
    // The plugin name (used on several places)
    var pluginName = "mapael";

    // Version number of jQuery Mapael. See http://semver.org/ for more information.
    var version = "2.1.0";

    /*
     * Mapael constructor
     * Init instance vars and call init()
     * @param container the DOM element on which to apply the plugin
     * @param options the complete options to use
     */
    var Mapael = function (container, options) {
        var self = this;

        // the global container (DOM element object)
        self.container = container;

        // the global container (jQuery object)
        self.$container = $(container);

        // the global options
        self.options = self.extendDefaultOptions(options);

        // zoom TimeOut handler (used to set and clear)
        self.zoomTO = 0;

        // zoom center coordinate (set at touchstart)
        self.zoomCenterX = 0;
        self.zoomCenterY = 0;

        // Zoom pinch (set at touchstart and touchmove)
        self.previousPinchDist = 0;

        // Zoom data
        self.zoomData = {
            zoomLevel: 0,
            zoomX: 0,
            zoomY: 0,
            panX: 0,
            panY: 0
        };

        // resize TimeOut handler (used to set and clear)
        self.resizeTO = 0;

        // Panning: tell if panning action is in progress
        self.panning = false;

        // Panning TimeOut handler (used to set and clear)
        self.panningTO = 0;

        // Animate view box Interval handler (used to set and clear)
        self.animationIntervalID = null;

        // Map subcontainer jQuery object
        self.$map = $("." + self.options.map.cssClass, self.container);

        // Save initial HTML content (used by destroy method)
        self.initialMapHTMLContent = self.$map.html();

        // Allow to store legend containers and initial contents (used by destroy method)
        self.createdLegends = {};

        // The tooltip jQuery object
        self.$tooltip = {};

        // The paper Raphael object
        self.paper = {};

        // The areas object list
        self.areas = {};

        // The plots object list
        self.plots = {};

        // The links object list
        self.links = {};

        // The map configuration object (taken from map file)
        self.mapConf = {};

        // Let's start the initialization
        self.init();
    };

    /*
     * Mapael Prototype
     * Defines all methods and properties needed by Mapael
     * Each mapael object inherits their properties and methods from this prototype
     */
    Mapael.prototype = {

        /*
         * Version number
         */
        version: version,

        /*
         * Initialize the plugin
         * Called by the constructor
         */
        init: function () {
            var self = this;

            // Init check for class existence
            if (self.options.map.cssClass === "" || $("." + self.options.map.cssClass, self.container).length === 0) {
                throw new Error("The map class `" + self.options.map.cssClass + "` doesn't exists");
            }

            // Create the tooltip container
            self.$tooltip = $("<div>").addClass(self.options.map.tooltip.cssClass).css("display", "none");

            // Get the map container, empty it then append tooltip
            self.$map.empty().append(self.$tooltip);

            // Get the map from $.mapael or $.fn.mapael (backward compatibility)
            if ($[pluginName] && $[pluginName].maps && $[pluginName].maps[self.options.map.name]) {
                // Mapael version >= 2.x
                self.mapConf = $[pluginName].maps[self.options.map.name];
            } else if ($.fn[pluginName] && $.fn[pluginName].maps && $.fn[pluginName].maps[self.options.map.name]) {
                // Mapael version <= 1.x - DEPRECATED
                self.mapConf = $.fn[pluginName].maps[self.options.map.name];
                if (window.console && window.console.warn) {
                    window.console.warn("Extending $.fn.mapael is deprecated (map '" + self.options.map.name + "')");
                }
            } else {
                throw new Error("Unknown map '" + self.options.map.name + "'");
            }

            // Create Raphael paper
            self.paper = new Raphael(self.$map[0], self.mapConf.width, self.mapConf.height);

            // issue #135: Check for Raphael bug on text element boundaries
            if (self.isRaphaelBBoxBugPresent() === true) {
                self.destroy();
                throw new Error("Can't get boundary box for text (is your container hidden? See #135)");
            }

            // add plugin class name on element
            self.$container.addClass(pluginName);

            if (self.options.map.tooltip.css) self.$tooltip.css(self.options.map.tooltip.css);
            self.paper.setViewBox(0, 0, self.mapConf.width, self.mapConf.height, false);

            // Handle map size
            if (self.options.map.width) {
                // NOT responsive: map has a fixed width
                self.paper.setSize(self.options.map.width, self.mapConf.height * (self.options.map.width / self.mapConf.width));

                // Create the legends for plots taking into account the scale of the map
                self.createLegends("plot", self.plots, (self.options.map.width / self.mapConf.width));
            } else {
                // Responsive: handle resizing of the map
                self.handleMapResizing();
            }

            // Draw map areas
            $.each(self.mapConf.elems, function (id) {
                var elemOptions = self.getElemOptions(
                    self.options.map.defaultArea,
                    (self.options.areas[id] ? self.options.areas[id] : {}),
                    self.options.legend.area
                );
                self.areas[id] = {"mapElem": self.paper.path(self.mapConf.elems[id]).attr(elemOptions.attrs)};
            });

            // Hook that allows to add custom processing on the map
            if (self.options.map.beforeInit) self.options.map.beforeInit(self.$container, self.paper, self.options);

            // Init map areas in a second loop (prevent texts to be hidden by map elements)
            $.each(self.mapConf.elems, function (id) {
                var elemOptions = self.getElemOptions(
                    self.options.map.defaultArea,
                    (self.options.areas[id] ? self.options.areas[id] : {}),
                    self.options.legend.area
                );
                self.initElem(self.areas[id], elemOptions, id);
            });

            // Draw links
            self.links = self.drawLinksCollection(self.options.links);

            // Draw plots
            $.each(self.options.plots, function (id) {
                self.plots[id] = self.drawPlot(id);
            });

            // Attach zoom event
            self.$container.on("zoom." + pluginName, function (e, zoomOptions) {
                self.onZoomEvent(e, zoomOptions);
            });

            if (self.options.map.zoom.enabled) {
                // Enable zoom
                self.initZoom(self.mapConf.width, self.mapConf.height, self.options.map.zoom);
            }

            // Set initial zoom
            if (self.options.map.zoom.init !== undefined) {
                if (self.options.map.zoom.init.animDuration === undefined) {
                    self.options.map.zoom.init.animDuration = 0;
                }
                self.$container.trigger("zoom", self.options.map.zoom.init);
            }

            // Create the legends for areas
            self.createLegends("area", self.areas, 1);

            // Attach update event
            self.$container.on("update." + pluginName, function (e, opt) {
                self.onUpdateEvent(e, opt);
            });

            // Attach showElementsInRange event
            self.$container.on("showElementsInRange." + pluginName, function (e, opt) {
                self.onShowElementsInRange(e, opt);
            });

            // Hook that allows to add custom processing on the map
            if (self.options.map.afterInit) self.options.map.afterInit(self.$container, self.paper, self.areas, self.plots, self.options);

            $(self.paper.desc).append(" and Mapael " + self.version + " (https://www.vincentbroute.fr/mapael/)");
        },

        /*
         * Destroy mapael
         * This function effectively detach mapael from the container
         *   - Set the container back to the way it was before mapael instanciation
         *   - Remove all data associated to it (memory can then be free'ed by browser)
         *
         * This method can be call directly by user:
         *     $(".mapcontainer").data("mapael").destroy();
         *
         * This method is also automatically called if the user try to call mapael
         * on a container already containing a mapael instance
         */
        destroy: function () {
            var self = this;

            // Detach all event listeners attached to the container
            self.$container.off("." + pluginName);
            self.$map.off("." + pluginName);

            // Detach the global resize event handler
            if (self.onResizeEvent) $(window).off("resize." + pluginName, self.onResizeEvent);

            // Empty the container (this will also detach all event listeners)
            self.$map.empty();

            // Replace initial HTML content
            self.$map.html(self.initialMapHTMLContent);

            // Empty legend containers and replace initial HTML content
            for (var id in self.createdLegends) {
                self.createdLegends[id].container.empty();
                self.createdLegends[id].container.html(self.createdLegends[id].initialHTMLContent);
            }

            // Remove mapael class
            self.$container.removeClass(pluginName);

            // Remove the data
            self.$container.removeData(pluginName);

            // Remove all internal reference
            self.container = undefined;
            self.$container = undefined;
            self.options = undefined;
            self.paper = undefined;
            self.$map = undefined;
            self.$tooltip = undefined;
            self.mapConf = undefined;
            self.areas = undefined;
            self.plots = undefined;
            self.links = undefined;
        },

        handleMapResizing: function () {
            var self = this;

            // onResizeEvent: call when the window element trigger the resize event
            // We create it inside this function (and not in the prototype) in order to have a closure
            // Otherwise, in the prototype, 'this' when triggered is *not* the mapael object but the global window
            self.onResizeEvent = function () {
                // Clear any previous setTimeout (avoid too much triggering)
                clearTimeout(self.resizeTO);
                // setTimeout to wait for the user to finish its resizing
                self.resizeTO = setTimeout(function () {
                    self.$map.trigger("resizeEnd");
                }, 150);
            };

            // Attach resize handler
            $(window).on("resize." + pluginName, self.onResizeEvent);

            // Attach resize end handler, and call it once
            self.$map.on("resizeEnd." + pluginName, function (e, isInit) {
                var containerWidth = self.$map.width();

                if (self.paper.width != containerWidth) {
                    var newScale = containerWidth / self.mapConf.width;
                    // Set new size
                    self.paper.setSize(containerWidth, self.mapConf.height * newScale);

                    // Create plots legend again to take into account the new scale
                    if (isInit || self.options.legend.redrawOnResize) {
                        self.createLegends("plot", self.plots, newScale);
                    }
                }
            }).trigger("resizeEnd", [true]);
        },

        /*
         * Extend the user option with the default one
         * @param options the user options
         * @return new options object
         */
        extendDefaultOptions: function (options) {

            // Extend default options with user options
            options = $.extend(true, {}, Mapael.prototype.defaultOptions, options);

            // Extend legend default options
            $.each(['area', 'plot'], function (key, type) {
                if ($.isArray(options.legend[type])) {
                    for (var i = 0; i < options.legend[type].length; ++i)
                        options.legend[type][i] = $.extend(true, {}, Mapael.prototype.legendDefaultOptions[type], options.legend[type][i]);
                } else {
                    options.legend[type] = $.extend(true, {}, Mapael.prototype.legendDefaultOptions[type], options.legend[type]);
                }
            });

            return options;
        },

        /*
         * Init the element "elem" on the map (drawing, setting attributes, events, tooltip, ...)
         */
        initElem: function (elem, elemOptions, id) {
            var self = this;
            var bbox = {};
            var textPosition = {};

            // Assign value attribute to element
            if (elemOptions.value !== undefined){
                elem.value = elemOptions.value;
            }

            // Init the label related to the element
            if (elemOptions.text && elemOptions.text.content !== undefined) {
                // Set a text label in the area
                bbox = elem.mapElem.getBBox();
                textPosition = self.getTextPosition(bbox, elemOptions.text.position, elemOptions.text.margin);
                elemOptions.text.attrs["text-anchor"] = textPosition.textAnchor;
                elem.textElem = self.paper.text(textPosition.x, textPosition.y, elemOptions.text.content).attr(elemOptions.text.attrs);
                elem.textElem.attr("class", elemOptions.text.cssClass);
                $(elem.textElem.node).attr("data-id", id);
            }

            // Set user event handlers
            if (elemOptions.eventHandlers) self.setEventHandlers(id, elemOptions, elem.mapElem, elem.textElem);

            // Set hover option for mapElem
            self.setHoverOptions(elem.mapElem, elemOptions.attrs, elemOptions.attrsHover);

            // Set hover option for textElem
            if (elem.textElem) self.setHoverOptions(elem.textElem, elemOptions.text.attrs, elemOptions.text.attrsHover);

            // Set hover behavior only if attrsHover is set for area or for text
            if (($.isEmptyObject(elemOptions.attrsHover) === false) ||
                (elem.textElem && $.isEmptyObject(elemOptions.text.attrsHover) === false)) {
                // Set hover behavior
                self.setHover(elem.mapElem, elem.textElem);
            }

            // Init the tooltip
            if (elemOptions.tooltip) {
                elem.mapElem.tooltip = elemOptions.tooltip;
                self.setTooltip(elem.mapElem);

                if (elemOptions.text && elemOptions.text.content !== undefined) {
                    elem.textElem.tooltip = elemOptions.tooltip;
                    self.setTooltip(elem.textElem);
                }
            }

            // Init the link
            if (elemOptions.href) {
                elem.mapElem.href = elemOptions.href;
                elem.mapElem.target = elemOptions.target;
                self.setHref(elem.mapElem);

                if (elemOptions.text && elemOptions.text.content !== undefined) {
                    elem.textElem.href = elemOptions.href;
                    elem.textElem.target = elemOptions.target;
                    self.setHref(elem.textElem);
                }
            }

            if (elemOptions.cssClass !== undefined) {
                $(elem.mapElem.node).addClass(elemOptions.cssClass);
            }

            $(elem.mapElem.node).attr("data-id", id);
        },

        /*
         * Init zoom and panning for the map
         * @param mapWidth
         * @param mapHeight
         * @param zoomOptions
         */
        initZoom: function (mapWidth, mapHeight, zoomOptions) {
            var self = this;
            var mousedown = false;
            var previousX = 0;
            var previousY = 0;
            var fnZoomButtons = {
                "reset": function () {
                    self.$container.trigger("zoom", {"level": 0});
                },
                "in": function () {
                    self.$container.trigger("zoom", {"level": "+1"});
                },
                "out": function () {
                    self.$container.trigger("zoom", {"level": -1});
                }
            };

            // init Zoom data
            $.extend(self.zoomData, {
                zoomLevel: 0,
                panX: 0,
                panY: 0
            });

            // init zoom buttons
            $.each(zoomOptions.buttons, function(type, opt) {
                if (fnZoomButtons[type] === undefined) throw new Error("Unknown zoom button '" + type + "'");
                // Create div with classes, contents and title (for tooltip)
                var $button = $("<div>").addClass(opt.cssClass)
                    .html(opt.content)
                    .attr("title", opt.title);
                // Assign click event
                $button.on("click." + pluginName, fnZoomButtons[type]);
                // Append to map
                self.$map.append($button);
            });

            // Update the zoom level of the map on mousewheel
            if (self.options.map.zoom.mousewheel) {
                self.$map.on("mousewheel." + pluginName, function (e) {
                    var zoomLevel = (e.deltaY > 0) ? 1 : -1;
                    var coord = self.mapPagePositionToXY(e.pageX, e.pageY);

                    self.$container.trigger("zoom", {
                        "fixedCenter": true,
                        "level": self.zoomData.zoomLevel + zoomLevel,
                        "x": coord.x,
                        "y": coord.y
                    });

                    e.preventDefault();
                });
            }

            // Update the zoom level of the map on touch pinch
            if (self.options.map.zoom.touch) {
                self.$map.on("touchstart." + pluginName, function (e) {
                    if (e.originalEvent.touches.length === 2) {
                        self.zoomCenterX = (e.originalEvent.touches[0].pageX + e.originalEvent.touches[1].pageX) / 2;
                        self.zoomCenterY = (e.originalEvent.touches[0].pageY + e.originalEvent.touches[1].pageY) / 2;
                        self.previousPinchDist = Math.sqrt(Math.pow((e.originalEvent.touches[1].pageX - e.originalEvent.touches[0].pageX), 2) + Math.pow((e.originalEvent.touches[1].pageY - e.originalEvent.touches[0].pageY), 2));
                    }
                });

                self.$map.on("touchmove." + pluginName, function (e) {
                    var pinchDist = 0;
                    var zoomLevel = 0;

                    if (e.originalEvent.touches.length === 2) {
                        pinchDist = Math.sqrt(Math.pow((e.originalEvent.touches[1].pageX - e.originalEvent.touches[0].pageX), 2) + Math.pow((e.originalEvent.touches[1].pageY - e.originalEvent.touches[0].pageY), 2));

                        if (Math.abs(pinchDist - self.previousPinchDist) > 15) {
                            var coord = self.mapPagePositionToXY(self.zoomCenterX, self.zoomCenterY);
                            zoomLevel = (pinchDist - self.previousPinchDist) / Math.abs(pinchDist - self.previousPinchDist);
                            self.$container.trigger("zoom", {
                                "fixedCenter": true,
                                "level": self.zoomData.zoomLevel + zoomLevel,
                                "x": coord.x,
                                "y": coord.y
                            });
                            self.previousPinchDist = pinchDist;
                        }
                        return false;
                    }
                });
            }

            // When the user drag the map, prevent to move the clicked element instead of dragging the map (behaviour seen with Firefox)
            self.$map.on("dragstart", function() {
                return false;
            });

            // Panning
            $("body").on("mouseup." + pluginName + (zoomOptions.touch ? " touchend." + pluginName : ""), function () {
                mousedown = false;
                setTimeout(function () {
                    self.panning = false;
                }, 50);
            });

            self.$map.on("mousedown." + pluginName + (zoomOptions.touch ? " touchstart." + pluginName : ""), function (e) {
                if (e.pageX !== undefined) {
                    mousedown = true;
                    previousX = e.pageX;
                    previousY = e.pageY;
                } else {
                    if (e.originalEvent.touches.length === 1) {
                        mousedown = true;
                        previousX = e.originalEvent.touches[0].pageX;
                        previousY = e.originalEvent.touches[0].pageY;
                    }
                }
            }).on("mousemove." + pluginName + (zoomOptions.touch ? " touchmove." + pluginName : ""), function (e) {
                var currentLevel = self.zoomData.zoomLevel;
                var pageX = 0;
                var pageY = 0;

                if (e.pageX !== undefined) {
                    pageX = e.pageX;
                    pageY = e.pageY;
                } else {
                    if (e.originalEvent.touches.length === 1) {
                        pageX = e.originalEvent.touches[0].pageX;
                        pageY = e.originalEvent.touches[0].pageY;
                    } else {
                        mousedown = false;
                    }
                }

                if (mousedown && currentLevel !== 0) {
                    var offsetX = (previousX - pageX) / (1 + (currentLevel * zoomOptions.step)) * (mapWidth / self.paper.width);
                    var offsetY = (previousY - pageY) / (1 + (currentLevel * zoomOptions.step)) * (mapHeight / self.paper.height);
                    var panX = Math.min(Math.max(0, self.paper._viewBox[0] + offsetX), (mapWidth - self.paper._viewBox[2]));
                    var panY = Math.min(Math.max(0, self.paper._viewBox[1] + offsetY), (mapHeight - self.paper._viewBox[3]));

                    if (Math.abs(offsetX) > 5 || Math.abs(offsetY) > 5) {
                        $.extend(self.zoomData, {
                            panX: panX,
                            panY: panY,
                            zoomX: panX + self.paper._viewBox[2] / 2,
                            zoomY: panY + self.paper._viewBox[3] / 2
                        });
                        self.paper.setViewBox(panX, panY, self.paper._viewBox[2], self.paper._viewBox[3]);

                        clearTimeout(self.panningTO);
                        self.panningTO = setTimeout(function () {
                            self.$map.trigger("afterPanning", {
                                x1: panX,
                                y1: panY,
                                x2: (panX + self.paper._viewBox[2]),
                                y2: (panY + self.paper._viewBox[3])
                            });
                        }, 150);

                        previousX = pageX;
                        previousY = pageY;
                        self.panning = true;
                    }
                    return false;
                }
            });
        },

        /*
         * Map a mouse position to a map position
         *      Transformation principle:
         *          ** start with (pageX, pageY) absolute mouse coordinate
         *          - Apply translation: take into accounts the map offset in the page
         *          ** from this point, we have relative mouse coordinate
         *          - Apply homothetic transformation: take into accounts initial factor of map sizing (fullWidth / actualWidth)
         *          - Apply homothetic transformation: take into accounts the zoom factor
         *          ** from this point, we have relative map coordinate
         *          - Apply translation: take into accounts the current panning of the map
         *          ** from this point, we have absolute map coordinate
         * @param pageX: mouse client coordinate on X
         * @param pageY: mouse client coordinate on Y
         * @return map coordinate {x, y}
         */
        mapPagePositionToXY: function(pageX, pageY) {
            var self = this;
            var offset = self.$map.offset();
            var initFactor = (self.options.map.width) ? (self.mapConf.width / self.options.map.width) : (self.mapConf.width / self.$map.width());
            var zoomFactor = 1 / (1 + (self.zoomData.zoomLevel * self.options.map.zoom.step));
            return {
                x: (zoomFactor * initFactor * (pageX - offset.left)) + self.zoomData.panX,
                y: (zoomFactor * initFactor * (pageY - offset.top)) + self.zoomData.panY
            };
        },

        /*
         * Zoom on the map at a specific level focused on specific coordinates
         * If no coordinates are specified, the zoom will be focused on the center of the map
         * options :
         *    "level" : level of the zoom between minLevel and maxLevel
         *    "x" or "latitude" : x coordinate or latitude of the point to focus on
         *    "y" or "longitude" : y coordinate or longitude of the point to focus on
         *    "fixedCenter" : set to true in order to preserve the position of x,y in the canvas when zoomed
         *    "animDuration" : zoom duration
         */
        onZoomEvent: function (e, zoomOptions) {
            var self = this;
            var newLevel = self.zoomData.zoomLevel;
            var panX = 0;
            var panY = 0;
            var previousZoomLevel = (1 + self.zoomData.zoomLevel * self.options.map.zoom.step);
            var zoomLevel = 0;
            var animDuration = (zoomOptions.animDuration !== undefined) ? zoomOptions.animDuration : self.options.map.zoom.animDuration;
            var offsetX = 0;
            var offsetY = 0;
            var coords = {};

            // Get user defined zoom level
            if (zoomOptions.level !== undefined) {
                if (typeof zoomOptions.level === "string") {
                    // level is a string, either "n", "+n" or "-n"
                    if ((zoomOptions.level.slice(0, 1) === '+') || (zoomOptions.level.slice(0, 1) === '-')) {
                        // zoomLevel is relative
                        newLevel = self.zoomData.zoomLevel + parseInt(zoomOptions.level);
                    } else {
                        // zoomLevel is absolute
                        newLevel = parseInt(zoomOptions.level);
                    }
                } else {
                    // level is integer
                    if (zoomOptions.level < 0) {
                        // zoomLevel is relative
                        newLevel = self.zoomData.zoomLevel + zoomOptions.level;
                    } else {
                        // zoomLevel is absolute
                        newLevel = zoomOptions.level;
                    }
                }
                // Make sure we stay in the boundaries
                newLevel = Math.min(Math.max(newLevel, self.options.map.zoom.minLevel), self.options.map.zoom.maxLevel);
            }

            zoomLevel = (1 + newLevel * self.options.map.zoom.step);

            if (zoomOptions.latitude !== undefined && zoomOptions.longitude !== undefined) {
                coords = self.mapConf.getCoords(zoomOptions.latitude, zoomOptions.longitude);
                zoomOptions.x = coords.x;
                zoomOptions.y = coords.y;
            }

            if (zoomOptions.x === undefined)
                zoomOptions.x = self.paper._viewBox[0] + self.paper._viewBox[2] / 2;

            if (zoomOptions.y === undefined)
                zoomOptions.y = (self.paper._viewBox[1] + self.paper._viewBox[3] / 2);

            if (newLevel === 0) {
                panX = 0;
                panY = 0;
            } else if (zoomOptions.fixedCenter !== undefined && zoomOptions.fixedCenter === true) {
                offsetX = self.zoomData.panX + ((zoomOptions.x - self.zoomData.panX) * (zoomLevel - previousZoomLevel)) / zoomLevel;
                offsetY = self.zoomData.panY + ((zoomOptions.y - self.zoomData.panY) * (zoomLevel - previousZoomLevel)) / zoomLevel;

                panX = Math.min(Math.max(0, offsetX), (self.mapConf.width - (self.mapConf.width / zoomLevel)));
                panY = Math.min(Math.max(0, offsetY), (self.mapConf.height - (self.mapConf.height / zoomLevel)));
            } else {
                panX = Math.min(Math.max(0, zoomOptions.x - (self.mapConf.width / zoomLevel) / 2), (self.mapConf.width - (self.mapConf.width / zoomLevel)));
                panY = Math.min(Math.max(0, zoomOptions.y - (self.mapConf.height / zoomLevel) / 2), (self.mapConf.height - (self.mapConf.height / zoomLevel)));
            }

            // Update zoom level of the map
            if (zoomLevel == previousZoomLevel && panX == self.zoomData.panX && panY == self.zoomData.panY) return;

            if (animDuration > 0) {
                self.animateViewBox(panX, panY, self.mapConf.width / zoomLevel, self.mapConf.height / zoomLevel, animDuration, self.options.map.zoom.animEasing);
            } else {
                self.paper.setViewBox(panX, panY, self.mapConf.width / zoomLevel, self.mapConf.height / zoomLevel);
                clearTimeout(self.zoomTO);
                self.zoomTO = setTimeout(function () {
                    self.$map.trigger("afterZoom", {
                        x1: panX,
                        y1: panY,
                        x2: (panX + (self.mapConf.width / zoomLevel)),
                        y2: (panY + (self.mapConf.height / zoomLevel))
                    });
                }, 150);
            }

            $.extend(self.zoomData, {
                zoomLevel: newLevel,
                panX: panX,
                panY: panY,
                zoomX: panX + self.paper._viewBox[2] / 2,
                zoomY: panY + self.paper._viewBox[3] / 2
            });
        },

        /*
         * Show some element in range defined by user
         * Triggered by user $(".mapcontainer").trigger("showElementsInRange", [opt]);
         *
         * @param opt the options
         *  opt.hiddenOpacity opacity for hidden element (default = 0.3)
         *  opt.animDuration animation duration in ms (default = 0)
         *  opt.afterShowRange callback
         *  opt.ranges the range to show:
         *  Example:
         *  opt.ranges = {
         *      'plot' : {
         *          0 : {                        // valueIndex
         *              'min': 1000,
         *              'max': 1200
         *          },
         *          1 : {                        // valueIndex
         *              'min': 10,
         *              'max': 12
         *          }
         *      },
         *      'area' : {
         *          {'min': 10, 'max': 20}    // No valueIndex, only an object, use 0 as valueIndex (easy case)
         *      }
         *  }
         */
        onShowElementsInRange: function(e, opt) {
            var self = this;

            // set animDuration to default if not defined
            if (opt.animDuration === undefined) {
                opt.animDuration = 0;
            }

            // set hiddenOpacity to default if not defined
            if (opt.hiddenOpacity === undefined) {
                opt.hiddenOpacity = 0.3;
            }

            // handle area
            if (opt.ranges && opt.ranges.area) {
                self.showElemByRange(opt.ranges.area, self.areas, opt.hiddenOpacity, opt.animDuration);
            }

            // handle plot
            if (opt.ranges && opt.ranges.plot) {
                self.showElemByRange(opt.ranges.plot, self.plots, opt.hiddenOpacity, opt.animDuration);
            }

            // handle link
            if (opt.ranges && opt.ranges.link) {
                self.showElemByRange(opt.ranges.link, self.links, opt.hiddenOpacity, opt.animDuration);
            }

            // Call user callback
            if (opt.afterShowRange) opt.afterShowRange();
        },

        /*
         * Show some element in range
         * @param ranges: the ranges
         * @param elems: list of element on which to check against previous range
         * @hiddenOpacity: the opacity when hidden
         * @animDuration: the animation duration
         */
        showElemByRange: function(ranges, elems, hiddenOpacity, animDuration) {
            var self = this;
            // Hold the final opacity value for all elements consolidated after applying each ranges
            // This allow to set the opacity only once for each elements
            var elemsFinalOpacity = {};

            // set object with one valueIndex to 0 if we have directly the min/max
            if (ranges.min !== undefined || ranges.max !== undefined) {
                ranges = {0: ranges};
            }

            // Loop through each valueIndex
            $.each(ranges, function (valueIndex) {
                var range = ranges[valueIndex];
                // Check if user defined at least a min or max value
                if (range.min === undefined && range.max === undefined) {
                    return true; // skip this iteration (each loop), goto next range
                }
                // Loop through each elements
                $.each(elems, function (id) {
                    var elemValue = elems[id].value;
                    // set value with one valueIndex to 0 if not object
                    if (typeof elemValue !== "object") {
                        elemValue = [elemValue];
                    }
                    // Check existence of this value index
                    if (elemValue[valueIndex] === undefined) {
                        return true; // skip this iteration (each loop), goto next element
                    }
                    // Check if in range
                    if ((range.min !== undefined && elemValue[valueIndex] < range.min) ||
                        (range.max !== undefined && elemValue[valueIndex] > range.max)) {
                        // Element not in range
                        elemsFinalOpacity[id] = hiddenOpacity;
                    } else {
                        // Element in range
                        elemsFinalOpacity[id] = 1;
                    }
                });
            });
            // Now that we looped through all ranges, we can really assign the final opacity
            $.each(elemsFinalOpacity, function (id) {
                self.setElementOpacity(elems[id], elemsFinalOpacity[id], animDuration);
            });
        },

        /*
         * Set element opacity
         * Handle elem.mapElem and elem.textElem
         * @param elem the element
         * @param opacity the opacity to apply
         * @param animDuration the animation duration to use
         */
        setElementOpacity: function(elem, opacity, animDuration) {
            // Ensure no animation is running
            //elem.mapElem.stop();
            //if (elem.textElem) elem.textElem.stop();

            // If final opacity is not null, ensure element is shown before proceeding
            if (opacity > 0) {
                elem.mapElem.show();
                if (elem.textElem) elem.textElem.show();
            }
            if (animDuration > 0) {
                // Animate attribute
                elem.mapElem.animate({"opacity": opacity}, animDuration, "linear", function () {
                    // If final attribute is 0, hide
                    if (opacity === 0) elem.mapElem.hide();
                });
                // Handle text element
                if (elem.textElem) {
                    // Animate attribute
                    elem.textElem.animate({"opacity": opacity}, animDuration, "linear", function () {
                        // If final attribute is 0, hide
                        if (opacity === 0) elem.textElem.hide();
                    });
                }
            } else {
                // Set attribute
                elem.mapElem.attr({"opacity": opacity});
                // For null opacity, hide it
                if (opacity === 0) elem.mapElem.hide();
                // Handle text elemen
                if (elem.textElem) {
                    // Set attribute
                    elem.textElem.attr({"opacity": opacity});
                    // For null opacity, hide it
                    if (opacity === 0) elem.textElem.hide();
                }
            }
        },

        /*
         *
         * Update the current map
         * Refresh attributes and tooltips for areas and plots
         * @param opt option for the refresh :
         *  opt.mapOptions: options to update for plots and areas
         *  opt.replaceOptions: whether mapsOptions should entirely replace current map options, or just extend it
         *  opt.opt.newPlots new plots to add to the map
         *  opt.newLinks new links to add to the map
         *  opt.deletePlotKeys plots to delete from the map (array, or "all" to remove all plots)
         *  opt.deleteLinkKeys links to remove from the map (array, or "all" to remove all links)
         *  opt.setLegendElemsState the state of legend elements to be set : show (default) or hide
         *  opt.animDuration animation duration in ms (default = 0)
         *  opt.afterUpdate Hook that allows to add custom processing on the map
         */
        onUpdateEvent: function (e, opt) {
            var self = this;
            // Abort if opt is undefined
            if (typeof opt !== "object")  return;

            var i = 0;
            var animDuration = (opt.animDuration) ? opt.animDuration : 0;

            // This function remove an element using animation (or not, depending on animDuration)
            // Used for deletePlotKeys and deleteLinkKeys
            var fnRemoveElement = function (elem) {
                // Unset all event handlers
                self.unsetHover(elem.mapElem, elem.textElem);
                if (animDuration > 0) {
                    elem.mapElem.animate({"opacity": 0}, animDuration, "linear", function () {
                        elem.mapElem.remove();
                    });
                    if (elem.textElem) {
                        elem.textElem.animate({"opacity": 0}, animDuration, "linear", function () {
                            elem.textElem.remove();
                        });
                    }
                } else {
                    elem.mapElem.remove();
                    if (elem.textElem) {
                        elem.textElem.remove();
                    }
                }
            };

            // This function show an element using animation
            // Used for newPlots and newLinks
            var fnShowElement = function (elem) {
                // Starts with hidden elements
                elem.mapElem.attr({opacity: 0});
                if (elem.textElem) elem.textElem.attr({opacity: 0});
                // Set final element opacity
                self.setElementOpacity(
                    elem,
                    (elem.mapElem.originalAttrs.opacity !== undefined) ? elem.mapElem.originalAttrs.opacity : 1,
                    animDuration
                );
            };

            if (typeof opt.mapOptions === "object") {
                if (opt.replaceOptions === true) self.options = self.extendDefaultOptions(opt.mapOptions);
                else $.extend(true, self.options, opt.mapOptions);

                // IF we update areas, plots or legend, then reset all legend state to "show"
                if (opt.mapOptions.areas !== undefined || opt.mapOptions.plots !== undefined || opt.mapOptions.legend !== undefined) {
                    $("[data-type='elem']", self.$container).each(function (id, elem) {
                        if ($(elem).attr('data-hidden') === "1") {
                            // Toggle state of element by clicking
                            $(elem).trigger("click", [false, animDuration]);
                        }
                    });
                }
            }

            // Delete plots by name if deletePlotKeys is array
            if (typeof opt.deletePlotKeys === "object") {
                for (; i < opt.deletePlotKeys.length; i++) {
                    if (self.plots[opt.deletePlotKeys[i]] !== undefined) {
                        fnRemoveElement(self.plots[opt.deletePlotKeys[i]]);
                        delete self.plots[opt.deletePlotKeys[i]];
                    }
                }
                // Delete ALL plots if deletePlotKeys is set to "all"
            } else if (opt.deletePlotKeys === "all") {
                $.each(self.plots, function (id, elem) {
                    fnRemoveElement(elem);
                });
                // Empty plots object
                self.plots = {};
            }

            // Delete links by name if deleteLinkKeys is array
            if (typeof opt.deleteLinkKeys === "object") {
                for (i = 0; i < opt.deleteLinkKeys.length; i++) {
                    if (self.links[opt.deleteLinkKeys[i]] !== undefined) {
                        fnRemoveElement(self.links[opt.deleteLinkKeys[i]]);
                        delete self.links[opt.deleteLinkKeys[i]];
                    }
                }
                // Delete ALL links if deleteLinkKeys is set to "all"
            } else if (opt.deleteLinkKeys === "all") {
                $.each(self.links, function (id, elem) {
                    fnRemoveElement(elem);
                });
                // Empty links object
                self.links = {};
            }

            // New plots
            if (typeof opt.newPlots === "object") {
                $.each(opt.newPlots, function (id) {
                    if (self.plots[id] === undefined) {
                        self.options.plots[id] = opt.newPlots[id];
                        self.plots[id] = self.drawPlot(id);
                        if (animDuration > 0) {
                            fnShowElement(self.plots[id]);
                        }
                    }
                });
            }

            // New links
            if (typeof opt.newLinks === "object") {
                var newLinks = self.drawLinksCollection(opt.newLinks);
                $.extend(self.links, newLinks);
                $.extend(self.options.links, opt.newLinks);
                if (animDuration > 0) {
                    $.each(newLinks, function (id) {
                        fnShowElement(newLinks[id]);
                    });
                }
            }

            // Update areas attributes and tooltips
            $.each(self.areas, function (id) {
                // Avoid updating unchanged elements
                if ((typeof opt.mapOptions === "object" &&
                    (
                        (typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultArea === "object")
                        || (typeof opt.mapOptions.areas === "object" && typeof opt.mapOptions.areas[id] === "object")
                        || (typeof opt.mapOptions.legend === "object" && typeof opt.mapOptions.legend.area === "object")
                    ))
                    || opt.replaceOptions === true
                ) {
                    var elemOptions = self.getElemOptions(
                        self.options.map.defaultArea,
                        (self.options.areas[id] ? self.options.areas[id] : {}),
                        self.options.legend.area
                    );
                    self.updateElem(elemOptions, self.areas[id], animDuration);
                }
            });

            // Update plots attributes and tooltips
            $.each(self.plots, function (id) {
                // Avoid updating unchanged elements
                if ((typeof opt.mapOptions ==="object" &&
                    (
                        (typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultPlot === "object")
                        || (typeof opt.mapOptions.plots === "object" && typeof opt.mapOptions.plots[id] === "object")
                        || (typeof opt.mapOptions.legend === "object" && typeof opt.mapOptions.legend.plot === "object")
                    ))
                    || opt.replaceOptions === true
                ) {
                    var elemOptions = self.getElemOptions(
                        self.options.map.defaultPlot,
                        (self.options.plots[id] ? self.options.plots[id] : {}),
                        self.options.legend.plot
                    );
                    if (elemOptions.type == "square") {
                        elemOptions.attrs.width = elemOptions.size;
                        elemOptions.attrs.height = elemOptions.size;
                        elemOptions.attrs.x = self.plots[id].mapElem.attrs.x - (elemOptions.size - self.plots[id].mapElem.attrs.width) / 2;
                        elemOptions.attrs.y = self.plots[id].mapElem.attrs.y - (elemOptions.size - self.plots[id].mapElem.attrs.height) / 2;
                    } else if (elemOptions.type == "image") {
                        elemOptions.attrs.width = elemOptions.width;
                        elemOptions.attrs.height = elemOptions.height;
                        elemOptions.attrs.x = self.plots[id].mapElem.attrs.x - (elemOptions.width - self.plots[id].mapElem.attrs.width) / 2;
                        elemOptions.attrs.y = self.plots[id].mapElem.attrs.y - (elemOptions.height - self.plots[id].mapElem.attrs.height) / 2;
                    } else if (elemOptions.type == "svg") {
                        if (elemOptions.attrs.transform !== undefined) {
                            elemOptions.attrs.transform = self.plots[id].mapElem.baseTransform + elemOptions.attrs.transform;
                        }
                    }else { // Default : circle
                        elemOptions.attrs.r = elemOptions.size / 2;
                    }

                    self.updateElem(elemOptions, self.plots[id], animDuration);
                }
            });

            // Update links attributes and tooltips
            $.each(self.links, function (id) {
                // Avoid updating unchanged elements
                if ((typeof opt.mapOptions === "object" &&
                    (
                        (typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultLink === "object")
                        || (typeof opt.mapOptions.links === "object" && typeof opt.mapOptions.links[id] === "object")
                    ))
                    || opt.replaceOptions === true
                ) {
                    var elemOptions = self.getElemOptions(
                        self.options.map.defaultLink,
                        (self.options.links[id] ? self.options.links[id] : {}),
                        {}
                    );

                    self.updateElem(elemOptions, self.links[id], animDuration);
                }
            });

            // Update legends
            if (opt.mapOptions && (
                    (typeof opt.mapOptions.legend === "object")
                    || (typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultArea === "object")
                    || (typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultPlot === "object")
                )) {
                // Show all elements on the map before updating the legends
                $("[data-type='elem']", self.$container).each(function (id, elem) {
                    if ($(elem).attr('data-hidden') === "1") {
                        $(elem).trigger("click", [false, animDuration]);
                    }
                });

                self.createLegends("area", self.areas, 1);
                if (self.options.map.width) {
                    self.createLegends("plot", self.plots, (self.options.map.width / self.mapConf.width));
                } else {
                    self.createLegends("plot", self.plots, (self.$map.width() / self.mapConf.width));
                }
            }

            // Hide/Show all elements based on showlegendElems
            //      Toggle (i.e. click) only if:
            //          - slice legend is shown AND we want to hide
            //          - slice legend is hidden AND we want to show
            if (typeof opt.setLegendElemsState === "object") {
                // setLegendElemsState is an object listing the legend we want to hide/show
                $.each(opt.setLegendElemsState, function (legendCSSClass, action) {
                    // Search for the legend
                    var $legend = self.$container.find("." + legendCSSClass)[0];
                    if ($legend !== undefined) {
                        // Select all elem inside this legend
                        $("[data-type='elem']", $legend).each(function (id, elem) {
                            if (($(elem).attr('data-hidden') === "0" && action === "hide") ||
                                ($(elem).attr('data-hidden') === "1" && action === "show")) {
                                // Toggle state of element by clicking
                                $(elem).trigger("click", [false, animDuration]);
                            }
                        });
                    }
                });
            } else {
                // setLegendElemsState is a string, or is undefined
                // Default : "show"
                var action = (opt.setLegendElemsState === "hide") ? "hide" : "show";

                $("[data-type='elem']", self.$container).each(function (id, elem) {
                    if (($(elem).attr('data-hidden') === "0" && action === "hide") ||
                        ($(elem).attr('data-hidden') === "1" && action === "show")) {
                        // Toggle state of element by clicking
                        $(elem).trigger("click", [false, animDuration]);
                    }
                });
            }
            if (opt.afterUpdate) opt.afterUpdate(self.$container, self.paper, self.areas, self.plots, self.options);
        },

        /*
         * Draw all links between plots on the paper
         */
        drawLinksCollection: function (linksCollection) {
            var self = this;
            var p1 = {};
            var p2 = {};
            var coordsP1 = {};
            var coordsP2 = {};
            var links = {};

            $.each(linksCollection, function (id) {
                var elemOptions = self.getElemOptions(self.options.map.defaultLink, linksCollection[id], {});

                if (typeof linksCollection[id].between[0] == 'string') {
                    p1 = self.options.plots[linksCollection[id].between[0]];
                } else {
                    p1 = linksCollection[id].between[0];
                }

                if (typeof linksCollection[id].between[1] == 'string') {
                    p2 = self.options.plots[linksCollection[id].between[1]];
                } else {
                    p2 = linksCollection[id].between[1];
                }

                if (p1.latitude !== undefined && p1.longitude !== undefined) {
                    coordsP1 = self.mapConf.getCoords(p1.latitude, p1.longitude);
                } else {
                    coordsP1.x = p1.x;
                    coordsP1.y = p1.y;
                }

                if (p2.latitude !== undefined && p2.longitude !== undefined) {
                    coordsP2 = self.mapConf.getCoords(p2.latitude, p2.longitude);
                } else {
                    coordsP2.x = p2.x;
                    coordsP2.y = p2.y;
                }
                links[id] = self.drawLink(id, coordsP1.x, coordsP1.y, coordsP2.x, coordsP2.y, elemOptions);
            });
            return links;
        },

        /*
         * Draw a curved link between two couples of coordinates a(xa,ya) and b(xb, yb) on the paper
         */
        drawLink: function (id, xa, ya, xb, yb, elemOptions) {
            var self = this;
            var elem = {};
            // Compute the "curveto" SVG point, d(x,y)
            // c(xc, yc) is the center of (xa,ya) and (xb, yb)
            var xc = (xa + xb) / 2;
            var yc = (ya + yb) / 2;

            // Equation for (cd) : y = acd * x + bcd (d is the cure point)
            var acd = -1 / ((yb - ya) / (xb - xa));
            var bcd = yc - acd * xc;

            // dist(c,d) = dist(a,b) (=abDist)
            var abDist = Math.sqrt((xb - xa) * (xb - xa) + (yb - ya) * (yb - ya));

            // Solution for equation dist(cd) = sqrt((xd - xc)² + (yd - yc)²)
            // dist(c,d)² = (xd - xc)² + (yd - yc)²
            // We assume that dist(c,d) = dist(a,b)
            // so : (xd - xc)² + (yd - yc)² - dist(a,b)² = 0
            // With the factor : (xd - xc)² + (yd - yc)² - (factor*dist(a,b))² = 0
            // (xd - xc)² + (acd*xd + bcd - yc)² - (factor*dist(a,b))² = 0
            var a = 1 + acd * acd;
            var b = -2 * xc + 2 * acd * bcd - 2 * acd * yc;
            var c = xc * xc + bcd * bcd - bcd * yc - yc * bcd + yc * yc - ((elemOptions.factor * abDist) * (elemOptions.factor * abDist));
            var delta = b * b - 4 * a * c;
            var x = 0;
            var y = 0;

            // There are two solutions, we choose one or the other depending on the sign of the factor
            if (elemOptions.factor > 0) {
                x = (-b + Math.sqrt(delta)) / (2 * a);
                y = acd * x + bcd;
            } else {
                x = (-b - Math.sqrt(delta)) / (2 * a);
                y = acd * x + bcd;
            }

            elem.mapElem = self.paper.path("m " + xa + "," + ya + " C " + x + "," + y + " " + xb + "," + yb + " " + xb + "," + yb + "").attr(elemOptions.attrs);
            self.initElem(elem, elemOptions, id);

            return elem;
        },

        /*
         * Check wether newAttrs object bring modifications to originalAttrs object
         */
        isAttrsChanged: function(originalAttrs, newAttrs) {
            for (var key in newAttrs) {
                if (typeof originalAttrs[key] === 'undefined' || newAttrs[key] !== originalAttrs[key]) {
                    return true;
                }
            }
            return false;
        },

        /*
         * Update the element "elem" on the map with the new elemOptions options
         */
        updateElem: function (elemOptions, elem, animDuration) {
            var self = this;
            var bbox;
            var textPosition;
            var plotOffsetX;
            var plotOffsetY;

            if (elemOptions.value !== undefined)
                elem.value = elemOptions.value;

            if (elemOptions.toFront === true) {
                elem.mapElem.toFront();
            }

            // Update the label
            if (elem.textElem) {
                if (elemOptions.text !== undefined && elemOptions.text.content !== undefined && elemOptions.text.content != elem.textElem.attrs.text)
                    elem.textElem.attr({text: elemOptions.text.content});

                bbox = elem.mapElem.getBBox();

                if (elemOptions.size || (elemOptions.width && elemOptions.height)) {
                    if (elemOptions.type == "image" || elemOptions.type == "svg") {
                        plotOffsetX = (elemOptions.width - bbox.width) / 2;
                        plotOffsetY = (elemOptions.height - bbox.height) / 2;
                    } else {
                        plotOffsetX = (elemOptions.size - bbox.width) / 2;
                        plotOffsetY = (elemOptions.size - bbox.height) / 2;
                    }
                    bbox.x -= plotOffsetX;
                    bbox.x2 += plotOffsetX;
                    bbox.y -= plotOffsetY;
                    bbox.y2 += plotOffsetY;
                }

                textPosition = self.getTextPosition(bbox, elemOptions.text.position, elemOptions.text.margin);
                if (textPosition.x != elem.textElem.attrs.x || textPosition.y != elem.textElem.attrs.y) {
                    if (animDuration > 0) {
                        elem.textElem.attr({"text-anchor": textPosition.textAnchor});
                        elem.textElem.animate({x: textPosition.x, y: textPosition.y}, animDuration);
                    } else
                        elem.textElem.attr({
                            x: textPosition.x,
                            y: textPosition.y,
                            "text-anchor": textPosition.textAnchor
                        });
                }

                self.setHoverOptions(elem.textElem, elemOptions.text.attrs, elemOptions.text.attrsHover);
                if (animDuration > 0)
                    elem.textElem.animate(elemOptions.text.attrs, animDuration);
                else
                    elem.textElem.attr(elemOptions.text.attrs);
            }

            // Update elements attrs and attrsHover
            self.setHoverOptions(elem.mapElem, elemOptions.attrs, elemOptions.attrsHover);

            if (self.isAttrsChanged(elem.mapElem.attrs, elemOptions.attrs)) {
                if (animDuration > 0)
                    elem.mapElem.animate(elemOptions.attrs, animDuration);
                else
                    elem.mapElem.attr(elemOptions.attrs);
            }

            // Update dimensions of SVG plots
            if (elemOptions.type == "svg") {

                if (bbox === undefined) {
                    bbox = elem.mapElem.getBBox();
                }
                elem.mapElem.transform("m" + (elemOptions.width / elem.mapElem.originalWidth) + ",0,0," + (elemOptions.height / elem.mapElem.originalHeight) + "," + bbox.x + "," + bbox.y);
            }

            // Update the tooltip
            if (elemOptions.tooltip) {
                if (elem.mapElem.tooltip === undefined) {
                    self.setTooltip(elem.mapElem);
                    if (elem.textElem) self.setTooltip(elem.textElem);
                }
                elem.mapElem.tooltip = elemOptions.tooltip;
                if (elem.textElem) elem.textElem.tooltip = elemOptions.tooltip;
            }

            // Update the link
            if (elemOptions.href !== undefined) {
                if (elem.mapElem.href === undefined) {
                    self.setHref(elem.mapElem);
                    if (elem.textElem) self.setHref(elem.textElem);
                }
                elem.mapElem.href = elemOptions.href;
                elem.mapElem.target = elemOptions.target;
                if (elem.textElem) {
                    elem.textElem.href = elemOptions.href;
                    elem.textElem.target = elemOptions.target;
                }
            }
        },

        /*
         * Draw the plot
         */
        drawPlot: function (id) {
            var self = this;
            var plot = {};
            var coords = {};
            var elemOptions = self.getElemOptions(
                self.options.map.defaultPlot,
                (self.options.plots[id] ? self.options.plots[id] : {}),
                self.options.legend.plot
            );

            if (elemOptions.x !== undefined && elemOptions.y !== undefined)
                coords = {x: elemOptions.x, y: elemOptions.y};
            else if (elemOptions.plotsOn !== undefined && self.areas[elemOptions.plotsOn].mapElem !== undefined){
                var path = self.areas[elemOptions.plotsOn].mapElem;
                var bbox = path.getBBox();
                var _x = Math.floor(bbox.x + bbox.width/2.0);
                var _y = Math.floor(bbox.y + bbox.height/2.0);
                coords = {x: _x, y: _y};
            }
            else
                coords = self.mapConf.getCoords(elemOptions.latitude, elemOptions.longitude);

            if (elemOptions.type == "square") {
                plot = {
                    "mapElem": self.paper.rect(
                        coords.x - (elemOptions.size / 2),
                        coords.y - (elemOptions.size / 2),
                        elemOptions.size,
                        elemOptions.size
                    ).attr(elemOptions.attrs)
                };
            } else if (elemOptions.type == "image") {
                plot = {
                    "mapElem": self.paper.image(
                        elemOptions.url,
                        coords.x - elemOptions.width / 2,
                        coords.y - elemOptions.height / 2,
                        elemOptions.width,
                        elemOptions.height
                    ).attr(elemOptions.attrs)
                };
            } else if (elemOptions.type == "svg") {
                if (elemOptions.attrs.transform === undefined) {
                    elemOptions.attrs.transform = "";
                }

                plot = {"mapElem": self.paper.path(elemOptions.path)};
                plot.mapElem.originalWidth = plot.mapElem.getBBox().width;
                plot.mapElem.originalHeight = plot.mapElem.getBBox().height;

                plot.mapElem.baseTransform = "m" + (elemOptions.width / plot.mapElem.originalWidth) + ",0,0," + (elemOptions.height / plot.mapElem.originalHeight) + "," + (coords.x - elemOptions.width / 2) + "," + (coords.y - elemOptions.height / 2);
                elemOptions.attrs.transform = plot.mapElem.baseTransform + elemOptions.attrs.transform;
                plot.mapElem.attr(elemOptions.attrs);
            } else { // Default = circle
                plot = {"mapElem": self.paper.circle(coords.x, coords.y, elemOptions.size / 2).attr(elemOptions.attrs)};
            }
            self.initElem(plot, elemOptions, id);
            return plot;
        },

        /*
         * Set target link on elem
         */
        setHref: function (elem) {
            var self = this;
            elem.attr({cursor: "pointer"});
            $(elem.node).on("click." + pluginName, function () {
                if (!self.panning && elem.href)
                    window.open(elem.href, elem.target);
            });
        },

        /*
         * Set a tooltip for the areas and plots
         * @param elem area or plot element
         * @param content the content to set in the tooltip
         */
        setTooltip: function (elem) {
            var self = this;
            var tooltipTO = 0;
            var cssClass = self.$tooltip.attr('class');



            var updateTooltipPosition = function (x, y) {

                var offsetLeft = 10;
                var offsetTop = 20;

                if (typeof elem.tooltip.offset === "object") {
                    if (typeof elem.tooltip.offset.left !== "undefined") {
                        offsetLeft = elem.tooltip.offset.left;
                    }
                    if (typeof elem.tooltip.offset.top !== "undefined") {
                        offsetTop = elem.tooltip.offset.top;
                    }
                }

                var tooltipPosition = {
                    "left": Math.min(self.$map.width() - self.$tooltip.outerWidth() - 5, x - self.$map.offset().left + offsetLeft),
                    "top": Math.min(self.$map.height() - self.$tooltip.outerHeight() - 5, y - self.$map.offset().top + offsetTop)
                };

                if (typeof elem.tooltip.overflow === "object") {
                    if (elem.tooltip.overflow.right === true) {
                        tooltipPosition.left = x - self.$map.offset().left + 10;
                    }
                    if (elem.tooltip.overflow.bottom === true) {
                        tooltipPosition.top = y - self.$map.offset().top + 20;
                    }
                }

                self.$tooltip.css(tooltipPosition);
            };

            $(elem.node).on("mouseover." + pluginName, function (e) {
                tooltipTO = setTimeout(
                    function () {
                        self.$tooltip.attr("class", cssClass);
                        if (elem.tooltip !== undefined) {
                            if (elem.tooltip.content !== undefined) {
                                // if tooltip.content is function, call it. Otherwise, assign it directly.
                                var content = (typeof elem.tooltip.content === "function") ? elem.tooltip.content(elem) : elem.tooltip.content;
                                self.$tooltip.html(content).css("display", "block");
                            }
                            if (elem.tooltip.cssClass !== undefined) {
                                self.$tooltip.addClass(elem.tooltip.cssClass);
                            }
                        }
                        updateTooltipPosition(e.pageX, e.pageY);
                    }, 120
                );
            }).on("mouseout." + pluginName, function () {
                clearTimeout(tooltipTO);
                self.$tooltip.css("display", "none");
            }).on("mousemove." + pluginName, function (e) {
                updateTooltipPosition(e.pageX, e.pageY);
            });
        },

        /*
         * Set user defined handlers for events on areas and plots
         * @param id the id of the element
         * @param elemOptions the element parameters
         * @param mapElem the map element to set callback on
         * @param textElem the optional text within the map element
         */
        setEventHandlers: function (id, elemOptions, mapElem, textElem) {
            var self = this;
            $.each(elemOptions.eventHandlers, function (event) {
                (function (event) {
                    $(mapElem.node).on(event, function (e) {
                        if (!self.panning) elemOptions.eventHandlers[event](e, id, mapElem, textElem, elemOptions);
                    });
                    if (textElem) {
                        $(textElem.node).on(event, function (e) {
                            if (!self.panning) elemOptions.eventHandlers[event](e, id, mapElem, textElem, elemOptions);
                        });
                    }
                })(event);
            });
        },

        /*
         * Draw a legend for areas and / or plots
         * @param legendOptions options for the legend to draw
         * @param legendType the type of the legend : "area" or "plot"
         * @param elems collection of plots or areas on the maps
         * @param legendIndex index of the legend in the conf array
         */
        drawLegend: function (legendOptions, legendType, elems, scale, legendIndex) {
            var self = this;
            var $legend = {};
            var legendPaper = {};
            var width = 0;
            var height = 0;
            var title = null;
            var elem = {};
            var elemBBox = {};
            var label = {};
            var i = 0;
            var x = 0;
            var y = 0;
            var yCenter = 0;
            var sliceOptions = [];
            var length = 0;

            $legend = $("." + legendOptions.cssClass, self.$container);

            if (typeof self.createdLegends[legendOptions.cssClass] ==='undefined') {
                self.createdLegends[legendOptions.cssClass] = {
                    container: $legend,
                    initialHTMLContent: $legend.html()
                };
            }

            $legend.empty();

            legendPaper = new Raphael($legend.get(0));
            // Set some data to object
            $(legendPaper.canvas).attr({"data-type": legendType, "data-index": legendIndex});

            height = width = 0;

            // Set the title of the legend
            if (legendOptions.title && legendOptions.title !== "") {
                title = legendPaper.text(legendOptions.marginLeftTitle, 0, legendOptions.title).attr(legendOptions.titleAttrs);
                title.attr("class", legendOptions.titleAttrs.cssClass);
                title.attr({y: 0.5 * title.getBBox().height});

                width = legendOptions.marginLeftTitle + title.getBBox().width;
                height += legendOptions.marginBottomTitle + title.getBBox().height;
            }

            // Calculate attrs (and width, height and r (radius)) for legend elements, and yCenter for horizontal legends

            for (i = 0, length = legendOptions.slices.length; i < length; ++i) {
                var yCenterCurrent = 0;

                sliceOptions[i] = $.extend(true, {}, (legendType == "plot") ? self.options.map.defaultPlot : self.options.map.defaultArea, legendOptions.slices[i]);

                if (legendOptions.slices[i].legendSpecificAttrs === undefined) {
                    legendOptions.slices[i].legendSpecificAttrs = {};
                }

                $.extend(true, sliceOptions[i].attrs, legendOptions.slices[i].legendSpecificAttrs);

                if (legendType == "area") {
                    if (sliceOptions[i].attrs.width === undefined)
                        sliceOptions[i].attrs.width = 30;
                    if (sliceOptions[i].attrs.height === undefined)
                        sliceOptions[i].attrs.height = 20;
                } else if (sliceOptions[i].type == "square") {
                    if (sliceOptions[i].attrs.width === undefined)
                        sliceOptions[i].attrs.width = sliceOptions[i].size;
                    if (sliceOptions[i].attrs.height === undefined)
                        sliceOptions[i].attrs.height = sliceOptions[i].size;
                } else if (sliceOptions[i].type == "image" || sliceOptions[i].type == "svg") {
                    if (sliceOptions[i].attrs.width === undefined)
                        sliceOptions[i].attrs.width = sliceOptions[i].width;
                    if (sliceOptions[i].attrs.height === undefined)
                        sliceOptions[i].attrs.height = sliceOptions[i].height;
                } else {
                    if (sliceOptions[i].attrs.r === undefined)
                        sliceOptions[i].attrs.r = sliceOptions[i].size / 2;
                }

                // Compute yCenter for this legend slice
                yCenterCurrent = legendOptions.marginBottomTitle;
                // Add title height if it exists
                if (title) {
                    yCenterCurrent += title.getBBox().height;
                }
                if (legendType == "plot" && (sliceOptions[i].type === undefined || sliceOptions[i].type == "circle")) {
                    yCenterCurrent += scale * sliceOptions[i].attrs.r;
                } else {
                    yCenterCurrent += scale * sliceOptions[i].attrs.height / 2;
                }
                // Update yCenter if current larger
                yCenter = Math.max(yCenter, yCenterCurrent);
            }

            if (legendOptions.mode == "horizontal") {
                width = legendOptions.marginLeft;
            }

            // Draw legend elements (circle, square or image in vertical or horizontal mode)
            for (i = 0, length = sliceOptions.length; i < length; ++i) {
                if (sliceOptions[i].display === undefined || sliceOptions[i].display === true) {
                    if (legendType == "area") {
                        if (legendOptions.mode == "horizontal") {
                            x = width + legendOptions.marginLeft;
                            y = yCenter - (0.5 * scale * sliceOptions[i].attrs.height);
                        } else {
                            x = legendOptions.marginLeft;
                            y = height;
                        }

                        elem = legendPaper.rect(x, y, scale * (sliceOptions[i].attrs.width), scale * (sliceOptions[i].attrs.height));
                    } else if (sliceOptions[i].type == "square") {
                        if (legendOptions.mode == "horizontal") {
                            x = width + legendOptions.marginLeft;
                            y = yCenter - (0.5 * scale * sliceOptions[i].attrs.height);
                        } else {
                            x = legendOptions.marginLeft;
                            y = height;
                        }

                        elem = legendPaper.rect(x, y, scale * (sliceOptions[i].attrs.width), scale * (sliceOptions[i].attrs.height));

                    } else if (sliceOptions[i].type == "image" || sliceOptions[i].type == "svg") {
                        if (legendOptions.mode == "horizontal") {
                            x = width + legendOptions.marginLeft;
                            y = yCenter - (0.5 * scale * sliceOptions[i].attrs.height);
                        } else {
                            x = legendOptions.marginLeft;
                            y = height;
                        }

                        if (sliceOptions[i].type == "image") {
                            elem = legendPaper.image(
                                sliceOptions[i].url, x, y, scale * sliceOptions[i].attrs.width, scale * sliceOptions[i].attrs.height);
                        } else {
                            elem = legendPaper.path(sliceOptions[i].path);

                            if (sliceOptions[i].attrs.transform === undefined) {
                                sliceOptions[i].attrs.transform = "";
                            }
                            sliceOptions[i].attrs.transform = "m" + ((scale * sliceOptions[i].width) / elem.getBBox().width) + ",0,0," + ((scale * sliceOptions[i].height) / elem.getBBox().height) + "," + x + "," + y + sliceOptions[i].attrs.transform;
                        }
                    } else {
                        if (legendOptions.mode == "horizontal") {
                            x = width + legendOptions.marginLeft + scale * (sliceOptions[i].attrs.r);
                            y = yCenter;
                        } else {
                            x = legendOptions.marginLeft + scale * (sliceOptions[i].attrs.r);
                            y = height + scale * (sliceOptions[i].attrs.r);
                        }
                        elem = legendPaper.circle(x, y, scale * (sliceOptions[i].attrs.r));
                    }

                    // Set attrs to the element drawn above
                    delete sliceOptions[i].attrs.width;
                    delete sliceOptions[i].attrs.height;
                    delete sliceOptions[i].attrs.r;
                    elem.attr(sliceOptions[i].attrs);
                    elem.attr("class", sliceOptions[i].cssClass);
                    elemBBox = elem.getBBox();

                    // Draw the label associated with the element
                    if (legendOptions.mode == "horizontal") {
                        x = width + legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel;
                        y = yCenter;
                    } else {
                        x = legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel;
                        y = height + (elemBBox.height / 2);
                    }

                    label = legendPaper.text(x, y, sliceOptions[i].label).attr(legendOptions.labelAttrs);
                    label.attr("class", legendOptions.labelAttrs.cssClass);

                    // Update the width and height for the paper
                    if (legendOptions.mode == "horizontal") {
                        var currentHeight = legendOptions.marginBottom + elemBBox.height;
                        width += legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel + label.getBBox().width;
                        if (sliceOptions[i].type != "image" && legendType != "area") {
                            currentHeight += legendOptions.marginBottomTitle;
                        }
                        // Add title height if it exists
                        if (title) {
                            currentHeight += title.getBBox().height;
                        }
                        height = Math.max(height, currentHeight);
                    } else {
                        width = Math.max(width, legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel + label.getBBox().width);
                        height += legendOptions.marginBottom + elemBBox.height;
                    }

                    $(elem.node).attr({"data-type": "elem", "data-index": i, "data-hidden": 0});
                    $(label.node).attr({"data-type": "label", "data-index": i, "data-hidden": 0});

                    // Hide map elements when the user clicks on a legend item
                    if (legendOptions.hideElemsOnClick.enabled) {
                        // Hide/show elements when user clicks on a legend element
                        label.attr({cursor: "pointer"});
                        elem.attr({cursor: "pointer"});

                        self.setHoverOptions(elem, sliceOptions[i].attrs, sliceOptions[i].attrs);
                        self.setHoverOptions(label, legendOptions.labelAttrs, legendOptions.labelAttrsHover);
                        self.setHover(elem, label);
                        self.handleClickOnLegendElem(legendOptions, legendOptions.slices[i], label, elem, elems, legendIndex);
                    }
                }
            }

            // VMLWidth option allows you to set static width for the legend
            // only for VML render because text.getBBox() returns wrong values on IE6/7
            if (Raphael.type != "SVG" && legendOptions.VMLWidth)
                width = legendOptions.VMLWidth;

            legendPaper.setSize(width, height);
        },

        /*
         * Allow to hide elements of the map when the user clicks on a related legend item
         * @param legendOptions options for the legend to draw
         * @param sliceOptions options of the slice
         * @param label label of the legend item
         * @param elem element of the legend item
         * @param elems collection of plots or areas displayed on the map
         * @param legendIndex index of the legend in the conf array
         */
        handleClickOnLegendElem: function (legendOptions, sliceOptions, label, elem, elems, legendIndex) {
            var self = this;

            /**
             *
             * @param e
             * @param hideOtherElems : option used for the 'exclusive' mode to enabled only one item from the legend
             * at once
             * @param animDuration : used in the 'update' event in order to apply the same animDuration on the legend items
             */
            var hideMapElems = function (e, hideOtherElems, animDuration) {
                var elemValue = 0;
                var hidden = $(label.node).attr('data-hidden');
                var hiddenNewAttr = (hidden === '0') ? {"data-hidden": '1'} : {"data-hidden": '0'};

                // Check animDuration: if not set, this is a regular click, use the value specified in options
                if (animDuration === undefined) animDuration = legendOptions.hideElemsOnClick.animDuration;

                if (hidden === '0') {
                    if (animDuration > 0) label.animate({"opacity": 0.5}, animDuration);
                    else label.attr({"opacity": 0.5});
                } else {
                    if (animDuration > 0) label.animate({"opacity": 1}, animDuration);
                    else label.attr({"opacity": 1});
                }

                $.each(elems, function (id) {
                    // Retreive stored data of element
                    //      'hidden-by' contains the list of legendIndex that is hiding this element
                    var hiddenBy = elems[id].mapElem.data('hidden-by');
                    // Set to empty object if undefined
                    if (hiddenBy === undefined) hiddenBy = {};

                    if ($.isArray(elems[id].value)) {
                        elemValue = elems[id].value[legendIndex];
                    } else {
                        elemValue = elems[id].value;
                    }

                    // Hide elements whose value matches with the slice of the clicked legend item
                    if (self.getLegendSlice(elemValue, legendOptions) === sliceOptions) {
                        (function (id) {
                            if (hidden === '0') { // we want to hide this element
                                hiddenBy[legendIndex] = true; // add legendIndex to the data object for later use
                                self.setElementOpacity(elems[id], legendOptions.hideElemsOnClick.opacity, animDuration);
                            } else { // We want to show this element
                                delete hiddenBy[legendIndex]; // Remove this legendIndex from object
                                // Check if another legendIndex is defined
                                // We will show this element only if no legend is no longer hiding it
                                if ($.isEmptyObject(hiddenBy)) {
                                    self.setElementOpacity(
                                        elems[id],
                                        elems[id].mapElem.originalAttrs.opacity !== undefined ? elems[id].mapElem.originalAttrs.opacity : 1,
                                        animDuration
                                    );
                                }
                            }
                            // Update elem data with new values
                            elems[id].mapElem.data('hidden-by', hiddenBy);
                        })(id);
                    }
                });

                $(elem.node).attr(hiddenNewAttr);
                $(label.node).attr(hiddenNewAttr);

                if ((hideOtherElems === undefined || hideOtherElems === true)
                    && legendOptions.exclusive !== undefined && legendOptions.exclusive === true
                ) {
                    $("[data-type='elem'][data-hidden=0]", self.$container).each(function () {
                        if ($(this).attr('data-index') !== $(elem.node).attr('data-index')) {
                            $(this).trigger("click", false);
                        }
                    });
                }
            };
            $(label.node).on("click." + pluginName, hideMapElems);
            $(elem.node).on("click." + pluginName, hideMapElems);

            if (sliceOptions.clicked !== undefined && sliceOptions.clicked === true) {
                $(elem.node).trigger("click", false);
            }
        },

        /*
         * Create all legends for a specified type (area or plot)
         * @param legendType the type of the legend : "area" or "plot"
         * @param elems collection of plots or areas displayed on the map
         * @param scale scale ratio of the map
         */
        createLegends: function (legendType, elems, scale) {
            var self = this;
            var legendsOptions = self.options.legend[legendType];

            if (!$.isArray(self.options.legend[legendType])) {
                legendsOptions = [self.options.legend[legendType]];
            }

            for (var j = 0; j < legendsOptions.length; ++j) {
                // Check for class existence
                if (legendsOptions[j].cssClass === "" || $("." + legendsOptions[j].cssClass, self.$container).length === 0) {
                    throw new Error("The legend class `" + legendsOptions[j].cssClass + "` doesn't exists.");
                }
                if (legendsOptions[j].display === true && $.isArray(legendsOptions[j].slices) && legendsOptions[j].slices.length > 0) {
                    self.drawLegend(legendsOptions[j], legendType, elems, scale, j);
                }
            }
        },

        /*
         * Set the attributes on hover and the attributes to restore for a map element
         * @param elem the map element
         * @param originalAttrs the original attributes to restore on mouseout event
         * @param attrsHover the attributes to set on mouseover event
         */
        setHoverOptions: function (elem, originalAttrs, attrsHover) {
            // Disable transform option on hover for VML (IE<9) because of several bugs
            if (Raphael.type != "SVG") delete attrsHover.transform;
            elem.attrsHover = attrsHover;

            if (elem.attrsHover.transform) elem.originalAttrs = $.extend({transform: "s1"}, originalAttrs);
            else elem.originalAttrs = originalAttrs;
        },

        /*
         * Set the hover behavior (mouseover & mouseout) for plots and areas
         * @param mapElem the map element
         * @param textElem the optional text element (within the map element)
         */
        setHover: function (mapElem, textElem) {
            var self = this;
            var $mapElem = {};
            var $textElem = {};
            var mouseoverTimeout = 0;
            var mouseoutTimeout = 0;
            var overBehaviour = function () {
                clearTimeout(mouseoutTimeout);
                mouseoverTimeout = setTimeout(function () {
                    self.elemHover(mapElem, textElem);
                }, 120);
            };
            var outBehaviour = function () {
                clearTimeout(mouseoverTimeout);
                mouseoutTimeout = setTimeout(function(){
                    self.elemOut(mapElem, textElem);
                }, 120);
            };

            $mapElem = $(mapElem.node);
            $mapElem.on("mouseover." + pluginName, overBehaviour);
            $mapElem.on("mouseout." + pluginName, outBehaviour);

            if (textElem) {
                $textElem = $(textElem.node);
                $textElem.on("mouseover." + pluginName, overBehaviour);
                $(textElem.node).on("mouseout." + pluginName, outBehaviour);
            }
        },

        /*
         * Remove the hover behavior for plots and areas
         * @param mapElem the map element
         * @param textElem the optional text element (within the map element)
         */
        unsetHover: function (mapElem, textElem) {
            $(mapElem.node).off("." + pluginName);
            if (textElem) $(textElem.node).off("." + pluginName);
        },

        /*
         * Set he behaviour for "mouseover" event
         * @param mapElem mapElem the map element
         * @param textElem the optional text element (within the map element)
         */
        elemHover: function (mapElem, textElem) {
            var self = this;
            // Set mapElem
            if (mapElem.attrsHover.animDuration > 0) mapElem.animate(mapElem.attrsHover, mapElem.attrsHover.animDuration);
            else mapElem.attr(mapElem.attrsHover);
            // Set textElem
            if (textElem) {
                if (textElem.attrsHover.animDuration > 0) textElem.animate(textElem.attrsHover, textElem.attrsHover.animDuration);
                else textElem.attr(textElem.attrsHover);
            }
            // workaround for older version of Raphael
            if (self.paper.safari) self.paper.safari();
        },

        /*
         * Set he behaviour for "mouseout" event
         * @param mapElem the map element
         * @param textElem the optional text element (within the map element)
         */
        elemOut: function (mapElem, textElem) {
            var self = this;
            // Set mapElem
            if (mapElem.attrsHover.animDuration > 0) mapElem.animate(mapElem.originalAttrs, mapElem.attrsHover.animDuration);
            else mapElem.attr(mapElem.originalAttrs);
            // Set textElem
            if (textElem) {
                if (textElem.attrsHover.animDuration > 0) textElem.animate(textElem.originalAttrs, textElem.attrsHover.animDuration);
                else textElem.attr(textElem.originalAttrs);
            }

            // workaround for older version of Raphael
            if (self.paper.safari) self.paper.safari();
        },

        /*
         * Get element options by merging default options, element options and legend options
         * @param defaultOptions
         * @param elemOptions
         * @param legendOptions
         */
        getElemOptions: function (defaultOptions, elemOptions, legendOptions) {
            var self = this;
            var options = $.extend(true, {}, defaultOptions, elemOptions);
            if (options.value !== undefined) {
                if ($.isArray(legendOptions)) {
                    for (var i = 0, length = legendOptions.length; i < length; ++i) {
                        options = $.extend(true, {}, options, self.getLegendSlice(options.value[i], legendOptions[i]));
                    }
                } else {
                    options = $.extend(true, {}, options, self.getLegendSlice(options.value, legendOptions));
                }
            }
            return options;
        },

        /*
         * Get the coordinates of the text relative to a bbox and a position
         * @param bbox the boundary box of the element
         * @param textPosition the wanted text position (inner, right, left, top or bottom)
         * @param margin number or object {x: val, y:val} margin between the bbox and the text
         */
        getTextPosition: function (bbox, textPosition, margin) {
            var textX = 0;
            var textY = 0;
            var textAnchor = "";

            if (typeof margin === "number") {
                if (textPosition === "bottom" || textPosition === "top") {
                    margin = {x: 0, y: margin};
                } else if (textPosition === "right" || textPosition === "left") {
                    margin = {x: margin, y: 0};
                } else {
                    margin = {x: 0, y: 0};
                }
            }

            switch (textPosition) {
                case "bottom" :
                    textX = ((bbox.x + bbox.x2) / 2) + margin.x;
                    textY = bbox.y2 + margin.y;
                    textAnchor = "middle";
                    break;
                case "top" :
                    textX = ((bbox.x + bbox.x2) / 2) + margin.x;
                    textY = bbox.y - margin.y;
                    textAnchor = "middle";
                    break;
                case "left" :
                    textX = bbox.x - margin.x;
                    textY = ((bbox.y + bbox.y2) / 2) + margin.y;
                    textAnchor = "end";
                    break;
                case "right" :
                    textX = bbox.x2 + margin.x;
                    textY = ((bbox.y + bbox.y2) / 2) + margin.y;
                    textAnchor = "start";
                    break;
                default : // "inner" position
                    textX = ((bbox.x + bbox.x2) / 2) + margin.x;
                    textY = ((bbox.y + bbox.y2) / 2) + margin.y;
                    textAnchor = "middle";
            }
            return {"x": textX, "y": textY, "textAnchor": textAnchor};
        },

        /*
         * Get the legend conf matching with the value
         * @param value the value to match with a slice in the legend
         * @param legend the legend params object
         * @return the legend slice matching with the value
         */
        getLegendSlice: function (value, legend) {
            for (var i = 0, length = legend.slices.length; i < length; ++i) {
                if ((legend.slices[i].sliceValue !== undefined && value == legend.slices[i].sliceValue)
                    || ((legend.slices[i].sliceValue === undefined)
                    && (legend.slices[i].min === undefined || value >= legend.slices[i].min)
                    && (legend.slices[i].max === undefined || value <= legend.slices[i].max))
                ) {
                    return legend.slices[i];
                }
            }
            return {};
        },

        /*
         * Animated view box changes
         * As from http://code.voidblossom.com/animating-viewbox-easing-formulas/,
         * (from https://github.com/theshaun works on mapael)
         * @param x coordinate of the point to focus on
         * @param y coordinate of the point to focus on
         * @param w map defined width
         * @param h map defined height
         * @param duration defined length of time for animation
         * @param easingFunction defined Raphael supported easing_formula to use
         * @param callback method when animated action is complete
         */
        animateViewBox: function (x, y, w, h, duration, easingFunction) {
            var self = this;
            var cx = self.paper._viewBox ? self.paper._viewBox[0] : 0;
            var dx = x - cx;
            var cy = self.paper._viewBox ? self.paper._viewBox[1] : 0;
            var dy = y - cy;
            var cw = self.paper._viewBox ? self.paper._viewBox[2] : self.paper.width;
            var dw = w - cw;
            var ch = self.paper._viewBox ? self.paper._viewBox[3] : self.paper.height;
            var dh = h - ch;
            var interval = 25;
            var steps = duration / interval;
            var currentStep = 0;
            var easingFormula;

            easingFunction = easingFunction || "linear";
            easingFormula = Raphael.easing_formulas[easingFunction];

            clearInterval(self.animationIntervalID);

            self.animationIntervalID = setInterval(function () {
                    var ratio = currentStep / steps;
                    self.paper.setViewBox(cx + dx * easingFormula(ratio),
                        cy + dy * easingFormula(ratio),
                        cw + dw * easingFormula(ratio),
                        ch + dh * easingFormula(ratio), false);
                    if (currentStep++ >= steps) {
                        clearInterval(self.animationIntervalID);
                        clearTimeout(self.zoomTO);
                        self.zoomTO = setTimeout(function () {
                            self.$map.trigger("afterZoom", {x1: x, y1: y, x2: (x + w), y2: (y + h)});
                        }, 150);
                    }
                }, interval
            );
        },

        /*
         * Check for Raphael bug regarding drawing while beeing hidden (under display:none)
         * See https://github.com/neveldo/jQuery-Mapael/issues/135
         * @return true/false
         *
         * Wants to override this behavior? Use prototype overriding:
         *     $.mapael.prototype.isRaphaelBBoxBugPresent = function() {return false;};
         */
        isRaphaelBBoxBugPresent: function(){
            var self = this;
            // Draw text, then get its boundaries
            var text_elem = self.paper.text(-50, -50, "TEST");
            var text_elem_bbox = text_elem.getBBox();
            // remove element
            text_elem.remove();
            // If it has no height and width, then the paper is hidden
            return (text_elem_bbox.width === 0 && text_elem_bbox.height === 0);
        },

        // Default map options
        defaultOptions: {
            map: {
                cssClass: "map",
                tooltip: {
                    cssClass: "mapTooltip"
                },
                defaultArea: {
                    attrs: {
                        fill: "#343434",
                        stroke: "#5d5d5d",
                        "stroke-width": 1,
                        "stroke-linejoin": "round"
                    },
                    attrsHover: {
                        fill: "#f38a03",
                        animDuration: 300
                    },
                    text: {
                        position: "inner",
                        margin: 10,
                        attrs: {
                            "font-size": 15,
                            fill: "#c7c7c7"
                        },
                        attrsHover: {
                            fill: "#eaeaea",
                            "animDuration": 300
                        }
                    },
                    target: "_self",
                    cssClass: "area"
                },
                defaultPlot: {
                    type: "circle",
                    size: 15,
                    attrs: {
                        fill: "#0088db",
                        stroke: "#fff",
                        "stroke-width": 0,
                        "stroke-linejoin": "round"
                    },
                    attrsHover: {
                        "stroke-width": 3,
                        animDuration: 300
                    },
                    text: {
                        position: "right",
                        margin: 10,
                        attrs: {
                            "font-size": 15,
                            fill: "#c7c7c7"
                        },
                        attrsHover: {
                            fill: "#eaeaea",
                            animDuration: 300
                        }
                    },
                    target: "_self",
                    cssClass: "plot"
                },
                defaultLink: {
                    factor: 0.5,
                    attrs: {
                        stroke: "#0088db",
                        "stroke-width": 2
                    },
                    attrsHover: {
                        animDuration: 300
                    },
                    text: {
                        position: "inner",
                        margin: 10,
                        attrs: {
                            "font-size": 15,
                            fill: "#c7c7c7"
                        },
                        attrsHover: {
                            fill: "#eaeaea",
                            animDuration: 300
                        }
                    },
                    target: "_self",
                    cssClass: "link"
                },
                zoom: {
                    enabled: false,
                    minLevel: 0,
                    maxLevel: 10,
                    step: 0.25,
                    mousewheel: true,
                    touch: true,
                    animDuration: 200,
                    animEasing: "linear",
                    buttons: {
                        "reset": {
                            cssClass: "zoomButton zoomReset",
                            content: "&#8226;", // bullet sign
                            title: "Reset zoom"
                        },
                        "in": {
                            cssClass: "zoomButton zoomIn",
                            content: "+",
                            title: "Zoom in"
                        },
                        "out": {
                            cssClass: "zoomButton zoomOut",
                            content: "&#8722;", // minus sign
                            title: "Zoom out"
                        }
                    }
                }
            },
            legend: {
                redrawOnResize: true,
                area: [],
                plot: []
            },
            areas: {},
            plots: {},
            links: {}
        },

        // Default legends option
        legendDefaultOptions: {
            area: {
                cssClass: "areaLegend",
                display: true,
                marginLeft: 10,
                marginLeftTitle: 5,
                marginBottomTitle: 10,
                marginLeftLabel: 10,
                marginBottom: 10,
                titleAttrs: {
                    "font-size": 16,
                    fill: "#343434",
                    "text-anchor": "start"
                },
                labelAttrs: {
                    "font-size": 12,
                    fill: "#343434",
                    "text-anchor": "start"
                },
                labelAttrsHover: {
                    fill: "#787878",
                    animDuration: 300
                },
                hideElemsOnClick: {
                    enabled: true,
                    opacity: 0.2,
                    animDuration: 300
                },
                slices: [],
                mode: "vertical"
            },
            plot: {
                cssClass: "plotLegend",
                display: true,
                marginLeft: 10,
                marginLeftTitle: 5,
                marginBottomTitle: 10,
                marginLeftLabel: 10,
                marginBottom: 10,
                titleAttrs: {
                    "font-size": 16,
                    fill: "#343434",
                    "text-anchor": "start"
                },
                labelAttrs: {
                    "font-size": 12,
                    fill: "#343434",
                    "text-anchor": "start"
                },
                labelAttrsHover: {
                    fill: "#787878",
                    animDuration: 300
                },
                hideElemsOnClick: {
                    enabled: true,
                    opacity: 0.2,
                    animDuration: 300
                },
                slices: [],
                mode: "vertical"
            }
        }

    };

    // Extend jQuery with Mapael
    if ($[pluginName] === undefined) $[pluginName] = Mapael;

    // Add jQuery DOM function
    $.fn[pluginName] = function (options) {
        // Call Mapael on each element
        return this.each(function () {
            // Avoid leaking problem on multiple instanciation by removing an old mapael object on a container
            if ($.data(this, pluginName)) {
                $.data(this, pluginName).destroy();
            }
            // Create Mapael and save it as jQuery data
            // This allow external access to Mapael using $(".mapcontainer").data("mapael")
            $.data(this, pluginName, new Mapael(this, options));
        });
    };

    return Mapael;

}));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// +-------------------------------------------------------------------------------------------------------+ \\
// � Rapha�l 2.2.0 - JavaScript Vector Library                                                             � \\
// +-------------------------------------------------------------------------------------------------------� \\
// � Copyright � 2008-2016 Dmitry Baranovskiy (http://raphaeljs.com)                                       � \\
// � Copyright � 2008-2016 Sencha Labs (http://sencha.com)                                                 � \\
// +-------------------------------------------------------------------------------------------------------� \\
// � Licensed under the MIT (https://github.com/DmitryBaranovskiy/raphael/blob/master/license.txt) license.� \\
// +-------------------------------------------------------------------------------------------------------+ \\

(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(R) {

	    return R;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(eve) {

	    /*\
	     * Raphael
	     [ method ]
	     **
	     * Creates a canvas object on which to draw.
	     * You must do this first, as all future calls to drawing methods
	     * from this instance will be bound to this canvas.
	     > Parameters
	     **
	     - container (HTMLElement|string) DOM element or its ID which is going to be a parent for drawing surface
	     - width (number)
	     - height (number)
	     - callback (function) #optional callback function which is going to be executed in the context of newly created paper
	     * or
	     - x (number)
	     - y (number)
	     - width (number)
	     - height (number)
	     - callback (function) #optional callback function which is going to be executed in the context of newly created paper
	     * or
	     - all (array) (first 3 or 4 elements in the array are equal to [containerID, width, height] or [x, y, width, height]. The rest are element descriptions in format {type: type, <attributes>}). See @Paper.add.
	     - callback (function) #optional callback function which is going to be executed in the context of newly created paper
	     * or
	     - onReadyCallback (function) function that is going to be called on DOM ready event. You can also subscribe to this event via Eve�s �DOMLoad� event. In this case method returns `undefined`.
	     = (object) @Paper
	     > Usage
	     | // Each of the following examples create a canvas
	     | // that is 320px wide by 200px high.
	     | // Canvas is created at the viewport�s 10,50 coordinate.
	     | var paper = Raphael(10, 50, 320, 200);
	     | // Canvas is created at the top left corner of the #notepad element
	     | // (or its top right corner in dir="rtl" elements)
	     | var paper = Raphael(document.getElementById("notepad"), 320, 200);
	     | // Same as above
	     | var paper = Raphael("notepad", 320, 200);
	     | // Image dump
	     | var set = Raphael(["notepad", 320, 200, {
	     |     type: "rect",
	     |     x: 10,
	     |     y: 10,
	     |     width: 25,
	     |     height: 25,
	     |     stroke: "#f00"
	     | }, {
	     |     type: "text",
	     |     x: 30,
	     |     y: 40,
	     |     text: "Dump"
	     | }]);
	    \*/
	    function R(first) {
	        if (R.is(first, "function")) {
	            return loaded ? first() : eve.on("raphael.DOMload", first);
	        } else if (R.is(first, array)) {
	            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
	        } else {
	            var args = Array.prototype.slice.call(arguments, 0);
	            if (R.is(args[args.length - 1], "function")) {
	                var f = args.pop();
	                return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
	                    f.call(R._engine.create[apply](R, args));
	                });
	            } else {
	                return R._engine.create[apply](R, arguments);
	            }
	        }
	    }
	    R.version = "2.2.0";
	    R.eve = eve;
	    var loaded,
	        separator = /[, ]+/,
	        elements = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
	        formatrg = /\{(\d+)\}/g,
	        proto = "prototype",
	        has = "hasOwnProperty",
	        g = {
	            doc: document,
	            win: window
	        },
	        oldRaphael = {
	            was: Object.prototype[has].call(g.win, "Raphael"),
	            is: g.win.Raphael
	        },
	        Paper = function () {
	            /*\
	             * Paper.ca
	             [ property (object) ]
	             **
	             * Shortcut for @Paper.customAttributes
	            \*/
	            /*\
	             * Paper.customAttributes
	             [ property (object) ]
	             **
	             * If you have a set of attributes that you would like to represent
	             * as a function of some number you can do it easily with custom attributes:
	             > Usage
	             | paper.customAttributes.hue = function (num) {
	             |     num = num % 1;
	             |     return {fill: "hsb(" + num + ", 0.75, 1)"};
	             | };
	             | // Custom attribute �hue� will change fill
	             | // to be given hue with fixed saturation and brightness.
	             | // Now you can use it like this:
	             | var c = paper.circle(10, 10, 10).attr({hue: .45});
	             | // or even like this:
	             | c.animate({hue: 1}, 1e3);
	             |
	             | // You could also create custom attribute
	             | // with multiple parameters:
	             | paper.customAttributes.hsb = function (h, s, b) {
	             |     return {fill: "hsb(" + [h, s, b].join(",") + ")"};
	             | };
	             | c.attr({hsb: "0.5 .8 1"});
	             | c.animate({hsb: [1, 0, 0.5]}, 1e3);
	            \*/
	            this.ca = this.customAttributes = {};
	        },
	        paperproto,
	        appendChild = "appendChild",
	        apply = "apply",
	        concat = "concat",
	        supportsTouch = ('ontouchstart' in g.win) || g.win.DocumentTouch && g.doc instanceof DocumentTouch, //taken from Modernizr touch test
	        E = "",
	        S = " ",
	        Str = String,
	        split = "split",
	        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
	        touchMap = {
	            mousedown: "touchstart",
	            mousemove: "touchmove",
	            mouseup: "touchend"
	        },
	        lowerCase = Str.prototype.toLowerCase,
	        math = Math,
	        mmax = math.max,
	        mmin = math.min,
	        abs = math.abs,
	        pow = math.pow,
	        PI = math.PI,
	        nu = "number",
	        string = "string",
	        array = "array",
	        toString = "toString",
	        fillString = "fill",
	        objectToString = Object.prototype.toString,
	        paper = {},
	        push = "push",
	        ISURL = R._ISURL = /^url\(['"]?(.+?)['"]?\)$/i,
	        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
	        isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1},
	        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
	        round = math.round,
	        setAttribute = "setAttribute",
	        toFloat = parseFloat,
	        toInt = parseInt,
	        upperCase = Str.prototype.toUpperCase,
	        availableAttrs = R._availableAttrs = {
	            "arrow-end": "none",
	            "arrow-start": "none",
	            blur: 0,
	            "clip-rect": "0 0 1e9 1e9",
	            cursor: "default",
	            cx: 0,
	            cy: 0,
	            fill: "#fff",
	            "fill-opacity": 1,
	            font: '10px "Arial"',
	            "font-family": '"Arial"',
	            "font-size": "10",
	            "font-style": "normal",
	            "font-weight": 400,
	            gradient: 0,
	            height: 0,
	            href: "http://raphaeljs.com/",
	            "letter-spacing": 0,
	            opacity: 1,
	            path: "M0,0",
	            r: 0,
	            rx: 0,
	            ry: 0,
	            src: "",
	            stroke: "#000",
	            "stroke-dasharray": "",
	            "stroke-linecap": "butt",
	            "stroke-linejoin": "butt",
	            "stroke-miterlimit": 0,
	            "stroke-opacity": 1,
	            "stroke-width": 1,
	            target: "_blank",
	            "text-anchor": "middle",
	            title: "Raphael",
	            transform: "",
	            width: 0,
	            x: 0,
	            y: 0,
	            "class": ""
	        },
	        availableAnimAttrs = R._availableAnimAttrs = {
	            blur: nu,
	            "clip-rect": "csv",
	            cx: nu,
	            cy: nu,
	            fill: "colour",
	            "fill-opacity": nu,
	            "font-size": nu,
	            height: nu,
	            opacity: nu,
	            path: "path",
	            r: nu,
	            rx: nu,
	            ry: nu,
	            stroke: "colour",
	            "stroke-opacity": nu,
	            "stroke-width": nu,
	            transform: "transform",
	            width: nu,
	            x: nu,
	            y: nu
	        },
	        whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
	        commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
	        hsrg = {hs: 1, rg: 1},
	        p2s = /,?([achlmqrstvxz]),?/gi,
	        pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
	        tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
	        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
	        radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
	        eldata = {},
	        sortByKey = function (a, b) {
	            return a.key - b.key;
	        },
	        sortByNumber = function (a, b) {
	            return toFloat(a) - toFloat(b);
	        },
	        fun = function () {},
	        pipe = function (x) {
	            return x;
	        },
	        rectPath = R._rectPath = function (x, y, w, h, r) {
	            if (r) {
	                return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
	            }
	            return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
	        },
	        ellipsePath = function (x, y, rx, ry) {
	            if (ry == null) {
	                ry = rx;
	            }
	            return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
	        },
	        getPath = R._getPath = {
	            path: function (el) {
	                return el.attr("path");
	            },
	            circle: function (el) {
	                var a = el.attrs;
	                return ellipsePath(a.cx, a.cy, a.r);
	            },
	            ellipse: function (el) {
	                var a = el.attrs;
	                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
	            },
	            rect: function (el) {
	                var a = el.attrs;
	                return rectPath(a.x, a.y, a.width, a.height, a.r);
	            },
	            image: function (el) {
	                var a = el.attrs;
	                return rectPath(a.x, a.y, a.width, a.height);
	            },
	            text: function (el) {
	                var bbox = el._getBBox();
	                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
	            },
	            set : function(el) {
	                var bbox = el._getBBox();
	                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
	            }
	        },
	        /*\
	         * Raphael.mapPath
	         [ method ]
	         **
	         * Transform the path string with given matrix.
	         > Parameters
	         - path (string) path string
	         - matrix (object) see @Matrix
	         = (string) transformed path string
	        \*/
	        mapPath = R.mapPath = function (path, matrix) {
	            if (!matrix) {
	                return path;
	            }
	            var x, y, i, j, ii, jj, pathi;
	            path = path2curve(path);
	            for (i = 0, ii = path.length; i < ii; i++) {
	                pathi = path[i];
	                for (j = 1, jj = pathi.length; j < jj; j += 2) {
	                    x = matrix.x(pathi[j], pathi[j + 1]);
	                    y = matrix.y(pathi[j], pathi[j + 1]);
	                    pathi[j] = x;
	                    pathi[j + 1] = y;
	                }
	            }
	            return path;
	        };

	    R._g = g;
	    /*\
	     * Raphael.type
	     [ property (string) ]
	     **
	     * Can be �SVG�, �VML� or empty, depending on browser support.
	    \*/
	    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
	    if (R.type == "VML") {
	        var d = g.doc.createElement("div"),
	            b;
	        d.innerHTML = '<v:shape adj="1"/>';
	        b = d.firstChild;
	        b.style.behavior = "url(#default#VML)";
	        if (!(b && typeof b.adj == "object")) {
	            return (R.type = E);
	        }
	        d = null;
	    }
	    /*\
	     * Raphael.svg
	     [ property (boolean) ]
	     **
	     * `true` if browser supports SVG.
	    \*/
	    /*\
	     * Raphael.vml
	     [ property (boolean) ]
	     **
	     * `true` if browser supports VML.
	    \*/
	    R.svg = !(R.vml = R.type == "VML");
	    R._Paper = Paper;
	    /*\
	     * Raphael.fn
	     [ property (object) ]
	     **
	     * You can add your own method to the canvas. For example if you want to draw a pie chart,
	     * you can create your own pie chart function and ship it as a Rapha�l plugin. To do this
	     * you need to extend the `Raphael.fn` object. You should modify the `fn` object before a
	     * Rapha�l instance is created, otherwise it will take no effect. Please note that the
	     * ability for namespaced plugins was removed in Raphael 2.0. It is up to the plugin to
	     * ensure any namespacing ensures proper context.
	     > Usage
	     | Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
	     |     return this.path( ... );
	     | };
	     | // or create namespace
	     | Raphael.fn.mystuff = {
	     |     arrow: function () {�},
	     |     star: function () {�},
	     |     // etc�
	     | };
	     | var paper = Raphael(10, 10, 630, 480);
	     | // then use it
	     | paper.arrow(10, 10, 30, 30, 5).attr({fill: "#f00"});
	     | paper.mystuff.arrow();
	     | paper.mystuff.star();
	    \*/
	    R.fn = paperproto = Paper.prototype = R.prototype;
	    R._id = 0;
	    /*\
	     * Raphael.is
	     [ method ]
	     **
	     * Handful of replacements for `typeof` operator.
	     > Parameters
	     - o (�) any object or primitive
	     - type (string) name of the type, i.e. �string�, �function�, �number�, etc.
	     = (boolean) is given value is of given type
	    \*/
	    R.is = function (o, type) {
	        type = lowerCase.call(type);
	        if (type == "finite") {
	            return !isnan[has](+o);
	        }
	        if (type == "array") {
	            return o instanceof Array;
	        }
	        return  (type == "null" && o === null) ||
	                (type == typeof o && o !== null) ||
	                (type == "object" && o === Object(o)) ||
	                (type == "array" && Array.isArray && Array.isArray(o)) ||
	                objectToString.call(o).slice(8, -1).toLowerCase() == type;
	    };

	    function clone(obj) {
	        if (typeof obj == "function" || Object(obj) !== obj) {
	            return obj;
	        }
	        var res = new obj.constructor;
	        for (var key in obj) if (obj[has](key)) {
	            res[key] = clone(obj[key]);
	        }
	        return res;
	    }

	    /*\
	     * Raphael.angle
	     [ method ]
	     **
	     * Returns angle between two or three points
	     > Parameters
	     - x1 (number) x coord of first point
	     - y1 (number) y coord of first point
	     - x2 (number) x coord of second point
	     - y2 (number) y coord of second point
	     - x3 (number) #optional x coord of third point
	     - y3 (number) #optional y coord of third point
	     = (number) angle in degrees.
	    \*/
	    R.angle = function (x1, y1, x2, y2, x3, y3) {
	        if (x3 == null) {
	            var x = x1 - x2,
	                y = y1 - y2;
	            if (!x && !y) {
	                return 0;
	            }
	            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
	        } else {
	            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
	        }
	    };
	    /*\
	     * Raphael.rad
	     [ method ]
	     **
	     * Transform angle to radians
	     > Parameters
	     - deg (number) angle in degrees
	     = (number) angle in radians.
	    \*/
	    R.rad = function (deg) {
	        return deg % 360 * PI / 180;
	    };
	    /*\
	     * Raphael.deg
	     [ method ]
	     **
	     * Transform angle to degrees
	     > Parameters
	     - rad (number) angle in radians
	     = (number) angle in degrees.
	    \*/
	    R.deg = function (rad) {
	        return Math.round ((rad * 180 / PI% 360)* 1000) / 1000;
	    };
	    /*\
	     * Raphael.snapTo
	     [ method ]
	     **
	     * Snaps given value to given grid.
	     > Parameters
	     - values (array|number) given array of values or step of the grid
	     - value (number) value to adjust
	     - tolerance (number) #optional tolerance for snapping. Default is `10`.
	     = (number) adjusted value.
	    \*/
	    R.snapTo = function (values, value, tolerance) {
	        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
	        if (R.is(values, array)) {
	            var i = values.length;
	            while (i--) if (abs(values[i] - value) <= tolerance) {
	                return values[i];
	            }
	        } else {
	            values = +values;
	            var rem = value % values;
	            if (rem < tolerance) {
	                return value - rem;
	            }
	            if (rem > values - tolerance) {
	                return value - rem + values;
	            }
	        }
	        return value;
	    };

	    /*\
	     * Raphael.createUUID
	     [ method ]
	     **
	     * Returns RFC4122, version 4 ID
	    \*/
	    var createUUID = R.createUUID = (function (uuidRegEx, uuidReplacer) {
	        return function () {
	            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
	        };
	    })(/[xy]/g, function (c) {
	        var r = math.random() * 16 | 0,
	            v = c == "x" ? r : (r & 3 | 8);
	        return v.toString(16);
	    });

	    /*\
	     * Raphael.setWindow
	     [ method ]
	     **
	     * Used when you need to draw in `&lt;iframe>`. Switched window to the iframe one.
	     > Parameters
	     - newwin (window) new window object
	    \*/
	    R.setWindow = function (newwin) {
	        eve("raphael.setWindow", R, g.win, newwin);
	        g.win = newwin;
	        g.doc = g.win.document;
	        if (R._engine.initWin) {
	            R._engine.initWin(g.win);
	        }
	    };
	    var toHex = function (color) {
	        if (R.vml) {
	            // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
	            var trim = /^\s+|\s+$/g;
	            var bod;
	            try {
	                var docum = new ActiveXObject("htmlfile");
	                docum.write("<body>");
	                docum.close();
	                bod = docum.body;
	            } catch(e) {
	                bod = createPopup().document.body;
	            }
	            var range = bod.createTextRange();
	            toHex = cacher(function (color) {
	                try {
	                    bod.style.color = Str(color).replace(trim, E);
	                    var value = range.queryCommandValue("ForeColor");
	                    value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
	                    return "#" + ("000000" + value.toString(16)).slice(-6);
	                } catch(e) {
	                    return "none";
	                }
	            });
	        } else {
	            var i = g.doc.createElement("i");
	            i.title = "Rapha\xebl Colour Picker";
	            i.style.display = "none";
	            g.doc.body.appendChild(i);
	            toHex = cacher(function (color) {
	                i.style.color = color;
	                return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
	            });
	        }
	        return toHex(color);
	    },
	    hsbtoString = function () {
	        return "hsb(" + [this.h, this.s, this.b] + ")";
	    },
	    hsltoString = function () {
	        return "hsl(" + [this.h, this.s, this.l] + ")";
	    },
	    rgbtoString = function () {
	        return this.hex;
	    },
	    prepareRGB = function (r, g, b) {
	        if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
	            b = r.b;
	            g = r.g;
	            r = r.r;
	        }
	        if (g == null && R.is(r, string)) {
	            var clr = R.getRGB(r);
	            r = clr.r;
	            g = clr.g;
	            b = clr.b;
	        }
	        if (r > 1 || g > 1 || b > 1) {
	            r /= 255;
	            g /= 255;
	            b /= 255;
	        }

	        return [r, g, b];
	    },
	    packageRGB = function (r, g, b, o) {
	        r *= 255;
	        g *= 255;
	        b *= 255;
	        var rgb = {
	            r: r,
	            g: g,
	            b: b,
	            hex: R.rgb(r, g, b),
	            toString: rgbtoString
	        };
	        R.is(o, "finite") && (rgb.opacity = o);
	        return rgb;
	    };

	    /*\
	     * Raphael.color
	     [ method ]
	     **
	     * Parses the color string and returns object with all values for the given color.
	     > Parameters
	     - clr (string) color string in one of the supported formats (see @Raphael.getRGB)
	     = (object) Combined RGB & HSB object in format:
	     o {
	     o     r (number) red,
	     o     g (number) green,
	     o     b (number) blue,
	     o     hex (string) color in HTML/CSS format: #������,
	     o     error (boolean) `true` if string can�t be parsed,
	     o     h (number) hue,
	     o     s (number) saturation,
	     o     v (number) value (brightness),
	     o     l (number) lightness
	     o }
	    \*/
	    R.color = function (clr) {
	        var rgb;
	        if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
	            rgb = R.hsb2rgb(clr);
	            clr.r = rgb.r;
	            clr.g = rgb.g;
	            clr.b = rgb.b;
	            clr.hex = rgb.hex;
	        } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
	            rgb = R.hsl2rgb(clr);
	            clr.r = rgb.r;
	            clr.g = rgb.g;
	            clr.b = rgb.b;
	            clr.hex = rgb.hex;
	        } else {
	            if (R.is(clr, "string")) {
	                clr = R.getRGB(clr);
	            }
	            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
	                rgb = R.rgb2hsl(clr);
	                clr.h = rgb.h;
	                clr.s = rgb.s;
	                clr.l = rgb.l;
	                rgb = R.rgb2hsb(clr);
	                clr.v = rgb.b;
	            } else {
	                clr = {hex: "none"};
	                clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
	            }
	        }
	        clr.toString = rgbtoString;
	        return clr;
	    };
	    /*\
	     * Raphael.hsb2rgb
	     [ method ]
	     **
	     * Converts HSB values to RGB object.
	     > Parameters
	     - h (number) hue
	     - s (number) saturation
	     - v (number) value or brightness
	     = (object) RGB object in format:
	     o {
	     o     r (number) red,
	     o     g (number) green,
	     o     b (number) blue,
	     o     hex (string) color in HTML/CSS format: #������
	     o }
	    \*/
	    R.hsb2rgb = function (h, s, v, o) {
	        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
	            v = h.b;
	            s = h.s;
	            o = h.o;
	            h = h.h;
	        }
	        h *= 360;
	        var R, G, B, X, C;
	        h = (h % 360) / 60;
	        C = v * s;
	        X = C * (1 - abs(h % 2 - 1));
	        R = G = B = v - C;

	        h = ~~h;
	        R += [C, X, 0, 0, X, C][h];
	        G += [X, C, C, X, 0, 0][h];
	        B += [0, 0, X, C, C, X][h];
	        return packageRGB(R, G, B, o);
	    };
	    /*\
	     * Raphael.hsl2rgb
	     [ method ]
	     **
	     * Converts HSL values to RGB object.
	     > Parameters
	     - h (number) hue
	     - s (number) saturation
	     - l (number) luminosity
	     = (object) RGB object in format:
	     o {
	     o     r (number) red,
	     o     g (number) green,
	     o     b (number) blue,
	     o     hex (string) color in HTML/CSS format: #������
	     o }
	    \*/
	    R.hsl2rgb = function (h, s, l, o) {
	        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
	            l = h.l;
	            s = h.s;
	            h = h.h;
	        }
	        if (h > 1 || s > 1 || l > 1) {
	            h /= 360;
	            s /= 100;
	            l /= 100;
	        }
	        h *= 360;
	        var R, G, B, X, C;
	        h = (h % 360) / 60;
	        C = 2 * s * (l < .5 ? l : 1 - l);
	        X = C * (1 - abs(h % 2 - 1));
	        R = G = B = l - C / 2;

	        h = ~~h;
	        R += [C, X, 0, 0, X, C][h];
	        G += [X, C, C, X, 0, 0][h];
	        B += [0, 0, X, C, C, X][h];
	        return packageRGB(R, G, B, o);
	    };
	    /*\
	     * Raphael.rgb2hsb
	     [ method ]
	     **
	     * Converts RGB values to HSB object.
	     > Parameters
	     - r (number) red
	     - g (number) green
	     - b (number) blue
	     = (object) HSB object in format:
	     o {
	     o     h (number) hue
	     o     s (number) saturation
	     o     b (number) brightness
	     o }
	    \*/
	    R.rgb2hsb = function (r, g, b) {
	        b = prepareRGB(r, g, b);
	        r = b[0];
	        g = b[1];
	        b = b[2];

	        var H, S, V, C;
	        V = mmax(r, g, b);
	        C = V - mmin(r, g, b);
	        H = (C == 0 ? null :
	             V == r ? (g - b) / C :
	             V == g ? (b - r) / C + 2 :
	                      (r - g) / C + 4
	            );
	        H = ((H + 360) % 6) * 60 / 360;
	        S = C == 0 ? 0 : C / V;
	        return {h: H, s: S, b: V, toString: hsbtoString};
	    };
	    /*\
	     * Raphael.rgb2hsl
	     [ method ]
	     **
	     * Converts RGB values to HSL object.
	     > Parameters
	     - r (number) red
	     - g (number) green
	     - b (number) blue
	     = (object) HSL object in format:
	     o {
	     o     h (number) hue
	     o     s (number) saturation
	     o     l (number) luminosity
	     o }
	    \*/
	    R.rgb2hsl = function (r, g, b) {
	        b = prepareRGB(r, g, b);
	        r = b[0];
	        g = b[1];
	        b = b[2];

	        var H, S, L, M, m, C;
	        M = mmax(r, g, b);
	        m = mmin(r, g, b);
	        C = M - m;
	        H = (C == 0 ? null :
	             M == r ? (g - b) / C :
	             M == g ? (b - r) / C + 2 :
	                      (r - g) / C + 4);
	        H = ((H + 360) % 6) * 60 / 360;
	        L = (M + m) / 2;
	        S = (C == 0 ? 0 :
	             L < .5 ? C / (2 * L) :
	                      C / (2 - 2 * L));
	        return {h: H, s: S, l: L, toString: hsltoString};
	    };
	    R._path2string = function () {
	        return this.join(",").replace(p2s, "$1");
	    };
	    function repush(array, item) {
	        for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
	            return array.push(array.splice(i, 1)[0]);
	        }
	    }
	    function cacher(f, scope, postprocessor) {
	        function newf() {
	            var arg = Array.prototype.slice.call(arguments, 0),
	                args = arg.join("\u2400"),
	                cache = newf.cache = newf.cache || {},
	                count = newf.count = newf.count || [];
	            if (cache[has](args)) {
	                repush(count, args);
	                return postprocessor ? postprocessor(cache[args]) : cache[args];
	            }
	            count.length >= 1e3 && delete cache[count.shift()];
	            count.push(args);
	            cache[args] = f[apply](scope, arg);
	            return postprocessor ? postprocessor(cache[args]) : cache[args];
	        }
	        return newf;
	    }

	    var preload = R._preload = function (src, f) {
	        var img = g.doc.createElement("img");
	        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
	        img.onload = function () {
	            f.call(this);
	            this.onload = null;
	            g.doc.body.removeChild(this);
	        };
	        img.onerror = function () {
	            g.doc.body.removeChild(this);
	        };
	        g.doc.body.appendChild(img);
	        img.src = src;
	    };

	    function clrToString() {
	        return this.hex;
	    }

	    /*\
	     * Raphael.getRGB
	     [ method ]
	     **
	     * Parses colour string as RGB object
	     > Parameters
	     - colour (string) colour string in one of formats:
	     # <ul>
	     #     <li>Colour name (�<code>red</code>�, �<code>green</code>�, �<code>cornflowerblue</code>�, etc)</li>
	     #     <li>#��� � shortened HTML colour: (�<code>#000</code>�, �<code>#fc0</code>�, etc)</li>
	     #     <li>#������ � full length HTML colour: (�<code>#000000</code>�, �<code>#bd2300</code>�)</li>
	     #     <li>rgb(���, ���, ���) � red, green and blue channels� values: (�<code>rgb(200,&nbsp;100,&nbsp;0)</code>�)</li>
	     #     <li>rgb(���%, ���%, ���%) � same as above, but in %: (�<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>�)</li>
	     #     <li>hsb(���, ���, ���) � hue, saturation and brightness values: (�<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>�)</li>
	     #     <li>hsb(���%, ���%, ���%) � same as above, but in %</li>
	     #     <li>hsl(���, ���, ���) � same as hsb</li>
	     #     <li>hsl(���%, ���%, ���%) � same as hsb</li>
	     # </ul>
	     = (object) RGB object in format:
	     o {
	     o     r (number) red,
	     o     g (number) green,
	     o     b (number) blue
	     o     hex (string) color in HTML/CSS format: #������,
	     o     error (boolean) true if string can�t be parsed
	     o }
	    \*/
	    R.getRGB = cacher(function (colour) {
	        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
	            return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
	        }
	        if (colour == "none") {
	            return {r: -1, g: -1, b: -1, hex: "none", toString: clrToString};
	        }
	        !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
	        var res,
	            red,
	            green,
	            blue,
	            opacity,
	            t,
	            values,
	            rgb = colour.match(colourRegExp);
	        if (rgb) {
	            if (rgb[2]) {
	                blue = toInt(rgb[2].substring(5), 16);
	                green = toInt(rgb[2].substring(3, 5), 16);
	                red = toInt(rgb[2].substring(1, 3), 16);
	            }
	            if (rgb[3]) {
	                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
	                green = toInt((t = rgb[3].charAt(2)) + t, 16);
	                red = toInt((t = rgb[3].charAt(1)) + t, 16);
	            }
	            if (rgb[4]) {
	                values = rgb[4][split](commaSpaces);
	                red = toFloat(values[0]);
	                values[0].slice(-1) == "%" && (red *= 2.55);
	                green = toFloat(values[1]);
	                values[1].slice(-1) == "%" && (green *= 2.55);
	                blue = toFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue *= 2.55);
	                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	            }
	            if (rgb[5]) {
	                values = rgb[5][split](commaSpaces);
	                red = toFloat(values[0]);
	                values[0].slice(-1) == "%" && (red *= 2.55);
	                green = toFloat(values[1]);
	                values[1].slice(-1) == "%" && (green *= 2.55);
	                blue = toFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue *= 2.55);
	                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
	                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	                return R.hsb2rgb(red, green, blue, opacity);
	            }
	            if (rgb[6]) {
	                values = rgb[6][split](commaSpaces);
	                red = toFloat(values[0]);
	                values[0].slice(-1) == "%" && (red *= 2.55);
	                green = toFloat(values[1]);
	                values[1].slice(-1) == "%" && (green *= 2.55);
	                blue = toFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue *= 2.55);
	                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
	                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	                return R.hsl2rgb(red, green, blue, opacity);
	            }
	            rgb = {r: red, g: green, b: blue, toString: clrToString};
	            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
	            R.is(opacity, "finite") && (rgb.opacity = opacity);
	            return rgb;
	        }
	        return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
	    }, R);
	    /*\
	     * Raphael.hsb
	     [ method ]
	     **
	     * Converts HSB values to hex representation of the colour.
	     > Parameters
	     - h (number) hue
	     - s (number) saturation
	     - b (number) value or brightness
	     = (string) hex representation of the colour.
	    \*/
	    R.hsb = cacher(function (h, s, b) {
	        return R.hsb2rgb(h, s, b).hex;
	    });
	    /*\
	     * Raphael.hsl
	     [ method ]
	     **
	     * Converts HSL values to hex representation of the colour.
	     > Parameters
	     - h (number) hue
	     - s (number) saturation
	     - l (number) luminosity
	     = (string) hex representation of the colour.
	    \*/
	    R.hsl = cacher(function (h, s, l) {
	        return R.hsl2rgb(h, s, l).hex;
	    });
	    /*\
	     * Raphael.rgb
	     [ method ]
	     **
	     * Converts RGB values to hex representation of the colour.
	     > Parameters
	     - r (number) red
	     - g (number) green
	     - b (number) blue
	     = (string) hex representation of the colour.
	    \*/
	    R.rgb = cacher(function (r, g, b) {
	        function round(x) { return (x + 0.5) | 0; }
	        return "#" + (16777216 | round(b) | (round(g) << 8) | (round(r) << 16)).toString(16).slice(1);
	    });
	    /*\
	     * Raphael.getColor
	     [ method ]
	     **
	     * On each call returns next colour in the spectrum. To reset it back to red call @Raphael.getColor.reset
	     > Parameters
	     - value (number) #optional brightness, default is `0.75`
	     = (string) hex representation of the colour.
	    \*/
	    R.getColor = function (value) {
	        var start = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: value || .75},
	            rgb = this.hsb2rgb(start.h, start.s, start.b);
	        start.h += .075;
	        if (start.h > 1) {
	            start.h = 0;
	            start.s -= .2;
	            start.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: start.b});
	        }
	        return rgb.hex;
	    };
	    /*\
	     * Raphael.getColor.reset
	     [ method ]
	     **
	     * Resets spectrum position for @Raphael.getColor back to red.
	    \*/
	    R.getColor.reset = function () {
	        delete this.start;
	    };

	    // http://schepers.cc/getting-to-the-point
	    function catmullRom2bezier(crp, z) {
	        var d = [];
	        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
	            var p = [
	                        {x: +crp[i - 2], y: +crp[i - 1]},
	                        {x: +crp[i],     y: +crp[i + 1]},
	                        {x: +crp[i + 2], y: +crp[i + 3]},
	                        {x: +crp[i + 4], y: +crp[i + 5]}
	                    ];
	            if (z) {
	                if (!i) {
	                    p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
	                } else if (iLen - 4 == i) {
	                    p[3] = {x: +crp[0], y: +crp[1]};
	                } else if (iLen - 2 == i) {
	                    p[2] = {x: +crp[0], y: +crp[1]};
	                    p[3] = {x: +crp[2], y: +crp[3]};
	                }
	            } else {
	                if (iLen - 4 == i) {
	                    p[3] = p[2];
	                } else if (!i) {
	                    p[0] = {x: +crp[i], y: +crp[i + 1]};
	                }
	            }
	            d.push(["C",
	                  (-p[0].x + 6 * p[1].x + p[2].x) / 6,
	                  (-p[0].y + 6 * p[1].y + p[2].y) / 6,
	                  (p[1].x + 6 * p[2].x - p[3].x) / 6,
	                  (p[1].y + 6*p[2].y - p[3].y) / 6,
	                  p[2].x,
	                  p[2].y
	            ]);
	        }

	        return d;
	    }
	    /*\
	     * Raphael.parsePathString
	     [ method ]
	     **
	     * Utility method
	     **
	     * Parses given path string into an array of arrays of path segments.
	     > Parameters
	     - pathString (string|array) path string or array of segments (in the last case it will be returned straight away)
	     = (array) array of segments.
	    \*/
	    R.parsePathString = function (pathString) {
	        if (!pathString) {
	            return null;
	        }
	        var pth = paths(pathString);
	        if (pth.arr) {
	            return pathClone(pth.arr);
	        }

	        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0},
	            data = [];
	        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
	            data = pathClone(pathString);
	        }
	        if (!data.length) {
	            Str(pathString).replace(pathCommand, function (a, b, c) {
	                var params = [],
	                    name = b.toLowerCase();
	                c.replace(pathValues, function (a, b) {
	                    b && params.push(+b);
	                });
	                if (name == "m" && params.length > 2) {
	                    data.push([b][concat](params.splice(0, 2)));
	                    name = "l";
	                    b = b == "m" ? "l" : "L";
	                }
	                if (name == "r") {
	                    data.push([b][concat](params));
	                } else while (params.length >= paramCounts[name]) {
	                    data.push([b][concat](params.splice(0, paramCounts[name])));
	                    if (!paramCounts[name]) {
	                        break;
	                    }
	                }
	            });
	        }
	        data.toString = R._path2string;
	        pth.arr = pathClone(data);
	        return data;
	    };
	    /*\
	     * Raphael.parseTransformString
	     [ method ]
	     **
	     * Utility method
	     **
	     * Parses given path string into an array of transformations.
	     > Parameters
	     - TString (string|array) transform string or array of transformations (in the last case it will be returned straight away)
	     = (array) array of transformations.
	    \*/
	    R.parseTransformString = cacher(function (TString) {
	        if (!TString) {
	            return null;
	        }
	        var paramCounts = {r: 3, s: 4, t: 2, m: 6},
	            data = [];
	        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
	            data = pathClone(TString);
	        }
	        if (!data.length) {
	            Str(TString).replace(tCommand, function (a, b, c) {
	                var params = [],
	                    name = lowerCase.call(b);
	                c.replace(pathValues, function (a, b) {
	                    b && params.push(+b);
	                });
	                data.push([b][concat](params));
	            });
	        }
	        data.toString = R._path2string;
	        return data;
	    });
	    // PATHS
	    var paths = function (ps) {
	        var p = paths.ps = paths.ps || {};
	        if (p[ps]) {
	            p[ps].sleep = 100;
	        } else {
	            p[ps] = {
	                sleep: 100
	            };
	        }
	        setTimeout(function () {
	            for (var key in p) if (p[has](key) && key != ps) {
	                p[key].sleep--;
	                !p[key].sleep && delete p[key];
	            }
	        });
	        return p[ps];
	    };
	    /*\
	     * Raphael.findDotsAtSegment
	     [ method ]
	     **
	     * Utility method
	     **
	     * Find dot coordinates on the given cubic bezier curve at the given t.
	     > Parameters
	     - p1x (number) x of the first point of the curve
	     - p1y (number) y of the first point of the curve
	     - c1x (number) x of the first anchor of the curve
	     - c1y (number) y of the first anchor of the curve
	     - c2x (number) x of the second anchor of the curve
	     - c2y (number) y of the second anchor of the curve
	     - p2x (number) x of the second point of the curve
	     - p2y (number) y of the second point of the curve
	     - t (number) position on the curve (0..1)
	     = (object) point information in format:
	     o {
	     o     x: (number) x coordinate of the point
	     o     y: (number) y coordinate of the point
	     o     m: {
	     o         x: (number) x coordinate of the left anchor
	     o         y: (number) y coordinate of the left anchor
	     o     }
	     o     n: {
	     o         x: (number) x coordinate of the right anchor
	     o         y: (number) y coordinate of the right anchor
	     o     }
	     o     start: {
	     o         x: (number) x coordinate of the start of the curve
	     o         y: (number) y coordinate of the start of the curve
	     o     }
	     o     end: {
	     o         x: (number) x coordinate of the end of the curve
	     o         y: (number) y coordinate of the end of the curve
	     o     }
	     o     alpha: (number) angle of the curve derivative at the point
	     o }
	    \*/
	    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
	        var t1 = 1 - t,
	            t13 = pow(t1, 3),
	            t12 = pow(t1, 2),
	            t2 = t * t,
	            t3 = t2 * t,
	            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
	            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
	            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
	            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
	            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
	            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
	            ax = t1 * p1x + t * c1x,
	            ay = t1 * p1y + t * c1y,
	            cx = t1 * c2x + t * p2x,
	            cy = t1 * c2y + t * p2y,
	            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
	        (mx > nx || my < ny) && (alpha += 180);
	        return {
	            x: x,
	            y: y,
	            m: {x: mx, y: my},
	            n: {x: nx, y: ny},
	            start: {x: ax, y: ay},
	            end: {x: cx, y: cy},
	            alpha: alpha
	        };
	    };
	    /*\
	     * Raphael.bezierBBox
	     [ method ]
	     **
	     * Utility method
	     **
	     * Return bounding box of a given cubic bezier curve
	     > Parameters
	     - p1x (number) x of the first point of the curve
	     - p1y (number) y of the first point of the curve
	     - c1x (number) x of the first anchor of the curve
	     - c1y (number) y of the first anchor of the curve
	     - c2x (number) x of the second anchor of the curve
	     - c2y (number) y of the second anchor of the curve
	     - p2x (number) x of the second point of the curve
	     - p2y (number) y of the second point of the curve
	     * or
	     - bez (array) array of six points for bezier curve
	     = (object) point information in format:
	     o {
	     o     min: {
	     o         x: (number) x coordinate of the left point
	     o         y: (number) y coordinate of the top point
	     o     }
	     o     max: {
	     o         x: (number) x coordinate of the right point
	     o         y: (number) y coordinate of the bottom point
	     o     }
	     o }
	    \*/
	    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
	        if (!R.is(p1x, "array")) {
	            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
	        }
	        var bbox = curveDim.apply(null, p1x);
	        return {
	            x: bbox.min.x,
	            y: bbox.min.y,
	            x2: bbox.max.x,
	            y2: bbox.max.y,
	            width: bbox.max.x - bbox.min.x,
	            height: bbox.max.y - bbox.min.y
	        };
	    };
	    /*\
	     * Raphael.isPointInsideBBox
	     [ method ]
	     **
	     * Utility method
	     **
	     * Returns `true` if given point is inside bounding boxes.
	     > Parameters
	     - bbox (string) bounding box
	     - x (string) x coordinate of the point
	     - y (string) y coordinate of the point
	     = (boolean) `true` if point inside
	    \*/
	    R.isPointInsideBBox = function (bbox, x, y) {
	        return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
	    };
	    /*\
	     * Raphael.isBBoxIntersect
	     [ method ]
	     **
	     * Utility method
	     **
	     * Returns `true` if two bounding boxes intersect
	     > Parameters
	     - bbox1 (string) first bounding box
	     - bbox2 (string) second bounding box
	     = (boolean) `true` if they intersect
	    \*/
	    R.isBBoxIntersect = function (bbox1, bbox2) {
	        var i = R.isPointInsideBBox;
	        return i(bbox2, bbox1.x, bbox1.y)
	            || i(bbox2, bbox1.x2, bbox1.y)
	            || i(bbox2, bbox1.x, bbox1.y2)
	            || i(bbox2, bbox1.x2, bbox1.y2)
	            || i(bbox1, bbox2.x, bbox2.y)
	            || i(bbox1, bbox2.x2, bbox2.y)
	            || i(bbox1, bbox2.x, bbox2.y2)
	            || i(bbox1, bbox2.x2, bbox2.y2)
	            || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
	            && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
	    };
	    function base3(t, p1, p2, p3, p4) {
	        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
	            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
	        return t * t2 - 3 * p1 + 3 * p2;
	    }
	    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
	        if (z == null) {
	            z = 1;
	        }
	        z = z > 1 ? 1 : z < 0 ? 0 : z;
	        var z2 = z / 2,
	            n = 12,
	            Tvalues = [-0.1252,0.1252,-0.3678,0.3678,-0.5873,0.5873,-0.7699,0.7699,-0.9041,0.9041,-0.9816,0.9816],
	            Cvalues = [0.2491,0.2491,0.2335,0.2335,0.2032,0.2032,0.1601,0.1601,0.1069,0.1069,0.0472,0.0472],
	            sum = 0;
	        for (var i = 0; i < n; i++) {
	            var ct = z2 * Tvalues[i] + z2,
	                xbase = base3(ct, x1, x2, x3, x4),
	                ybase = base3(ct, y1, y2, y3, y4),
	                comb = xbase * xbase + ybase * ybase;
	            sum += Cvalues[i] * math.sqrt(comb);
	        }
	        return z2 * sum;
	    }
	    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
	        if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
	            return;
	        }
	        var t = 1,
	            step = t / 2,
	            t2 = t - step,
	            l,
	            e = .01;
	        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
	        while (abs(l - ll) > e) {
	            step /= 2;
	            t2 += (l < ll ? 1 : -1) * step;
	            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
	        }
	        return t2;
	    }
	    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
	        if (
	            mmax(x1, x2) < mmin(x3, x4) ||
	            mmin(x1, x2) > mmax(x3, x4) ||
	            mmax(y1, y2) < mmin(y3, y4) ||
	            mmin(y1, y2) > mmax(y3, y4)
	        ) {
	            return;
	        }
	        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
	            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
	            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

	        if (!denominator) {
	            return;
	        }
	        var px = nx / denominator,
	            py = ny / denominator,
	            px2 = +px.toFixed(2),
	            py2 = +py.toFixed(2);
	        if (
	            px2 < +mmin(x1, x2).toFixed(2) ||
	            px2 > +mmax(x1, x2).toFixed(2) ||
	            px2 < +mmin(x3, x4).toFixed(2) ||
	            px2 > +mmax(x3, x4).toFixed(2) ||
	            py2 < +mmin(y1, y2).toFixed(2) ||
	            py2 > +mmax(y1, y2).toFixed(2) ||
	            py2 < +mmin(y3, y4).toFixed(2) ||
	            py2 > +mmax(y3, y4).toFixed(2)
	        ) {
	            return;
	        }
	        return {x: px, y: py};
	    }
	    function inter(bez1, bez2) {
	        return interHelper(bez1, bez2);
	    }
	    function interCount(bez1, bez2) {
	        return interHelper(bez1, bez2, 1);
	    }
	    function interHelper(bez1, bez2, justCount) {
	        var bbox1 = R.bezierBBox(bez1),
	            bbox2 = R.bezierBBox(bez2);
	        if (!R.isBBoxIntersect(bbox1, bbox2)) {
	            return justCount ? 0 : [];
	        }
	        var l1 = bezlen.apply(0, bez1),
	            l2 = bezlen.apply(0, bez2),
	            n1 = mmax(~~(l1 / 5), 1),
	            n2 = mmax(~~(l2 / 5), 1),
	            dots1 = [],
	            dots2 = [],
	            xy = {},
	            res = justCount ? 0 : [];
	        for (var i = 0; i < n1 + 1; i++) {
	            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
	            dots1.push({x: p.x, y: p.y, t: i / n1});
	        }
	        for (i = 0; i < n2 + 1; i++) {
	            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
	            dots2.push({x: p.x, y: p.y, t: i / n2});
	        }
	        for (i = 0; i < n1; i++) {
	            for (var j = 0; j < n2; j++) {
	                var di = dots1[i],
	                    di1 = dots1[i + 1],
	                    dj = dots2[j],
	                    dj1 = dots2[j + 1],
	                    ci = abs(di1.x - di.x) < .001 ? "y" : "x",
	                    cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
	                    is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
	                if (is) {
	                    if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
	                        continue;
	                    }
	                    xy[is.x.toFixed(4)] = is.y.toFixed(4);
	                    var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
	                        t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
	                    if (t1 >= 0 && t1 <= 1.001 && t2 >= 0 && t2 <= 1.001) {
	                        if (justCount) {
	                            res++;
	                        } else {
	                            res.push({
	                                x: is.x,
	                                y: is.y,
	                                t1: mmin(t1, 1),
	                                t2: mmin(t2, 1)
	                            });
	                        }
	                    }
	                }
	            }
	        }
	        return res;
	    }
	    /*\
	     * Raphael.pathIntersection
	     [ method ]
	     **
	     * Utility method
	     **
	     * Finds intersections of two paths
	     > Parameters
	     - path1 (string) path string
	     - path2 (string) path string
	     = (array) dots of intersection
	     o [
	     o     {
	     o         x: (number) x coordinate of the point
	     o         y: (number) y coordinate of the point
	     o         t1: (number) t value for segment of path1
	     o         t2: (number) t value for segment of path2
	     o         segment1: (number) order number for segment of path1
	     o         segment2: (number) order number for segment of path2
	     o         bez1: (array) eight coordinates representing bezi�r curve for the segment of path1
	     o         bez2: (array) eight coordinates representing bezi�r curve for the segment of path2
	     o     }
	     o ]
	    \*/
	    R.pathIntersection = function (path1, path2) {
	        return interPathHelper(path1, path2);
	    };
	    R.pathIntersectionNumber = function (path1, path2) {
	        return interPathHelper(path1, path2, 1);
	    };
	    function interPathHelper(path1, path2, justCount) {
	        path1 = R._path2curve(path1);
	        path2 = R._path2curve(path2);
	        var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
	            res = justCount ? 0 : [];
	        for (var i = 0, ii = path1.length; i < ii; i++) {
	            var pi = path1[i];
	            if (pi[0] == "M") {
	                x1 = x1m = pi[1];
	                y1 = y1m = pi[2];
	            } else {
	                if (pi[0] == "C") {
	                    bez1 = [x1, y1].concat(pi.slice(1));
	                    x1 = bez1[6];
	                    y1 = bez1[7];
	                } else {
	                    bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
	                    x1 = x1m;
	                    y1 = y1m;
	                }
	                for (var j = 0, jj = path2.length; j < jj; j++) {
	                    var pj = path2[j];
	                    if (pj[0] == "M") {
	                        x2 = x2m = pj[1];
	                        y2 = y2m = pj[2];
	                    } else {
	                        if (pj[0] == "C") {
	                            bez2 = [x2, y2].concat(pj.slice(1));
	                            x2 = bez2[6];
	                            y2 = bez2[7];
	                        } else {
	                            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
	                            x2 = x2m;
	                            y2 = y2m;
	                        }
	                        var intr = interHelper(bez1, bez2, justCount);
	                        if (justCount) {
	                            res += intr;
	                        } else {
	                            for (var k = 0, kk = intr.length; k < kk; k++) {
	                                intr[k].segment1 = i;
	                                intr[k].segment2 = j;
	                                intr[k].bez1 = bez1;
	                                intr[k].bez2 = bez2;
	                            }
	                            res = res.concat(intr);
	                        }
	                    }
	                }
	            }
	        }
	        return res;
	    }
	    /*\
	     * Raphael.isPointInsidePath
	     [ method ]
	     **
	     * Utility method
	     **
	     * Returns `true` if given point is inside a given closed path.
	     > Parameters
	     - path (string) path string
	     - x (number) x of the point
	     - y (number) y of the point
	     = (boolean) true, if point is inside the path
	    \*/
	    R.isPointInsidePath = function (path, x, y) {
	        var bbox = R.pathBBox(path);
	        return R.isPointInsideBBox(bbox, x, y) &&
	               interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
	    };
	    R._removedFactory = function (methodname) {
	        return function () {
	            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname);
	        };
	    };
	    /*\
	     * Raphael.pathBBox
	     [ method ]
	     **
	     * Utility method
	     **
	     * Return bounding box of a given path
	     > Parameters
	     - path (string) path string
	     = (object) bounding box
	     o {
	     o     x: (number) x coordinate of the left top point of the box
	     o     y: (number) y coordinate of the left top point of the box
	     o     x2: (number) x coordinate of the right bottom point of the box
	     o     y2: (number) y coordinate of the right bottom point of the box
	     o     width: (number) width of the box
	     o     height: (number) height of the box
	     o     cx: (number) x coordinate of the center of the box
	     o     cy: (number) y coordinate of the center of the box
	     o }
	    \*/
	    var pathDimensions = R.pathBBox = function (path) {
	        var pth = paths(path);
	        if (pth.bbox) {
	            return clone(pth.bbox);
	        }
	        if (!path) {
	            return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
	        }
	        path = path2curve(path);
	        var x = 0,
	            y = 0,
	            X = [],
	            Y = [],
	            p;
	        for (var i = 0, ii = path.length; i < ii; i++) {
	            p = path[i];
	            if (p[0] == "M") {
	                x = p[1];
	                y = p[2];
	                X.push(x);
	                Y.push(y);
	            } else {
	                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
	                X = X[concat](dim.min.x, dim.max.x);
	                Y = Y[concat](dim.min.y, dim.max.y);
	                x = p[5];
	                y = p[6];
	            }
	        }
	        var xmin = mmin[apply](0, X),
	            ymin = mmin[apply](0, Y),
	            xmax = mmax[apply](0, X),
	            ymax = mmax[apply](0, Y),
	            width = xmax - xmin,
	            height = ymax - ymin,
	                bb = {
	                x: xmin,
	                y: ymin,
	                x2: xmax,
	                y2: ymax,
	                width: width,
	                height: height,
	                cx: xmin + width / 2,
	                cy: ymin + height / 2
	            };
	        pth.bbox = clone(bb);
	        return bb;
	    },
	        pathClone = function (pathArray) {
	            var res = clone(pathArray);
	            res.toString = R._path2string;
	            return res;
	        },
	        pathToRelative = R._pathToRelative = function (pathArray) {
	            var pth = paths(pathArray);
	            if (pth.rel) {
	                return pathClone(pth.rel);
	            }
	            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
	                pathArray = R.parsePathString(pathArray);
	            }
	            var res = [],
	                x = 0,
	                y = 0,
	                mx = 0,
	                my = 0,
	                start = 0;
	            if (pathArray[0][0] == "M") {
	                x = pathArray[0][1];
	                y = pathArray[0][2];
	                mx = x;
	                my = y;
	                start++;
	                res.push(["M", x, y]);
	            }
	            for (var i = start, ii = pathArray.length; i < ii; i++) {
	                var r = res[i] = [],
	                    pa = pathArray[i];
	                if (pa[0] != lowerCase.call(pa[0])) {
	                    r[0] = lowerCase.call(pa[0]);
	                    switch (r[0]) {
	                        case "a":
	                            r[1] = pa[1];
	                            r[2] = pa[2];
	                            r[3] = pa[3];
	                            r[4] = pa[4];
	                            r[5] = pa[5];
	                            r[6] = +(pa[6] - x).toFixed(3);
	                            r[7] = +(pa[7] - y).toFixed(3);
	                            break;
	                        case "v":
	                            r[1] = +(pa[1] - y).toFixed(3);
	                            break;
	                        case "m":
	                            mx = pa[1];
	                            my = pa[2];
	                        default:
	                            for (var j = 1, jj = pa.length; j < jj; j++) {
	                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
	                            }
	                    }
	                } else {
	                    r = res[i] = [];
	                    if (pa[0] == "m") {
	                        mx = pa[1] + x;
	                        my = pa[2] + y;
	                    }
	                    for (var k = 0, kk = pa.length; k < kk; k++) {
	                        res[i][k] = pa[k];
	                    }
	                }
	                var len = res[i].length;
	                switch (res[i][0]) {
	                    case "z":
	                        x = mx;
	                        y = my;
	                        break;
	                    case "h":
	                        x += +res[i][len - 1];
	                        break;
	                    case "v":
	                        y += +res[i][len - 1];
	                        break;
	                    default:
	                        x += +res[i][len - 2];
	                        y += +res[i][len - 1];
	                }
	            }
	            res.toString = R._path2string;
	            pth.rel = pathClone(res);
	            return res;
	        },
	        pathToAbsolute = R._pathToAbsolute = function (pathArray) {
	            var pth = paths(pathArray);
	            if (pth.abs) {
	                return pathClone(pth.abs);
	            }
	            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
	                pathArray = R.parsePathString(pathArray);
	            }
	            if (!pathArray || !pathArray.length) {
	                return [["M", 0, 0]];
	            }
	            var res = [],
	                x = 0,
	                y = 0,
	                mx = 0,
	                my = 0,
	                start = 0;
	            if (pathArray[0][0] == "M") {
	                x = +pathArray[0][1];
	                y = +pathArray[0][2];
	                mx = x;
	                my = y;
	                start++;
	                res[0] = ["M", x, y];
	            }
	            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
	            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
	                res.push(r = []);
	                pa = pathArray[i];
	                if (pa[0] != upperCase.call(pa[0])) {
	                    r[0] = upperCase.call(pa[0]);
	                    switch (r[0]) {
	                        case "A":
	                            r[1] = pa[1];
	                            r[2] = pa[2];
	                            r[3] = pa[3];
	                            r[4] = pa[4];
	                            r[5] = pa[5];
	                            r[6] = +(pa[6] + x);
	                            r[7] = +(pa[7] + y);
	                            break;
	                        case "V":
	                            r[1] = +pa[1] + y;
	                            break;
	                        case "H":
	                            r[1] = +pa[1] + x;
	                            break;
	                        case "R":
	                            var dots = [x, y][concat](pa.slice(1));
	                            for (var j = 2, jj = dots.length; j < jj; j++) {
	                                dots[j] = +dots[j] + x;
	                                dots[++j] = +dots[j] + y;
	                            }
	                            res.pop();
	                            res = res[concat](catmullRom2bezier(dots, crz));
	                            break;
	                        case "M":
	                            mx = +pa[1] + x;
	                            my = +pa[2] + y;
	                        default:
	                            for (j = 1, jj = pa.length; j < jj; j++) {
	                                r[j] = +pa[j] + ((j % 2) ? x : y);
	                            }
	                    }
	                } else if (pa[0] == "R") {
	                    dots = [x, y][concat](pa.slice(1));
	                    res.pop();
	                    res = res[concat](catmullRom2bezier(dots, crz));
	                    r = ["R"][concat](pa.slice(-2));
	                } else {
	                    for (var k = 0, kk = pa.length; k < kk; k++) {
	                        r[k] = pa[k];
	                    }
	                }
	                switch (r[0]) {
	                    case "Z":
	                        x = mx;
	                        y = my;
	                        break;
	                    case "H":
	                        x = r[1];
	                        break;
	                    case "V":
	                        y = r[1];
	                        break;
	                    case "M":
	                        mx = r[r.length - 2];
	                        my = r[r.length - 1];
	                    default:
	                        x = r[r.length - 2];
	                        y = r[r.length - 1];
	                }
	            }
	            res.toString = R._path2string;
	            pth.abs = pathClone(res);
	            return res;
	        },
	        l2c = function (x1, y1, x2, y2) {
	            return [x1, y1, x2, y2, x2, y2];
	        },
	        q2c = function (x1, y1, ax, ay, x2, y2) {
	            var _13 = 1 / 3,
	                _23 = 2 / 3;
	            return [
	                    _13 * x1 + _23 * ax,
	                    _13 * y1 + _23 * ay,
	                    _13 * x2 + _23 * ax,
	                    _13 * y2 + _23 * ay,
	                    x2,
	                    y2
	                ];
	        },
	        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	            // for more information of where this math came from visit:
	            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	            var _120 = PI * 120 / 180,
	                rad = PI / 180 * (+angle || 0),
	                res = [],
	                xy,
	                rotate = cacher(function (x, y, rad) {
	                    var X = x * math.cos(rad) - y * math.sin(rad),
	                        Y = x * math.sin(rad) + y * math.cos(rad);
	                    return {x: X, y: Y};
	                });
	            if (!recursive) {
	                xy = rotate(x1, y1, -rad);
	                x1 = xy.x;
	                y1 = xy.y;
	                xy = rotate(x2, y2, -rad);
	                x2 = xy.x;
	                y2 = xy.y;
	                var cos = math.cos(PI / 180 * angle),
	                    sin = math.sin(PI / 180 * angle),
	                    x = (x1 - x2) / 2,
	                    y = (y1 - y2) / 2;
	                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
	                if (h > 1) {
	                    h = math.sqrt(h);
	                    rx = h * rx;
	                    ry = h * ry;
	                }
	                var rx2 = rx * rx,
	                    ry2 = ry * ry,
	                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
	                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
	                    cx = k * rx * y / ry + (x1 + x2) / 2,
	                    cy = k * -ry * x / rx + (y1 + y2) / 2,
	                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
	                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

	                f1 = x1 < cx ? PI - f1 : f1;
	                f2 = x2 < cx ? PI - f2 : f2;
	                f1 < 0 && (f1 = PI * 2 + f1);
	                f2 < 0 && (f2 = PI * 2 + f2);
	                if (sweep_flag && f1 > f2) {
	                    f1 = f1 - PI * 2;
	                }
	                if (!sweep_flag && f2 > f1) {
	                    f2 = f2 - PI * 2;
	                }
	            } else {
	                f1 = recursive[0];
	                f2 = recursive[1];
	                cx = recursive[2];
	                cy = recursive[3];
	            }
	            var df = f2 - f1;
	            if (abs(df) > _120) {
	                var f2old = f2,
	                    x2old = x2,
	                    y2old = y2;
	                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
	                x2 = cx + rx * math.cos(f2);
	                y2 = cy + ry * math.sin(f2);
	                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
	            }
	            df = f2 - f1;
	            var c1 = math.cos(f1),
	                s1 = math.sin(f1),
	                c2 = math.cos(f2),
	                s2 = math.sin(f2),
	                t = math.tan(df / 4),
	                hx = 4 / 3 * rx * t,
	                hy = 4 / 3 * ry * t,
	                m1 = [x1, y1],
	                m2 = [x1 + hx * s1, y1 - hy * c1],
	                m3 = [x2 + hx * s2, y2 - hy * c2],
	                m4 = [x2, y2];
	            m2[0] = 2 * m1[0] - m2[0];
	            m2[1] = 2 * m1[1] - m2[1];
	            if (recursive) {
	                return [m2, m3, m4][concat](res);
	            } else {
	                res = [m2, m3, m4][concat](res).join()[split](",");
	                var newres = [];
	                for (var i = 0, ii = res.length; i < ii; i++) {
	                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
	                }
	                return newres;
	            }
	        },
	        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
	            var t1 = 1 - t;
	            return {
	                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
	                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
	            };
	        },
	        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
	            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
	                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
	                c = p1x - c1x,
	                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
	                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
	                y = [p1y, p2y],
	                x = [p1x, p2x],
	                dot;
	            abs(t1) > "1e12" && (t1 = .5);
	            abs(t2) > "1e12" && (t2 = .5);
	            if (t1 > 0 && t1 < 1) {
	                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
	                x.push(dot.x);
	                y.push(dot.y);
	            }
	            if (t2 > 0 && t2 < 1) {
	                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
	                x.push(dot.x);
	                y.push(dot.y);
	            }
	            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
	            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
	            c = p1y - c1y;
	            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
	            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
	            abs(t1) > "1e12" && (t1 = .5);
	            abs(t2) > "1e12" && (t2 = .5);
	            if (t1 > 0 && t1 < 1) {
	                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
	                x.push(dot.x);
	                y.push(dot.y);
	            }
	            if (t2 > 0 && t2 < 1) {
	                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
	                x.push(dot.x);
	                y.push(dot.y);
	            }
	            return {
	                min: {x: mmin[apply](0, x), y: mmin[apply](0, y)},
	                max: {x: mmax[apply](0, x), y: mmax[apply](0, y)}
	            };
	        }),
	        path2curve = R._path2curve = cacher(function (path, path2) {
	            var pth = !path2 && paths(path);
	            if (!path2 && pth.curve) {
	                return pathClone(pth.curve);
	            }
	            var p = pathToAbsolute(path),
	                p2 = path2 && pathToAbsolute(path2),
	                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
	                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
	                processPath = function (path, d, pcom) {
	                    var nx, ny, tq = {T:1, Q:1};
	                    if (!path) {
	                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
	                    }
	                    !(path[0] in tq) && (d.qx = d.qy = null);
	                    switch (path[0]) {
	                        case "M":
	                            d.X = path[1];
	                            d.Y = path[2];
	                            break;
	                        case "A":
	                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
	                            break;
	                        case "S":
	                            if (pcom == "C" || pcom == "S") { // In "S" case we have to take into account, if the previous command is C/S.
	                                nx = d.x * 2 - d.bx;          // And reflect the previous
	                                ny = d.y * 2 - d.by;          // command's control point relative to the current point.
	                            }
	                            else {                            // or some else or nothing
	                                nx = d.x;
	                                ny = d.y;
	                            }
	                            path = ["C", nx, ny][concat](path.slice(1));
	                            break;
	                        case "T":
	                            if (pcom == "Q" || pcom == "T") { // In "T" case we have to take into account, if the previous command is Q/T.
	                                d.qx = d.x * 2 - d.qx;        // And make a reflection similar
	                                d.qy = d.y * 2 - d.qy;        // to case "S".
	                            }
	                            else {                            // or something else or nothing
	                                d.qx = d.x;
	                                d.qy = d.y;
	                            }
	                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
	                            break;
	                        case "Q":
	                            d.qx = path[1];
	                            d.qy = path[2];
	                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
	                            break;
	                        case "L":
	                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
	                            break;
	                        case "H":
	                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
	                            break;
	                        case "V":
	                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
	                            break;
	                        case "Z":
	                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
	                            break;
	                    }
	                    return path;
	                },
	                fixArc = function (pp, i) {
	                    if (pp[i].length > 7) {
	                        pp[i].shift();
	                        var pi = pp[i];
	                        while (pi.length) {
	                            pcoms1[i]="A"; // if created multiple C:s, their original seg is saved
	                            p2 && (pcoms2[i]="A"); // the same as above
	                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
	                        }
	                        pp.splice(i, 1);
	                        ii = mmax(p.length, p2 && p2.length || 0);
	                    }
	                },
	                fixM = function (path1, path2, a1, a2, i) {
	                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
	                        path2.splice(i, 0, ["M", a2.x, a2.y]);
	                        a1.bx = 0;
	                        a1.by = 0;
	                        a1.x = path1[i][1];
	                        a1.y = path1[i][2];
	                        ii = mmax(p.length, p2 && p2.length || 0);
	                    }
	                },
	                pcoms1 = [], // path commands of original path p
	                pcoms2 = [], // path commands of original path p2
	                pfirst = "", // temporary holder for original path command
	                pcom = ""; // holder for previous path command of original path
	            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
	                p[i] && (pfirst = p[i][0]); // save current path command

	                if (pfirst != "C") // C is not saved yet, because it may be result of conversion
	                {
	                    pcoms1[i] = pfirst; // Save current path command
	                    i && ( pcom = pcoms1[i-1]); // Get previous path command pcom
	                }
	                p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

	                if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
	                // which may produce multiple C:s
	                // so we have to make sure that C is also C in original path

	                fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

	                if (p2) { // the same procedures is done to p2
	                    p2[i] && (pfirst = p2[i][0]);
	                    if (pfirst != "C")
	                    {
	                        pcoms2[i] = pfirst;
	                        i && (pcom = pcoms2[i-1]);
	                    }
	                    p2[i] = processPath(p2[i], attrs2, pcom);

	                    if (pcoms2[i]!="A" && pfirst=="C") pcoms2[i]="C";

	                    fixArc(p2, i);
	                }
	                fixM(p, p2, attrs, attrs2, i);
	                fixM(p2, p, attrs2, attrs, i);
	                var seg = p[i],
	                    seg2 = p2 && p2[i],
	                    seglen = seg.length,
	                    seg2len = p2 && seg2.length;
	                attrs.x = seg[seglen - 2];
	                attrs.y = seg[seglen - 1];
	                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
	                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
	                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
	                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
	                attrs2.x = p2 && seg2[seg2len - 2];
	                attrs2.y = p2 && seg2[seg2len - 1];
	            }
	            if (!p2) {
	                pth.curve = pathClone(p);
	            }
	            return p2 ? [p, p2] : p;
	        }, null, pathClone),
	        parseDots = R._parseDots = cacher(function (gradient) {
	            var dots = [];
	            for (var i = 0, ii = gradient.length; i < ii; i++) {
	                var dot = {},
	                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
	                dot.color = R.getRGB(par[1]);
	                if (dot.color.error) {
	                    return null;
	                }
	                dot.opacity = dot.color.opacity;
	                dot.color = dot.color.hex;
	                par[2] && (dot.offset = par[2] + "%");
	                dots.push(dot);
	            }
	            for (i = 1, ii = dots.length - 1; i < ii; i++) {
	                if (!dots[i].offset) {
	                    var start = toFloat(dots[i - 1].offset || 0),
	                        end = 0;
	                    for (var j = i + 1; j < ii; j++) {
	                        if (dots[j].offset) {
	                            end = dots[j].offset;
	                            break;
	                        }
	                    }
	                    if (!end) {
	                        end = 100;
	                        j = ii;
	                    }
	                    end = toFloat(end);
	                    var d = (end - start) / (j - i + 1);
	                    for (; i < j; i++) {
	                        start += d;
	                        dots[i].offset = start + "%";
	                    }
	                }
	            }
	            return dots;
	        }),
	        tear = R._tear = function (el, paper) {
	            el == paper.top && (paper.top = el.prev);
	            el == paper.bottom && (paper.bottom = el.next);
	            el.next && (el.next.prev = el.prev);
	            el.prev && (el.prev.next = el.next);
	        },
	        tofront = R._tofront = function (el, paper) {
	            if (paper.top === el) {
	                return;
	            }
	            tear(el, paper);
	            el.next = null;
	            el.prev = paper.top;
	            paper.top.next = el;
	            paper.top = el;
	        },
	        toback = R._toback = function (el, paper) {
	            if (paper.bottom === el) {
	                return;
	            }
	            tear(el, paper);
	            el.next = paper.bottom;
	            el.prev = null;
	            paper.bottom.prev = el;
	            paper.bottom = el;
	        },
	        insertafter = R._insertafter = function (el, el2, paper) {
	            tear(el, paper);
	            el2 == paper.top && (paper.top = el);
	            el2.next && (el2.next.prev = el);
	            el.next = el2.next;
	            el.prev = el2;
	            el2.next = el;
	        },
	        insertbefore = R._insertbefore = function (el, el2, paper) {
	            tear(el, paper);
	            el2 == paper.bottom && (paper.bottom = el);
	            el2.prev && (el2.prev.next = el);
	            el.prev = el2.prev;
	            el2.prev = el;
	            el.next = el2;
	        },
	        /*\
	         * Raphael.toMatrix
	         [ method ]
	         **
	         * Utility method
	         **
	         * Returns matrix of transformations applied to a given path
	         > Parameters
	         - path (string) path string
	         - transform (string|array) transformation string
	         = (object) @Matrix
	        \*/
	        toMatrix = R.toMatrix = function (path, transform) {
	            var bb = pathDimensions(path),
	                el = {
	                    _: {
	                        transform: E
	                    },
	                    getBBox: function () {
	                        return bb;
	                    }
	                };
	            extractTransform(el, transform);
	            return el.matrix;
	        },
	        /*\
	         * Raphael.transformPath
	         [ method ]
	         **
	         * Utility method
	         **
	         * Returns path transformed by a given transformation
	         > Parameters
	         - path (string) path string
	         - transform (string|array) transformation string
	         = (string) path
	        \*/
	        transformPath = R.transformPath = function (path, transform) {
	            return mapPath(path, toMatrix(path, transform));
	        },
	        extractTransform = R._extractTransform = function (el, tstr) {
	            if (tstr == null) {
	                return el._.transform;
	            }
	            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
	            var tdata = R.parseTransformString(tstr),
	                deg = 0,
	                dx = 0,
	                dy = 0,
	                sx = 1,
	                sy = 1,
	                _ = el._,
	                m = new Matrix;
	            _.transform = tdata || [];
	            if (tdata) {
	                for (var i = 0, ii = tdata.length; i < ii; i++) {
	                    var t = tdata[i],
	                        tlen = t.length,
	                        command = Str(t[0]).toLowerCase(),
	                        absolute = t[0] != command,
	                        inver = absolute ? m.invert() : 0,
	                        x1,
	                        y1,
	                        x2,
	                        y2,
	                        bb;
	                    if (command == "t" && tlen == 3) {
	                        if (absolute) {
	                            x1 = inver.x(0, 0);
	                            y1 = inver.y(0, 0);
	                            x2 = inver.x(t[1], t[2]);
	                            y2 = inver.y(t[1], t[2]);
	                            m.translate(x2 - x1, y2 - y1);
	                        } else {
	                            m.translate(t[1], t[2]);
	                        }
	                    } else if (command == "r") {
	                        if (tlen == 2) {
	                            bb = bb || el.getBBox(1);
	                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
	                            deg += t[1];
	                        } else if (tlen == 4) {
	                            if (absolute) {
	                                x2 = inver.x(t[2], t[3]);
	                                y2 = inver.y(t[2], t[3]);
	                                m.rotate(t[1], x2, y2);
	                            } else {
	                                m.rotate(t[1], t[2], t[3]);
	                            }
	                            deg += t[1];
	                        }
	                    } else if (command == "s") {
	                        if (tlen == 2 || tlen == 3) {
	                            bb = bb || el.getBBox(1);
	                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
	                            sx *= t[1];
	                            sy *= t[tlen - 1];
	                        } else if (tlen == 5) {
	                            if (absolute) {
	                                x2 = inver.x(t[3], t[4]);
	                                y2 = inver.y(t[3], t[4]);
	                                m.scale(t[1], t[2], x2, y2);
	                            } else {
	                                m.scale(t[1], t[2], t[3], t[4]);
	                            }
	                            sx *= t[1];
	                            sy *= t[2];
	                        }
	                    } else if (command == "m" && tlen == 7) {
	                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
	                    }
	                    _.dirtyT = 1;
	                    el.matrix = m;
	                }
	            }

	            /*\
	             * Element.matrix
	             [ property (object) ]
	             **
	             * Keeps @Matrix object, which represents element transformation
	            \*/
	            el.matrix = m;

	            _.sx = sx;
	            _.sy = sy;
	            _.deg = deg;
	            _.dx = dx = m.e;
	            _.dy = dy = m.f;

	            if (sx == 1 && sy == 1 && !deg && _.bbox) {
	                _.bbox.x += +dx;
	                _.bbox.y += +dy;
	            } else {
	                _.dirtyT = 1;
	            }
	        },
	        getEmpty = function (item) {
	            var l = item[0];
	            switch (l.toLowerCase()) {
	                case "t": return [l, 0, 0];
	                case "m": return [l, 1, 0, 0, 1, 0, 0];
	                case "r": if (item.length == 4) {
	                    return [l, 0, item[2], item[3]];
	                } else {
	                    return [l, 0];
	                }
	                case "s": if (item.length == 5) {
	                    return [l, 1, 1, item[3], item[4]];
	                } else if (item.length == 3) {
	                    return [l, 1, 1];
	                } else {
	                    return [l, 1];
	                }
	            }
	        },
	        equaliseTransform = R._equaliseTransform = function (t1, t2) {
	            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
	            t1 = R.parseTransformString(t1) || [];
	            t2 = R.parseTransformString(t2) || [];
	            var maxlength = mmax(t1.length, t2.length),
	                from = [],
	                to = [],
	                i = 0, j, jj,
	                tt1, tt2;
	            for (; i < maxlength; i++) {
	                tt1 = t1[i] || getEmpty(t2[i]);
	                tt2 = t2[i] || getEmpty(tt1);
	                if ((tt1[0] != tt2[0]) ||
	                    (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) ||
	                    (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))
	                    ) {
	                    return;
	                }
	                from[i] = [];
	                to[i] = [];
	                for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
	                    j in tt1 && (from[i][j] = tt1[j]);
	                    j in tt2 && (to[i][j] = tt2[j]);
	                }
	            }
	            return {
	                from: from,
	                to: to
	            };
	        };
	    R._getContainer = function (x, y, w, h) {
	        var container;
	        container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
	        if (container == null) {
	            return;
	        }
	        if (container.tagName) {
	            if (y == null) {
	                return {
	                    container: container,
	                    width: container.style.pixelWidth || container.offsetWidth,
	                    height: container.style.pixelHeight || container.offsetHeight
	                };
	            } else {
	                return {
	                    container: container,
	                    width: y,
	                    height: w
	                };
	            }
	        }
	        return {
	            container: 1,
	            x: x,
	            y: y,
	            width: w,
	            height: h
	        };
	    };
	    /*\
	     * Raphael.pathToRelative
	     [ method ]
	     **
	     * Utility method
	     **
	     * Converts path to relative form
	     > Parameters
	     - pathString (string|array) path string or array of segments
	     = (array) array of segments.
	    \*/
	    R.pathToRelative = pathToRelative;
	    R._engine = {};
	    /*\
	     * Raphael.path2curve
	     [ method ]
	     **
	     * Utility method
	     **
	     * Converts path to a new path where all segments are cubic bezier curves.
	     > Parameters
	     - pathString (string|array) path string or array of segments
	     = (array) array of segments.
	    \*/
	    R.path2curve = path2curve;
	    /*\
	     * Raphael.matrix
	     [ method ]
	     **
	     * Utility method
	     **
	     * Returns matrix based on given parameters.
	     > Parameters
	     - a (number)
	     - b (number)
	     - c (number)
	     - d (number)
	     - e (number)
	     - f (number)
	     = (object) @Matrix
	    \*/
	    R.matrix = function (a, b, c, d, e, f) {
	        return new Matrix(a, b, c, d, e, f);
	    };
	    function Matrix(a, b, c, d, e, f) {
	        if (a != null) {
	            this.a = +a;
	            this.b = +b;
	            this.c = +c;
	            this.d = +d;
	            this.e = +e;
	            this.f = +f;
	        } else {
	            this.a = 1;
	            this.b = 0;
	            this.c = 0;
	            this.d = 1;
	            this.e = 0;
	            this.f = 0;
	        }
	    }
	    (function (matrixproto) {
	        /*\
	         * Matrix.add
	         [ method ]
	         **
	         * Adds given matrix to existing one.
	         > Parameters
	         - a (number)
	         - b (number)
	         - c (number)
	         - d (number)
	         - e (number)
	         - f (number)
	         or
	         - matrix (object) @Matrix
	        \*/
	        matrixproto.add = function (a, b, c, d, e, f) {
	            var out = [[], [], []],
	                m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
	                matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
	                x, y, z, res;

	            if (a && a instanceof Matrix) {
	                matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]];
	            }

	            for (x = 0; x < 3; x++) {
	                for (y = 0; y < 3; y++) {
	                    res = 0;
	                    for (z = 0; z < 3; z++) {
	                        res += m[x][z] * matrix[z][y];
	                    }
	                    out[x][y] = res;
	                }
	            }
	            this.a = out[0][0];
	            this.b = out[1][0];
	            this.c = out[0][1];
	            this.d = out[1][1];
	            this.e = out[0][2];
	            this.f = out[1][2];
	        };
	        /*\
	         * Matrix.invert
	         [ method ]
	         **
	         * Returns inverted version of the matrix
	         = (object) @Matrix
	        \*/
	        matrixproto.invert = function () {
	            var me = this,
	                x = me.a * me.d - me.b * me.c;
	            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
	        };
	        /*\
	         * Matrix.clone
	         [ method ]
	         **
	         * Returns copy of the matrix
	         = (object) @Matrix
	        \*/
	        matrixproto.clone = function () {
	            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
	        };
	        /*\
	         * Matrix.translate
	         [ method ]
	         **
	         * Translate the matrix
	         > Parameters
	         - x (number)
	         - y (number)
	        \*/
	        matrixproto.translate = function (x, y) {
	            this.add(1, 0, 0, 1, x, y);
	        };
	        /*\
	         * Matrix.scale
	         [ method ]
	         **
	         * Scales the matrix
	         > Parameters
	         - x (number)
	         - y (number) #optional
	         - cx (number) #optional
	         - cy (number) #optional
	        \*/
	        matrixproto.scale = function (x, y, cx, cy) {
	            y == null && (y = x);
	            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
	            this.add(x, 0, 0, y, 0, 0);
	            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
	        };
	        /*\
	         * Matrix.rotate
	         [ method ]
	         **
	         * Rotates the matrix
	         > Parameters
	         - a (number)
	         - x (number)
	         - y (number)
	        \*/
	        matrixproto.rotate = function (a, x, y) {
	            a = R.rad(a);
	            x = x || 0;
	            y = y || 0;
	            var cos = +math.cos(a).toFixed(9),
	                sin = +math.sin(a).toFixed(9);
	            this.add(cos, sin, -sin, cos, x, y);
	            this.add(1, 0, 0, 1, -x, -y);
	        };
	        /*\
	         * Matrix.x
	         [ method ]
	         **
	         * Return x coordinate for given point after transformation described by the matrix. See also @Matrix.y
	         > Parameters
	         - x (number)
	         - y (number)
	         = (number) x
	        \*/
	        matrixproto.x = function (x, y) {
	            return x * this.a + y * this.c + this.e;
	        };
	        /*\
	         * Matrix.y
	         [ method ]
	         **
	         * Return y coordinate for given point after transformation described by the matrix. See also @Matrix.x
	         > Parameters
	         - x (number)
	         - y (number)
	         = (number) y
	        \*/
	        matrixproto.y = function (x, y) {
	            return x * this.b + y * this.d + this.f;
	        };
	        matrixproto.get = function (i) {
	            return +this[Str.fromCharCode(97 + i)].toFixed(4);
	        };
	        matrixproto.toString = function () {
	            return R.svg ?
	                "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" :
	                [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
	        };
	        matrixproto.toFilter = function () {
	            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) +
	                ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) +
	                ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
	        };
	        matrixproto.offset = function () {
	            return [this.e.toFixed(4), this.f.toFixed(4)];
	        };
	        function norm(a) {
	            return a[0] * a[0] + a[1] * a[1];
	        }
	        function normalize(a) {
	            var mag = math.sqrt(norm(a));
	            a[0] && (a[0] /= mag);
	            a[1] && (a[1] /= mag);
	        }
	        /*\
	         * Matrix.split
	         [ method ]
	         **
	         * Splits matrix into primitive transformations
	         = (object) in format:
	         o dx (number) translation by x
	         o dy (number) translation by y
	         o scalex (number) scale by x
	         o scaley (number) scale by y
	         o shear (number) shear
	         o rotate (number) rotation in deg
	         o isSimple (boolean) could it be represented via simple transformations
	        \*/
	        matrixproto.split = function () {
	            var out = {};
	            // translation
	            out.dx = this.e;
	            out.dy = this.f;

	            // scale and shear
	            var row = [[this.a, this.c], [this.b, this.d]];
	            out.scalex = math.sqrt(norm(row[0]));
	            normalize(row[0]);

	            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
	            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

	            out.scaley = math.sqrt(norm(row[1]));
	            normalize(row[1]);
	            out.shear /= out.scaley;

	            // rotation
	            var sin = -row[0][1],
	                cos = row[1][1];
	            if (cos < 0) {
	                out.rotate = R.deg(math.acos(cos));
	                if (sin < 0) {
	                    out.rotate = 360 - out.rotate;
	                }
	            } else {
	                out.rotate = R.deg(math.asin(sin));
	            }

	            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
	            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
	            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
	            return out;
	        };
	        /*\
	         * Matrix.toTransformString
	         [ method ]
	         **
	         * Return transform string that represents given matrix
	         = (string) transform string
	        \*/
	        matrixproto.toTransformString = function (shorter) {
	            var s = shorter || this[split]();
	            if (s.isSimple) {
	                s.scalex = +s.scalex.toFixed(4);
	                s.scaley = +s.scaley.toFixed(4);
	                s.rotate = +s.rotate.toFixed(4);
	                return  (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) +
	                        (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) +
	                        (s.rotate ? "r" + [s.rotate, 0, 0] : E);
	            } else {
	                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
	            }
	        };
	    })(Matrix.prototype);

	    var preventDefault = function () {
	        this.returnValue = false;
	    },
	    preventTouch = function () {
	        return this.originalEvent.preventDefault();
	    },
	    stopPropagation = function () {
	        this.cancelBubble = true;
	    },
	    stopTouch = function () {
	        return this.originalEvent.stopPropagation();
	    },
	    getEventPosition = function (e) {
	        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
	            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;

	        return {
	            x: e.clientX + scrollX,
	            y: e.clientY + scrollY
	        };
	    },
	    addEvent = (function () {
	        if (g.doc.addEventListener) {
	            return function (obj, type, fn, element) {
	                var f = function (e) {
	                    var pos = getEventPosition(e);
	                    return fn.call(element, e, pos.x, pos.y);
	                };
	                obj.addEventListener(type, f, false);

	                if (supportsTouch && touchMap[type]) {
	                    var _f = function (e) {
	                        var pos = getEventPosition(e),
	                            olde = e;

	                        for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
	                            if (e.targetTouches[i].target == obj) {
	                                e = e.targetTouches[i];
	                                e.originalEvent = olde;
	                                e.preventDefault = preventTouch;
	                                e.stopPropagation = stopTouch;
	                                break;
	                            }
	                        }

	                        return fn.call(element, e, pos.x, pos.y);
	                    };
	                    obj.addEventListener(touchMap[type], _f, false);
	                }

	                return function () {
	                    obj.removeEventListener(type, f, false);

	                    if (supportsTouch && touchMap[type])
	                        obj.removeEventListener(touchMap[type], _f, false);

	                    return true;
	                };
	            };
	        } else if (g.doc.attachEvent) {
	            return function (obj, type, fn, element) {
	                var f = function (e) {
	                    e = e || g.win.event;
	                    var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
	                        scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
	                        x = e.clientX + scrollX,
	                        y = e.clientY + scrollY;
	                    e.preventDefault = e.preventDefault || preventDefault;
	                    e.stopPropagation = e.stopPropagation || stopPropagation;
	                    return fn.call(element, e, x, y);
	                };
	                obj.attachEvent("on" + type, f);
	                var detacher = function () {
	                    obj.detachEvent("on" + type, f);
	                    return true;
	                };
	                return detacher;
	            };
	        }
	    })(),
	    drag = [],
	    dragMove = function (e) {
	        var x = e.clientX,
	            y = e.clientY,
	            scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
	            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
	            dragi,
	            j = drag.length;
	        while (j--) {
	            dragi = drag[j];
	            if (supportsTouch && e.touches) {
	                var i = e.touches.length,
	                    touch;
	                while (i--) {
	                    touch = e.touches[i];
	                    if (touch.identifier == dragi.el._drag.id) {
	                        x = touch.clientX;
	                        y = touch.clientY;
	                        (e.originalEvent ? e.originalEvent : e).preventDefault();
	                        break;
	                    }
	                }
	            } else {
	                e.preventDefault();
	            }
	            var node = dragi.el.node,
	                o,
	                next = node.nextSibling,
	                parent = node.parentNode,
	                display = node.style.display;
	            g.win.opera && parent.removeChild(node);
	            node.style.display = "none";
	            o = dragi.el.paper.getElementByPoint(x, y);
	            node.style.display = display;
	            g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
	            o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
	            x += scrollX;
	            y += scrollY;
	            eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
	        }
	    },
	    dragUp = function (e) {
	        R.unmousemove(dragMove).unmouseup(dragUp);
	        var i = drag.length,
	            dragi;
	        while (i--) {
	            dragi = drag[i];
	            dragi.el._drag = {};
	            eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
	        }
	        drag = [];
	    },
	    /*\
	     * Raphael.el
	     [ property (object) ]
	     **
	     * You can add your own method to elements. This is useful when you want to hack default functionality or
	     * want to wrap some common transformation or attributes in one method. In difference to canvas methods,
	     * you can redefine element method at any time. Expending element methods wouldn�t affect set.
	     > Usage
	     | Raphael.el.red = function () {
	     |     this.attr({fill: "#f00"});
	     | };
	     | // then use it
	     | paper.circle(100, 100, 20).red();
	    \*/
	    elproto = R.el = {};
	    /*\
	     * Element.click
	     [ method ]
	     **
	     * Adds event handler for click for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.unclick
	     [ method ]
	     **
	     * Removes event handler for click for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.dblclick
	     [ method ]
	     **
	     * Adds event handler for double click for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.undblclick
	     [ method ]
	     **
	     * Removes event handler for double click for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.mousedown
	     [ method ]
	     **
	     * Adds event handler for mousedown for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.unmousedown
	     [ method ]
	     **
	     * Removes event handler for mousedown for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.mousemove
	     [ method ]
	     **
	     * Adds event handler for mousemove for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.unmousemove
	     [ method ]
	     **
	     * Removes event handler for mousemove for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.mouseout
	     [ method ]
	     **
	     * Adds event handler for mouseout for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.unmouseout
	     [ method ]
	     **
	     * Removes event handler for mouseout for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.mouseover
	     [ method ]
	     **
	     * Adds event handler for mouseover for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.unmouseover
	     [ method ]
	     **
	     * Removes event handler for mouseover for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.mouseup
	     [ method ]
	     **
	     * Adds event handler for mouseup for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.unmouseup
	     [ method ]
	     **
	     * Removes event handler for mouseup for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.touchstart
	     [ method ]
	     **
	     * Adds event handler for touchstart for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.untouchstart
	     [ method ]
	     **
	     * Removes event handler for touchstart for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.touchmove
	     [ method ]
	     **
	     * Adds event handler for touchmove for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.untouchmove
	     [ method ]
	     **
	     * Removes event handler for touchmove for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.touchend
	     [ method ]
	     **
	     * Adds event handler for touchend for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.untouchend
	     [ method ]
	     **
	     * Removes event handler for touchend for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/

	    /*\
	     * Element.touchcancel
	     [ method ]
	     **
	     * Adds event handler for touchcancel for the element.
	     > Parameters
	     - handler (function) handler for the event
	     = (object) @Element
	    \*/
	    /*\
	     * Element.untouchcancel
	     [ method ]
	     **
	     * Removes event handler for touchcancel for the element.
	     > Parameters
	     - handler (function) #optional handler for the event
	     = (object) @Element
	    \*/
	    for (var i = events.length; i--;) {
	        (function (eventName) {
	            R[eventName] = elproto[eventName] = function (fn, scope) {
	                if (R.is(fn, "function")) {
	                    this.events = this.events || [];
	                    this.events.push({name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)});
	                }
	                return this;
	            };
	            R["un" + eventName] = elproto["un" + eventName] = function (fn) {
	                var events = this.events || [],
	                    l = events.length;
	                while (l--){
	                    if (events[l].name == eventName && (R.is(fn, "undefined") || events[l].f == fn)) {
	                        events[l].unbind();
	                        events.splice(l, 1);
	                        !events.length && delete this.events;
	                    }
	                }
	                return this;
	            };
	        })(events[i]);
	    }

	    /*\
	     * Element.data
	     [ method ]
	     **
	     * Adds or retrieves given value associated with given key.
	     **
	     * See also @Element.removeData
	     > Parameters
	     - key (string) key to store data
	     - value (any) #optional value to store
	     = (object) @Element
	     * or, if value is not specified:
	     = (any) value
	     * or, if key and value are not specified:
	     = (object) Key/value pairs for all the data associated with the element.
	     > Usage
	     | for (var i = 0, i < 5, i++) {
	     |     paper.circle(10 + 15 * i, 10, 10)
	     |          .attr({fill: "#000"})
	     |          .data("i", i)
	     |          .click(function () {
	     |             alert(this.data("i"));
	     |          });
	     | }
	    \*/
	    elproto.data = function (key, value) {
	        var data = eldata[this.id] = eldata[this.id] || {};
	        if (arguments.length == 0) {
	            return data;
	        }
	        if (arguments.length == 1) {
	            if (R.is(key, "object")) {
	                for (var i in key) if (key[has](i)) {
	                    this.data(i, key[i]);
	                }
	                return this;
	            }
	            eve("raphael.data.get." + this.id, this, data[key], key);
	            return data[key];
	        }
	        data[key] = value;
	        eve("raphael.data.set." + this.id, this, value, key);
	        return this;
	    };
	    /*\
	     * Element.removeData
	     [ method ]
	     **
	     * Removes value associated with an element by given key.
	     * If key is not provided, removes all the data of the element.
	     > Parameters
	     - key (string) #optional key
	     = (object) @Element
	    \*/
	    elproto.removeData = function (key) {
	        if (key == null) {
	            eldata[this.id] = {};
	        } else {
	            eldata[this.id] && delete eldata[this.id][key];
	        }
	        return this;
	    };
	     /*\
	     * Element.getData
	     [ method ]
	     **
	     * Retrieves the element data
	     = (object) data
	    \*/
	    elproto.getData = function () {
	        return clone(eldata[this.id] || {});
	    };
	    /*\
	     * Element.hover
	     [ method ]
	     **
	     * Adds event handlers for hover for the element.
	     > Parameters
	     - f_in (function) handler for hover in
	     - f_out (function) handler for hover out
	     - icontext (object) #optional context for hover in handler
	     - ocontext (object) #optional context for hover out handler
	     = (object) @Element
	    \*/
	    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
	        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
	    };
	    /*\
	     * Element.unhover
	     [ method ]
	     **
	     * Removes event handlers for hover for the element.
	     > Parameters
	     - f_in (function) handler for hover in
	     - f_out (function) handler for hover out
	     = (object) @Element
	    \*/
	    elproto.unhover = function (f_in, f_out) {
	        return this.unmouseover(f_in).unmouseout(f_out);
	    };
	    var draggable = [];
	    /*\
	     * Element.drag
	     [ method ]
	     **
	     * Adds event handlers for drag of the element.
	     > Parameters
	     - onmove (function) handler for moving
	     - onstart (function) handler for drag start
	     - onend (function) handler for drag end
	     - mcontext (object) #optional context for moving handler
	     - scontext (object) #optional context for drag start handler
	     - econtext (object) #optional context for drag end handler
	     * Additionally following `drag` events will be triggered: `drag.start.<id>` on start,
	     * `drag.end.<id>` on end and `drag.move.<id>` on every move. When element will be dragged over another element
	     * `drag.over.<id>` will be fired as well.
	     *
	     * Start event and start handler will be called in specified context or in context of the element with following parameters:
	     o x (number) x position of the mouse
	     o y (number) y position of the mouse
	     o event (object) DOM event object
	     * Move event and move handler will be called in specified context or in context of the element with following parameters:
	     o dx (number) shift by x from the start point
	     o dy (number) shift by y from the start point
	     o x (number) x position of the mouse
	     o y (number) y position of the mouse
	     o event (object) DOM event object
	     * End event and end handler will be called in specified context or in context of the element with following parameters:
	     o event (object) DOM event object
	     = (object) @Element
	    \*/
	    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
	        function start(e) {
	            (e.originalEvent || e).preventDefault();
	            var x = e.clientX,
	                y = e.clientY,
	                scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
	                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
	            this._drag.id = e.identifier;
	            if (supportsTouch && e.touches) {
	                var i = e.touches.length, touch;
	                while (i--) {
	                    touch = e.touches[i];
	                    this._drag.id = touch.identifier;
	                    if (touch.identifier == this._drag.id) {
	                        x = touch.clientX;
	                        y = touch.clientY;
	                        break;
	                    }
	                }
	            }
	            this._drag.x = x + scrollX;
	            this._drag.y = y + scrollY;
	            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
	            drag.push({el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
	            onstart && eve.on("raphael.drag.start." + this.id, onstart);
	            onmove && eve.on("raphael.drag.move." + this.id, onmove);
	            onend && eve.on("raphael.drag.end." + this.id, onend);
	            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
	        }
	        this._drag = {};
	        draggable.push({el: this, start: start});
	        this.mousedown(start);
	        return this;
	    };
	    /*\
	     * Element.onDragOver
	     [ method ]
	     **
	     * Shortcut for assigning event handler for `drag.over.<id>` event, where id is id of the element (see @Element.id).
	     > Parameters
	     - f (function) handler for event, first argument would be the element you are dragging over
	    \*/
	    elproto.onDragOver = function (f) {
	        f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
	    };
	    /*\
	     * Element.undrag
	     [ method ]
	     **
	     * Removes all drag event handlers from given element.
	    \*/
	    elproto.undrag = function () {
	        var i = draggable.length;
	        while (i--) if (draggable[i].el == this) {
	            this.unmousedown(draggable[i].start);
	            draggable.splice(i, 1);
	            eve.unbind("raphael.drag.*." + this.id);
	        }
	        !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
	        drag = [];
	    };
	    /*\
	     * Paper.circle
	     [ method ]
	     **
	     * Draws a circle.
	     **
	     > Parameters
	     **
	     - x (number) x coordinate of the centre
	     - y (number) y coordinate of the centre
	     - r (number) radius
	     = (object) Rapha�l element object with type �circle�
	     **
	     > Usage
	     | var c = paper.circle(50, 50, 40);
	    \*/
	    paperproto.circle = function (x, y, r) {
	        var out = R._engine.circle(this, x || 0, y || 0, r || 0);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };
	    /*\
	     * Paper.rect
	     [ method ]
	     *
	     * Draws a rectangle.
	     **
	     > Parameters
	     **
	     - x (number) x coordinate of the top left corner
	     - y (number) y coordinate of the top left corner
	     - width (number) width
	     - height (number) height
	     - r (number) #optional radius for rounded corners, default is 0
	     = (object) Rapha�l element object with type �rect�
	     **
	     > Usage
	     | // regular rectangle
	     | var c = paper.rect(10, 10, 50, 50);
	     | // rectangle with rounded corners
	     | var c = paper.rect(40, 40, 50, 50, 10);
	    \*/
	    paperproto.rect = function (x, y, w, h, r) {
	        var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };
	    /*\
	     * Paper.ellipse
	     [ method ]
	     **
	     * Draws an ellipse.
	     **
	     > Parameters
	     **
	     - x (number) x coordinate of the centre
	     - y (number) y coordinate of the centre
	     - rx (number) horizontal radius
	     - ry (number) vertical radius
	     = (object) Rapha�l element object with type �ellipse�
	     **
	     > Usage
	     | var c = paper.ellipse(50, 50, 40, 20);
	    \*/
	    paperproto.ellipse = function (x, y, rx, ry) {
	        var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };
	    /*\
	     * Paper.path
	     [ method ]
	     **
	     * Creates a path element by given path data string.
	     > Parameters
	     - pathString (string) #optional path string in SVG format.
	     * Path string consists of one-letter commands, followed by comma seprarated arguments in numercal form. Example:
	     | "M10,20L30,40"
	     * Here we can see two commands: �M�, with arguments `(10, 20)` and �L� with arguments `(30, 40)`. Upper case letter mean command is absolute, lower case�relative.
	     *
	     # <p>Here is short list of commands available, for more details see <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path's data attribute's format are described in the SVG specification.">SVG path string format</a>.</p>
	     # <table><thead><tr><th>Command</th><th>Name</th><th>Parameters</th></tr></thead><tbody>
	     # <tr><td>M</td><td>moveto</td><td>(x y)+</td></tr>
	     # <tr><td>Z</td><td>closepath</td><td>(none)</td></tr>
	     # <tr><td>L</td><td>lineto</td><td>(x y)+</td></tr>
	     # <tr><td>H</td><td>horizontal lineto</td><td>x+</td></tr>
	     # <tr><td>V</td><td>vertical lineto</td><td>y+</td></tr>
	     # <tr><td>C</td><td>curveto</td><td>(x1 y1 x2 y2 x y)+</td></tr>
	     # <tr><td>S</td><td>smooth curveto</td><td>(x2 y2 x y)+</td></tr>
	     # <tr><td>Q</td><td>quadratic B�zier curveto</td><td>(x1 y1 x y)+</td></tr>
	     # <tr><td>T</td><td>smooth quadratic B�zier curveto</td><td>(x y)+</td></tr>
	     # <tr><td>A</td><td>elliptical arc</td><td>(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+</td></tr>
	     # <tr><td>R</td><td><a href="http://en.wikipedia.org/wiki/Catmull�Rom_spline#Catmull.E2.80.93Rom_spline">Catmull-Rom curveto</a>*</td><td>x1 y1 (x y)+</td></tr></tbody></table>
	     * * �Catmull-Rom curveto� is a not standard SVG command and added in 2.0 to make life easier.
	     * Note: there is a special case when path consist of just three commands: �M10,10R�z�. In this case path will smoothly connects to its beginning.
	     > Usage
	     | var c = paper.path("M10 10L90 90");
	     | // draw a diagonal line:
	     | // move to 10,10, line to 90,90
	     * For example of path strings, check out these icons: http://raphaeljs.com/icons/
	    \*/
	    paperproto.path = function (pathString) {
	        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
	        var out = R._engine.path(R.format[apply](R, arguments), this);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };
	    /*\
	     * Paper.image
	     [ method ]
	     **
	     * Embeds an image into the surface.
	     **
	     > Parameters
	     **
	     - src (string) URI of the source image
	     - x (number) x coordinate position
	     - y (number) y coordinate position
	     - width (number) width of the image
	     - height (number) height of the image
	     = (object) Rapha�l element object with type �image�
	     **
	     > Usage
	     | var c = paper.image("apple.png", 10, 10, 80, 80);
	    \*/
	    paperproto.image = function (src, x, y, w, h) {
	        var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };
	    /*\
	     * Paper.text
	     [ method ]
	     **
	     * Draws a text string. If you need line breaks, put �\n� in the string.
	     **
	     > Parameters
	     **
	     - x (number) x coordinate position
	     - y (number) y coordinate position
	     - text (string) The text string to draw
	     = (object) Rapha�l element object with type �text�
	     **
	     > Usage
	     | var t = paper.text(50, 50, "Rapha�l\nkicks\nbutt!");
	    \*/
	    paperproto.text = function (x, y, text) {
	        var out = R._engine.text(this, x || 0, y || 0, Str(text));
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };
	    /*\
	     * Paper.set
	     [ method ]
	     **
	     * Creates array-like object to keep and operate several elements at once.
	     * Warning: it doesn�t create any elements for itself in the page, it just groups existing elements.
	     * Sets act as pseudo elements � all methods available to an element can be used on a set.
	     = (object) array-like object that represents set of elements
	     **
	     > Usage
	     | var st = paper.set();
	     | st.push(
	     |     paper.circle(10, 10, 5),
	     |     paper.circle(30, 10, 5)
	     | );
	     | st.attr({fill: "red"}); // changes the fill of both circles
	    \*/
	    paperproto.set = function (itemsArray) {
	        !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
	        var out = new Set(itemsArray);
	        this.__set__ && this.__set__.push(out);
	        out["paper"] = this;
	        out["type"] = "set";
	        return out;
	    };
	    /*\
	     * Paper.setStart
	     [ method ]
	     **
	     * Creates @Paper.set. All elements that will be created after calling this method and before calling
	     * @Paper.setFinish will be added to the set.
	     **
	     > Usage
	     | paper.setStart();
	     | paper.circle(10, 10, 5),
	     | paper.circle(30, 10, 5)
	     | var st = paper.setFinish();
	     | st.attr({fill: "red"}); // changes the fill of both circles
	    \*/
	    paperproto.setStart = function (set) {
	        this.__set__ = set || this.set();
	    };
	    /*\
	     * Paper.setFinish
	     [ method ]
	     **
	     * See @Paper.setStart. This method finishes catching and returns resulting set.
	     **
	     = (object) set
	    \*/
	    paperproto.setFinish = function (set) {
	        var out = this.__set__;
	        delete this.__set__;
	        return out;
	    };
	    /*\
	     * Paper.getSize
	     [ method ]
	     **
	     * Obtains current paper actual size.
	     **
	     = (object)
	     \*/
	    paperproto.getSize = function () {
	        var container = this.canvas.parentNode;
	        return {
	            width: container.offsetWidth,
	            height: container.offsetHeight
	                };
	        };
	    /*\
	     * Paper.setSize
	     [ method ]
	     **
	     * If you need to change dimensions of the canvas call this method
	     **
	     > Parameters
	     **
	     - width (number) new width of the canvas
	     - height (number) new height of the canvas
	    \*/
	    paperproto.setSize = function (width, height) {
	        return R._engine.setSize.call(this, width, height);
	    };
	    /*\
	     * Paper.setViewBox
	     [ method ]
	     **
	     * Sets the view box of the paper. Practically it gives you ability to zoom and pan whole paper surface by
	     * specifying new boundaries.
	     **
	     > Parameters
	     **
	     - x (number) new x position, default is `0`
	     - y (number) new y position, default is `0`
	     - w (number) new width of the canvas
	     - h (number) new height of the canvas
	     - fit (boolean) `true` if you want graphics to fit into new boundary box
	    \*/
	    paperproto.setViewBox = function (x, y, w, h, fit) {
	        return R._engine.setViewBox.call(this, x, y, w, h, fit);
	    };
	    /*\
	     * Paper.top
	     [ property ]
	     **
	     * Points to the topmost element on the paper
	    \*/
	    /*\
	     * Paper.bottom
	     [ property ]
	     **
	     * Points to the bottom element on the paper
	    \*/
	    paperproto.top = paperproto.bottom = null;
	    /*\
	     * Paper.raphael
	     [ property ]
	     **
	     * Points to the @Raphael object/function
	    \*/
	    paperproto.raphael = R;
	    var getOffset = function (elem) {
	        var box = elem.getBoundingClientRect(),
	            doc = elem.ownerDocument,
	            body = doc.body,
	            docElem = doc.documentElement,
	            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
	            top  = box.top  + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop ) - clientTop,
	            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
	        return {
	            y: top,
	            x: left
	        };
	    };
	    /*\
	     * Paper.getElementByPoint
	     [ method ]
	     **
	     * Returns you topmost element under given point.
	     **
	     = (object) Rapha�l element object
	     > Parameters
	     **
	     - x (number) x coordinate from the top left corner of the window
	     - y (number) y coordinate from the top left corner of the window
	     > Usage
	     | paper.getElementByPoint(mouseX, mouseY).attr({stroke: "#f00"});
	    \*/
	    paperproto.getElementByPoint = function (x, y) {
	        var paper = this,
	            svg = paper.canvas,
	            target = g.doc.elementFromPoint(x, y);
	        if (g.win.opera && target.tagName == "svg") {
	            var so = getOffset(svg),
	                sr = svg.createSVGRect();
	            sr.x = x - so.x;
	            sr.y = y - so.y;
	            sr.width = sr.height = 1;
	            var hits = svg.getIntersectionList(sr, null);
	            if (hits.length) {
	                target = hits[hits.length - 1];
	            }
	        }
	        if (!target) {
	            return null;
	        }
	        while (target.parentNode && target != svg.parentNode && !target.raphael) {
	            target = target.parentNode;
	        }
	        target == paper.canvas.parentNode && (target = svg);
	        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
	        return target;
	    };

	    /*\
	     * Paper.getElementsByBBox
	     [ method ]
	     **
	     * Returns set of elements that have an intersecting bounding box
	     **
	     > Parameters
	     **
	     - bbox (object) bbox to check with
	     = (object) @Set
	     \*/
	    paperproto.getElementsByBBox = function (bbox) {
	        var set = this.set();
	        this.forEach(function (el) {
	            if (R.isBBoxIntersect(el.getBBox(), bbox)) {
	                set.push(el);
	            }
	        });
	        return set;
	    };

	    /*\
	     * Paper.getById
	     [ method ]
	     **
	     * Returns you element by its internal ID.
	     **
	     > Parameters
	     **
	     - id (number) id
	     = (object) Rapha�l element object
	    \*/
	    paperproto.getById = function (id) {
	        var bot = this.bottom;
	        while (bot) {
	            if (bot.id == id) {
	                return bot;
	            }
	            bot = bot.next;
	        }
	        return null;
	    };
	    /*\
	     * Paper.forEach
	     [ method ]
	     **
	     * Executes given function for each element on the paper
	     *
	     * If callback function returns `false` it will stop loop running.
	     **
	     > Parameters
	     **
	     - callback (function) function to run
	     - thisArg (object) context object for the callback
	     = (object) Paper object
	     > Usage
	     | paper.forEach(function (el) {
	     |     el.attr({ stroke: "blue" });
	     | });
	    \*/
	    paperproto.forEach = function (callback, thisArg) {
	        var bot = this.bottom;
	        while (bot) {
	            if (callback.call(thisArg, bot) === false) {
	                return this;
	            }
	            bot = bot.next;
	        }
	        return this;
	    };
	    /*\
	     * Paper.getElementsByPoint
	     [ method ]
	     **
	     * Returns set of elements that have common point inside
	     **
	     > Parameters
	     **
	     - x (number) x coordinate of the point
	     - y (number) y coordinate of the point
	     = (object) @Set
	    \*/
	    paperproto.getElementsByPoint = function (x, y) {
	        var set = this.set();
	        this.forEach(function (el) {
	            if (el.isPointInside(x, y)) {
	                set.push(el);
	            }
	        });
	        return set;
	    };
	    function x_y() {
	        return this.x + S + this.y;
	    }
	    function x_y_w_h() {
	        return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
	    }
	    /*\
	     * Element.isPointInside
	     [ method ]
	     **
	     * Determine if given point is inside this element�s shape
	     **
	     > Parameters
	     **
	     - x (number) x coordinate of the point
	     - y (number) y coordinate of the point
	     = (boolean) `true` if point inside the shape
	    \*/
	    elproto.isPointInside = function (x, y) {
	        var rp = this.realPath = getPath[this.type](this);
	        if (this.attr('transform') && this.attr('transform').length) {
	            rp = R.transformPath(rp, this.attr('transform'));
	        }
	        return R.isPointInsidePath(rp, x, y);
	    };
	    /*\
	     * Element.getBBox
	     [ method ]
	     **
	     * Return bounding box for a given element
	     **
	     > Parameters
	     **
	     - isWithoutTransform (boolean) flag, `true` if you want to have bounding box before transformations. Default is `false`.
	     = (object) Bounding box object:
	     o {
	     o     x: (number) top left corner x
	     o     y: (number) top left corner y
	     o     x2: (number) bottom right corner x
	     o     y2: (number) bottom right corner y
	     o     width: (number) width
	     o     height: (number) height
	     o }
	    \*/
	    elproto.getBBox = function (isWithoutTransform) {
	        if (this.removed) {
	            return {};
	        }
	        var _ = this._;
	        if (isWithoutTransform) {
	            if (_.dirty || !_.bboxwt) {
	                this.realPath = getPath[this.type](this);
	                _.bboxwt = pathDimensions(this.realPath);
	                _.bboxwt.toString = x_y_w_h;
	                _.dirty = 0;
	            }
	            return _.bboxwt;
	        }
	        if (_.dirty || _.dirtyT || !_.bbox) {
	            if (_.dirty || !this.realPath) {
	                _.bboxwt = 0;
	                this.realPath = getPath[this.type](this);
	            }
	            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
	            _.bbox.toString = x_y_w_h;
	            _.dirty = _.dirtyT = 0;
	        }
	        return _.bbox;
	    };
	    /*\
	     * Element.clone
	     [ method ]
	     **
	     = (object) clone of a given element
	     **
	    \*/
	    elproto.clone = function () {
	        if (this.removed) {
	            return null;
	        }
	        var out = this.paper[this.type]().attr(this.attr());
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };
	    /*\
	     * Element.glow
	     [ method ]
	     **
	     * Return set of elements that create glow-like effect around given element. See @Paper.set.
	     *
	     * Note: Glow is not connected to the element. If you change element attributes it won�t adjust itself.
	     **
	     > Parameters
	     **
	     - glow (object) #optional parameters object with all properties optional:
	     o {
	     o     width (number) size of the glow, default is `10`
	     o     fill (boolean) will it be filled, default is `false`
	     o     opacity (number) opacity, default is `0.5`
	     o     offsetx (number) horizontal offset, default is `0`
	     o     offsety (number) vertical offset, default is `0`
	     o     color (string) glow colour, default is `black`
	     o }
	     = (object) @Paper.set of elements that represents glow
	    \*/
	    elproto.glow = function (glow) {
	        if (this.type == "text") {
	            return null;
	        }
	        glow = glow || {};
	        var s = {
	            width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
	            fill: glow.fill || false,
	            opacity: glow.opacity == null ? .5 : glow.opacity,
	            offsetx: glow.offsetx || 0,
	            offsety: glow.offsety || 0,
	            color: glow.color || "#000"
	        },
	            c = s.width / 2,
	            r = this.paper,
	            out = r.set(),
	            path = this.realPath || getPath[this.type](this);
	        path = this.matrix ? mapPath(path, this.matrix) : path;
	        for (var i = 1; i < c + 1; i++) {
	            out.push(r.path(path).attr({
	                stroke: s.color,
	                fill: s.fill ? s.color : "none",
	                "stroke-linejoin": "round",
	                "stroke-linecap": "round",
	                "stroke-width": +(s.width / c * i).toFixed(3),
	                opacity: +(s.opacity / c).toFixed(3)
	            }));
	        }
	        return out.insertBefore(this).translate(s.offsetx, s.offsety);
	    };
	    var curveslengths = {},
	    getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
	        if (length == null) {
	            return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
	        } else {
	            return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
	        }
	    },
	    getLengthFactory = function (istotal, subpath) {
	        return function (path, length, onlystart) {
	            path = path2curve(path);
	            var x, y, p, l, sp = "", subpaths = {}, point,
	                len = 0;
	            for (var i = 0, ii = path.length; i < ii; i++) {
	                p = path[i];
	                if (p[0] == "M") {
	                    x = +p[1];
	                    y = +p[2];
	                } else {
	                    l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
	                    if (len + l > length) {
	                        if (subpath && !subpaths.start) {
	                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
	                            sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
	                            if (onlystart) {return sp;}
	                            subpaths.start = sp;
	                            sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
	                            len += l;
	                            x = +p[5];
	                            y = +p[6];
	                            continue;
	                        }
	                        if (!istotal && !subpath) {
	                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
	                            return {x: point.x, y: point.y, alpha: point.alpha};
	                        }
	                    }
	                    len += l;
	                    x = +p[5];
	                    y = +p[6];
	                }
	                sp += p.shift() + p;
	            }
	            subpaths.end = sp;
	            point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
	            point.alpha && (point = {x: point.x, y: point.y, alpha: point.alpha});
	            return point;
	        };
	    };
	    var getTotalLength = getLengthFactory(1),
	        getPointAtLength = getLengthFactory(),
	        getSubpathsAtLength = getLengthFactory(0, 1);
	    /*\
	     * Raphael.getTotalLength
	     [ method ]
	     **
	     * Returns length of the given path in pixels.
	     **
	     > Parameters
	     **
	     - path (string) SVG path string.
	     **
	     = (number) length.
	    \*/
	    R.getTotalLength = getTotalLength;
	    /*\
	     * Raphael.getPointAtLength
	     [ method ]
	     **
	     * Return coordinates of the point located at the given length on the given path.
	     **
	     > Parameters
	     **
	     - path (string) SVG path string
	     - length (number)
	     **
	     = (object) representation of the point:
	     o {
	     o     x: (number) x coordinate
	     o     y: (number) y coordinate
	     o     alpha: (number) angle of derivative
	     o }
	    \*/
	    R.getPointAtLength = getPointAtLength;
	    /*\
	     * Raphael.getSubpath
	     [ method ]
	     **
	     * Return subpath of a given path from given length to given length.
	     **
	     > Parameters
	     **
	     - path (string) SVG path string
	     - from (number) position of the start of the segment
	     - to (number) position of the end of the segment
	     **
	     = (string) pathstring for the segment
	    \*/
	    R.getSubpath = function (path, from, to) {
	        if (this.getTotalLength(path) - to < 1e-6) {
	            return getSubpathsAtLength(path, from).end;
	        }
	        var a = getSubpathsAtLength(path, to, 1);
	        return from ? getSubpathsAtLength(a, from).end : a;
	    };
	    /*\
	     * Element.getTotalLength
	     [ method ]
	     **
	     * Returns length of the path in pixels. Only works for element of �path� type.
	     = (number) length.
	    \*/
	    elproto.getTotalLength = function () {
	        var path = this.getPath();
	        if (!path) {
	            return;
	        }

	        if (this.node.getTotalLength) {
	            return this.node.getTotalLength();
	        }

	        return getTotalLength(path);
	    };
	    /*\
	     * Element.getPointAtLength
	     [ method ]
	     **
	     * Return coordinates of the point located at the given length on the given path. Only works for element of �path� type.
	     **
	     > Parameters
	     **
	     - length (number)
	     **
	     = (object) representation of the point:
	     o {
	     o     x: (number) x coordinate
	     o     y: (number) y coordinate
	     o     alpha: (number) angle of derivative
	     o }
	    \*/
	    elproto.getPointAtLength = function (length) {
	        var path = this.getPath();
	        if (!path) {
	            return;
	        }

	        return getPointAtLength(path, length);
	    };
	    /*\
	     * Element.getPath
	     [ method ]
	     **
	     * Returns path of the element. Only works for elements of �path� type and simple elements like circle.
	     = (object) path
	     **
	    \*/
	    elproto.getPath = function () {
	        var path,
	            getPath = R._getPath[this.type];

	        if (this.type == "text" || this.type == "set") {
	            return;
	        }

	        if (getPath) {
	            path = getPath(this);
	        }

	        return path;
	    };
	    /*\
	     * Element.getSubpath
	     [ method ]
	     **
	     * Return subpath of a given element from given length to given length. Only works for element of �path� type.
	     **
	     > Parameters
	     **
	     - from (number) position of the start of the segment
	     - to (number) position of the end of the segment
	     **
	     = (string) pathstring for the segment
	    \*/
	    elproto.getSubpath = function (from, to) {
	        var path = this.getPath();
	        if (!path) {
	            return;
	        }

	        return R.getSubpath(path, from, to);
	    };
	    /*\
	     * Raphael.easing_formulas
	     [ property ]
	     **
	     * Object that contains easing formulas for animation. You could extend it with your own. By default it has following list of easing:
	     # <ul>
	     #     <li>�linear�</li>
	     #     <li>�&lt;� or �easeIn� or �ease-in�</li>
	     #     <li>�>� or �easeOut� or �ease-out�</li>
	     #     <li>�&lt;>� or �easeInOut� or �ease-in-out�</li>
	     #     <li>�backIn� or �back-in�</li>
	     #     <li>�backOut� or �back-out�</li>
	     #     <li>�elastic�</li>
	     #     <li>�bounce�</li>
	     # </ul>
	     # <p>See also <a href="http://raphaeljs.com/easing.html">Easing demo</a>.</p>
	    \*/
	    var ef = R.easing_formulas = {
	        linear: function (n) {
	            return n;
	        },
	        "<": function (n) {
	            return pow(n, 1.7);
	        },
	        ">": function (n) {
	            return pow(n, .48);
	        },
	        "<>": function (n) {
	            var q = .48 - n / 1.04,
	                Q = math.sqrt(.1734 + q * q),
	                x = Q - q,
	                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
	                y = -Q - q,
	                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
	                t = X + Y + .5;
	            return (1 - t) * 3 * t * t + t * t * t;
	        },
	        backIn: function (n) {
	            var s = 1.70158;
	            return n * n * ((s + 1) * n - s);
	        },
	        backOut: function (n) {
	            n = n - 1;
	            var s = 1.70158;
	            return n * n * ((s + 1) * n + s) + 1;
	        },
	        elastic: function (n) {
	            if (n == !!n) {
	                return n;
	            }
	            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
	        },
	        bounce: function (n) {
	            var s = 7.5625,
	                p = 2.75,
	                l;
	            if (n < (1 / p)) {
	                l = s * n * n;
	            } else {
	                if (n < (2 / p)) {
	                    n -= (1.5 / p);
	                    l = s * n * n + .75;
	                } else {
	                    if (n < (2.5 / p)) {
	                        n -= (2.25 / p);
	                        l = s * n * n + .9375;
	                    } else {
	                        n -= (2.625 / p);
	                        l = s * n * n + .984375;
	                    }
	                }
	            }
	            return l;
	        }
	    };
	    ef.easeIn = ef["ease-in"] = ef["<"];
	    ef.easeOut = ef["ease-out"] = ef[">"];
	    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
	    ef["back-in"] = ef.backIn;
	    ef["back-out"] = ef.backOut;

	    var animationElements = [],
	        requestAnimFrame = window.requestAnimationFrame       ||
	                           window.webkitRequestAnimationFrame ||
	                           window.mozRequestAnimationFrame    ||
	                           window.oRequestAnimationFrame      ||
	                           window.msRequestAnimationFrame     ||
	                           function (callback) {
	                               setTimeout(callback, 16);
	                           },
	        animation = function () {
	            var Now = +new Date,
	                l = 0;
	            for (; l < animationElements.length; l++) {
	                var e = animationElements[l];
	                if (e.el.removed || e.paused) {
	                    continue;
	                }
	                var time = Now - e.start,
	                    ms = e.ms,
	                    easing = e.easing,
	                    from = e.from,
	                    diff = e.diff,
	                    to = e.to,
	                    t = e.t,
	                    that = e.el,
	                    set = {},
	                    now,
	                    init = {},
	                    key;
	                if (e.initstatus) {
	                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
	                    e.status = e.initstatus;
	                    delete e.initstatus;
	                    e.stop && animationElements.splice(l--, 1);
	                } else {
	                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
	                }
	                if (time < 0) {
	                    continue;
	                }
	                if (time < ms) {
	                    var pos = easing(time / ms);
	                    for (var attr in from) if (from[has](attr)) {
	                        switch (availableAnimAttrs[attr]) {
	                            case nu:
	                                now = +from[attr] + pos * ms * diff[attr];
	                                break;
	                            case "colour":
	                                now = "rgb(" + [
	                                    upto255(round(from[attr].r + pos * ms * diff[attr].r)),
	                                    upto255(round(from[attr].g + pos * ms * diff[attr].g)),
	                                    upto255(round(from[attr].b + pos * ms * diff[attr].b))
	                                ].join(",") + ")";
	                                break;
	                            case "path":
	                                now = [];
	                                for (var i = 0, ii = from[attr].length; i < ii; i++) {
	                                    now[i] = [from[attr][i][0]];
	                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
	                                        now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
	                                    }
	                                    now[i] = now[i].join(S);
	                                }
	                                now = now.join(S);
	                                break;
	                            case "transform":
	                                if (diff[attr].real) {
	                                    now = [];
	                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
	                                        now[i] = [from[attr][i][0]];
	                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
	                                            now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
	                                        }
	                                    }
	                                } else {
	                                    var get = function (i) {
	                                        return +from[attr][i] + pos * ms * diff[attr][i];
	                                    };
	                                    // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
	                                    now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]];
	                                }
	                                break;
	                            case "csv":
	                                if (attr == "clip-rect") {
	                                    now = [];
	                                    i = 4;
	                                    while (i--) {
	                                        now[i] = +from[attr][i] + pos * ms * diff[attr][i];
	                                    }
	                                }
	                                break;
	                            default:
	                                var from2 = [][concat](from[attr]);
	                                now = [];
	                                i = that.paper.customAttributes[attr].length;
	                                while (i--) {
	                                    now[i] = +from2[i] + pos * ms * diff[attr][i];
	                                }
	                                break;
	                        }
	                        set[attr] = now;
	                    }
	                    that.attr(set);
	                    (function (id, that, anim) {
	                        setTimeout(function () {
	                            eve("raphael.anim.frame." + id, that, anim);
	                        });
	                    })(that.id, that, e.anim);
	                } else {
	                    (function(f, el, a) {
	                        setTimeout(function() {
	                            eve("raphael.anim.frame." + el.id, el, a);
	                            eve("raphael.anim.finish." + el.id, el, a);
	                            R.is(f, "function") && f.call(el);
	                        });
	                    })(e.callback, that, e.anim);
	                    that.attr(to);
	                    animationElements.splice(l--, 1);
	                    if (e.repeat > 1 && !e.next) {
	                        for (key in to) if (to[has](key)) {
	                            init[key] = e.totalOrigin[key];
	                        }
	                        e.el.attr(init);
	                        runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
	                    }
	                    if (e.next && !e.stop) {
	                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
	                    }
	                }
	            }
	            animationElements.length && requestAnimFrame(animation);
	        },
	        upto255 = function (color) {
	            return color > 255 ? 255 : color < 0 ? 0 : color;
	        };
	    /*\
	     * Element.animateWith
	     [ method ]
	     **
	     * Acts similar to @Element.animate, but ensure that given animation runs in sync with another given element.
	     **
	     > Parameters
	     **
	     - el (object) element to sync with
	     - anim (object) animation to sync with
	     - params (object) #optional final attributes for the element, see also @Element.attr
	     - ms (number) #optional number of milliseconds for animation to run
	     - easing (string) #optional easing type. Accept on of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
	     - callback (function) #optional callback function. Will be called at the end of animation.
	     * or
	     - element (object) element to sync with
	     - anim (object) animation to sync with
	     - animation (object) #optional animation object, see @Raphael.animation
	     **
	     = (object) original element
	    \*/
	    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
	        var element = this;
	        if (element.removed) {
	            callback && callback.call(element);
	            return element;
	        }
	        var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
	            x, y;
	        runAnimation(a, element, a.percents[0], null, element.attr());
	        for (var i = 0, ii = animationElements.length; i < ii; i++) {
	            if (animationElements[i].anim == anim && animationElements[i].el == el) {
	                animationElements[ii - 1].start = animationElements[i].start;
	                break;
	            }
	        }
	        return element;
	        //
	        //
	        // var a = params ? R.animation(params, ms, easing, callback) : anim,
	        //     status = element.status(anim);
	        // return this.animate(a).status(a, status * anim.ms / a.ms);
	    };
	    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
	        var cx = 3 * p1x,
	            bx = 3 * (p2x - p1x) - cx,
	            ax = 1 - cx - bx,
	            cy = 3 * p1y,
	            by = 3 * (p2y - p1y) - cy,
	            ay = 1 - cy - by;
	        function sampleCurveX(t) {
	            return ((ax * t + bx) * t + cx) * t;
	        }
	        function solve(x, epsilon) {
	            var t = solveCurveX(x, epsilon);
	            return ((ay * t + by) * t + cy) * t;
	        }
	        function solveCurveX(x, epsilon) {
	            var t0, t1, t2, x2, d2, i;
	            for(t2 = x, i = 0; i < 8; i++) {
	                x2 = sampleCurveX(t2) - x;
	                if (abs(x2) < epsilon) {
	                    return t2;
	                }
	                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
	                if (abs(d2) < 1e-6) {
	                    break;
	                }
	                t2 = t2 - x2 / d2;
	            }
	            t0 = 0;
	            t1 = 1;
	            t2 = x;
	            if (t2 < t0) {
	                return t0;
	            }
	            if (t2 > t1) {
	                return t1;
	            }
	            while (t0 < t1) {
	                x2 = sampleCurveX(t2);
	                if (abs(x2 - x) < epsilon) {
	                    return t2;
	                }
	                if (x > x2) {
	                    t0 = t2;
	                } else {
	                    t1 = t2;
	                }
	                t2 = (t1 - t0) / 2 + t0;
	            }
	            return t2;
	        }
	        return solve(t, 1 / (200 * duration));
	    }
	    elproto.onAnimation = function (f) {
	        f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
	        return this;
	    };
	    function Animation(anim, ms) {
	        var percents = [],
	            newAnim = {};
	        this.ms = ms;
	        this.times = 1;
	        if (anim) {
	            for (var attr in anim) if (anim[has](attr)) {
	                newAnim[toFloat(attr)] = anim[attr];
	                percents.push(toFloat(attr));
	            }
	            percents.sort(sortByNumber);
	        }
	        this.anim = newAnim;
	        this.top = percents[percents.length - 1];
	        this.percents = percents;
	    }
	    /*\
	     * Animation.delay
	     [ method ]
	     **
	     * Creates a copy of existing animation object with given delay.
	     **
	     > Parameters
	     **
	     - delay (number) number of ms to pass between animation start and actual animation
	     **
	     = (object) new altered Animation object
	     | var anim = Raphael.animation({cx: 10, cy: 20}, 2e3);
	     | circle1.animate(anim); // run the given animation immediately
	     | circle2.animate(anim.delay(500)); // run the given animation after 500 ms
	    \*/
	    Animation.prototype.delay = function (delay) {
	        var a = new Animation(this.anim, this.ms);
	        a.times = this.times;
	        a.del = +delay || 0;
	        return a;
	    };
	    /*\
	     * Animation.repeat
	     [ method ]
	     **
	     * Creates a copy of existing animation object with given repetition.
	     **
	     > Parameters
	     **
	     - repeat (number) number iterations of animation. For infinite animation pass `Infinity`
	     **
	     = (object) new altered Animation object
	    \*/
	    Animation.prototype.repeat = function (times) {
	        var a = new Animation(this.anim, this.ms);
	        a.del = this.del;
	        a.times = math.floor(mmax(times, 0)) || 1;
	        return a;
	    };
	    function runAnimation(anim, element, percent, status, totalOrigin, times) {
	        percent = toFloat(percent);
	        var params,
	            isInAnim,
	            isInAnimSet,
	            percents = [],
	            next,
	            prev,
	            timestamp,
	            ms = anim.ms,
	            from = {},
	            to = {},
	            diff = {};
	        if (status) {
	            for (i = 0, ii = animationElements.length; i < ii; i++) {
	                var e = animationElements[i];
	                if (e.el.id == element.id && e.anim == anim) {
	                    if (e.percent != percent) {
	                        animationElements.splice(i, 1);
	                        isInAnimSet = 1;
	                    } else {
	                        isInAnim = e;
	                    }
	                    element.attr(e.totalOrigin);
	                    break;
	                }
	            }
	        } else {
	            status = +to; // NaN
	        }
	        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
	            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
	                percent = anim.percents[i];
	                prev = anim.percents[i - 1] || 0;
	                ms = ms / anim.top * (percent - prev);
	                next = anim.percents[i + 1];
	                params = anim.anim[percent];
	                break;
	            } else if (status) {
	                element.attr(anim.anim[anim.percents[i]]);
	            }
	        }
	        if (!params) {
	            return;
	        }
	        if (!isInAnim) {
	            for (var attr in params) if (params[has](attr)) {
	                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
	                    from[attr] = element.attr(attr);
	                    (from[attr] == null) && (from[attr] = availableAttrs[attr]);
	                    to[attr] = params[attr];
	                    switch (availableAnimAttrs[attr]) {
	                        case nu:
	                            diff[attr] = (to[attr] - from[attr]) / ms;
	                            break;
	                        case "colour":
	                            from[attr] = R.getRGB(from[attr]);
	                            var toColour = R.getRGB(to[attr]);
	                            diff[attr] = {
	                                r: (toColour.r - from[attr].r) / ms,
	                                g: (toColour.g - from[attr].g) / ms,
	                                b: (toColour.b - from[attr].b) / ms
	                            };
	                            break;
	                        case "path":
	                            var pathes = path2curve(from[attr], to[attr]),
	                                toPath = pathes[1];
	                            from[attr] = pathes[0];
	                            diff[attr] = [];
	                            for (i = 0, ii = from[attr].length; i < ii; i++) {
	                                diff[attr][i] = [0];
	                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
	                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
	                                }
	                            }
	                            break;
	                        case "transform":
	                            var _ = element._,
	                                eq = equaliseTransform(_[attr], to[attr]);
	                            if (eq) {
	                                from[attr] = eq.from;
	                                to[attr] = eq.to;
	                                diff[attr] = [];
	                                diff[attr].real = true;
	                                for (i = 0, ii = from[attr].length; i < ii; i++) {
	                                    diff[attr][i] = [from[attr][i][0]];
	                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
	                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
	                                    }
	                                }
	                            } else {
	                                var m = (element.matrix || new Matrix),
	                                    to2 = {
	                                        _: {transform: _.transform},
	                                        getBBox: function () {
	                                            return element.getBBox(1);
	                                        }
	                                    };
	                                from[attr] = [
	                                    m.a,
	                                    m.b,
	                                    m.c,
	                                    m.d,
	                                    m.e,
	                                    m.f
	                                ];
	                                extractTransform(to2, to[attr]);
	                                to[attr] = to2._.transform;
	                                diff[attr] = [
	                                    (to2.matrix.a - m.a) / ms,
	                                    (to2.matrix.b - m.b) / ms,
	                                    (to2.matrix.c - m.c) / ms,
	                                    (to2.matrix.d - m.d) / ms,
	                                    (to2.matrix.e - m.e) / ms,
	                                    (to2.matrix.f - m.f) / ms
	                                ];
	                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
	                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
	                                // extractTransform(to2, to[attr]);
	                                // diff[attr] = [
	                                //     (to2._.sx - _.sx) / ms,
	                                //     (to2._.sy - _.sy) / ms,
	                                //     (to2._.deg - _.deg) / ms,
	                                //     (to2._.dx - _.dx) / ms,
	                                //     (to2._.dy - _.dy) / ms
	                                // ];
	                            }
	                            break;
	                        case "csv":
	                            var values = Str(params[attr])[split](separator),
	                                from2 = Str(from[attr])[split](separator);
	                            if (attr == "clip-rect") {
	                                from[attr] = from2;
	                                diff[attr] = [];
	                                i = from2.length;
	                                while (i--) {
	                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
	                                }
	                            }
	                            to[attr] = values;
	                            break;
	                        default:
	                            values = [][concat](params[attr]);
	                            from2 = [][concat](from[attr]);
	                            diff[attr] = [];
	                            i = element.paper.customAttributes[attr].length;
	                            while (i--) {
	                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
	                            }
	                            break;
	                    }
	                }
	            }
	            var easing = params.easing,
	                easyeasy = R.easing_formulas[easing];
	            if (!easyeasy) {
	                easyeasy = Str(easing).match(bezierrg);
	                if (easyeasy && easyeasy.length == 5) {
	                    var curve = easyeasy;
	                    easyeasy = function (t) {
	                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
	                    };
	                } else {
	                    easyeasy = pipe;
	                }
	            }
	            timestamp = params.start || anim.start || +new Date;
	            e = {
	                anim: anim,
	                percent: percent,
	                timestamp: timestamp,
	                start: timestamp + (anim.del || 0),
	                status: 0,
	                initstatus: status || 0,
	                stop: false,
	                ms: ms,
	                easing: easyeasy,
	                from: from,
	                diff: diff,
	                to: to,
	                el: element,
	                callback: params.callback,
	                prev: prev,
	                next: next,
	                repeat: times || anim.times,
	                origin: element.attr(),
	                totalOrigin: totalOrigin
	            };
	            animationElements.push(e);
	            if (status && !isInAnim && !isInAnimSet) {
	                e.stop = true;
	                e.start = new Date - ms * status;
	                if (animationElements.length == 1) {
	                    return animation();
	                }
	            }
	            if (isInAnimSet) {
	                e.start = new Date - e.ms * status;
	            }
	            animationElements.length == 1 && requestAnimFrame(animation);
	        } else {
	            isInAnim.initstatus = status;
	            isInAnim.start = new Date - isInAnim.ms * status;
	        }
	        eve("raphael.anim.start." + element.id, element, anim);
	    }
	    /*\
	     * Raphael.animation
	     [ method ]
	     **
	     * Creates an animation object that can be passed to the @Element.animate or @Element.animateWith methods.
	     * See also @Animation.delay and @Animation.repeat methods.
	     **
	     > Parameters
	     **
	     - params (object) final attributes for the element, see also @Element.attr
	     - ms (number) number of milliseconds for animation to run
	     - easing (string) #optional easing type. Accept one of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
	     - callback (function) #optional callback function. Will be called at the end of animation.
	     **
	     = (object) @Animation
	    \*/
	    R.animation = function (params, ms, easing, callback) {
	        if (params instanceof Animation) {
	            return params;
	        }
	        if (R.is(easing, "function") || !easing) {
	            callback = callback || easing || null;
	            easing = null;
	        }
	        params = Object(params);
	        ms = +ms || 0;
	        var p = {},
	            json,
	            attr;
	        for (attr in params) if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
	            json = true;
	            p[attr] = params[attr];
	        }
	        if (!json) {
	            // if percent-like syntax is used and end-of-all animation callback used
	            if(callback){
	                // find the last one
	                var lastKey = 0;
	                for(var i in params){
	                    var percent = toInt(i);
	                    if(params[has](i) && percent > lastKey){
	                        lastKey = percent;
	                    }
	                }
	                lastKey += '%';
	                // if already defined callback in the last keyframe, skip
	                !params[lastKey].callback && (params[lastKey].callback = callback);
	            }
	          return new Animation(params, ms);
	        } else {
	            easing && (p.easing = easing);
	            callback && (p.callback = callback);
	            return new Animation({100: p}, ms);
	        }
	    };
	    /*\
	     * Element.animate
	     [ method ]
	     **
	     * Creates and starts animation for given element.
	     **
	     > Parameters
	     **
	     - params (object) final attributes for the element, see also @Element.attr
	     - ms (number) number of milliseconds for animation to run
	     - easing (string) #optional easing type. Accept one of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
	     - callback (function) #optional callback function. Will be called at the end of animation.
	     * or
	     - animation (object) animation object, see @Raphael.animation
	     **
	     = (object) original element
	    \*/
	    elproto.animate = function (params, ms, easing, callback) {
	        var element = this;
	        if (element.removed) {
	            callback && callback.call(element);
	            return element;
	        }
	        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
	        runAnimation(anim, element, anim.percents[0], null, element.attr());
	        return element;
	    };
	    /*\
	     * Element.setTime
	     [ method ]
	     **
	     * Sets the status of animation of the element in milliseconds. Similar to @Element.status method.
	     **
	     > Parameters
	     **
	     - anim (object) animation object
	     - value (number) number of milliseconds from the beginning of the animation
	     **
	     = (object) original element if `value` is specified
	     * Note, that during animation following events are triggered:
	     *
	     * On each animation frame event `anim.frame.<id>`, on start `anim.start.<id>` and on end `anim.finish.<id>`.
	    \*/
	    elproto.setTime = function (anim, value) {
	        if (anim && value != null) {
	            this.status(anim, mmin(value, anim.ms) / anim.ms);
	        }
	        return this;
	    };
	    /*\
	     * Element.status
	     [ method ]
	     **
	     * Gets or sets the status of animation of the element.
	     **
	     > Parameters
	     **
	     - anim (object) #optional animation object
	     - value (number) #optional 0 � 1. If specified, method works like a setter and sets the status of a given animation to the value. This will cause animation to jump to the given position.
	     **
	     = (number) status
	     * or
	     = (array) status if `anim` is not specified. Array of objects in format:
	     o {
	     o     anim: (object) animation object
	     o     status: (number) status
	     o }
	     * or
	     = (object) original element if `value` is specified
	    \*/
	    elproto.status = function (anim, value) {
	        var out = [],
	            i = 0,
	            len,
	            e;
	        if (value != null) {
	            runAnimation(anim, this, -1, mmin(value, 1));
	            return this;
	        } else {
	            len = animationElements.length;
	            for (; i < len; i++) {
	                e = animationElements[i];
	                if (e.el.id == this.id && (!anim || e.anim == anim)) {
	                    if (anim) {
	                        return e.status;
	                    }
	                    out.push({
	                        anim: e.anim,
	                        status: e.status
	                    });
	                }
	            }
	            if (anim) {
	                return 0;
	            }
	            return out;
	        }
	    };
	    /*\
	     * Element.pause
	     [ method ]
	     **
	     * Stops animation of the element with ability to resume it later on.
	     **
	     > Parameters
	     **
	     - anim (object) #optional animation object
	     **
	     = (object) original element
	    \*/
	    elproto.pause = function (anim) {
	        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
	            if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
	                animationElements[i].paused = true;
	            }
	        }
	        return this;
	    };
	    /*\
	     * Element.resume
	     [ method ]
	     **
	     * Resumes animation if it was paused with @Element.pause method.
	     **
	     > Parameters
	     **
	     - anim (object) #optional animation object
	     **
	     = (object) original element
	    \*/
	    elproto.resume = function (anim) {
	        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
	            var e = animationElements[i];
	            if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
	                delete e.paused;
	                this.status(e.anim, e.status);
	            }
	        }
	        return this;
	    };
	    /*\
	     * Element.stop
	     [ method ]
	     **
	     * Stops animation of the element.
	     **
	     > Parameters
	     **
	     - anim (object) #optional animation object
	     **
	     = (object) original element
	    \*/
	    elproto.stop = function (anim) {
	        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
	            if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
	                animationElements.splice(i--, 1);
	            }
	        }
	        return this;
	    };
	    function stopAnimation(paper) {
	        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.paper == paper) {
	            animationElements.splice(i--, 1);
	        }
	    }
	    eve.on("raphael.remove", stopAnimation);
	    eve.on("raphael.clear", stopAnimation);
	    elproto.toString = function () {
	        return "Rapha\xebl\u2019s object";
	    };

	    // Set
	    var Set = function (items) {
	        this.items = [];
	        this.length = 0;
	        this.type = "set";
	        if (items) {
	            for (var i = 0, ii = items.length; i < ii; i++) {
	                if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
	                    this[this.items.length] = this.items[this.items.length] = items[i];
	                    this.length++;
	                }
	            }
	        }
	    },
	    setproto = Set.prototype;
	    /*\
	     * Set.push
	     [ method ]
	     **
	     * Adds each argument to the current set.
	     = (object) original element
	    \*/
	    setproto.push = function () {
	        var item,
	            len;
	        for (var i = 0, ii = arguments.length; i < ii; i++) {
	            item = arguments[i];
	            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
	                len = this.items.length;
	                this[len] = this.items[len] = item;
	                this.length++;
	            }
	        }
	        return this;
	    };
	    /*\
	     * Set.pop
	     [ method ]
	     **
	     * Removes last element and returns it.
	     = (object) element
	    \*/
	    setproto.pop = function () {
	        this.length && delete this[this.length--];
	        return this.items.pop();
	    };
	    /*\
	     * Set.forEach
	     [ method ]
	     **
	     * Executes given function for each element in the set.
	     *
	     * If function returns `false` it will stop loop running.
	     **
	     > Parameters
	     **
	     - callback (function) function to run
	     - thisArg (object) context object for the callback
	     = (object) Set object
	    \*/
	    setproto.forEach = function (callback, thisArg) {
	        for (var i = 0, ii = this.items.length; i < ii; i++) {
	            if (callback.call(thisArg, this.items[i], i) === false) {
	                return this;
	            }
	        }
	        return this;
	    };
	    for (var method in elproto) if (elproto[has](method)) {
	        setproto[method] = (function (methodname) {
	            return function () {
	                var arg = arguments;
	                return this.forEach(function (el) {
	                    el[methodname][apply](el, arg);
	                });
	            };
	        })(method);
	    }
	    setproto.attr = function (name, value) {
	        if (name && R.is(name, array) && R.is(name[0], "object")) {
	            for (var j = 0, jj = name.length; j < jj; j++) {
	                this.items[j].attr(name[j]);
	            }
	        } else {
	            for (var i = 0, ii = this.items.length; i < ii; i++) {
	                this.items[i].attr(name, value);
	            }
	        }
	        return this;
	    };
	    /*\
	     * Set.clear
	     [ method ]
	     **
	     * Removes all elements from the set
	    \*/
	    setproto.clear = function () {
	        while (this.length) {
	            this.pop();
	        }
	    };
	    /*\
	     * Set.splice
	     [ method ]
	     **
	     * Removes given element from the set
	     **
	     > Parameters
	     **
	     - index (number) position of the deletion
	     - count (number) number of element to remove
	     - insertion� (object) #optional elements to insert
	     = (object) set elements that were deleted
	    \*/
	    setproto.splice = function (index, count, insertion) {
	        index = index < 0 ? mmax(this.length + index, 0) : index;
	        count = mmax(0, mmin(this.length - index, count));
	        var tail = [],
	            todel = [],
	            args = [],
	            i;
	        for (i = 2; i < arguments.length; i++) {
	            args.push(arguments[i]);
	        }
	        for (i = 0; i < count; i++) {
	            todel.push(this[index + i]);
	        }
	        for (; i < this.length - index; i++) {
	            tail.push(this[index + i]);
	        }
	        var arglen = args.length;
	        for (i = 0; i < arglen + tail.length; i++) {
	            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
	        }
	        i = this.items.length = this.length -= count - arglen;
	        while (this[i]) {
	            delete this[i++];
	        }
	        return new Set(todel);
	    };
	    /*\
	     * Set.exclude
	     [ method ]
	     **
	     * Removes given element from the set
	     **
	     > Parameters
	     **
	     - element (object) element to remove
	     = (boolean) `true` if object was found & removed from the set
	    \*/
	    setproto.exclude = function (el) {
	        for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
	            this.splice(i, 1);
	            return true;
	        }
	    };
	    setproto.animate = function (params, ms, easing, callback) {
	        (R.is(easing, "function") || !easing) && (callback = easing || null);
	        var len = this.items.length,
	            i = len,
	            item,
	            set = this,
	            collector;
	        if (!len) {
	            return this;
	        }
	        callback && (collector = function () {
	            !--len && callback.call(set);
	        });
	        easing = R.is(easing, string) ? easing : collector;
	        var anim = R.animation(params, ms, easing, collector);
	        item = this.items[--i].animate(anim);
	        while (i--) {
	            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
	            (this.items[i] && !this.items[i].removed) || len--;
	        }
	        return this;
	    };
	    setproto.insertAfter = function (el) {
	        var i = this.items.length;
	        while (i--) {
	            this.items[i].insertAfter(el);
	        }
	        return this;
	    };
	    setproto.getBBox = function () {
	        var x = [],
	            y = [],
	            x2 = [],
	            y2 = [];
	        for (var i = this.items.length; i--;) if (!this.items[i].removed) {
	            var box = this.items[i].getBBox();
	            x.push(box.x);
	            y.push(box.y);
	            x2.push(box.x + box.width);
	            y2.push(box.y + box.height);
	        }
	        x = mmin[apply](0, x);
	        y = mmin[apply](0, y);
	        x2 = mmax[apply](0, x2);
	        y2 = mmax[apply](0, y2);
	        return {
	            x: x,
	            y: y,
	            x2: x2,
	            y2: y2,
	            width: x2 - x,
	            height: y2 - y
	        };
	    };
	    setproto.clone = function (s) {
	        s = this.paper.set();
	        for (var i = 0, ii = this.items.length; i < ii; i++) {
	            s.push(this.items[i].clone());
	        }
	        return s;
	    };
	    setproto.toString = function () {
	        return "Rapha\xebl\u2018s set";
	    };

	    setproto.glow = function(glowConfig) {
	        var ret = this.paper.set();
	        this.forEach(function(shape, index){
	            var g = shape.glow(glowConfig);
	            if(g != null){
	                g.forEach(function(shape2, index2){
	                    ret.push(shape2);
	                });
	            }
	        });
	        return ret;
	    };


	    /*\
	     * Set.isPointInside
	     [ method ]
	     **
	     * Determine if given point is inside this set�s elements
	     **
	     > Parameters
	     **
	     - x (number) x coordinate of the point
	     - y (number) y coordinate of the point
	     = (boolean) `true` if point is inside any of the set's elements
	     \*/
	    setproto.isPointInside = function (x, y) {
	        var isPointInside = false;
	        this.forEach(function (el) {
	            if (el.isPointInside(x, y)) {
	                isPointInside = true;
	                return false; // stop loop
	            }
	        });
	        return isPointInside;
	    };

	    /*\
	     * Raphael.registerFont
	     [ method ]
	     **
	     * Adds given font to the registered set of fonts for Rapha�l. Should be used as an internal call from within Cuf�n�s font file.
	     * Returns original parameter, so it could be used with chaining.
	     # <a href="http://wiki.github.com/sorccu/cufon/about">More about Cuf�n and how to convert your font form TTF, OTF, etc to JavaScript file.</a>
	     **
	     > Parameters
	     **
	     - font (object) the font to register
	     = (object) the font you passed in
	     > Usage
	     | Cufon.registerFont(Raphael.registerFont({�}));
	    \*/
	    R.registerFont = function (font) {
	        if (!font.face) {
	            return font;
	        }
	        this.fonts = this.fonts || {};
	        var fontcopy = {
	                w: font.w,
	                face: {},
	                glyphs: {}
	            },
	            family = font.face["font-family"];
	        for (var prop in font.face) if (font.face[has](prop)) {
	            fontcopy.face[prop] = font.face[prop];
	        }
	        if (this.fonts[family]) {
	            this.fonts[family].push(fontcopy);
	        } else {
	            this.fonts[family] = [fontcopy];
	        }
	        if (!font.svg) {
	            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
	            for (var glyph in font.glyphs) if (font.glyphs[has](glyph)) {
	                var path = font.glyphs[glyph];
	                fontcopy.glyphs[glyph] = {
	                    w: path.w,
	                    k: {},
	                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
	                            return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[command] || "M";
	                        }) + "z"
	                };
	                if (path.k) {
	                    for (var k in path.k) if (path[has](k)) {
	                        fontcopy.glyphs[glyph].k[k] = path.k[k];
	                    }
	                }
	            }
	        }
	        return font;
	    };
	    /*\
	     * Paper.getFont
	     [ method ]
	     **
	     * Finds font object in the registered fonts by given parameters. You could specify only one word from the font name, like �Myriad� for �Myriad Pro�.
	     **
	     > Parameters
	     **
	     - family (string) font family name or any word from it
	     - weight (string) #optional font weight
	     - style (string) #optional font style
	     - stretch (string) #optional font stretch
	     = (object) the font object
	     > Usage
	     | paper.print(100, 100, "Test string", paper.getFont("Times", 800), 30);
	    \*/
	    paperproto.getFont = function (family, weight, style, stretch) {
	        stretch = stretch || "normal";
	        style = style || "normal";
	        weight = +weight || {normal: 400, bold: 700, lighter: 300, bolder: 800}[weight] || 400;
	        if (!R.fonts) {
	            return;
	        }
	        var font = R.fonts[family];
	        if (!font) {
	            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
	            for (var fontName in R.fonts) if (R.fonts[has](fontName)) {
	                if (name.test(fontName)) {
	                    font = R.fonts[fontName];
	                    break;
	                }
	            }
	        }
	        var thefont;
	        if (font) {
	            for (var i = 0, ii = font.length; i < ii; i++) {
	                thefont = font[i];
	                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
	                    break;
	                }
	            }
	        }
	        return thefont;
	    };
	    /*\
	     * Paper.print
	     [ method ]
	     **
	     * Creates path that represent given text written using given font at given position with given size.
	     * Result of the method is path element that contains whole text as a separate path.
	     **
	     > Parameters
	     **
	     - x (number) x position of the text
	     - y (number) y position of the text
	     - string (string) text to print
	     - font (object) font object, see @Paper.getFont
	     - size (number) #optional size of the font, default is `16`
	     - origin (string) #optional could be `"baseline"` or `"middle"`, default is `"middle"`
	     - letter_spacing (number) #optional number in range `-1..1`, default is `0`
	     - line_spacing (number) #optional number in range `1..3`, default is `1`
	     = (object) resulting path element, which consist of all letters
	     > Usage
	     | var txt = r.print(10, 50, "print", r.getFont("Museo"), 30).attr({fill: "#fff"});
	    \*/
	    paperproto.print = function (x, y, string, font, size, origin, letter_spacing, line_spacing) {
	        origin = origin || "middle"; // baseline|middle
	        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
	        line_spacing = mmax(mmin(line_spacing || 1, 3), 1);
	        var letters = Str(string)[split](E),
	            shift = 0,
	            notfirst = 0,
	            path = E,
	            scale;
	        R.is(font, "string") && (font = this.getFont(font));
	        if (font) {
	            scale = (size || 16) / font.face["units-per-em"];
	            var bb = font.face.bbox[split](separator),
	                top = +bb[0],
	                lineHeight = bb[3] - bb[1],
	                shifty = 0,
	                height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
	            for (var i = 0, ii = letters.length; i < ii; i++) {
	                if (letters[i] == "\n") {
	                    shift = 0;
	                    curr = 0;
	                    notfirst = 0;
	                    shifty += lineHeight * line_spacing;
	                } else {
	                    var prev = notfirst && font.glyphs[letters[i - 1]] || {},
	                        curr = font.glyphs[letters[i]];
	                    shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
	                    notfirst = 1;
	                }
	                if (curr && curr.d) {
	                    path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
	                }
	            }
	        }
	        return this.path(path).attr({
	            fill: "#000",
	            stroke: "none"
	        });
	    };

	    /*\
	     * Paper.add
	     [ method ]
	     **
	     * Imports elements in JSON array in format `{type: type, <attributes>}`
	     **
	     > Parameters
	     **
	     - json (array)
	     = (object) resulting set of imported elements
	     > Usage
	     | paper.add([
	     |     {
	     |         type: "circle",
	     |         cx: 10,
	     |         cy: 10,
	     |         r: 5
	     |     },
	     |     {
	     |         type: "rect",
	     |         x: 10,
	     |         y: 10,
	     |         width: 10,
	     |         height: 10,
	     |         fill: "#fc0"
	     |     }
	     | ]);
	    \*/
	    paperproto.add = function (json) {
	        if (R.is(json, "array")) {
	            var res = this.set(),
	                i = 0,
	                ii = json.length,
	                j;
	            for (; i < ii; i++) {
	                j = json[i] || {};
	                elements[has](j.type) && res.push(this[j.type]().attr(j));
	            }
	        }
	        return res;
	    };

	    /*\
	     * Raphael.format
	     [ method ]
	     **
	     * Simple format function. Replaces construction of type �`{<number>}`� to the corresponding argument.
	     **
	     > Parameters
	     **
	     - token (string) string to format
	     - � (string) rest of arguments will be treated as parameters for replacement
	     = (string) formated string
	     > Usage
	     | var x = 10,
	     |     y = 20,
	     |     width = 40,
	     |     height = 50;
	     | // this will draw a rectangular shape equivalent to "M10,20h40v50h-40z"
	     | paper.path(Raphael.format("M{0},{1}h{2}v{3}h{4}z", x, y, width, height, -width));
	    \*/
	    R.format = function (token, params) {
	        var args = R.is(params, array) ? [0][concat](params) : arguments;
	        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
	            return args[++i] == null ? E : args[i];
	        }));
	        return token || E;
	    };
	    /*\
	     * Raphael.fullfill
	     [ method ]
	     **
	     * A little bit more advanced format function than @Raphael.format. Replaces construction of type �`{<name>}`� to the corresponding argument.
	     **
	     > Parameters
	     **
	     - token (string) string to format
	     - json (object) object which properties will be used as a replacement
	     = (string) formated string
	     > Usage
	     | // this will draw a rectangular shape equivalent to "M10,20h40v50h-40z"
	     | paper.path(Raphael.fullfill("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
	     |     x: 10,
	     |     y: 20,
	     |     dim: {
	     |         width: 40,
	     |         height: 50,
	     |         "negative width": -40
	     |     }
	     | }));
	    \*/
	    R.fullfill = (function () {
	        var tokenRegex = /\{([^\}]+)\}/g,
	            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
	            replacer = function (all, key, obj) {
	                var res = obj;
	                key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
	                    name = name || quotedName;
	                    if (res) {
	                        if (name in res) {
	                            res = res[name];
	                        }
	                        typeof res == "function" && isFunc && (res = res());
	                    }
	                });
	                res = (res == null || res == obj ? all : res) + "";
	                return res;
	            };
	        return function (str, obj) {
	            return String(str).replace(tokenRegex, function (all, key) {
	                return replacer(all, key, obj);
	            });
	        };
	    })();
	    /*\
	     * Raphael.ninja
	     [ method ]
	     **
	     * If you want to leave no trace of Rapha�l (Well, Rapha�l creates only one global variable `Raphael`, but anyway.) You can use `ninja` method.
	     * Beware, that in this case plugins could stop working, because they are depending on global variable existence.
	     **
	     = (object) Raphael object
	     > Usage
	     | (function (local_raphael) {
	     |     var paper = local_raphael(10, 10, 320, 200);
	     |     �
	     | })(Raphael.ninja());
	    \*/
	    R.ninja = function () {
	        if (oldRaphael.was) {
	            g.win.Raphael = oldRaphael.is;
	        } else {
	            // IE8 raises an error when deleting window property
	            window.Raphael = undefined;
	            try {
	                delete window.Raphael;
	            } catch(e) {}
	        }
	        return R;
	    };
	    /*\
	     * Raphael.st
	     [ property (object) ]
	     **
	     * You can add your own method to elements and sets. It is wise to add a set method for each element method
	     * you added, so you will be able to call the same method on sets too.
	     **
	     * See also @Raphael.el.
	     > Usage
	     | Raphael.el.red = function () {
	     |     this.attr({fill: "#f00"});
	     | };
	     | Raphael.st.red = function () {
	     |     this.forEach(function (el) {
	     |         el.red();
	     |     });
	     | };
	     | // then use it
	     | paper.set(paper.circle(100, 100, 20), paper.circle(110, 100, 20)).red();
	    \*/
	    R.st = setproto;

	    eve.on("raphael.DOMload", function () {
	        loaded = true;
	    });

	    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
	    (function (doc, loaded, f) {
	        if (doc.readyState == null && doc.addEventListener){
	            doc.addEventListener(loaded, f = function () {
	                doc.removeEventListener(loaded, f, false);
	                doc.readyState = "complete";
	            }, false);
	            doc.readyState = "loading";
	        }
	        function isLoaded() {
	            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
	        }
	        isLoaded();
	    })(document, "DOMContentLoaded");

	    return R;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
	// 
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	// 
	// http://www.apache.org/licenses/LICENSE-2.0
	// 
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	// +------------------------------------------------------------+ \\
	// � Eve 0.5.0 - JavaScript Events Library                      � \\
	// +------------------------------------------------------------� \\
	// � Author Dmitry Baranovskiy (http://dmitry.baranovskiy.com/) � \\
	// +------------------------------------------------------------+ \\

	(function (glob) {
	    var version = "0.5.0",
	        has = "hasOwnProperty",
	        separator = /[\.\/]/,
	        comaseparator = /\s*,\s*/,
	        wildcard = "*",
	        fun = function () {},
	        numsort = function (a, b) {
	            return a - b;
	        },
	        current_event,
	        stop,
	        events = {n: {}},
	        firstDefined = function () {
	            for (var i = 0, ii = this.length; i < ii; i++) {
	                if (typeof this[i] != "undefined") {
	                    return this[i];
	                }
	            }
	        },
	        lastDefined = function () {
	            var i = this.length;
	            while (--i) {
	                if (typeof this[i] != "undefined") {
	                    return this[i];
	                }
	            }
	        },
	        objtos = Object.prototype.toString,
	        Str = String,
	        isArray = Array.isArray || function (ar) {
	            return ar instanceof Array || objtos.call(ar) == "[object Array]";
	        };
	    /*\
	     * eve
	     [ method ]

	     * Fires event with given `name`, given scope and other parameters.

	     > Arguments

	     - name (string) name of the *event*, dot (`.`) or slash (`/`) separated
	     - scope (object) context for the event handlers
	     - varargs (...) the rest of arguments will be sent to event handlers

	     = (object) array of returned values from the listeners. Array has two methods `.firstDefined()` and `.lastDefined()` to get first or last not `undefined` value.
	    \*/
	        eve = function (name, scope) {
	            var e = events,
	                oldstop = stop,
	                args = Array.prototype.slice.call(arguments, 2),
	                listeners = eve.listeners(name),
	                z = 0,
	                f = false,
	                l,
	                indexed = [],
	                queue = {},
	                out = [],
	                ce = current_event,
	                errors = [];
	            out.firstDefined = firstDefined;
	            out.lastDefined = lastDefined;
	            current_event = name;
	            stop = 0;
	            for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
	                indexed.push(listeners[i].zIndex);
	                if (listeners[i].zIndex < 0) {
	                    queue[listeners[i].zIndex] = listeners[i];
	                }
	            }
	            indexed.sort(numsort);
	            while (indexed[z] < 0) {
	                l = queue[indexed[z++]];
	                out.push(l.apply(scope, args));
	                if (stop) {
	                    stop = oldstop;
	                    return out;
	                }
	            }
	            for (i = 0; i < ii; i++) {
	                l = listeners[i];
	                if ("zIndex" in l) {
	                    if (l.zIndex == indexed[z]) {
	                        out.push(l.apply(scope, args));
	                        if (stop) {
	                            break;
	                        }
	                        do {
	                            z++;
	                            l = queue[indexed[z]];
	                            l && out.push(l.apply(scope, args));
	                            if (stop) {
	                                break;
	                            }
	                        } while (l)
	                    } else {
	                        queue[l.zIndex] = l;
	                    }
	                } else {
	                    out.push(l.apply(scope, args));
	                    if (stop) {
	                        break;
	                    }
	                }
	            }
	            stop = oldstop;
	            current_event = ce;
	            return out;
	        };
	        // Undocumented. Debug only.
	        eve._events = events;
	    /*\
	     * eve.listeners
	     [ method ]

	     * Internal method which gives you array of all event handlers that will be triggered by the given `name`.

	     > Arguments

	     - name (string) name of the event, dot (`.`) or slash (`/`) separated

	     = (array) array of event handlers
	    \*/
	    eve.listeners = function (name) {
	        var names = isArray(name) ? name : name.split(separator),
	            e = events,
	            item,
	            items,
	            k,
	            i,
	            ii,
	            j,
	            jj,
	            nes,
	            es = [e],
	            out = [];
	        for (i = 0, ii = names.length; i < ii; i++) {
	            nes = [];
	            for (j = 0, jj = es.length; j < jj; j++) {
	                e = es[j].n;
	                items = [e[names[i]], e[wildcard]];
	                k = 2;
	                while (k--) {
	                    item = items[k];
	                    if (item) {
	                        nes.push(item);
	                        out = out.concat(item.f || []);
	                    }
	                }
	            }
	            es = nes;
	        }
	        return out;
	    };
	    /*\
	     * eve.separator
	     [ method ]

	     * If for some reasons you don�t like default separators (`.` or `/`) you can specify yours
	     * here. Be aware that if you pass a string longer than one character it will be treated as
	     * a list of characters.

	     - separator (string) new separator. Empty string resets to default: `.` or `/`.
	    \*/
	    eve.separator = function (sep) {
	        if (sep) {
	            sep = Str(sep).replace(/(?=[\.\^\]\[\-])/g, "\\");
	            sep = "[" + sep + "]";
	            separator = new RegExp(sep);
	        } else {
	            separator = /[\.\/]/;
	        }
	    };
	    /*\
	     * eve.on
	     [ method ]
	     **
	     * Binds given event handler with a given name. You can use wildcards �`*`� for the names:
	     | eve.on("*.under.*", f);
	     | eve("mouse.under.floor"); // triggers f
	     * Use @eve to trigger the listener.
	     **
	     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
	     - f (function) event handler function
	     **
	     - name (array) if you don�t want to use separators, you can use array of strings
	     - f (function) event handler function
	     **
	     = (function) returned function accepts a single numeric parameter that represents z-index of the handler. It is an optional feature and only used when you need to ensure that some subset of handlers will be invoked in a given order, despite of the order of assignment. 
	     > Example:
	     | eve.on("mouse", eatIt)(2);
	     | eve.on("mouse", scream);
	     | eve.on("mouse", catchIt)(1);
	     * This will ensure that `catchIt` function will be called before `eatIt`.
	     *
	     * If you want to put your handler before non-indexed handlers, specify a negative value.
	     * Note: I assume most of the time you don�t need to worry about z-index, but it�s nice to have this feature �just in case�.
	    \*/
	    eve.on = function (name, f) {
	        if (typeof f != "function") {
	            return function () {};
	        }
	        var names = isArray(name) ? (isArray(name[0]) ? name : [name]) : Str(name).split(comaseparator);
	        for (var i = 0, ii = names.length; i < ii; i++) {
	            (function (name) {
	                var names = isArray(name) ? name : Str(name).split(separator),
	                    e = events,
	                    exist;
	                for (var i = 0, ii = names.length; i < ii; i++) {
	                    e = e.n;
	                    e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = {n: {}});
	                }
	                e.f = e.f || [];
	                for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
	                    exist = true;
	                    break;
	                }
	                !exist && e.f.push(f);
	            }(names[i]));
	        }
	        return function (zIndex) {
	            if (+zIndex == +zIndex) {
	                f.zIndex = +zIndex;
	            }
	        };
	    };
	    /*\
	     * eve.f
	     [ method ]
	     **
	     * Returns function that will fire given event with optional arguments.
	     * Arguments that will be passed to the result function will be also
	     * concated to the list of final arguments.
	     | el.onclick = eve.f("click", 1, 2);
	     | eve.on("click", function (a, b, c) {
	     |     console.log(a, b, c); // 1, 2, [event object]
	     | });
	     > Arguments
	     - event (string) event name
	     - varargs (�) and any other arguments
	     = (function) possible event handler function
	    \*/
	    eve.f = function (event) {
	        var attrs = [].slice.call(arguments, 1);
	        return function () {
	            eve.apply(null, [event, null].concat(attrs).concat([].slice.call(arguments, 0)));
	        };
	    };
	    /*\
	     * eve.stop
	     [ method ]
	     **
	     * Is used inside an event handler to stop the event, preventing any subsequent listeners from firing.
	    \*/
	    eve.stop = function () {
	        stop = 1;
	    };
	    /*\
	     * eve.nt
	     [ method ]
	     **
	     * Could be used inside event handler to figure out actual name of the event.
	     **
	     > Arguments
	     **
	     - subname (string) #optional subname of the event
	     **
	     = (string) name of the event, if `subname` is not specified
	     * or
	     = (boolean) `true`, if current event�s name contains `subname`
	    \*/
	    eve.nt = function (subname) {
	        var cur = isArray(current_event) ? current_event.join(".") : current_event;
	        if (subname) {
	            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(cur);
	        }
	        return cur;
	    };
	    /*\
	     * eve.nts
	     [ method ]
	     **
	     * Could be used inside event handler to figure out actual name of the event.
	     **
	     **
	     = (array) names of the event
	    \*/
	    eve.nts = function () {
	        return isArray(current_event) ? current_event : current_event.split(separator);
	    };
	    /*\
	     * eve.off
	     [ method ]
	     **
	     * Removes given function from the list of event listeners assigned to given name.
	     * If no arguments specified all the events will be cleared.
	     **
	     > Arguments
	     **
	     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
	     - f (function) event handler function
	    \*/
	    /*\
	     * eve.unbind
	     [ method ]
	     **
	     * See @eve.off
	    \*/
	    eve.off = eve.unbind = function (name, f) {
	        if (!name) {
	            eve._events = events = {n: {}};
	            return;
	        }
	        var names = isArray(name) ? (isArray(name[0]) ? name : [name]) : Str(name).split(comaseparator);
	        if (names.length > 1) {
	            for (var i = 0, ii = names.length; i < ii; i++) {
	                eve.off(names[i], f);
	            }
	            return;
	        }
	        names = isArray(name) ? name : Str(name).split(separator);
	        var e,
	            key,
	            splice,
	            i, ii, j, jj,
	            cur = [events];
	        for (i = 0, ii = names.length; i < ii; i++) {
	            for (j = 0; j < cur.length; j += splice.length - 2) {
	                splice = [j, 1];
	                e = cur[j].n;
	                if (names[i] != wildcard) {
	                    if (e[names[i]]) {
	                        splice.push(e[names[i]]);
	                    }
	                } else {
	                    for (key in e) if (e[has](key)) {
	                        splice.push(e[key]);
	                    }
	                }
	                cur.splice.apply(cur, splice);
	            }
	        }
	        for (i = 0, ii = cur.length; i < ii; i++) {
	            e = cur[i];
	            while (e.n) {
	                if (f) {
	                    if (e.f) {
	                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
	                            e.f.splice(j, 1);
	                            break;
	                        }
	                        !e.f.length && delete e.f;
	                    }
	                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
	                        var funcs = e.n[key].f;
	                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
	                            funcs.splice(j, 1);
	                            break;
	                        }
	                        !funcs.length && delete e.n[key].f;
	                    }
	                } else {
	                    delete e.f;
	                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
	                        delete e.n[key].f;
	                    }
	                }
	                e = e.n;
	            }
	        }
	    };
	    /*\
	     * eve.once
	     [ method ]
	     **
	     * Binds given event handler with a given name to only run once then unbind itself.
	     | eve.once("login", f);
	     | eve("login"); // triggers f
	     | eve("login"); // no listeners
	     * Use @eve to trigger the listener.
	     **
	     > Arguments
	     **
	     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
	     - f (function) event handler function
	     **
	     = (function) same return function as @eve.on
	    \*/
	    eve.once = function (name, f) {
	        var f2 = function () {
	            eve.off(name, f2);
	            return f.apply(this, arguments);
	        };
	        return eve.on(name, f2);
	    };
	    /*\
	     * eve.version
	     [ property (string) ]
	     **
	     * Current version of the library.
	    \*/
	    eve.version = version;
	    eve.toString = function () {
	        return "You are running Eve " + version;
	    };
	    (typeof module != "undefined" && module.exports) ? (module.exports = eve) : ( true ? (!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return eve; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))) : (glob.eve = eve));
	})(this);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(R) {
	    if (R && !R.svg) {
	        return;
	    }

	    var has = "hasOwnProperty",
	        Str = String,
	        toFloat = parseFloat,
	        toInt = parseInt,
	        math = Math,
	        mmax = math.max,
	        abs = math.abs,
	        pow = math.pow,
	        separator = /[, ]+/,
	        eve = R.eve,
	        E = "",
	        S = " ";
	    var xlink = "http://www.w3.org/1999/xlink",
	        markers = {
	            block: "M5,0 0,2.5 5,5z",
	            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
	            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
	            open: "M6,1 1,3.5 6,6",
	            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
	        },
	        markerCounter = {};
	    R.toString = function () {
	        return  "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
	    };
	    var $ = function (el, attr) {
	        if (attr) {
	            if (typeof el == "string") {
	                el = $(el);
	            }
	            for (var key in attr) if (attr[has](key)) {
	                if (key.substring(0, 6) == "xlink:") {
	                    el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
	                } else {
	                    el.setAttribute(key, Str(attr[key]));
	                }
	            }
	        } else {
	            el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
	            el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
	        }
	        return el;
	    },
	    addGradientFill = function (element, gradient) {
	        var type = "linear",
	            id = element.id + gradient,
	            fx = .5, fy = .5,
	            o = element.node,
	            SVG = element.paper,
	            s = o.style,
	            el = R._g.doc.getElementById(id);
	        if (!el) {
	            gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
	                type = "radial";
	                if (_fx && _fy) {
	                    fx = toFloat(_fx);
	                    fy = toFloat(_fy);
	                    var dir = ((fy > .5) * 2 - 1);
	                    pow(fx - .5, 2) + pow(fy - .5, 2) > .25 &&
	                        (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) &&
	                        fy != .5 &&
	                        (fy = fy.toFixed(5) - 1e-5 * dir);
	                }
	                return E;
	            });
	            gradient = gradient.split(/\s*\-\s*/);
	            if (type == "linear") {
	                var angle = gradient.shift();
	                angle = -toFloat(angle);
	                if (isNaN(angle)) {
	                    return null;
	                }
	                var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
	                    max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
	                vector[2] *= max;
	                vector[3] *= max;
	                if (vector[2] < 0) {
	                    vector[0] = -vector[2];
	                    vector[2] = 0;
	                }
	                if (vector[3] < 0) {
	                    vector[1] = -vector[3];
	                    vector[3] = 0;
	                }
	            }
	            var dots = R._parseDots(gradient);
	            if (!dots) {
	                return null;
	            }
	            id = id.replace(/[\(\)\s,\xb0#]/g, "_");

	            if (element.gradient && id != element.gradient.id) {
	                SVG.defs.removeChild(element.gradient);
	                delete element.gradient;
	            }

	            if (!element.gradient) {
	                el = $(type + "Gradient", {id: id});
	                element.gradient = el;
	                $(el, type == "radial" ? {
	                    fx: fx,
	                    fy: fy
	                } : {
	                    x1: vector[0],
	                    y1: vector[1],
	                    x2: vector[2],
	                    y2: vector[3],
	                    gradientTransform: element.matrix.invert()
	                });
	                SVG.defs.appendChild(el);
	                for (var i = 0, ii = dots.length; i < ii; i++) {
	                    el.appendChild($("stop", {
	                        offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
	                        "stop-color": dots[i].color || "#fff",
	                        "stop-opacity": isFinite(dots[i].opacity) ? dots[i].opacity : 1
	                    }));
	                }
	            }
	        }
	        $(o, {
	            fill: fillurl(id),
	            opacity: 1,
	            "fill-opacity": 1
	        });
	        s.fill = E;
	        s.opacity = 1;
	        s.fillOpacity = 1;
	        return 1;
	    },
	    isIE9or10 = function () {
	      var mode = document.documentMode;
	      return mode && (mode === 9 || mode === 10);
	    },
	    fillurl = function (id) {
	      if (isIE9or10()) {
	          return "url('#" + id + "')";
	      }
	      var location = document.location;
	      var locationString = (
	          location.protocol + '//' +
	          location.host +
	          location.pathname +
	          location.search
	      );
	      return "url('" + locationString + "#" + id + "')";
	    },
	    updatePosition = function (o) {
	        var bbox = o.getBBox(1);
	        $(o.pattern, {patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"});
	    },
	    addArrow = function (o, value, isEnd) {
	        if (o.type == "path") {
	            var values = Str(value).toLowerCase().split("-"),
	                p = o.paper,
	                se = isEnd ? "end" : "start",
	                node = o.node,
	                attrs = o.attrs,
	                stroke = attrs["stroke-width"],
	                i = values.length,
	                type = "classic",
	                from,
	                to,
	                dx,
	                refX,
	                attr,
	                w = 3,
	                h = 3,
	                t = 5;
	            while (i--) {
	                switch (values[i]) {
	                    case "block":
	                    case "classic":
	                    case "oval":
	                    case "diamond":
	                    case "open":
	                    case "none":
	                        type = values[i];
	                        break;
	                    case "wide": h = 5; break;
	                    case "narrow": h = 2; break;
	                    case "long": w = 5; break;
	                    case "short": w = 2; break;
	                }
	            }
	            if (type == "open") {
	                w += 2;
	                h += 2;
	                t += 2;
	                dx = 1;
	                refX = isEnd ? 4 : 1;
	                attr = {
	                    fill: "none",
	                    stroke: attrs.stroke
	                };
	            } else {
	                refX = dx = w / 2;
	                attr = {
	                    fill: attrs.stroke,
	                    stroke: "none"
	                };
	            }
	            if (o._.arrows) {
	                if (isEnd) {
	                    o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
	                    o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
	                } else {
	                    o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
	                    o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
	                }
	            } else {
	                o._.arrows = {};
	            }
	            if (type != "none") {
	                var pathId = "raphael-marker-" + type,
	                    markerId = "raphael-marker-" + se + type + w + h + "-obj" + o.id;
	                if (!R._g.doc.getElementById(pathId)) {
	                    p.defs.appendChild($($("path"), {
	                        "stroke-linecap": "round",
	                        d: markers[type],
	                        id: pathId
	                    }));
	                    markerCounter[pathId] = 1;
	                } else {
	                    markerCounter[pathId]++;
	                }
	                var marker = R._g.doc.getElementById(markerId),
	                    use;
	                if (!marker) {
	                    marker = $($("marker"), {
	                        id: markerId,
	                        markerHeight: h,
	                        markerWidth: w,
	                        orient: "auto",
	                        refX: refX,
	                        refY: h / 2
	                    });
	                    use = $($("use"), {
	                        "xlink:href": "#" + pathId,
	                        transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
	                        "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
	                    });
	                    marker.appendChild(use);
	                    p.defs.appendChild(marker);
	                    markerCounter[markerId] = 1;
	                } else {
	                    markerCounter[markerId]++;
	                    use = marker.getElementsByTagName("use")[0];
	                }
	                $(use, attr);
	                var delta = dx * (type != "diamond" && type != "oval");
	                if (isEnd) {
	                    from = o._.arrows.startdx * stroke || 0;
	                    to = R.getTotalLength(attrs.path) - delta * stroke;
	                } else {
	                    from = delta * stroke;
	                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
	                }
	                attr = {};
	                attr["marker-" + se] = "url(#" + markerId + ")";
	                if (to || from) {
	                    attr.d = R.getSubpath(attrs.path, from, to);
	                }
	                $(node, attr);
	                o._.arrows[se + "Path"] = pathId;
	                o._.arrows[se + "Marker"] = markerId;
	                o._.arrows[se + "dx"] = delta;
	                o._.arrows[se + "Type"] = type;
	                o._.arrows[se + "String"] = value;
	            } else {
	                if (isEnd) {
	                    from = o._.arrows.startdx * stroke || 0;
	                    to = R.getTotalLength(attrs.path) - from;
	                } else {
	                    from = 0;
	                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
	                }
	                o._.arrows[se + "Path"] && $(node, {d: R.getSubpath(attrs.path, from, to)});
	                delete o._.arrows[se + "Path"];
	                delete o._.arrows[se + "Marker"];
	                delete o._.arrows[se + "dx"];
	                delete o._.arrows[se + "Type"];
	                delete o._.arrows[se + "String"];
	            }
	            for (attr in markerCounter) if (markerCounter[has](attr) && !markerCounter[attr]) {
	                var item = R._g.doc.getElementById(attr);
	                item && item.parentNode.removeChild(item);
	            }
	        }
	    },
	    dasharray = {
	        "-": [3, 1],
	        ".": [1, 1],
	        "-.": [3, 1, 1, 1],
	        "-..": [3, 1, 1, 1, 1, 1],
	        ". ": [1, 3],
	        "- ": [4, 3],
	        "--": [8, 3],
	        "- .": [4, 3, 1, 3],
	        "--.": [8, 3, 1, 3],
	        "--..": [8, 3, 1, 3, 1, 3]
	    },
	    addDashes = function (o, value, params) {
	        value = dasharray[Str(value).toLowerCase()];
	        if (value) {
	            var width = o.attrs["stroke-width"] || "1",
	                butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
	                dashes = [],
	                i = value.length;
	            while (i--) {
	                dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
	            }
	            $(o.node, {"stroke-dasharray": dashes.join(",")});
	        }
	        else {
	          $(o.node, {"stroke-dasharray": "none"});
	        }
	    },
	    setFillAndStroke = function (o, params) {
	        var node = o.node,
	            attrs = o.attrs,
	            vis = node.style.visibility;
	        node.style.visibility = "hidden";
	        for (var att in params) {
	            if (params[has](att)) {
	                if (!R._availableAttrs[has](att)) {
	                    continue;
	                }
	                var value = params[att];
	                attrs[att] = value;
	                switch (att) {
	                    case "blur":
	                        o.blur(value);
	                        break;
	                    case "title":
	                        var title = node.getElementsByTagName("title");

	                        // Use the existing <title>.
	                        if (title.length && (title = title[0])) {
	                          title.firstChild.nodeValue = value;
	                        } else {
	                          title = $("title");
	                          var val = R._g.doc.createTextNode(value);
	                          title.appendChild(val);
	                          node.appendChild(title);
	                        }
	                        break;
	                    case "href":
	                    case "target":
	                        var pn = node.parentNode;
	                        if (pn.tagName.toLowerCase() != "a") {
	                            var hl = $("a");
	                            pn.insertBefore(hl, node);
	                            hl.appendChild(node);
	                            pn = hl;
	                        }
	                        if (att == "target") {
	                            pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
	                        } else {
	                            pn.setAttributeNS(xlink, att, value);
	                        }
	                        break;
	                    case "cursor":
	                        node.style.cursor = value;
	                        break;
	                    case "transform":
	                        o.transform(value);
	                        break;
	                    case "arrow-start":
	                        addArrow(o, value);
	                        break;
	                    case "arrow-end":
	                        addArrow(o, value, 1);
	                        break;
	                    case "clip-rect":
	                        var rect = Str(value).split(separator);
	                        if (rect.length == 4) {
	                            o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
	                            var el = $("clipPath"),
	                                rc = $("rect");
	                            el.id = R.createUUID();
	                            $(rc, {
	                                x: rect[0],
	                                y: rect[1],
	                                width: rect[2],
	                                height: rect[3]
	                            });
	                            el.appendChild(rc);
	                            o.paper.defs.appendChild(el);
	                            $(node, {"clip-path": "url(#" + el.id + ")"});
	                            o.clip = rc;
	                        }
	                        if (!value) {
	                            var path = node.getAttribute("clip-path");
	                            if (path) {
	                                var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
	                                clip && clip.parentNode.removeChild(clip);
	                                $(node, {"clip-path": E});
	                                delete o.clip;
	                            }
	                        }
	                    break;
	                    case "path":
	                        if (o.type == "path") {
	                            $(node, {d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"});
	                            o._.dirty = 1;
	                            if (o._.arrows) {
	                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
	                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
	                            }
	                        }
	                        break;
	                    case "width":
	                        node.setAttribute(att, value);
	                        o._.dirty = 1;
	                        if (attrs.fx) {
	                            att = "x";
	                            value = attrs.x;
	                        } else {
	                            break;
	                        }
	                    case "x":
	                        if (attrs.fx) {
	                            value = -attrs.x - (attrs.width || 0);
	                        }
	                    case "rx":
	                        if (att == "rx" && o.type == "rect") {
	                            break;
	                        }
	                    case "cx":
	                        node.setAttribute(att, value);
	                        o.pattern && updatePosition(o);
	                        o._.dirty = 1;
	                        break;
	                    case "height":
	                        node.setAttribute(att, value);
	                        o._.dirty = 1;
	                        if (attrs.fy) {
	                            att = "y";
	                            value = attrs.y;
	                        } else {
	                            break;
	                        }
	                    case "y":
	                        if (attrs.fy) {
	                            value = -attrs.y - (attrs.height || 0);
	                        }
	                    case "ry":
	                        if (att == "ry" && o.type == "rect") {
	                            break;
	                        }
	                    case "cy":
	                        node.setAttribute(att, value);
	                        o.pattern && updatePosition(o);
	                        o._.dirty = 1;
	                        break;
	                    case "r":
	                        if (o.type == "rect") {
	                            $(node, {rx: value, ry: value});
	                        } else {
	                            node.setAttribute(att, value);
	                        }
	                        o._.dirty = 1;
	                        break;
	                    case "src":
	                        if (o.type == "image") {
	                            node.setAttributeNS(xlink, "href", value);
	                        }
	                        break;
	                    case "stroke-width":
	                        if (o._.sx != 1 || o._.sy != 1) {
	                            value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
	                        }
	                        node.setAttribute(att, value);
	                        if (attrs["stroke-dasharray"]) {
	                            addDashes(o, attrs["stroke-dasharray"], params);
	                        }
	                        if (o._.arrows) {
	                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
	                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
	                        }
	                        break;
	                    case "stroke-dasharray":
	                        addDashes(o, value, params);
	                        break;
	                    case "fill":
	                        var isURL = Str(value).match(R._ISURL);
	                        if (isURL) {
	                            el = $("pattern");
	                            var ig = $("image");
	                            el.id = R.createUUID();
	                            $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
	                            $(ig, {x: 0, y: 0, "xlink:href": isURL[1]});
	                            el.appendChild(ig);

	                            (function (el) {
	                                R._preload(isURL[1], function () {
	                                    var w = this.offsetWidth,
	                                        h = this.offsetHeight;
	                                    $(el, {width: w, height: h});
	                                    $(ig, {width: w, height: h});
	                                });
	                            })(el);
	                            o.paper.defs.appendChild(el);
	                            $(node, {fill: "url(#" + el.id + ")"});
	                            o.pattern = el;
	                            o.pattern && updatePosition(o);
	                            break;
	                        }
	                        var clr = R.getRGB(value);
	                        if (!clr.error) {
	                            delete params.gradient;
	                            delete attrs.gradient;
	                            !R.is(attrs.opacity, "undefined") &&
	                                R.is(params.opacity, "undefined") &&
	                                $(node, {opacity: attrs.opacity});
	                            !R.is(attrs["fill-opacity"], "undefined") &&
	                                R.is(params["fill-opacity"], "undefined") &&
	                                $(node, {"fill-opacity": attrs["fill-opacity"]});
	                        } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
	                            if ("opacity" in attrs || "fill-opacity" in attrs) {
	                                var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
	                                if (gradient) {
	                                    var stops = gradient.getElementsByTagName("stop");
	                                    $(stops[stops.length - 1], {"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)});
	                                }
	                            }
	                            attrs.gradient = value;
	                            attrs.fill = "none";
	                            break;
	                        }
	                        clr[has]("opacity") && $(node, {"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
	                    case "stroke":
	                        clr = R.getRGB(value);
	                        node.setAttribute(att, clr.hex);
	                        att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
	                        if (att == "stroke" && o._.arrows) {
	                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
	                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
	                        }
	                        break;
	                    case "gradient":
	                        (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
	                        break;
	                    case "opacity":
	                        if (attrs.gradient && !attrs[has]("stroke-opacity")) {
	                            $(node, {"stroke-opacity": value > 1 ? value / 100 : value});
	                        }
	                        // fall
	                    case "fill-opacity":
	                        if (attrs.gradient) {
	                            gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
	                            if (gradient) {
	                                stops = gradient.getElementsByTagName("stop");
	                                $(stops[stops.length - 1], {"stop-opacity": value});
	                            }
	                            break;
	                        }
	                    default:
	                        att == "font-size" && (value = toInt(value, 10) + "px");
	                        var cssrule = att.replace(/(\-.)/g, function (w) {
	                            return w.substring(1).toUpperCase();
	                        });
	                        node.style[cssrule] = value;
	                        o._.dirty = 1;
	                        node.setAttribute(att, value);
	                        break;
	                }
	            }
	        }

	        tuneText(o, params);
	        node.style.visibility = vis;
	    },
	    leading = 1.2,
	    tuneText = function (el, params) {
	        if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
	            return;
	        }
	        var a = el.attrs,
	            node = el.node,
	            fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

	        if (params[has]("text")) {
	            a.text = params.text;
	            while (node.firstChild) {
	                node.removeChild(node.firstChild);
	            }
	            var texts = Str(params.text).split("\n"),
	                tspans = [],
	                tspan;
	            for (var i = 0, ii = texts.length; i < ii; i++) {
	                tspan = $("tspan");
	                i && $(tspan, {dy: fontSize * leading, x: a.x});
	                tspan.appendChild(R._g.doc.createTextNode(texts[i]));
	                node.appendChild(tspan);
	                tspans[i] = tspan;
	            }
	        } else {
	            tspans = node.getElementsByTagName("tspan");
	            for (i = 0, ii = tspans.length; i < ii; i++) if (i) {
	                $(tspans[i], {dy: fontSize * leading, x: a.x});
	            } else {
	                $(tspans[0], {dy: 0});
	            }
	        }
	        $(node, {x: a.x, y: a.y});
	        el._.dirty = 1;
	        var bb = el._getBBox(),
	            dif = a.y - (bb.y + bb.height / 2);
	        dif && R.is(dif, "finite") && $(tspans[0], {dy: dif});
	    },
	    getRealNode = function (node) {
	        if (node.parentNode && node.parentNode.tagName.toLowerCase() === "a") {
	            return node.parentNode;
	        } else {
	            return node;
	        }
	    },
	    Element = function (node, svg) {
	        var X = 0,
	            Y = 0;
	        /*\
	         * Element.node
	         [ property (object) ]
	         **
	         * Gives you a reference to the DOM object, so you can assign event handlers or just mess around.
	         **
	         * Note: Don�t mess with it.
	         > Usage
	         | // draw a circle at coordinate 10,10 with radius of 10
	         | var c = paper.circle(10, 10, 10);
	         | c.node.onclick = function () {
	         |     c.attr("fill", "red");
	         | };
	        \*/
	        this[0] = this.node = node;
	        /*\
	         * Element.raphael
	         [ property (object) ]
	         **
	         * Internal reference to @Raphael object. In case it is not available.
	         > Usage
	         | Raphael.el.red = function () {
	         |     var hsb = this.paper.raphael.rgb2hsb(this.attr("fill"));
	         |     hsb.h = 1;
	         |     this.attr({fill: this.paper.raphael.hsb2rgb(hsb).hex});
	         | }
	        \*/
	        node.raphael = true;
	        /*\
	         * Element.id
	         [ property (number) ]
	         **
	         * Unique id of the element. Especially useful when you want to listen to events of the element,
	         * because all events are fired in format `<module>.<action>.<id>`. Also useful for @Paper.getById method.
	        \*/
	        this.id = guid();
	        node.raphaelid = this.id;

	        /**
	        * Method that returns a 5 letter/digit id, enough for 36^5 = 60466176 elements
	        * @returns {string} id
	        */
	        function guid() {
	            return ("0000" + (Math.random()*Math.pow(36,5) << 0).toString(36)).slice(-5);
	        }

	        this.matrix = R.matrix();
	        this.realPath = null;
	        /*\
	         * Element.paper
	         [ property (object) ]
	         **
	         * Internal reference to �paper� where object drawn. Mainly for use in plugins and element extensions.
	         > Usage
	         | Raphael.el.cross = function () {
	         |     this.attr({fill: "red"});
	         |     this.paper.path("M10,10L50,50M50,10L10,50")
	         |         .attr({stroke: "red"});
	         | }
	        \*/
	        this.paper = svg;
	        this.attrs = this.attrs || {};
	        this._ = {
	            transform: [],
	            sx: 1,
	            sy: 1,
	            deg: 0,
	            dx: 0,
	            dy: 0,
	            dirty: 1
	        };
	        !svg.bottom && (svg.bottom = this);
	        /*\
	         * Element.prev
	         [ property (object) ]
	         **
	         * Reference to the previous element in the hierarchy.
	        \*/
	        this.prev = svg.top;
	        svg.top && (svg.top.next = this);
	        svg.top = this;
	        /*\
	         * Element.next
	         [ property (object) ]
	         **
	         * Reference to the next element in the hierarchy.
	        \*/
	        this.next = null;
	    },
	    elproto = R.el;

	    Element.prototype = elproto;
	    elproto.constructor = Element;

	    R._engine.path = function (pathString, SVG) {
	        var el = $("path");
	        SVG.canvas && SVG.canvas.appendChild(el);
	        var p = new Element(el, SVG);
	        p.type = "path";
	        setFillAndStroke(p, {
	            fill: "none",
	            stroke: "#000",
	            path: pathString
	        });
	        return p;
	    };
	    /*\
	     * Element.rotate
	     [ method ]
	     **
	     * Deprecated! Use @Element.transform instead.
	     * Adds rotation by given angle around given point to the list of
	     * transformations of the element.
	     > Parameters
	     - deg (number) angle in degrees
	     - cx (number) #optional x coordinate of the centre of rotation
	     - cy (number) #optional y coordinate of the centre of rotation
	     * If cx & cy aren�t specified centre of the shape is used as a point of rotation.
	     = (object) @Element
	    \*/
	    elproto.rotate = function (deg, cx, cy) {
	        if (this.removed) {
	            return this;
	        }
	        deg = Str(deg).split(separator);
	        if (deg.length - 1) {
	            cx = toFloat(deg[1]);
	            cy = toFloat(deg[2]);
	        }
	        deg = toFloat(deg[0]);
	        (cy == null) && (cx = cy);
	        if (cx == null || cy == null) {
	            var bbox = this.getBBox(1);
	            cx = bbox.x + bbox.width / 2;
	            cy = bbox.y + bbox.height / 2;
	        }
	        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
	        return this;
	    };
	    /*\
	     * Element.scale
	     [ method ]
	     **
	     * Deprecated! Use @Element.transform instead.
	     * Adds scale by given amount relative to given point to the list of
	     * transformations of the element.
	     > Parameters
	     - sx (number) horisontal scale amount
	     - sy (number) vertical scale amount
	     - cx (number) #optional x coordinate of the centre of scale
	     - cy (number) #optional y coordinate of the centre of scale
	     * If cx & cy aren�t specified centre of the shape is used instead.
	     = (object) @Element
	    \*/
	    elproto.scale = function (sx, sy, cx, cy) {
	        if (this.removed) {
	            return this;
	        }
	        sx = Str(sx).split(separator);
	        if (sx.length - 1) {
	            sy = toFloat(sx[1]);
	            cx = toFloat(sx[2]);
	            cy = toFloat(sx[3]);
	        }
	        sx = toFloat(sx[0]);
	        (sy == null) && (sy = sx);
	        (cy == null) && (cx = cy);
	        if (cx == null || cy == null) {
	            var bbox = this.getBBox(1);
	        }
	        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
	        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
	        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
	        return this;
	    };
	    /*\
	     * Element.translate
	     [ method ]
	     **
	     * Deprecated! Use @Element.transform instead.
	     * Adds translation by given amount to the list of transformations of the element.
	     > Parameters
	     - dx (number) horisontal shift
	     - dy (number) vertical shift
	     = (object) @Element
	    \*/
	    elproto.translate = function (dx, dy) {
	        if (this.removed) {
	            return this;
	        }
	        dx = Str(dx).split(separator);
	        if (dx.length - 1) {
	            dy = toFloat(dx[1]);
	        }
	        dx = toFloat(dx[0]) || 0;
	        dy = +dy || 0;
	        this.transform(this._.transform.concat([["t", dx, dy]]));
	        return this;
	    };
	    /*\
	     * Element.transform
	     [ method ]
	     **
	     * Adds transformation to the element which is separate to other attributes,
	     * i.e. translation doesn�t change `x` or `y` of the rectange. The format
	     * of transformation string is similar to the path string syntax:
	     | "t100,100r30,100,100s2,2,100,100r45s1.5"
	     * Each letter is a command. There are four commands: `t` is for translate, `r` is for rotate, `s` is for
	     * scale and `m` is for matrix.
	     *
	     * There are also alternative �absolute� translation, rotation and scale: `T`, `R` and `S`. They will not take previous transformation into account. For example, `...T100,0` will always move element 100 px horisontally, while `...t100,0` could move it vertically if there is `r90` before. Just compare results of `r90t100,0` and `r90T100,0`.
	     *
	     * So, the example line above could be read like �translate by 100, 100; rotate 30� around 100, 100; scale twice around 100, 100;
	     * rotate 45� around centre; scale 1.5 times relative to centre�. As you can see rotate and scale commands have origin
	     * coordinates as optional parameters, the default is the centre point of the element.
	     * Matrix accepts six parameters.
	     > Usage
	     | var el = paper.rect(10, 20, 300, 200);
	     | // translate 100, 100, rotate 45�, translate -100, 0
	     | el.transform("t100,100r45t-100,0");
	     | // if you want you can append or prepend transformations
	     | el.transform("...t50,50");
	     | el.transform("s2...");
	     | // or even wrap
	     | el.transform("t50,50...t-50-50");
	     | // to reset transformation call method with empty string
	     | el.transform("");
	     | // to get current value call it without parameters
	     | console.log(el.transform());
	     > Parameters
	     - tstr (string) #optional transformation string
	     * If tstr isn�t specified
	     = (string) current transformation string
	     * else
	     = (object) @Element
	    \*/
	    elproto.transform = function (tstr) {
	        var _ = this._;
	        if (tstr == null) {
	            return _.transform;
	        }
	        R._extractTransform(this, tstr);

	        this.clip && $(this.clip, {transform: this.matrix.invert()});
	        this.pattern && updatePosition(this);
	        this.node && $(this.node, {transform: this.matrix});

	        if (_.sx != 1 || _.sy != 1) {
	            var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
	            this.attr({"stroke-width": sw});
	        }

	        return this;
	    };
	    /*\
	     * Element.hide
	     [ method ]
	     **
	     * Makes element invisible. See @Element.show.
	     = (object) @Element
	    \*/
	    elproto.hide = function () {
	        if(!this.removed) this.node.style.display = "none";
	        return this;
	    };
	    /*\
	     * Element.show
	     [ method ]
	     **
	     * Makes element visible. See @Element.hide.
	     = (object) @Element
	    \*/
	    elproto.show = function () {
	        if(!this.removed) this.node.style.display = "";
	        return this;
	    };
	    /*\
	     * Element.remove
	     [ method ]
	     **
	     * Removes element from the paper.
	    \*/
	    elproto.remove = function () {
	        var node = getRealNode(this.node);
	        if (this.removed || !node.parentNode) {
	            return;
	        }
	        var paper = this.paper;
	        paper.__set__ && paper.__set__.exclude(this);
	        eve.unbind("raphael.*.*." + this.id);
	        if (this.gradient) {
	            paper.defs.removeChild(this.gradient);
	        }
	        R._tear(this, paper);

	        node.parentNode.removeChild(node);

	        // Remove custom data for element
	        this.removeData();

	        for (var i in this) {
	            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
	        }
	        this.removed = true;
	    };
	    elproto._getBBox = function () {
	        if (this.node.style.display == "none") {
	            this.show();
	            var hide = true;
	        }
	        var canvasHidden = false,
	            containerStyle;
	        if (this.paper.canvas.parentElement) {
	          containerStyle = this.paper.canvas.parentElement.style;
	        } //IE10+ can't find parentElement
	        else if (this.paper.canvas.parentNode) {
	          containerStyle = this.paper.canvas.parentNode.style;
	        }

	        if(containerStyle && containerStyle.display == "none") {
	          canvasHidden = true;
	          containerStyle.display = "";
	        }
	        var bbox = {};
	        try {
	            bbox = this.node.getBBox();
	        } catch(e) {
	            // Firefox 3.0.x, 25.0.1 (probably more versions affected) play badly here - possible fix
	            bbox = {
	                x: this.node.clientLeft,
	                y: this.node.clientTop,
	                width: this.node.clientWidth,
	                height: this.node.clientHeight
	            }
	        } finally {
	            bbox = bbox || {};
	            if(canvasHidden){
	              containerStyle.display = "none";
	            }
	        }
	        hide && this.hide();
	        return bbox;
	    };
	    /*\
	     * Element.attr
	     [ method ]
	     **
	     * Sets the attributes of the element.
	     > Parameters
	     - attrName (string) attribute�s name
	     - value (string) value
	     * or
	     - params (object) object of name/value pairs
	     * or
	     - attrName (string) attribute�s name
	     * or
	     - attrNames (array) in this case method returns array of current values for given attribute names
	     = (object) @Element if attrsName & value or params are passed in.
	     = (...) value of the attribute if only attrsName is passed in.
	     = (array) array of values of the attribute if attrsNames is passed in.
	     = (object) object of attributes if nothing is passed in.
	     > Possible parameters
	     # <p>Please refer to the <a href="http://www.w3.org/TR/SVG/" title="The W3C Recommendation for the SVG language describes these properties in detail.">SVG specification</a> for an explanation of these parameters.</p>
	     o arrow-end (string) arrowhead on the end of the path. The format for string is `<type>[-<width>[-<length>]]`. Possible types: `classic`, `block`, `open`, `oval`, `diamond`, `none`, width: `wide`, `narrow`, `medium`, length: `long`, `short`, `midium`.
	     o clip-rect (string) comma or space separated values: x, y, width and height
	     o cursor (string) CSS type of the cursor
	     o cx (number) the x-axis coordinate of the center of the circle, or ellipse
	     o cy (number) the y-axis coordinate of the center of the circle, or ellipse
	     o fill (string) colour, gradient or image
	     o fill-opacity (number)
	     o font (string)
	     o font-family (string)
	     o font-size (number) font size in pixels
	     o font-weight (string)
	     o height (number)
	     o href (string) URL, if specified element behaves as hyperlink
	     o opacity (number)
	     o path (string) SVG path string format
	     o r (number) radius of the circle, ellipse or rounded corner on the rect
	     o rx (number) horisontal radius of the ellipse
	     o ry (number) vertical radius of the ellipse
	     o src (string) image URL, only works for @Element.image element
	     o stroke (string) stroke colour
	     o stroke-dasharray (string) [��, �none�, �`-`�, �`.`�, �`-.`�, �`-..`�, �`. `�, �`- `�, �`--`�, �`- .`�, �`--.`�, �`--..`�]
	     o stroke-linecap (string) [�`butt`�, �`square`�, �`round`�]
	     o stroke-linejoin (string) [�`bevel`�, �`round`�, �`miter`�]
	     o stroke-miterlimit (number)
	     o stroke-opacity (number)
	     o stroke-width (number) stroke width in pixels, default is '1'
	     o target (string) used with href
	     o text (string) contents of the text element. Use `\n` for multiline text
	     o text-anchor (string) [�`start`�, �`middle`�, �`end`�], default is �`middle`�
	     o title (string) will create tooltip with a given text
	     o transform (string) see @Element.transform
	     o width (number)
	     o x (number)
	     o y (number)
	     > Gradients
	     * Linear gradient format: �`�angle�-�colour�[-�colour�[:�offset�]]*-�colour�`�, example: �`90-#fff-#000`� � 90�
	     * gradient from white to black or �`0-#fff-#f00:20-#000`� � 0� gradient from white via red (at 20%) to black.
	     *
	     * radial gradient: �`r[(�fx�, �fy�)]�colour�[-�colour�[:�offset�]]*-�colour�`�, example: �`r#fff-#000`� �
	     * gradient from white to black or �`r(0.25, 0.75)#fff-#000`� � gradient from white to black with focus point
	     * at 0.25, 0.75. Focus point coordinates are in 0..1 range. Radial gradients can only be applied to circles and ellipses.
	     > Path String
	     # <p>Please refer to <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path�s data attribute�s format are described in the SVG specification.">SVG documentation regarding path string</a>. Rapha�l fully supports it.</p>
	     > Colour Parsing
	     # <ul>
	     #     <li>Colour name (�<code>red</code>�, �<code>green</code>�, �<code>cornflowerblue</code>�, etc)</li>
	     #     <li>#��� � shortened HTML colour: (�<code>#000</code>�, �<code>#fc0</code>�, etc)</li>
	     #     <li>#������ � full length HTML colour: (�<code>#000000</code>�, �<code>#bd2300</code>�)</li>
	     #     <li>rgb(���, ���, ���) � red, green and blue channels� values: (�<code>rgb(200,&nbsp;100,&nbsp;0)</code>�)</li>
	     #     <li>rgb(���%, ���%, ���%) � same as above, but in %: (�<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>�)</li>
	     #     <li>rgba(���, ���, ���, ���) � red, green and blue channels� values: (�<code>rgba(200,&nbsp;100,&nbsp;0, .5)</code>�)</li>
	     #     <li>rgba(���%, ���%, ���%, ���%) � same as above, but in %: (�<code>rgba(100%,&nbsp;175%,&nbsp;0%, 50%)</code>�)</li>
	     #     <li>hsb(���, ���, ���) � hue, saturation and brightness values: (�<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>�)</li>
	     #     <li>hsb(���%, ���%, ���%) � same as above, but in %</li>
	     #     <li>hsba(���, ���, ���, ���) � same as above, but with opacity</li>
	     #     <li>hsl(���, ���, ���) � almost the same as hsb, see <a href="http://en.wikipedia.org/wiki/HSL_and_HSV" title="HSL and HSV - Wikipedia, the free encyclopedia">Wikipedia page</a></li>
	     #     <li>hsl(���%, ���%, ���%) � same as above, but in %</li>
	     #     <li>hsla(���, ���, ���, ���) � same as above, but with opacity</li>
	     #     <li>Optionally for hsb and hsl you could specify hue as a degree: �<code>hsl(240deg,&nbsp;1,&nbsp;.5)</code>� or, if you want to go fancy, �<code>hsl(240�,&nbsp;1,&nbsp;.5)</code>�</li>
	     # </ul>
	    \*/
	    elproto.attr = function (name, value) {
	        if (this.removed) {
	            return this;
	        }
	        if (name == null) {
	            var res = {};
	            for (var a in this.attrs) if (this.attrs[has](a)) {
	                res[a] = this.attrs[a];
	            }
	            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
	            res.transform = this._.transform;
	            return res;
	        }
	        if (value == null && R.is(name, "string")) {
	            if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
	                return this.attrs.gradient;
	            }
	            if (name == "transform") {
	                return this._.transform;
	            }
	            var names = name.split(separator),
	                out = {};
	            for (var i = 0, ii = names.length; i < ii; i++) {
	                name = names[i];
	                if (name in this.attrs) {
	                    out[name] = this.attrs[name];
	                } else if (R.is(this.paper.customAttributes[name], "function")) {
	                    out[name] = this.paper.customAttributes[name].def;
	                } else {
	                    out[name] = R._availableAttrs[name];
	                }
	            }
	            return ii - 1 ? out : out[names[0]];
	        }
	        if (value == null && R.is(name, "array")) {
	            out = {};
	            for (i = 0, ii = name.length; i < ii; i++) {
	                out[name[i]] = this.attr(name[i]);
	            }
	            return out;
	        }
	        if (value != null) {
	            var params = {};
	            params[name] = value;
	        } else if (name != null && R.is(name, "object")) {
	            params = name;
	        }
	        for (var key in params) {
	            eve("raphael.attr." + key + "." + this.id, this, params[key]);
	        }
	        for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
	            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
	            this.attrs[key] = params[key];
	            for (var subkey in par) if (par[has](subkey)) {
	                params[subkey] = par[subkey];
	            }
	        }
	        setFillAndStroke(this, params);
	        return this;
	    };
	    /*\
	     * Element.toFront
	     [ method ]
	     **
	     * Moves the element so it is the closest to the viewer�s eyes, on top of other elements.
	     = (object) @Element
	    \*/
	    elproto.toFront = function () {
	        if (this.removed) {
	            return this;
	        }
	        var node = getRealNode(this.node);
	        node.parentNode.appendChild(node);
	        var svg = this.paper;
	        svg.top != this && R._tofront(this, svg);
	        return this;
	    };
	    /*\
	     * Element.toBack
	     [ method ]
	     **
	     * Moves the element so it is the furthest from the viewer�s eyes, behind other elements.
	     = (object) @Element
	    \*/
	    elproto.toBack = function () {
	        if (this.removed) {
	            return this;
	        }
	        var node = getRealNode(this.node);
	        var parentNode = node.parentNode;
	        parentNode.insertBefore(node, parentNode.firstChild);
	        R._toback(this, this.paper);
	        var svg = this.paper;
	        return this;
	    };
	    /*\
	     * Element.insertAfter
	     [ method ]
	     **
	     * Inserts current object after the given one.
	     = (object) @Element
	    \*/
	    elproto.insertAfter = function (element) {
	        if (this.removed || !element) {
	            return this;
	        }

	        var node = getRealNode(this.node);
	        var afterNode = getRealNode(element.node || element[element.length - 1].node);
	        if (afterNode.nextSibling) {
	            afterNode.parentNode.insertBefore(node, afterNode.nextSibling);
	        } else {
	            afterNode.parentNode.appendChild(node);
	        }
	        R._insertafter(this, element, this.paper);
	        return this;
	    };
	    /*\
	     * Element.insertBefore
	     [ method ]
	     **
	     * Inserts current object before the given one.
	     = (object) @Element
	    \*/
	    elproto.insertBefore = function (element) {
	        if (this.removed || !element) {
	            return this;
	        }

	        var node = getRealNode(this.node);
	        var beforeNode = getRealNode(element.node || element[0].node);
	        beforeNode.parentNode.insertBefore(node, beforeNode);
	        R._insertbefore(this, element, this.paper);
	        return this;
	    };
	    elproto.blur = function (size) {
	        // Experimental. No Safari support. Use it on your own risk.
	        var t = this;
	        if (+size !== 0) {
	            var fltr = $("filter"),
	                blur = $("feGaussianBlur");
	            t.attrs.blur = size;
	            fltr.id = R.createUUID();
	            $(blur, {stdDeviation: +size || 1.5});
	            fltr.appendChild(blur);
	            t.paper.defs.appendChild(fltr);
	            t._blur = fltr;
	            $(t.node, {filter: "url(#" + fltr.id + ")"});
	        } else {
	            if (t._blur) {
	                t._blur.parentNode.removeChild(t._blur);
	                delete t._blur;
	                delete t.attrs.blur;
	            }
	            t.node.removeAttribute("filter");
	        }
	        return t;
	    };
	    R._engine.circle = function (svg, x, y, r) {
	        var el = $("circle");
	        svg.canvas && svg.canvas.appendChild(el);
	        var res = new Element(el, svg);
	        res.attrs = {cx: x, cy: y, r: r, fill: "none", stroke: "#000"};
	        res.type = "circle";
	        $(el, res.attrs);
	        return res;
	    };
	    R._engine.rect = function (svg, x, y, w, h, r) {
	        var el = $("rect");
	        svg.canvas && svg.canvas.appendChild(el);
	        var res = new Element(el, svg);
	        res.attrs = {x: x, y: y, width: w, height: h, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000"};
	        res.type = "rect";
	        $(el, res.attrs);
	        return res;
	    };
	    R._engine.ellipse = function (svg, x, y, rx, ry) {
	        var el = $("ellipse");
	        svg.canvas && svg.canvas.appendChild(el);
	        var res = new Element(el, svg);
	        res.attrs = {cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000"};
	        res.type = "ellipse";
	        $(el, res.attrs);
	        return res;
	    };
	    R._engine.image = function (svg, src, x, y, w, h) {
	        var el = $("image");
	        $(el, {x: x, y: y, width: w, height: h, preserveAspectRatio: "none"});
	        el.setAttributeNS(xlink, "href", src);
	        svg.canvas && svg.canvas.appendChild(el);
	        var res = new Element(el, svg);
	        res.attrs = {x: x, y: y, width: w, height: h, src: src};
	        res.type = "image";
	        return res;
	    };
	    R._engine.text = function (svg, x, y, text) {
	        var el = $("text");
	        svg.canvas && svg.canvas.appendChild(el);
	        var res = new Element(el, svg);
	        res.attrs = {
	            x: x,
	            y: y,
	            "text-anchor": "middle",
	            text: text,
	            "font-family": R._availableAttrs["font-family"],
	            "font-size": R._availableAttrs["font-size"],
	            stroke: "none",
	            fill: "#000"
	        };
	        res.type = "text";
	        setFillAndStroke(res, res.attrs);
	        return res;
	    };
	    R._engine.setSize = function (width, height) {
	        this.width = width || this.width;
	        this.height = height || this.height;
	        this.canvas.setAttribute("width", this.width);
	        this.canvas.setAttribute("height", this.height);
	        if (this._viewBox) {
	            this.setViewBox.apply(this, this._viewBox);
	        }
	        return this;
	    };
	    R._engine.create = function () {
	        var con = R._getContainer.apply(0, arguments),
	            container = con && con.container,
	            x = con.x,
	            y = con.y,
	            width = con.width,
	            height = con.height;
	        if (!container) {
	            throw new Error("SVG container not found.");
	        }
	        var cnvs = $("svg"),
	            css = "overflow:hidden;",
	            isFloating;
	        x = x || 0;
	        y = y || 0;
	        width = width || 512;
	        height = height || 342;
	        $(cnvs, {
	            height: height,
	            version: 1.1,
	            width: width,
	            xmlns: "http://www.w3.org/2000/svg",
	            "xmlns:xlink": "http://www.w3.org/1999/xlink"
	        });
	        if (container == 1) {
	            cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
	            R._g.doc.body.appendChild(cnvs);
	            isFloating = 1;
	        } else {
	            cnvs.style.cssText = css + "position:relative";
	            if (container.firstChild) {
	                container.insertBefore(cnvs, container.firstChild);
	            } else {
	                container.appendChild(cnvs);
	            }
	        }
	        container = new R._Paper;
	        container.width = width;
	        container.height = height;
	        container.canvas = cnvs;
	        container.clear();
	        container._left = container._top = 0;
	        isFloating && (container.renderfix = function () {});
	        container.renderfix();
	        return container;
	    };
	    R._engine.setViewBox = function (x, y, w, h, fit) {
	        eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
	        var paperSize = this.getSize(),
	            size = mmax(w / paperSize.width, h / paperSize.height),
	            top = this.top,
	            aspectRatio = fit ? "xMidYMid meet" : "xMinYMin",
	            vb,
	            sw;
	        if (x == null) {
	            if (this._vbSize) {
	                size = 1;
	            }
	            delete this._vbSize;
	            vb = "0 0 " + this.width + S + this.height;
	        } else {
	            this._vbSize = size;
	            vb = x + S + y + S + w + S + h;
	        }
	        $(this.canvas, {
	            viewBox: vb,
	            preserveAspectRatio: aspectRatio
	        });
	        while (size && top) {
	            sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
	            top.attr({"stroke-width": sw});
	            top._.dirty = 1;
	            top._.dirtyT = 1;
	            top = top.prev;
	        }
	        this._viewBox = [x, y, w, h, !!fit];
	        return this;
	    };
	    /*\
	     * Paper.renderfix
	     [ method ]
	     **
	     * Fixes the issue of Firefox and IE9 regarding subpixel rendering. If paper is dependent
	     * on other elements after reflow it could shift half pixel which cause for lines to lost their crispness.
	     * This method fixes the issue.
	     **
	       Special thanks to Mariusz Nowak (http://www.medikoo.com/) for this method.
	    \*/
	    R.prototype.renderfix = function () {
	        var cnvs = this.canvas,
	            s = cnvs.style,
	            pos;
	        try {
	            pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
	        } catch (e) {
	            pos = cnvs.createSVGMatrix();
	        }
	        var left = -pos.e % 1,
	            top = -pos.f % 1;
	        if (left || top) {
	            if (left) {
	                this._left = (this._left + left) % 1;
	                s.left = this._left + "px";
	            }
	            if (top) {
	                this._top = (this._top + top) % 1;
	                s.top = this._top + "px";
	            }
	        }
	    };
	    /*\
	     * Paper.clear
	     [ method ]
	     **
	     * Clears the paper, i.e. removes all the elements.
	    \*/
	    R.prototype.clear = function () {
	        R.eve("raphael.clear", this);
	        var c = this.canvas;
	        while (c.firstChild) {
	            c.removeChild(c.firstChild);
	        }
	        this.bottom = this.top = null;
	        (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
	        c.appendChild(this.desc);
	        c.appendChild(this.defs = $("defs"));
	    };
	    /*\
	     * Paper.remove
	     [ method ]
	     **
	     * Removes the paper from the DOM.
	    \*/
	    R.prototype.remove = function () {
	        eve("raphael.remove", this);
	        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
	        for (var i in this) {
	            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
	        }
	    };
	    var setproto = R.st;
	    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
	        setproto[method] = (function (methodname) {
	            return function () {
	                var arg = arguments;
	                return this.forEach(function (el) {
	                    el[methodname].apply(el, arg);
	                });
	            };
	        })(method);
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(R) {
	    if (R && !R.vml) {
	        return;
	    }

	    var has = "hasOwnProperty",
	        Str = String,
	        toFloat = parseFloat,
	        math = Math,
	        round = math.round,
	        mmax = math.max,
	        mmin = math.min,
	        abs = math.abs,
	        fillString = "fill",
	        separator = /[, ]+/,
	        eve = R.eve,
	        ms = " progid:DXImageTransform.Microsoft",
	        S = " ",
	        E = "",
	        map = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
	        bites = /([clmz]),?([^clmz]*)/gi,
	        blurregexp = / progid:\S+Blur\([^\)]+\)/g,
	        val = /-?[^,\s-]+/g,
	        cssDot = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",
	        zoom = 21600,
	        pathTypes = {path: 1, rect: 1, image: 1},
	        ovalTypes = {circle: 1, ellipse: 1},
	        path2vml = function (path) {
	            var total =  /[ahqstv]/ig,
	                command = R._pathToAbsolute;
	            Str(path).match(total) && (command = R._path2curve);
	            total = /[clmz]/g;
	            if (command == R._pathToAbsolute && !Str(path).match(total)) {
	                var res = Str(path).replace(bites, function (all, command, args) {
	                    var vals = [],
	                        isMove = command.toLowerCase() == "m",
	                        res = map[command];
	                    args.replace(val, function (value) {
	                        if (isMove && vals.length == 2) {
	                            res += vals + map[command == "m" ? "l" : "L"];
	                            vals = [];
	                        }
	                        vals.push(round(value * zoom));
	                    });
	                    return res + vals;
	                });
	                return res;
	            }
	            var pa = command(path), p, r;
	            res = [];
	            for (var i = 0, ii = pa.length; i < ii; i++) {
	                p = pa[i];
	                r = pa[i][0].toLowerCase();
	                r == "z" && (r = "x");
	                for (var j = 1, jj = p.length; j < jj; j++) {
	                    r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
	                }
	                res.push(r);
	            }
	            return res.join(S);
	        },
	        compensation = function (deg, dx, dy) {
	            var m = R.matrix();
	            m.rotate(-deg, .5, .5);
	            return {
	                dx: m.x(dx, dy),
	                dy: m.y(dx, dy)
	            };
	        },
	        setCoords = function (p, sx, sy, dx, dy, deg) {
	            var _ = p._,
	                m = p.matrix,
	                fillpos = _.fillpos,
	                o = p.node,
	                s = o.style,
	                y = 1,
	                flip = "",
	                dxdy,
	                kx = zoom / sx,
	                ky = zoom / sy;
	            s.visibility = "hidden";
	            if (!sx || !sy) {
	                return;
	            }
	            o.coordsize = abs(kx) + S + abs(ky);
	            s.rotation = deg * (sx * sy < 0 ? -1 : 1);
	            if (deg) {
	                var c = compensation(deg, dx, dy);
	                dx = c.dx;
	                dy = c.dy;
	            }
	            sx < 0 && (flip += "x");
	            sy < 0 && (flip += " y") && (y = -1);
	            s.flip = flip;
	            o.coordorigin = (dx * -kx) + S + (dy * -ky);
	            if (fillpos || _.fillsize) {
	                var fill = o.getElementsByTagName(fillString);
	                fill = fill && fill[0];
	                o.removeChild(fill);
	                if (fillpos) {
	                    c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
	                    fill.position = c.dx * y + S + c.dy * y;
	                }
	                if (_.fillsize) {
	                    fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
	                }
	                o.appendChild(fill);
	            }
	            s.visibility = "visible";
	        };
	    R.toString = function () {
	        return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
	    };
	    var addArrow = function (o, value, isEnd) {
	        var values = Str(value).toLowerCase().split("-"),
	            se = isEnd ? "end" : "start",
	            i = values.length,
	            type = "classic",
	            w = "medium",
	            h = "medium";
	        while (i--) {
	            switch (values[i]) {
	                case "block":
	                case "classic":
	                case "oval":
	                case "diamond":
	                case "open":
	                case "none":
	                    type = values[i];
	                    break;
	                case "wide":
	                case "narrow": h = values[i]; break;
	                case "long":
	                case "short": w = values[i]; break;
	            }
	        }
	        var stroke = o.node.getElementsByTagName("stroke")[0];
	        stroke[se + "arrow"] = type;
	        stroke[se + "arrowlength"] = w;
	        stroke[se + "arrowwidth"] = h;
	    },
	    setFillAndStroke = function (o, params) {
	        // o.paper.canvas.style.display = "none";
	        o.attrs = o.attrs || {};
	        var node = o.node,
	            a = o.attrs,
	            s = node.style,
	            xy,
	            newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
	            isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
	            res = o;


	        for (var par in params) if (params[has](par)) {
	            a[par] = params[par];
	        }
	        if (newpath) {
	            a.path = R._getPath[o.type](o);
	            o._.dirty = 1;
	        }
	        params.href && (node.href = params.href);
	        params.title && (node.title = params.title);
	        params.target && (node.target = params.target);
	        params.cursor && (s.cursor = params.cursor);
	        "blur" in params && o.blur(params.blur);
	        if (params.path && o.type == "path" || newpath) {
	            node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
	            o._.dirty = 1;
	            if (o.type == "image") {
	                o._.fillpos = [a.x, a.y];
	                o._.fillsize = [a.width, a.height];
	                setCoords(o, 1, 1, 0, 0, 0);
	            }
	        }
	        "transform" in params && o.transform(params.transform);
	        if (isOval) {
	            var cx = +a.cx,
	                cy = +a.cy,
	                rx = +a.rx || +a.r || 0,
	                ry = +a.ry || +a.r || 0;
	            node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
	            o._.dirty = 1;
	        }
	        if ("clip-rect" in params) {
	            var rect = Str(params["clip-rect"]).split(separator);
	            if (rect.length == 4) {
	                rect[2] = +rect[2] + (+rect[0]);
	                rect[3] = +rect[3] + (+rect[1]);
	                var div = node.clipRect || R._g.doc.createElement("div"),
	                    dstyle = div.style;
	                dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
	                if (!node.clipRect) {
	                    dstyle.position = "absolute";
	                    dstyle.top = 0;
	                    dstyle.left = 0;
	                    dstyle.width = o.paper.width + "px";
	                    dstyle.height = o.paper.height + "px";
	                    node.parentNode.insertBefore(div, node);
	                    div.appendChild(node);
	                    node.clipRect = div;
	                }
	            }
	            if (!params["clip-rect"]) {
	                node.clipRect && (node.clipRect.style.clip = "auto");
	            }
	        }
	        if (o.textpath) {
	            var textpathStyle = o.textpath.style;
	            params.font && (textpathStyle.font = params.font);
	            params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
	            params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
	            params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
	            params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
	        }
	        if ("arrow-start" in params) {
	            addArrow(res, params["arrow-start"]);
	        }
	        if ("arrow-end" in params) {
	            addArrow(res, params["arrow-end"], 1);
	        }
	        if (params.opacity != null ||
	            params.fill != null ||
	            params.src != null ||
	            params.stroke != null ||
	            params["stroke-width"] != null ||
	            params["stroke-opacity"] != null ||
	            params["fill-opacity"] != null ||
	            params["stroke-dasharray"] != null ||
	            params["stroke-miterlimit"] != null ||
	            params["stroke-linejoin"] != null ||
	            params["stroke-linecap"] != null) {
	            var fill = node.getElementsByTagName(fillString),
	                newfill = false;
	            fill = fill && fill[0];
	            !fill && (newfill = fill = createNode(fillString));
	            if (o.type == "image" && params.src) {
	                fill.src = params.src;
	            }
	            params.fill && (fill.on = true);
	            if (fill.on == null || params.fill == "none" || params.fill === null) {
	                fill.on = false;
	            }
	            if (fill.on && params.fill) {
	                var isURL = Str(params.fill).match(R._ISURL);
	                if (isURL) {
	                    fill.parentNode == node && node.removeChild(fill);
	                    fill.rotate = true;
	                    fill.src = isURL[1];
	                    fill.type = "tile";
	                    var bbox = o.getBBox(1);
	                    fill.position = bbox.x + S + bbox.y;
	                    o._.fillpos = [bbox.x, bbox.y];

	                    R._preload(isURL[1], function () {
	                        o._.fillsize = [this.offsetWidth, this.offsetHeight];
	                    });
	                } else {
	                    fill.color = R.getRGB(params.fill).hex;
	                    fill.src = E;
	                    fill.type = "solid";
	                    if (R.getRGB(params.fill).error && (res.type in {circle: 1, ellipse: 1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
	                        a.fill = "none";
	                        a.gradient = params.fill;
	                        fill.rotate = false;
	                    }
	                }
	            }
	            if ("fill-opacity" in params || "opacity" in params) {
	                var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
	                opacity = mmin(mmax(opacity, 0), 1);
	                fill.opacity = opacity;
	                if (fill.src) {
	                    fill.color = "none";
	                }
	            }
	            node.appendChild(fill);
	            var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
	            newstroke = false;
	            !stroke && (newstroke = stroke = createNode("stroke"));
	            if ((params.stroke && params.stroke != "none") ||
	                params["stroke-width"] ||
	                params["stroke-opacity"] != null ||
	                params["stroke-dasharray"] ||
	                params["stroke-miterlimit"] ||
	                params["stroke-linejoin"] ||
	                params["stroke-linecap"]) {
	                stroke.on = true;
	            }
	            (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
	            var strokeColor = R.getRGB(params.stroke);
	            stroke.on && params.stroke && (stroke.color = strokeColor.hex);
	            opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
	            var width = (toFloat(params["stroke-width"]) || 1) * .75;
	            opacity = mmin(mmax(opacity, 0), 1);
	            params["stroke-width"] == null && (width = a["stroke-width"]);
	            params["stroke-width"] && (stroke.weight = width);
	            width && width < 1 && (opacity *= width) && (stroke.weight = 1);
	            stroke.opacity = opacity;

	            params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
	            stroke.miterlimit = params["stroke-miterlimit"] || 8;
	            params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
	            if ("stroke-dasharray" in params) {
	                var dasharray = {
	                    "-": "shortdash",
	                    ".": "shortdot",
	                    "-.": "shortdashdot",
	                    "-..": "shortdashdotdot",
	                    ". ": "dot",
	                    "- ": "dash",
	                    "--": "longdash",
	                    "- .": "dashdot",
	                    "--.": "longdashdot",
	                    "--..": "longdashdotdot"
	                };
	                stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
	            }
	            newstroke && node.appendChild(stroke);
	        }
	        if (res.type == "text") {
	            res.paper.canvas.style.display = E;
	            var span = res.paper.span,
	                m = 100,
	                fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
	            s = span.style;
	            a.font && (s.font = a.font);
	            a["font-family"] && (s.fontFamily = a["font-family"]);
	            a["font-weight"] && (s.fontWeight = a["font-weight"]);
	            a["font-style"] && (s.fontStyle = a["font-style"]);
	            fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
	            s.fontSize = fontSize * m + "px";
	            res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
	            var brect = span.getBoundingClientRect();
	            res.W = a.w = (brect.right - brect.left) / m;
	            res.H = a.h = (brect.bottom - brect.top) / m;
	            // res.paper.canvas.style.display = "none";
	            res.X = a.x;
	            res.Y = a.y + res.H / 2;

	            ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
	            var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
	            for (var d = 0, dd = dirtyattrs.length; d < dd; d++) if (dirtyattrs[d] in params) {
	                res._.dirty = 1;
	                break;
	            }

	            // text-anchor emulation
	            switch (a["text-anchor"]) {
	                case "start":
	                    res.textpath.style["v-text-align"] = "left";
	                    res.bbx = res.W / 2;
	                break;
	                case "end":
	                    res.textpath.style["v-text-align"] = "right";
	                    res.bbx = -res.W / 2;
	                break;
	                default:
	                    res.textpath.style["v-text-align"] = "center";
	                    res.bbx = 0;
	                break;
	            }
	            res.textpath.style["v-text-kern"] = true;
	        }
	        // res.paper.canvas.style.display = E;
	    },
	    addGradientFill = function (o, gradient, fill) {
	        o.attrs = o.attrs || {};
	        var attrs = o.attrs,
	            pow = Math.pow,
	            opacity,
	            oindex,
	            type = "linear",
	            fxfy = ".5 .5";
	        o.attrs.gradient = gradient;
	        gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
	            type = "radial";
	            if (fx && fy) {
	                fx = toFloat(fx);
	                fy = toFloat(fy);
	                pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
	                fxfy = fx + S + fy;
	            }
	            return E;
	        });
	        gradient = gradient.split(/\s*\-\s*/);
	        if (type == "linear") {
	            var angle = gradient.shift();
	            angle = -toFloat(angle);
	            if (isNaN(angle)) {
	                return null;
	            }
	        }
	        var dots = R._parseDots(gradient);
	        if (!dots) {
	            return null;
	        }
	        o = o.shape || o.node;
	        if (dots.length) {
	            o.removeChild(fill);
	            fill.on = true;
	            fill.method = "none";
	            fill.color = dots[0].color;
	            fill.color2 = dots[dots.length - 1].color;
	            var clrs = [];
	            for (var i = 0, ii = dots.length; i < ii; i++) {
	                dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
	            }
	            fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
	            if (type == "radial") {
	                fill.type = "gradientTitle";
	                fill.focus = "100%";
	                fill.focussize = "0 0";
	                fill.focusposition = fxfy;
	                fill.angle = 0;
	            } else {
	                // fill.rotate= true;
	                fill.type = "gradient";
	                fill.angle = (270 - angle) % 360;
	            }
	            o.appendChild(fill);
	        }
	        return 1;
	    },
	    Element = function (node, vml) {
	        this[0] = this.node = node;
	        node.raphael = true;
	        this.id = R._oid++;
	        node.raphaelid = this.id;
	        this.X = 0;
	        this.Y = 0;
	        this.attrs = {};
	        this.paper = vml;
	        this.matrix = R.matrix();
	        this._ = {
	            transform: [],
	            sx: 1,
	            sy: 1,
	            dx: 0,
	            dy: 0,
	            deg: 0,
	            dirty: 1,
	            dirtyT: 1
	        };
	        !vml.bottom && (vml.bottom = this);
	        this.prev = vml.top;
	        vml.top && (vml.top.next = this);
	        vml.top = this;
	        this.next = null;
	    };
	    var elproto = R.el;

	    Element.prototype = elproto;
	    elproto.constructor = Element;
	    elproto.transform = function (tstr) {
	        if (tstr == null) {
	            return this._.transform;
	        }
	        var vbs = this.paper._viewBoxShift,
	            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
	            oldt;
	        if (vbs) {
	            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
	        }
	        R._extractTransform(this, vbt + tstr);
	        var matrix = this.matrix.clone(),
	            skew = this.skew,
	            o = this.node,
	            split,
	            isGrad = ~Str(this.attrs.fill).indexOf("-"),
	            isPatt = !Str(this.attrs.fill).indexOf("url(");
	        matrix.translate(1, 1);
	        if (isPatt || isGrad || this.type == "image") {
	            skew.matrix = "1 0 0 1";
	            skew.offset = "0 0";
	            split = matrix.split();
	            if ((isGrad && split.noRotation) || !split.isSimple) {
	                o.style.filter = matrix.toFilter();
	                var bb = this.getBBox(),
	                    bbt = this.getBBox(1),
	                    dx = bb.x - bbt.x,
	                    dy = bb.y - bbt.y;
	                o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
	                setCoords(this, 1, 1, dx, dy, 0);
	            } else {
	                o.style.filter = E;
	                setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
	            }
	        } else {
	            o.style.filter = E;
	            skew.matrix = Str(matrix);
	            skew.offset = matrix.offset();
	        }
	        if (oldt !== null) { // empty string value is true as well
	            this._.transform = oldt;
	            R._extractTransform(this, oldt);
	        }
	        return this;
	    };
	    elproto.rotate = function (deg, cx, cy) {
	        if (this.removed) {
	            return this;
	        }
	        if (deg == null) {
	            return;
	        }
	        deg = Str(deg).split(separator);
	        if (deg.length - 1) {
	            cx = toFloat(deg[1]);
	            cy = toFloat(deg[2]);
	        }
	        deg = toFloat(deg[0]);
	        (cy == null) && (cx = cy);
	        if (cx == null || cy == null) {
	            var bbox = this.getBBox(1);
	            cx = bbox.x + bbox.width / 2;
	            cy = bbox.y + bbox.height / 2;
	        }
	        this._.dirtyT = 1;
	        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
	        return this;
	    };
	    elproto.translate = function (dx, dy) {
	        if (this.removed) {
	            return this;
	        }
	        dx = Str(dx).split(separator);
	        if (dx.length - 1) {
	            dy = toFloat(dx[1]);
	        }
	        dx = toFloat(dx[0]) || 0;
	        dy = +dy || 0;
	        if (this._.bbox) {
	            this._.bbox.x += dx;
	            this._.bbox.y += dy;
	        }
	        this.transform(this._.transform.concat([["t", dx, dy]]));
	        return this;
	    };
	    elproto.scale = function (sx, sy, cx, cy) {
	        if (this.removed) {
	            return this;
	        }
	        sx = Str(sx).split(separator);
	        if (sx.length - 1) {
	            sy = toFloat(sx[1]);
	            cx = toFloat(sx[2]);
	            cy = toFloat(sx[3]);
	            isNaN(cx) && (cx = null);
	            isNaN(cy) && (cy = null);
	        }
	        sx = toFloat(sx[0]);
	        (sy == null) && (sy = sx);
	        (cy == null) && (cx = cy);
	        if (cx == null || cy == null) {
	            var bbox = this.getBBox(1);
	        }
	        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
	        cy = cy == null ? bbox.y + bbox.height / 2 : cy;

	        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
	        this._.dirtyT = 1;
	        return this;
	    };
	    elproto.hide = function () {
	        !this.removed && (this.node.style.display = "none");
	        return this;
	    };
	    elproto.show = function () {
	        !this.removed && (this.node.style.display = E);
	        return this;
	    };
	    // Needed to fix the vml setViewBox issues
	    elproto.auxGetBBox = R.el.getBBox;
	    elproto.getBBox = function(){
	      var b = this.auxGetBBox();
	      if (this.paper && this.paper._viewBoxShift)
	      {
	        var c = {};
	        var z = 1/this.paper._viewBoxShift.scale;
	        c.x = b.x - this.paper._viewBoxShift.dx;
	        c.x *= z;
	        c.y = b.y - this.paper._viewBoxShift.dy;
	        c.y *= z;
	        c.width  = b.width  * z;
	        c.height = b.height * z;
	        c.x2 = c.x + c.width;
	        c.y2 = c.y + c.height;
	        return c;
	      }
	      return b;
	    };
	    elproto._getBBox = function () {
	        if (this.removed) {
	            return {};
	        }
	        return {
	            x: this.X + (this.bbx || 0) - this.W / 2,
	            y: this.Y - this.H,
	            width: this.W,
	            height: this.H
	        };
	    };
	    elproto.remove = function () {
	        if (this.removed || !this.node.parentNode) {
	            return;
	        }
	        this.paper.__set__ && this.paper.__set__.exclude(this);
	        R.eve.unbind("raphael.*.*." + this.id);
	        R._tear(this, this.paper);
	        this.node.parentNode.removeChild(this.node);
	        this.shape && this.shape.parentNode.removeChild(this.shape);
	        for (var i in this) {
	            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
	        }
	        this.removed = true;
	    };
	    elproto.attr = function (name, value) {
	        if (this.removed) {
	            return this;
	        }
	        if (name == null) {
	            var res = {};
	            for (var a in this.attrs) if (this.attrs[has](a)) {
	                res[a] = this.attrs[a];
	            }
	            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
	            res.transform = this._.transform;
	            return res;
	        }
	        if (value == null && R.is(name, "string")) {
	            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
	                return this.attrs.gradient;
	            }
	            var names = name.split(separator),
	                out = {};
	            for (var i = 0, ii = names.length; i < ii; i++) {
	                name = names[i];
	                if (name in this.attrs) {
	                    out[name] = this.attrs[name];
	                } else if (R.is(this.paper.customAttributes[name], "function")) {
	                    out[name] = this.paper.customAttributes[name].def;
	                } else {
	                    out[name] = R._availableAttrs[name];
	                }
	            }
	            return ii - 1 ? out : out[names[0]];
	        }
	        if (this.attrs && value == null && R.is(name, "array")) {
	            out = {};
	            for (i = 0, ii = name.length; i < ii; i++) {
	                out[name[i]] = this.attr(name[i]);
	            }
	            return out;
	        }
	        var params;
	        if (value != null) {
	            params = {};
	            params[name] = value;
	        }
	        value == null && R.is(name, "object") && (params = name);
	        for (var key in params) {
	            eve("raphael.attr." + key + "." + this.id, this, params[key]);
	        }
	        if (params) {
	            for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
	                var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
	                this.attrs[key] = params[key];
	                for (var subkey in par) if (par[has](subkey)) {
	                    params[subkey] = par[subkey];
	                }
	            }
	            // this.paper.canvas.style.display = "none";
	            if (params.text && this.type == "text") {
	                this.textpath.string = params.text;
	            }
	            setFillAndStroke(this, params);
	            // this.paper.canvas.style.display = E;
	        }
	        return this;
	    };
	    elproto.toFront = function () {
	        !this.removed && this.node.parentNode.appendChild(this.node);
	        this.paper && this.paper.top != this && R._tofront(this, this.paper);
	        return this;
	    };
	    elproto.toBack = function () {
	        if (this.removed) {
	            return this;
	        }
	        if (this.node.parentNode.firstChild != this.node) {
	            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
	            R._toback(this, this.paper);
	        }
	        return this;
	    };
	    elproto.insertAfter = function (element) {
	        if (this.removed) {
	            return this;
	        }
	        if (element.constructor == R.st.constructor) {
	            element = element[element.length - 1];
	        }
	        if (element.node.nextSibling) {
	            element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
	        } else {
	            element.node.parentNode.appendChild(this.node);
	        }
	        R._insertafter(this, element, this.paper);
	        return this;
	    };
	    elproto.insertBefore = function (element) {
	        if (this.removed) {
	            return this;
	        }
	        if (element.constructor == R.st.constructor) {
	            element = element[0];
	        }
	        element.node.parentNode.insertBefore(this.node, element.node);
	        R._insertbefore(this, element, this.paper);
	        return this;
	    };
	    elproto.blur = function (size) {
	        var s = this.node.runtimeStyle,
	            f = s.filter;
	        f = f.replace(blurregexp, E);
	        if (+size !== 0) {
	            this.attrs.blur = size;
	            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
	            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
	        } else {
	            s.filter = f;
	            s.margin = 0;
	            delete this.attrs.blur;
	        }
	        return this;
	    };

	    R._engine.path = function (pathString, vml) {
	        var el = createNode("shape");
	        el.style.cssText = cssDot;
	        el.coordsize = zoom + S + zoom;
	        el.coordorigin = vml.coordorigin;
	        var p = new Element(el, vml),
	            attr = {fill: "none", stroke: "#000"};
	        pathString && (attr.path = pathString);
	        p.type = "path";
	        p.path = [];
	        p.Path = E;
	        setFillAndStroke(p, attr);
	        vml.canvas && vml.canvas.appendChild(el);
	        var skew = createNode("skew");
	        skew.on = true;
	        el.appendChild(skew);
	        p.skew = skew;
	        p.transform(E);
	        return p;
	    };
	    R._engine.rect = function (vml, x, y, w, h, r) {
	        var path = R._rectPath(x, y, w, h, r),
	            res = vml.path(path),
	            a = res.attrs;
	        res.X = a.x = x;
	        res.Y = a.y = y;
	        res.W = a.width = w;
	        res.H = a.height = h;
	        a.r = r;
	        a.path = path;
	        res.type = "rect";
	        return res;
	    };
	    R._engine.ellipse = function (vml, x, y, rx, ry) {
	        var res = vml.path(),
	            a = res.attrs;
	        res.X = x - rx;
	        res.Y = y - ry;
	        res.W = rx * 2;
	        res.H = ry * 2;
	        res.type = "ellipse";
	        setFillAndStroke(res, {
	            cx: x,
	            cy: y,
	            rx: rx,
	            ry: ry
	        });
	        return res;
	    };
	    R._engine.circle = function (vml, x, y, r) {
	        var res = vml.path(),
	            a = res.attrs;
	        res.X = x - r;
	        res.Y = y - r;
	        res.W = res.H = r * 2;
	        res.type = "circle";
	        setFillAndStroke(res, {
	            cx: x,
	            cy: y,
	            r: r
	        });
	        return res;
	    };
	    R._engine.image = function (vml, src, x, y, w, h) {
	        var path = R._rectPath(x, y, w, h),
	            res = vml.path(path).attr({stroke: "none"}),
	            a = res.attrs,
	            node = res.node,
	            fill = node.getElementsByTagName(fillString)[0];
	        a.src = src;
	        res.X = a.x = x;
	        res.Y = a.y = y;
	        res.W = a.width = w;
	        res.H = a.height = h;
	        a.path = path;
	        res.type = "image";
	        fill.parentNode == node && node.removeChild(fill);
	        fill.rotate = true;
	        fill.src = src;
	        fill.type = "tile";
	        res._.fillpos = [x, y];
	        res._.fillsize = [w, h];
	        node.appendChild(fill);
	        setCoords(res, 1, 1, 0, 0, 0);
	        return res;
	    };
	    R._engine.text = function (vml, x, y, text) {
	        var el = createNode("shape"),
	            path = createNode("path"),
	            o = createNode("textpath");
	        x = x || 0;
	        y = y || 0;
	        text = text || "";
	        path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
	        path.textpathok = true;
	        o.string = Str(text);
	        o.on = true;
	        el.style.cssText = cssDot;
	        el.coordsize = zoom + S + zoom;
	        el.coordorigin = "0 0";
	        var p = new Element(el, vml),
	            attr = {
	                fill: "#000",
	                stroke: "none",
	                font: R._availableAttrs.font,
	                text: text
	            };
	        p.shape = el;
	        p.path = path;
	        p.textpath = o;
	        p.type = "text";
	        p.attrs.text = Str(text);
	        p.attrs.x = x;
	        p.attrs.y = y;
	        p.attrs.w = 1;
	        p.attrs.h = 1;
	        setFillAndStroke(p, attr);
	        el.appendChild(o);
	        el.appendChild(path);
	        vml.canvas.appendChild(el);
	        var skew = createNode("skew");
	        skew.on = true;
	        el.appendChild(skew);
	        p.skew = skew;
	        p.transform(E);
	        return p;
	    };
	    R._engine.setSize = function (width, height) {
	        var cs = this.canvas.style;
	        this.width = width;
	        this.height = height;
	        width == +width && (width += "px");
	        height == +height && (height += "px");
	        cs.width = width;
	        cs.height = height;
	        cs.clip = "rect(0 " + width + " " + height + " 0)";
	        if (this._viewBox) {
	            R._engine.setViewBox.apply(this, this._viewBox);
	        }
	        return this;
	    };
	    R._engine.setViewBox = function (x, y, w, h, fit) {
	        R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
	        var paperSize = this.getSize(),
	            width = paperSize.width,
	            height = paperSize.height,
	            H, W;
	        if (fit) {
	            H = height / h;
	            W = width / w;
	            if (w * H < width) {
	                x -= (width - w * H) / 2 / H;
	            }
	            if (h * W < height) {
	                y -= (height - h * W) / 2 / W;
	            }
	        }
	        this._viewBox = [x, y, w, h, !!fit];
	        this._viewBoxShift = {
	            dx: -x,
	            dy: -y,
	            scale: paperSize
	        };
	        this.forEach(function (el) {
	            el.transform("...");
	        });
	        return this;
	    };
	    var createNode;
	    R._engine.initWin = function (win) {
	            var doc = win.document;
	            if (doc.styleSheets.length < 31) {
	                doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
	            } else {
	                // no more room, add to the existing one
	                // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx
	                doc.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
	            }
	            try {
	                !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
	                createNode = function (tagName) {
	                    return doc.createElement('<rvml:' + tagName + ' class="rvml">');
	                };
	            } catch (e) {
	                createNode = function (tagName) {
	                    return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
	                };
	            }
	        };
	    R._engine.initWin(R._g.win);
	    R._engine.create = function () {
	        var con = R._getContainer.apply(0, arguments),
	            container = con.container,
	            height = con.height,
	            s,
	            width = con.width,
	            x = con.x,
	            y = con.y;
	        if (!container) {
	            throw new Error("VML container not found.");
	        }
	        var res = new R._Paper,
	            c = res.canvas = R._g.doc.createElement("div"),
	            cs = c.style;
	        x = x || 0;
	        y = y || 0;
	        width = width || 512;
	        height = height || 342;
	        res.width = width;
	        res.height = height;
	        width == +width && (width += "px");
	        height == +height && (height += "px");
	        res.coordsize = zoom * 1e3 + S + zoom * 1e3;
	        res.coordorigin = "0 0";
	        res.span = R._g.doc.createElement("span");
	        res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
	        c.appendChild(res.span);
	        cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
	        if (container == 1) {
	            R._g.doc.body.appendChild(c);
	            cs.left = x + "px";
	            cs.top = y + "px";
	            cs.position = "absolute";
	        } else {
	            if (container.firstChild) {
	                container.insertBefore(c, container.firstChild);
	            } else {
	                container.appendChild(c);
	            }
	        }
	        res.renderfix = function () {};
	        return res;
	    };
	    R.prototype.clear = function () {
	        R.eve("raphael.clear", this);
	        this.canvas.innerHTML = E;
	        this.span = R._g.doc.createElement("span");
	        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
	        this.canvas.appendChild(this.span);
	        this.bottom = this.top = null;
	    };
	    R.prototype.remove = function () {
	        R.eve("raphael.remove", this);
	        this.canvas.parentNode.removeChild(this.canvas);
	        for (var i in this) {
	            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
	        }
	        return true;
	    };

	    var setproto = R.st;
	    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
	        setproto[method] = (function (methodname) {
	            return function () {
	                var arg = arguments;
	                return this.forEach(function (el) {
	                    el[methodname].apply(el, arg);
	                });
	            };
	        })(method);
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ])
});
;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 *
 * Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
 * Requires jQuery and Mapael
 *
 * Map of World by country
 * 
 * @source http://backspace.com/mapapp/javascript_world/
 */

(function (factory) {
    module.exports = factory($, __webpack_require__(3));
}(function ($, Mapael) {
    $.extend(true, Mapael,
        {
            maps :  {
                world_countries : {
                    width : 1000,
                    height : 400,
                    getCoords : function (lat, lon) {
                        var xfactor = 2.752;
                        var xoffset = 473.75;
                        var x = (lon * xfactor) + xoffset;
                        
                        var yfactor = -2.753;
                        var yoffset = 231;
                        var y = (lat * yfactor) + yoffset;
                        
                        return {x : x, y : y};
                    },
                    'elems': {
                        "AE" : "M615.622,164.177l0.582,0.000l0.000,0.580l2.324,-0.289l2.326,0.000l1.455,0.000l2.033,-1.743l2.034,-1.743l1.745,-1.742l0.583,0.871l0.291,2.324l-1.456,0.000l-0.289,1.742l0.581,0.291l-1.163,0.580l0.000,1.161l-0.873,1.162l0.000,1.162l-0.580,0.580l-8.430,-1.452l-0.872,-2.613l0.291,0.871z",
                        "AF" : "M642.364,132.815l2.617,1.162l2.034,-0.291l0.581,-1.452l2.325,-0.291l1.454,-0.870l0.583,-2.323l2.326,-0.291l0.580,-1.162l1.164,0.871l0.871,0.000l1.453,0.000l2.035,0.582l0.871,0.290l2.036,-0.872l0.872,0.582l0.872,-1.162l1.745,0.000l0.289,-0.291l0.290,-1.161l1.455,-1.161l1.454,0.871l-0.291,0.871l0.581,0.000l0.000,2.323l0.873,0.872l1.161,-0.581l1.162,-0.291l1.744,-1.162l1.745,0.290l2.909,0.000l0.580,0.582l-1.743,0.290l-1.454,0.581l-2.907,0.291l-3.197,0.580l-1.454,1.161l0.581,1.162l0.289,1.452l-1.450,1.161l0.289,1.162l-0.872,0.871l-2.616,0.000l1.161,1.743l-1.742,0.580l-1.162,1.743l0.000,1.743l-0.875,0.580l-1.160,0.000l-2.036,0.290l-0.292,0.581l-2.034,0.000l-1.452,1.742l-0.291,2.323l-3.488,1.161l-2.035,-0.289l-0.581,0.580l-1.455,-0.291l-2.907,0.291l-4.649,-1.452l2.615,-2.323l-0.289,-1.742l-2.036,-0.581l-0.290,-1.743l-0.873,-2.032l1.163,-1.742l-1.163,-0.291l0.873,-2.032l-1.161,3.485z",
                        "AL" : "M530.451,115.973l-0.289,0.871l0.289,1.161l1.165,0.581l0.000,0.872l-0.873,0.291l-0.292,0.869l-1.160,1.453l-0.583,-0.291l0.000,-0.580l-1.454,-0.871l-0.292,-1.452l0.292,-1.742l0.292,-0.872l-0.584,-0.580l0.000,-0.872l1.163,-1.162l0.292,0.291l0.582,0.000l0.581,0.581l0.582,0.290l-0.289,-1.162z",
                        "AM" : "M593.82,118.005l3.780,-0.580l0.581,0.870l0.871,0.291l-0.289,0.872l1.452,0.871l-0.871,0.871l1.163,0.871l1.162,0.290l0.000,2.032l-0.873,0.000l-1.163,-1.451l0.000,-0.581l-1.160,0.000l-0.873,-0.581l-0.582,0.000l-1.162,-0.871l-2.036,-0.580l0.292,-1.452l0.292,0.872z",
                        "AO" : "M518.825,247.227l0.582,2.032l0.871,1.453l0.581,0.87l0.874,1.452h2.033l0.873-0.581l1.452,0.581l0.582-0.871l0.581-1.451l1.744-0.291v-0.29h1.452l-0.289,0.871h3.488v1.742l0.579,1.161l-0.579,1.453l0.29,1.74l0.873,1.162v3.195l0.581-0.292h1.162l1.745-0.29h1.161l0.291,0.871l-0.291,1.452l0.583,1.161l-0.292,1.161v0.873h-5.524l-0.289,8.711l2.034,2.322l1.745,1.744l-5.232,1.161l-6.396-0.582l-2.033-1.161h-11.047l-0.581,0.291l-1.745-1.161l-1.743-0.292l-1.455,0.581l-1.452,0.581l-0.29-1.742l0.581-2.612l0.871-2.324v-1.161l0.874-2.613l0.871-1.163l1.452-1.742l0.873-1.16l0.292-2.033v-1.451l-0.874-1.162l-0.871-1.742l-0.581-1.452v-0.581l0.872-1.161l-0.872-2.613l-0.291-1.742l-1.455-1.741l0.292-0.582l1.163-0.581l0.581,0.291l1.162-0.581L518.825,247.227zM508.071,246.646l-0.874,0.291l-0.581-2.031l1.163-1.163l0.87-0.581l0.874,0.871l-0.874,0.58l-0.578,0.872V246.646z",
                        "AR" : "M293.546,382.836h-2.616l-1.454-0.87h-1.745h-2.907v-6.389l1.163,1.45l1.163,2.033l3.779,1.744l3.778,0.58L293.546,382.836zM295,291.656l1.452,2.033l1.163-2.323l3.198,0.29l0.291,0.581l5.232,4.356l2.326,0.29l3.198,2.033l2.906,1.161l0.291,1.162l-2.617,4.354l2.617,0.58l3.197,0.581l2.326-0.581l2.326-2.032l0.582-2.322l1.163-0.58l1.454,1.45v2.324l-2.325,1.45l-1.745,1.163l-3.198,2.612l-3.779,3.777l-0.582,2.321l-0.872,2.613l0.291,2.905l-0.872,0.58v1.741l-0.29,1.452l3.487,2.323l-0.291,2.033l1.745,1.161l-0.291,1.162l-2.616,3.773l-4.07,1.455l-5.522,0.579l-2.907-0.29l0.582,1.451l-0.582,2.033l0.291,1.452l-1.454,0.871l-2.907,0.58l-2.616-1.161l-1.163,0.871l0.583,2.613l1.744,0.872l1.452-0.872l0.873,1.453l-2.617,0.87l-2.035,1.743l-0.582,2.613l-0.58,1.451h-2.617l-2.035,1.451l-0.873,2.033l2.617,2.032l2.615,0.582l-0.872,2.613l-3.197,1.452l-1.744,3.194l-2.616,1.161l-1.163,1.163l0.872,2.902l2.035,1.742l-1.163-0.291l-2.617-0.29l-6.685-0.58l-1.163-1.453v-2.03h-1.744l-0.873-0.873l-0.291-2.904l2.035-1.161l0.873-1.741l-0.292-1.453l1.455-2.323l0.872-3.775l-0.291-1.451l1.452-0.58l-0.29-1.162l-1.454-0.289l0.873-1.162l-1.162-1.162l-0.582-3.194l1.164-0.581l-0.582-3.193l0.582-2.904l0.872-2.613l1.453-0.87l-0.581-2.615l-0.292-2.613l2.326-1.742l-0.29-2.323l1.744-2.613v-2.613l-0.873-0.58l-1.163-4.646l1.744-2.904l-0.291-2.612l0.872-2.614l2.035-2.324l1.744-1.741l-0.872-1.163l0.582-0.87v-4.646l2.907-1.451l1.163-2.613l-0.291-0.872l2.034-2.324L295,291.656z",
                        "AT" : "M520.57,98.549l-0.292,1.162l-1.453,0.000l0.582,0.581l-1.164,1.742l-0.291,0.580l-2.616,0.000l-1.162,0.582l-2.326,-0.291l-4.069,-0.580l-0.582,-0.872l-2.615,0.292l-0.291,0.580l-1.746,-0.291l-1.452,0.000l-1.162,-0.581l0.289,-0.581l0.000,-0.580l0.873,-0.291l1.452,0.871l0.292,-0.871l2.326,0.291l2.034,-0.581l1.452,0.000l0.584,0.581l0.290,-0.291l-0.290,-1.742l0.872,-0.580l1.162,-1.162l2.035,0.871l1.453,-1.162l0.871,0.000l2.326,0.581l1.163,0.000l1.455,0.581l-0.292,0.291l-0.292,-0.870z",
                        "AU" : "M874.039,343.054l2.616,0.871l1.454-0.29l2.325-0.581l1.453,0.291l0.291,3.193l-0.87,0.872l-0.293,2.321l-1.162-0.579l-1.744,1.741h-0.582l-1.743-0.289l-1.745-2.324l-0.289-1.742l-1.744-2.323l0.29-1.451L874.039,343.054zM868.806,268.715l1.163,2.324l1.744-1.163l0.873,1.163l1.452,1.161l-0.289,1.161l0.58,2.324l0.291,1.45l0.873,0.29l0.579,2.323l-0.289,1.453l0.871,1.741l3.198,1.453l1.744,1.451l2.034,1.161l-0.582,0.581l1.745,1.742l0.87,2.904l1.165-0.581l1.163,1.452l0.581-0.581l0.579,2.904l2.036,1.742l1.163,1.161l2.034,2.033l0.873,2.322v1.452v1.742l1.163,2.323v2.323l-0.582,1.452l-0.581,2.323v1.742l-0.582,2.033l-1.162,2.322l-2.034,1.453l-1.163,2.031l-0.872,1.453l-0.872,2.322l-0.871,1.451l-0.873,2.033l-0.292,1.743v0.87l-1.452,1.163h-3.198l-2.326,1.159l-1.452,1.163l-1.454,1.161l-2.325-1.45l-1.743-0.293l0.289-1.45l-1.452,0.58l-2.325,1.744l-2.326-0.581l-1.743-0.582h-1.454l-2.616-0.871l-1.744-1.743l-0.582-2.032l-0.58-1.452l-1.456-1.162l-2.614-0.29l0.873-1.161l-0.581-2.033l-1.455,1.744l-2.326,0.579l1.455-1.452l0.292-1.74l1.161-1.453l-0.291-2.032l-2.324,2.612l-1.745,0.873l-0.873,2.03l-2.323-1.161l0.29-1.452l-1.744-1.741l-1.455-1.161l0.583-0.581l-3.779-1.743h-1.744l-2.616-1.45l-4.942,0.29l-3.778,0.871l-2.907,1.162l-2.615-0.292l-2.908,1.451l-2.616,0.581l-0.289,1.452l-1.163,1.161h-2.325l-1.744,0.291l-2.325-0.581l-2.036,0.29l-2.034,0.291l-1.455,1.452l-0.871-0.291l-1.452,0.871l-1.163,0.873h-2.036h-2.034l-2.906-1.744l-1.452-0.58v-1.742l1.452-0.291l0.581-0.58l-0.29-1.161l0.58-1.743l-0.29-1.741l-1.454-2.614l-0.579-1.742v-1.452l-0.873-1.743l-0.29-0.87l-1.163-1.162l-0.292-2.033l-1.454-2.323l-0.579-1.161l1.163,1.161l-0.874-2.321l1.455,0.58l0.873,1.161v-1.451l-1.454-2.033l-0.292-0.87l-0.582-0.872l0.29-1.742l0.584-0.581l0.289-1.451l-0.289-1.453l1.162-2.032l0.292,2.032l1.161-1.743l2.034-1.159l1.454-1.162l2.034-0.872l1.454-0.29l0.581,0.29l2.325-0.871l1.455-0.29l0.579-0.58l0.582-0.291h1.744l2.616-0.871l1.745-1.161l0.579-1.452l1.744-1.452v-1.162v-1.45l2.036-2.324l1.163,2.324l1.163-0.292l-0.871-1.45l0.871-1.453l1.163,0.871l0.289-2.322l1.454-1.162l0.58-1.162l1.454-0.58v-0.581l1.163,0.291l0.291-0.872l1.163-0.291l1.163-0.289l2.034,1.161l1.743,1.742h1.453l1.744,0.291l-0.581-1.742l1.454-2.032l1.163-0.873l-0.291-0.581l1.162-1.452l1.744-1.161l1.165,0.291l2.323-0.291v-1.452l-2.034-0.87l1.453-0.58l2.035,0.869l1.453,1.163l2.326,0.581l0.581-0.29l1.744,0.87l1.744-0.87l0.871,0.29l0.872-0.581l1.164,1.451l-0.873,1.453l-0.872,1.16h-0.873l0.292,1.162l-0.873,1.452l-1.163,1.161l0.292,0.872l2.325,1.452l2.034,0.87l1.454,0.871l2.034,1.742h0.581l1.452,0.582l0.582,0.87l2.617,1.161l1.745-1.161l0.581-1.452l0.581-1.161l0.29-1.452l0.873-2.322l-0.291-1.161v-0.872l-0.291-1.452l0.291-2.322l0.581-0.29l-0.29-1.163l0.581-1.451l0.582-1.452v-0.872l1.163-0.869l0.58,1.45l0.291,1.743l0.581,0.291l0.291,1.16l0.871,1.163l0.292,1.74L868.806,268.715z",
                        "AZ" : "M597.6,121.78l0.873,0.581h1.16v0.581l1.163,1.451l-2.033-0.29l-1.163-1.453l-0.582-0.871H597.6zM604.285,117.715h1.165l0.29-0.581l1.744-1.162l1.452,1.452l1.453,2.033h1.165l0.87,0.871h-2.325l-0.292,2.322l-0.579,0.873l-0.873,0.58v1.452l-0.582,0.291l-1.743-1.453l0.871-1.451l-0.871-0.871l-0.872,0.291l-3.488,2.032v-2.032l-1.162-0.291l-1.163-0.871l0.871-0.871l-1.452-0.871l0.289-0.871l-0.871-0.291l-0.581-0.871l0.581-0.29l2.034,0.581l1.454,0.29l0.582-0.29l-1.455-1.453l0.582-0.29h0.873L604.285,117.715z",
                        "BA" : "M526.091,107.552l0.871,0.000l-0.581,1.161l1.455,1.162l-0.582,1.161l-0.581,0.291l-0.582,0.290l-0.872,0.581l-0.291,1.451l-2.614,-1.161l-0.874,-1.161l-1.162,-0.581l-1.163,-0.871l-0.579,-0.872l-1.454,-1.451l0.581,-0.872l1.162,0.581l0.582,-0.581l1.163,0.000l2.325,0.291l2.033,0.000l-1.163,-0.581z",
                        "BD" : "M728.989,170.275l-0.292,2.033l-0.871,-0.291l0.291,2.033l-0.872,-1.452l-0.292,-1.452l-0.290,-1.162l-1.163,-1.742l-2.615,0.000l0.289,1.161l-0.873,1.453l-1.161,-0.581l-0.581,0.581l-0.582,-0.292l-1.164,-0.289l-0.290,-2.324l-1.160,-2.032l0.579,-1.742l-1.744,-0.582l0.582,-1.160l1.743,-0.873l-2.034,-1.451l1.163,-2.032l2.034,1.451l1.454,0.000l0.291,2.032l2.616,0.291l2.327,0.000l1.743,0.291l-1.454,2.324l-1.163,0.289l-0.872,1.452l1.454,1.452l0.581,-1.742l0.872,0.000l-1.454,-4.356z",
                        "BE" : "M482.78,89.837l2.034,0.000l2.617,-0.580l1.745,1.451l1.452,0.582l-0.290,1.742l-0.583,0.291l-0.290,1.451l-2.615,-1.161l-1.162,0.000l-2.036,-1.162l-1.163,-1.161l-1.452,0.000l-0.293,-0.872l-2.036,0.581z",
                        "BF" : "M465.919,204.54l-1.744,-0.872l-1.452,0.291l-0.872,0.581l-1.164,-0.581l-0.579,-0.871l-1.165,-0.582l-0.290,-1.741l0.873,-1.161l0.000,-0.871l2.034,-2.324l0.291,-1.742l0.872,-0.871l1.452,0.581l1.163,-0.581l0.291,-0.872l2.035,-1.161l0.582,-0.871l2.617,-1.162l1.452,-0.290l0.582,0.581l2.035,0.000l-0.292,1.161l0.292,1.162l1.453,2.033l0.291,1.161l3.198,0.581l-0.291,2.032l-0.583,0.872l-1.161,0.290l-0.584,1.162l-0.870,0.290l-2.616,0.000l-1.163,-0.290l-0.872,0.290l-1.163,0.000l-4.942,0.000l0.000,1.452l-0.290,-2.323z",
                        "BG" : "M536.265,109.294l0.581,1.162l1.164,-0.291l2.035,0.581l4.071,0.000l1.452,-0.581l3.196,-0.581l2.035,0.872l1.454,0.290l-1.163,1.161l-1.163,2.033l0.872,1.452l-2.324,-0.290l-2.907,0.871l0.000,1.452l-2.326,0.000l-2.034,-0.872l-2.326,0.872l-2.036,-0.290l0.000,-1.743l-1.452,-0.871l0.290,-0.292l-0.290,-0.289l0.580,-0.871l1.164,-0.871l-1.454,-1.162l-0.290,-1.161l-0.871,0.581z",
                        "BI" : "M554.579,243.451l-0.290,-3.484l-0.583,-1.161l1.743,0.290l0.874,-1.743l1.454,0.291l0.000,0.871l0.582,0.871l0.000,0.872l-0.582,0.580l-1.163,1.454l-0.872,0.870l1.163,-0.289z",
                        "BJ" : "M481.037,213.833l-2.037,0.290l-0.872,-2.033l0.290,-6.388l-0.579,-0.289l-0.291,-1.454l-0.872,-0.871l-0.873,-0.871l0.582,-1.452l0.870,-0.290l0.584,-1.162l1.161,-0.290l0.583,-0.872l1.161,-0.871l0.874,0.000l2.034,1.453l0.000,1.160l0.580,1.453l-0.580,1.160l0.291,0.873l-1.454,1.452l-0.582,0.871l-0.581,1.743l0.000,1.741l0.289,-4.647z",
                        "BN" : "M787.998,218.479l1.163,-0.872l2.324,-1.741l0.000,1.451l-0.291,1.743l-1.163,0.000l-0.580,0.870l1.453,1.451z",
                        "BO" : "M300.812,291.656l-3.197,-0.290l-1.163,2.323l-1.452,-2.033l-3.781,-0.582l-2.033,2.324l-2.036,0.582l-1.163,-4.065l-1.453,-2.906l0.872,-2.612l-1.453,-1.163l-0.291,-2.031l-1.454,-2.033l1.745,-2.904l-1.163,-2.324l0.582,-0.869l-0.582,-0.872l1.163,-1.452l0.000,-2.323l0.290,-2.033l0.582,-0.873l-2.326,-4.355l2.035,0.000l1.163,0.000l0.872,-0.870l2.326,-0.872l1.453,-1.162l3.487,-0.580l-0.289,2.031l0.289,1.163l0.000,1.743l2.909,2.612l3.196,0.290l0.872,1.162l2.035,0.581l1.163,0.872l1.744,0.000l1.453,0.580l0.000,1.743l0.582,0.871l0.000,1.162l-0.582,0.000l0.872,3.195l5.233,0.000l-0.291,1.740l0.291,0.873l1.453,0.871l0.872,1.742l-0.581,2.032l-0.873,1.453l0.291,1.451l-0.872,0.580l0.000,-0.871l-2.615,-1.451l-2.616,0.000l-4.652,0.871l-1.453,2.324l0.000,1.451l-1.163,3.485l0.291,0.581z",
                        "BR" : "M315.056,314.017l3.778,-3.777l3.198,-2.613l1.745,-1.163l2.325,-1.450l0.000,-2.324l-1.454,-1.450l-1.162,0.580l0.580,-1.742l0.292,-1.454l0.000,-1.741l-1.163,-0.290l-0.872,0.290l-1.163,0.000l-0.290,-1.162l-0.291,-2.613l-0.291,-0.581l-2.035,-0.871l-1.163,0.581l-2.907,-0.581l0.291,-3.776l-0.872,-1.452l0.872,-0.580l-0.291,-1.451l0.873,-1.453l0.581,-2.032l-0.872,-1.742l-1.453,-0.871l-0.291,-0.873l0.291,-1.740l-5.233,0.000l-0.872,-3.195l0.582,0.000l0.000,-1.162l-0.582,-0.871l0.000,-1.743l-1.453,-0.580l-1.744,0.000l-1.163,-0.872l-2.035,-0.581l-0.872,-1.162l-3.196,-0.290l-2.909,-2.612l0.000,-1.743l-0.289,-1.163l0.289,-2.031l-3.487,0.580l-1.453,1.162l-2.326,0.872l-0.872,0.870l-1.163,0.000l-2.035,0.000l-1.744,0.292l-1.163,-0.292l0.292,-4.066l-2.326,1.453l-2.616,0.000l-0.872,-1.453l-1.744,0.000l0.581,-1.451l-1.744,-1.451l-1.163,-2.614l0.872,-0.581l0.000,-1.162l1.744,-0.581l-0.290,-1.451l0.581,-1.162l0.291,-1.161l3.198,-2.034l2.033,-0.289l0.583,-0.580l2.324,0.290l1.163,-7.551l0.291,-1.161l-0.582,-1.743l-1.162,-0.871l0.000,-2.033l1.453,-0.581l0.582,0.290l0.291,-0.871l-1.745,-0.290l0.000,-1.742l5.233,0.000l0.871,-0.871l0.873,0.871l0.582,1.452l0.581,-0.290l1.452,1.451l2.036,-0.289l0.580,-0.582l2.036,-0.870l1.162,-0.291l0.291,-1.162l2.035,-0.871l-0.291,-0.581l-2.324,-0.289l-0.292,-1.744l0.000,-1.741l-1.163,-0.872l0.582,0.000l2.034,0.290l2.326,0.582l0.581,-0.582l2.035,-0.580l3.198,-0.871l0.872,-1.162l-0.291,-0.580l1.453,-0.291l0.582,0.582l-0.290,1.451l0.872,0.290l0.580,1.161l-0.580,1.162l-0.582,2.324l0.582,1.451l0.291,1.162l1.743,1.162l1.454,0.290l0.290,-0.581l0.872,0.000l1.163,-0.581l0.871,-0.871l1.454,0.290l0.872,0.000l1.454,0.291l0.290,-0.581l-0.581,-0.581l0.291,-0.870l1.163,0.289l1.162,-0.289l1.745,0.581l1.161,0.581l0.873,-0.873l0.582,0.292l0.290,0.581l1.453,0.000l0.872,-1.162l0.872,-2.034l1.745,-2.323l0.872,-0.290l0.581,1.452l1.744,4.936l1.453,0.291l0.000,2.032l-2.034,2.323l0.872,0.872l4.942,0.290l0.000,2.904l2.034,-2.033l3.489,1.163l4.650,1.741l1.163,1.453l-0.290,1.451l3.197,-0.872l5.232,1.453l4.070,0.000l4.069,2.322l3.780,3.196l2.034,0.582l2.326,0.289l0.872,0.870l1.162,3.485l0.291,1.452l-1.162,4.646l-1.163,1.742l-4.070,3.775l-1.744,3.194l-2.035,2.323l-0.581,0.290l-0.873,2.034l0.291,4.936l-0.872,4.357l-0.290,1.742l-0.873,1.162l-0.581,3.774l-2.615,3.483l-0.583,2.906l-2.034,1.161l-0.872,1.453l-2.907,0.000l-4.360,1.160l-1.745,1.162l-3.197,0.871l-3.198,2.324l-2.325,2.613l-0.581,2.032l0.581,1.452l-0.581,2.904l-0.581,1.163l-2.035,1.742l-2.907,4.645l-2.325,2.323l-2.036,1.162l-1.162,2.615l-1.744,1.740l-0.872,-1.740l1.163,-1.164l-1.454,-2.032l-2.325,-1.451l-2.907,-1.743l-0.872,0.000l-2.907,-2.033l1.744,-0.292z",
                        "BS" : "M260.408,165.628h-0.872l-0.581-1.452l-1.163-0.871l0.872-1.743l0.581,0.291l1.164,2.033V165.628zM259.536,157.788l-2.907,0.581l-0.291-1.162l1.454-0.29l1.744,0.29V157.788zM261.86,157.788l-0.58,2.032l-0.583-0.29l0.291-1.451l-1.453-1.162v-0.291L261.86,157.788z",
                        "BT" : "M726.082,154.594l1.163,0.871l0.000,1.742l-2.326,0.000l-2.326,-0.290l-1.744,0.581l-2.615,-1.162l0.000,-0.581l1.743,-2.033l1.454,-0.580l2.035,0.580l1.453,0.000l-1.163,-0.872z",
                        "BW" : "M544.405,281.784l0.582,0.580l0.870,1.742l2.907,2.903l1.455,0.292l0.000,0.870l0.580,1.744l2.326,0.579l1.745,1.162l-4.071,2.033l-2.324,2.032l-0.871,1.742l-0.874,1.161l-1.452,0.293l-0.584,1.161l-0.289,0.870l-1.744,0.582l-2.327,0.000l-1.162,-0.872l-1.162,-0.290l-1.454,0.580l-0.582,1.453l-1.452,0.870l-1.164,1.162l-2.033,0.290l-0.582,-0.872l0.289,-1.741l-1.741,-2.613l-0.874,-0.580l0.000,-7.843l2.908,-0.289l0.000,-9.582l2.033,-0.291l4.361,-0.871l0.871,1.162l1.744,-1.162l0.874,0.000l1.743,-0.582l0.291,0.291l-1.163,-2.034z",
                        "BY" : "M538.301,82.579l2.907,0.000l2.908,-0.872l0.578,-1.452l2.326,-1.162l-0.290,-1.160l1.745,-0.291l2.906,-1.162l2.908,0.581l0.290,0.872l1.454,-0.291l2.615,0.581l0.289,1.161l-0.578,0.871l1.743,1.743l1.163,0.581l-0.292,0.290l2.036,0.580l0.872,0.872l-1.163,0.580l-2.326,-0.290l-0.581,0.290l0.871,0.872l0.583,2.033l-2.328,0.000l-0.870,0.580l-0.290,1.451l-0.873,-0.289l-2.615,0.000l-0.583,-0.581l-1.162,0.581l-1.163,-0.291l-2.036,-0.290l-3.196,-0.581l-2.615,-0.291l-2.035,0.291l-1.746,0.581l-1.163,0.000l0.000,-1.161l-0.871,-1.162l1.453,-0.582l0.000,-1.161l-0.582,-0.870l0.289,1.452z",
                        "BZ" : "M228.433,181.89l0.000,-0.290l0.290,-0.290l0.582,0.580l0.872,-1.742l0.580,0.000l0.000,0.290l0.581,0.000l-0.289,0.872l-0.292,1.162l0.292,0.289l-0.292,1.162l0.000,0.291l-0.290,1.161l-0.582,0.872l-0.291,0.000l-0.581,0.870l-0.872,0.000l0.292,-2.903l0.000,2.324z",
                        "CA" : "M298.487,102.905l2.035,0.291h2.617l-1.454,1.162l-0.872,0.29l-3.488-1.162l-0.873-1.161l1.163-0.872L298.487,102.905zM303.719,95.937h-1.454l-3.488-0.872l-2.616-1.162l0.872-0.291l3.779,0.581l2.616,1.162L303.719,95.937zM133.669,97.679l-1.163,0.291l-4.651-1.162l-0.872-1.162l-2.324-0.871l-0.582-0.871l-2.907-0.581l-0.872-1.452V91.29l2.907,0.581l1.744,0.58l2.617,0.291l0.872,0.872l1.454,1.162l2.615,1.162L133.669,97.679zM319.125,91.581l-1.744,2.323l1.744-0.871l2.035,0.581l-1.163,0.871l2.617,0.873l1.163-0.582l2.906,0.871l-0.872,1.742l1.744-0.291l0.292,1.452l0.872,1.742l-1.164,2.323h-1.162l-1.744-0.29l0.582-2.323l-0.872-0.29l-3.198,2.323h-1.453l1.744-1.452l-2.617-0.581h-2.907h-5.232l-0.58-0.872l1.744-0.871l-1.164-0.871l2.326-1.451l2.906-4.356l1.745-1.743l2.325-0.87h1.163l-0.582,0.87L319.125,91.581zM108.38,82.289l2.616-0.291l-0.58,3.195l2.324,2.323h-1.163l-1.744-1.453l-0.871-1.161l-1.454-0.871l-0.582-1.162l0.291-0.871L108.38,82.289zM255.466,59.928l-0.872,1.453l-1.453-0.291l-0.582-0.58v-0.291l1.163-0.872h1.163L255.466,59.928zM248.198,58.477l-3.197,1.451h-1.744l-0.581-0.581l2.034-1.452h3.779L248.198,58.477zM239.478,50.346l0.291,1.161l1.454-0.29l1.744,0.581l2.906,1.162l3.198,0.871l0.29,1.162l2.035-0.29l1.745,0.871l-2.326,0.872l-4.361-0.581l-1.453-1.161l-2.617,1.452l-4.069,1.451l-0.872-1.742l-3.779,0.291l2.325-1.162l0.291-2.323l1.163-2.613L239.478,50.346zM265.058,46.28l-3.198,0.291l-0.58-1.453l1.162-1.451l2.326-0.581l2.326,0.871v1.161l-0.291,0.292L265.058,46.28zM210.41,40.763l-1.744,1.162l-3.488-0.872l-2.325,0.291l-3.779-1.162l2.325-0.872l2.035-1.162l2.907,0.581l1.744,0.581l0.581,0.581L210.41,40.763zM224.653,39.891v2.614l3.488-2.032l3.197,1.742l-0.581,2.033l2.616,2.032l2.907-2.032l2.035-2.324v-3.195l4.069,0.292l4.07,0.29l3.488,1.452l0.291,1.452l-2.035,1.452l1.744,1.451l-0.291,1.162l-5.231,2.033l-3.779,0.291l-2.907-0.581l-0.872,1.161l-2.617,2.323l-0.872,1.453l-3.196,1.743l-3.78,0.29l-2.325,1.162l-0.292,1.741l-3.197,0.291l-3.198,2.324l-2.907,2.904l-1.162,2.323l-0.292,3.194l4.07,0.291l1.454,2.614l1.163,2.033l3.779-0.582l5.232,1.453l2.616,0.871l2.035,1.452l3.489,0.582l2.907,1.162l4.651,0.29l2.906,0.291l-0.581,2.323l0.872,2.614l2.035,3.194l4.07,2.613l2.326-0.871l1.452-2.903l-1.452-4.357l-2.035-1.452l4.36-1.162l3.197-2.033l1.455-1.742l-0.292-2.032l-1.744-2.324L257.5,69.22l3.489-2.904l-1.162-2.323l-1.163-4.355l2.034-0.582l4.651,0.582l2.907,0.29l2.326-0.581l2.616,0.872l3.198,1.451l0.872,1.162l4.941,0.291v2.323l0.872,3.484l2.616,0.291l1.745,1.742l4.07-1.742l2.616-2.904l1.744-1.161l2.325,2.323l3.488,3.484l3.198,3.195l-1.163,1.742l3.487,1.742l2.616,1.451l4.36,0.872l1.744,0.871l1.163,2.324l2.035,0.29l1.163,0.872l0.291,3.194l-2.035,1.161l-2.035,0.872l-4.65,0.871l-3.198,2.323l-4.942,0.582l-5.814-0.582h-4.07h-2.906l-2.326,2.033l-3.488,1.162l-3.779,3.775l-3.197,2.613l2.325-0.58l4.36-3.486l5.814-2.322l4.069-0.291l2.326,1.162l-2.616,2.032l0.872,2.905l0.872,2.032l3.779,1.452l4.361-0.581l2.906-2.903l0.292,2.032l1.744,0.871l-3.489,1.742l-6.104,1.743l-2.616,1.161l-3.198,2.033l-2.034-0.291l-0.29-2.323l4.94-2.324h-4.36l-3.197,0.291l-1.744-1.452v-3.775l-1.163-0.87l-2.035,0.581l-0.872-0.581l-2.035,2.032l-0.873,2.033l-0.872,1.162l-1.162,0.58h-0.872l-0.292,0.871h-5.232h-4.07l-1.163,0.581l-2.907,1.743l-0.291,0.29l-0.872,1.162h-2.616h-2.616l-1.454,0.291l0.582,0.581l0.291,0.871l-0.291,0.291l-3.488,1.453l-2.907,0.29l-3.197,1.452h-0.581l-0.872-0.29l-0.292-0.581v-0.29l0.581-0.873l1.163-1.451l0.872-1.742l-0.58-2.323l-0.583-2.613l-2.906-1.162l0.581-0.581l-0.581-0.29h-0.581l-0.583-0.291l-0.29-0.871l-0.583,0.291h-0.58v-0.291l-0.582-0.291l-0.291-0.58l-2.035-0.871l-2.326-0.872l-2.616-1.162l-2.617-1.161l-2.326,0.87h-0.872l-3.488-0.581l-2.325,0.291l-2.616-0.871l-2.907-0.291l-1.744-0.291l-0.871-0.581l-0.582-1.452h-0.873v1.161h-5.813h-9.302h-9.302h-8.43h-8.138h-8.14h-8.43h-2.616h-8.139h-7.849h-0.582l-5.231-2.613l-2.036-1.452l-4.941-0.871l-1.454-2.614l0.291-1.742l-3.488-1.161l-0.291-2.033l-3.488-2.033v-1.452l1.454-1.452v-1.743l-4.65-1.742l-2.908-2.903l-1.744-2.033l-2.616-1.162l-1.744-1.162l-1.454-1.451l-2.616,0.871L95.3,68.93l-2.326-1.741l-2.035-1.162l-2.616-0.872h-2.616V49.475V39.311l5.232,0.581l4.069,1.453h2.907l2.616-0.871l3.198-0.871l4.07,0.29l4.069-1.162l4.651-0.87l1.744,1.162l2.035-0.581l0.872-1.452l1.744,0.29l4.651,2.613l3.778-1.742l0.292,2.033l3.487-0.581l0.872-0.872l3.487,0.292l4.071,1.161l6.395,0.871l3.779,0.582l2.907-0.291l3.488,1.452l-3.779,1.453l4.94,0.581l7.559-0.291l2.325-0.581l2.906,1.742l2.908-1.451l-2.616-1.162l1.744-0.871l3.196-0.291l2.326-0.29l2.035,0.871l2.907,1.452l3.197-0.291l4.65,1.162l4.361-0.291h4.07l-0.291-1.742l2.326-0.581l4.36,1.162v2.614l1.744-2.324h2.035l1.454-2.614l-3.198-1.742l-3.196-1.162l0.291-2.903l3.198-2.033l3.778,0.29l2.617,1.453l3.779,2.904l-2.326,1.451L224.653,39.891zM159.54,29.728l-1.453,1.453l6.104-0.871l3.779,1.451l3.197-1.451l2.617,0.871l2.035,2.613l1.454-1.161l-1.745-2.615l2.327-0.581l2.615,0.581l3.198,1.162l1.744,2.613l0.872,2.033l4.651,1.162l4.941,1.452l-0.29,1.162l-4.651,0.29l1.744,0.872l-0.873,1.162l-4.941-0.581l-4.651-0.581h-3.198l-5.231,1.162l-6.977,0.291l-4.941,0.29l-1.454-1.452l-3.778-0.58l-2.617,0.29l-3.198-2.323l1.744-0.291l4.36-0.29h3.778l3.488-0.291l-5.233-0.871l-5.813,0.291h-4.069l-1.454-1.162l6.396-0.871h-4.07l-4.941-0.872l2.325-2.033l2.036-1.162l7.267-1.452L159.54,29.728zM185.993,29.147l-2.326,1.742l-4.361-2.032l1.163-0.291h3.488L185.993,29.147zM263.604,30.018l0.291,0.582h-2.907h-2.906l-3.197,0.29l-0.582-0.29l-3.198-1.452l0.291-0.872l1.163-0.291l6.396,0.291L263.604,30.018zM235.409,29.728l2.325,1.743l2.326-2.323l6.977-0.872l4.941,2.614l-0.582,2.033l5.523-0.871l2.616-1.162l6.104,1.451l3.78,1.162l0.29,1.162l5.233-0.581l2.906,1.742l6.687,1.162l2.326,1.161l2.616,2.614l-5.233,1.162l6.687,1.742l4.359,0.582l3.779,2.613l4.36,0.29l-0.872,1.743l-4.651,3.194l-3.488-1.162l-4.36-2.613l-3.488,0.291l-0.291,1.742l2.907,1.452l3.778,1.452l0.872,0.581l2.036,2.904l-1.164,1.743l-3.488-0.582l-6.685-2.323l3.779,2.323l2.906,1.743l0.292,0.871l-7.268-0.871l-6.104-1.743l-3.198-1.161l0.872-0.871l-4.07-1.451l-4.07-1.453v0.871l-7.848,0.582L257.5,53.25l1.745-2.033h5.232l5.814-0.291l-1.163-0.871l1.163-1.452l3.488-2.613l-0.872-1.162l-0.873-1.162l-4.36-1.162l-5.522-1.161l1.743-0.581l-2.907-1.742h-2.325l-2.326-1.162l-1.453,0.87l-4.942,0.292l-9.883-0.581l-5.814-0.581l-4.651-0.582l-2.325-0.871l2.908-1.451h-3.78l-0.872-2.615l2.036-2.613l2.906-0.87l6.977-0.872L235.409,29.728zM197.62,27.985l3.198,0.582l4.942-0.582l0.582,0.872l-2.617,1.452l4.361,1.162l-0.582,2.323l-4.361,1.162l-2.907-0.291l-1.744-0.871l-6.976-2.323l0.29-0.871l5.523,0.29l-3.196-1.742L197.62,27.985zM217.096,30.89l-2.907,2.033h-3.197l-1.454-2.613v-1.452l1.454-1.162l2.616-0.581h5.814l5.232,0.871l-4.069,2.324L217.096,30.89zM142.099,34.665l-7.267,1.162l-1.453-1.162l-6.396-1.452l1.455-1.162l1.743-2.033l2.326-1.742l-2.615-1.742l9.301-0.29l4.07,0.581h6.976l2.616,0.871l2.907,1.162l-3.488,0.87l-6.686,1.743l-3.488,2.032V34.665zM216.224,24.792l-1.744,1.162l-3.778-0.291l-3.489-0.871l1.453-1.162l4.07-0.58l2.326,0.871L216.224,24.792zM202.562,19.855l2.035,1.452l0.291,1.452l-1.454,2.033l-4.36,0.291l-2.908-0.582v-1.452h-4.65v-2.033h2.906l4.07-0.871l4.07,0.291V19.855zM175.819,21.307l1.163,1.162l2.324-0.582l2.907,0.291l0.582,1.161l-1.745,1.453l-9.301,0.291l-6.977,1.162h-4.07l-0.291-0.873l5.523-1.16l-12.208,0.29l-4.07-0.29l3.779-2.904l2.616-0.581l7.848,0.871l4.942,1.453l4.651,0.29l-3.779-2.613l2.326-0.871l2.907,0.29L175.819,21.307zM213.026,18.984l3.198,0.872h5.523l2.326,0.871l-0.582,1.161l2.906,0.582l1.744,0.58h3.779l4.069,0.29l4.361-0.58l5.522-0.29l4.651,0.29l2.907,0.871l0.582,1.162l-1.744,0.871l-4.07,0.582l-3.488-0.291l-7.848,0.291h-5.813l-4.36-0.291l-7.268-0.871l-0.872-1.453l-0.582-1.451l-2.617-1.162l-5.814-0.291l-3.196-0.871l1.163-1.162L213.026,18.984zM154.018,17.532l-0.582,2.033l-2.035,0.871l-2.616,0.29l-4.941,1.161l-4.65,0.291l-3.488-0.582l4.651-2.032l5.523-1.742h4.36L154.018,17.532zM215.351,17.823h-1.163l-5.231-0.291l-0.582-0.581h5.522l1.744,0.581L215.351,17.823zM170.586,17.243l-5.232,0.87l-4.071-0.87l2.326-0.873l3.779-0.29l4.07,0.29L170.586,17.243zM172.04,14.919l-3.488,0.291H163.9v-0.291l2.907-0.872l1.453,0.29L172.04,14.919zM210.12,16.37l-4.07,0.581l-2.326-0.87l-1.163-0.871l-0.291-1.162h3.488l1.744,0.29l3.198,0.872L210.12,16.37zM198.201,15.499l1.163,1.162l-4.361-0.291l-4.65-0.871h-6.104l2.616-0.871l-3.198-0.581l-0.291-1.162l5.524,0.291l7.266,1.161L198.201,15.499zM234.246,12.015l3.198,0.871l-3.779,0.582l-4.942,2.322h-4.942l-5.813-0.291l-2.907-1.162v-0.87l2.325-0.872h-4.941l-3.198-0.872l-1.744-1.162l2.034-1.161l1.744-0.871l2.907-0.291l-1.163-0.581l6.395-0.29l3.489,1.452l4.651,0.871l4.36,0.29L234.246,12.015zM285.116,2.432l7.558,0.29l5.813,0.291l4.942,0.58v0.873l-6.685,1.161l-6.687,0.581l-2.616,0.582h6.104L287.15,8.53l-4.651,0.581l-4.651,2.324l-5.813,0.58l-1.744,0.581l-8.139,0.291l3.778,0.291l-2.035,0.58l2.326,1.162l-2.616,1.162l-4.36,0.581l-1.162,1.162l-3.779,0.871l0.291,0.581h4.65v0.581l-7.267,1.741l-7.268-0.871l-7.848,0.291l-4.361-0.291h-4.941l-0.581-1.452l5.231-0.581l-1.454-2.033h1.744l7.268,1.162l-3.779-1.742l-4.36-0.582l2.326-1.162l4.651-0.581l0.872-0.871l-3.779-1.162l-1.163-1.451h7.558l2.034,0.29l4.361-0.87l-6.105-0.291h-9.883L227.85,8.53l-2.325-1.162l-3.197-0.581l-0.582-1.162l4.07-0.291l3.197-0.29l5.232-0.291l4.07-1.162l3.488,0.291l2.906,0.582l2.327-1.453l3.487-0.291l4.942-0.29l8.429-0.291l1.454,0.291l7.849-0.291h6.104L285.116,2.432z",
                        "CD" : "M558.648,221.382l-0.289,3.196l1.162,0.289l-0.873,0.871l-0.871,0.872l-1.163,1.451l-0.581,1.161l-0.291,2.324l-0.582,0.871l0.000,2.324l-0.871,0.580l0.000,1.742l-0.290,0.290l-0.293,1.453l0.583,1.161l0.290,3.484l0.581,2.324l-0.290,1.452l0.290,1.742l1.744,1.452l1.455,3.485l-1.163,-0.290l-3.490,0.581l-0.873,0.290l-0.873,1.742l0.873,1.161l-0.580,3.195l-0.293,2.904l0.584,0.291l2.035,1.160l0.581,-0.581l0.289,2.904l-2.033,0.000l-1.163,-1.451l-0.872,-1.162l-2.325,-0.291l-0.581,-1.452l-1.745,0.873l-2.036,-0.291l-0.871,-1.452l-1.743,-0.291l-1.454,0.291l0.000,-0.872l-1.164,-0.290l-1.161,0.000l-1.745,0.290l-1.162,0.000l-0.581,0.292l0.000,-3.196l-0.873,-1.162l-0.290,-1.740l0.579,-1.453l-0.579,-1.161l0.000,-1.743l-3.488,0.000l0.289,-0.871l-1.452,0.000l0.000,0.290l-1.745,0.291l-0.581,1.452l-0.582,0.871l-1.452,-0.581l-0.873,0.581l-2.033,0.000l-0.874,-1.452l-0.581,-0.871l-0.871,-1.453l-0.582,-2.032l-8.140,-0.290l-1.162,0.581l-0.581,-0.291l-1.163,0.581l-0.582,-0.871l0.874,-0.291l0.000,-1.161l0.578,-0.872l0.874,-0.580l0.871,0.291l0.873,-0.873l1.452,0.000l0.292,0.582l0.871,0.580l1.744,-1.741l1.456,-1.454l0.870,-0.870l-0.289,-2.033l1.162,-2.903l1.453,-1.162l1.746,-1.452l0.290,-0.871l0.000,-1.162l0.581,-0.871l-0.292,-1.451l0.292,-2.614l0.579,-1.451l0.874,-1.744l0.291,-1.452l0.289,-2.032l0.874,-1.452l1.452,-0.870l2.326,0.870l1.745,1.162l2.033,0.290l2.036,0.580l0.871,-1.742l0.291,-0.290l1.454,0.290l2.907,-1.160l1.163,0.579l0.871,-0.290l0.291,-0.580l1.163,-0.291l2.034,0.291l1.744,0.000l0.873,-0.291l1.743,2.323l1.161,0.291l0.873,-0.291l1.166,0.000l1.450,-0.581l0.874,1.162l-2.325,-2.032z",
                        "CF" : "M515.918,210.638l2.325,-0.290l0.293,-0.871l0.579,0.291l0.582,0.580l3.488,-1.162l1.163,-1.161l1.454,-0.872l-0.292,-0.870l0.871,-0.291l2.618,0.291l2.617,-1.452l2.034,-2.905l1.452,-1.161l1.744,-0.581l0.292,1.162l1.452,1.742l0.000,1.162l-0.289,1.163l0.000,0.870l0.871,0.870l2.327,1.162l1.452,1.162l0.000,0.871l1.743,1.452l1.163,1.161l0.873,1.743l2.034,0.871l0.292,0.871l-0.873,0.291l-1.744,0.000l-2.034,-0.291l-1.163,0.291l-0.291,0.580l-0.871,0.290l-1.163,-0.579l-2.907,1.160l-1.454,-0.290l-0.291,0.290l-0.871,1.742l-2.036,-0.580l-2.033,-0.290l-1.745,-1.162l-2.326,-0.870l-1.452,0.870l-0.874,1.452l-0.289,2.032l-1.744,-0.290l-2.036,-0.290l-1.452,1.451l-1.455,2.325l-0.289,-0.581l-0.292,-1.453l-1.163,-0.872l-1.161,-1.452l0.000,-0.870l-1.454,-1.452l0.289,-0.870l-0.289,-1.162l0.289,-2.033l0.581,-0.581l-1.455,2.614z",
                        "CG" : "M509.523,244.033l-0.874,-0.871l-0.870,0.581l-1.163,1.163l-2.325,-2.906l2.035,-1.742l-0.872,-1.743l0.872,-0.580l1.745,-0.291l0.289,-1.451l1.454,1.451l2.616,0.000l0.581,-1.162l0.582,-1.741l-0.291,-2.324l-1.454,-1.452l1.163,-3.194l-0.581,-0.580l-2.036,0.000l-0.871,-1.162l0.291,-1.451l3.488,0.289l2.034,0.581l2.327,0.871l0.289,-1.741l1.455,-2.325l1.452,-1.451l2.036,0.290l1.744,0.290l-0.291,1.452l-0.874,1.744l-0.579,1.451l-0.292,2.614l0.292,1.451l-0.581,0.871l0.000,1.162l-0.290,0.871l-1.746,1.452l-1.453,1.162l-1.162,2.903l0.289,2.033l-0.870,0.870l-1.456,1.454l-1.744,1.741l-0.871,-0.580l-0.292,-0.582l-1.452,0.000l-0.873,0.873l0.871,0.291z",
                        "CH" : "M500.22,100.292l0.000,0.580l-0.289,0.581l1.162,0.581l1.452,0.000l-0.289,1.162l-1.163,0.290l-2.034,-0.290l-0.583,1.161l-1.453,0.000l-0.291,-0.290l-1.744,0.871l-1.160,0.000l-1.165,-0.581l-0.871,-1.161l-1.454,0.580l0.000,-1.451l2.034,-1.453l0.000,-0.580l1.163,0.291l0.873,-0.582l2.324,0.000l0.582,-0.580l-2.906,-0.871z",
                        "CI" : "M465.919,217.317l-1.162,0.000l-2.034,-0.580l-1.744,0.000l-3.197,0.580l-2.036,0.581l-2.615,1.162l-0.582,0.000l0.289,-2.323l0.293,-0.291l-0.293,-1.162l-1.162,-1.161l-0.871,-0.290l-0.582,-0.581l0.582,-1.452l-0.291,-1.162l0.000,-0.870l0.581,0.000l0.000,-1.162l-0.290,-0.581l0.290,-0.290l1.162,-0.290l-0.871,-2.323l-0.581,-1.163l0.290,-0.871l0.581,-0.290l0.292,-0.292l0.870,0.582l2.037,0.000l0.582,-0.871l0.581,0.000l0.582,-0.291l0.579,1.162l0.583,-0.290l1.161,-0.292l1.165,0.582l0.579,0.871l1.164,0.581l0.872,-0.581l1.452,-0.291l1.744,0.872l0.874,3.775l-1.164,2.323l-0.872,3.195l1.162,2.323l0.000,-1.161z",
                        "CL" : "M284.825,375.578v6.389h2.907h1.745l-0.872,1.162l-2.326,0.87l-1.454-0.291l-1.744-0.289l-1.744-0.582l-2.907-0.58l-3.487-1.451l-2.907-1.453l-3.779-3.193l2.326,0.58l3.778,2.033l3.78,0.87l1.453-1.16l0.872-2.033l2.326-1.162L284.825,375.578zM285.987,289.915l1.163,4.065l2.035-0.582l0.291,0.872l-1.163,2.613l-2.907,1.451v4.646l-0.582,0.87l0.872,1.163l-1.744,1.741l-2.035,2.324l-0.872,2.614l0.291,2.612l-1.744,2.904l1.163,4.646l0.873,0.58v2.613l-1.744,2.613l0.29,2.323l-2.326,1.742l0.292,2.613l0.581,2.615l-1.453,0.87l-0.872,2.613l-0.582,2.904l0.582,3.193l-1.164,0.581l0.582,3.194l1.162,1.162l-0.873,1.162l1.454,0.289l0.29,1.162l-1.452,0.58l0.291,1.451l-0.872,3.775l-1.455,2.323l0.292,1.453l-0.873,1.741l-2.035,1.161l0.291,2.904l0.873,0.873h1.744v2.03l1.163,1.453l6.685,0.58l2.617,0.29h-2.617l-1.163,0.581l-2.616,1.162l-0.291,2.612h-1.162l-3.198-0.87l-3.198-2.032l-3.488-1.453l-0.872-1.74l0.872-1.744l-1.454-1.742l-0.291-4.646l1.163-2.614l2.907-2.323l-4.07-0.581l2.617-2.612l0.872-4.357l2.907,0.873l1.453-5.808l-1.744-0.581l-0.872,3.484l-1.744-0.582l0.872-3.773l0.872-5.228l1.454-1.742l-0.872-2.905l-0.291-2.902l1.163-0.29l1.744-4.356l1.744-4.356l1.162-4.064l-0.581-4.065l0.872-2.323l-0.292-3.485l1.744-3.192l0.292-5.518l0.872-5.519l0.871-6.388v-4.356l-0.582-3.774l1.163-0.872l0.872-1.45l1.454,2.032l0.291,2.031l1.454,1.163l-0.872,2.612L285.987,289.915z",
                        "CM" : "M509.814,224.578l-0.291,0.000l-1.744,0.289l-1.744,-0.289l-1.163,0.000l-4.652,0.000l0.582,-2.034l-1.163,-1.742l-1.163,-0.582l-0.581,-1.160l-0.872,-0.581l0.000,-0.581l0.872,-2.032l1.164,-2.614l0.872,0.000l1.743,-1.743l0.871,0.000l1.746,1.161l1.744,-0.870l0.291,-1.162l0.580,-1.161l0.581,-1.452l1.455,-1.161l0.581,-1.742l0.582,-0.582l0.289,-1.452l0.873,-1.742l2.326,-2.323l0.000,-0.872l0.289,-0.580l-1.163,-0.871l0.292,-0.871l0.582,-0.291l1.162,1.742l0.292,1.743l-0.292,2.032l1.453,2.324l-1.453,0.000l-0.581,0.289l-1.455,-0.289l-0.579,1.161l1.742,1.743l1.165,0.581l0.289,1.161l0.872,1.743l-0.290,0.870l-1.455,2.614l-0.581,0.581l-0.289,2.033l0.289,1.162l-0.289,0.870l1.454,1.452l0.000,0.870l1.161,1.452l1.163,0.872l0.292,1.453l0.289,0.581l-0.289,1.741l-2.327,-0.871l-2.034,-0.581l3.488,0.289z",
                        "CN" : "M777.533,179.567l-2.325,1.451l-2.326-0.871v-2.323l1.163-1.453l3.196-0.581h1.455l0.581,0.872l-1.163,1.451L777.533,179.567zM825.204,94.194l4.651,0.871l3.488,1.742l0.871,2.614h4.361l2.325-0.872l4.651-0.871l-1.454,2.323l-1.163,1.162l-0.871,2.904l-2.034,2.613l-3.198-0.291l-2.325,0.871l0.581,2.324l-0.29,3.194l-1.454,0.291v1.161l-1.744-1.451l-1.163,1.451l-4.067,1.162l0.289,1.453h-2.325l-1.452-0.872l-1.745,2.032l-3.198,1.453l-2.033,1.742l-3.781,0.871l-2.033,1.162l-3.197,0.871l1.452-1.453l-0.58-1.16l2.325-1.742l-1.455-1.453l-2.324,1.162l-3.197,1.742l-1.745,1.742l-2.615,0.291l-1.452,1.16l1.452,1.743l2.326,0.581v1.162l2.325,0.872l2.906-2.033l2.616,1.162h1.744l0.289,1.452l-3.777,0.871l-1.454,1.452l-2.615,1.453l-1.453,1.742l3.196,1.742l0.872,2.614l1.743,2.613l1.745,2.033v2.033l-1.745,0.581l0.873,1.453l1.455,0.87l-0.292,2.324l-0.873,2.323h-1.452l-2.034,3.194l-2.326,3.484l-2.327,3.195l-3.778,2.613l-4.069,2.323l-2.905,0.291l-1.744,1.162l-0.873-0.871l-1.743,1.452l-3.779,1.451l-2.906,0.291l-0.872,2.904l-1.454,0.29l-0.873-2.033l0.584-1.162l-3.488-0.872l-1.455,0.581l-2.615-0.87l-1.454-0.873l0.581-1.742l-2.615-0.581l-1.452-0.871l-2.328,1.451l-2.615,0.291h-2.034l-1.454,0.58l-1.453,0.582l0.29,2.903h-1.455l-0.289-0.581v-1.161l-2.034,0.87l-1.163-0.581l-2.035-1.162l0.872-2.033l-1.743-0.581l-0.873-2.613l-2.905,0.58l0.29-3.484l2.615-2.323l0.291-2.033l-0.291-2.323l-1.161-0.581l-0.873-1.452h-1.455l-3.194-0.291l1.161-1.161l-1.455-1.743l-2.034,1.162l-2.033-0.581l-3.198,1.742l-2.615,2.033l-2.326,0.29l-1.162-0.872h-1.453l-2.035-0.58l-1.454,0.58l-1.743,2.033l-0.292-2.033l-1.744,0.582L713,154.013l-2.906-0.581l-2.326-1.162l-2.034-0.581l-1.162-1.452l-1.454-0.291l-2.615-1.742l-2.326-0.871l-1.162,0.581l-3.781-2.033l-2.615-1.742l-0.873-2.904l2.036,0.291v-1.453l-1.163-1.161l0.293-2.324l-2.908-3.194l-4.361-1.161l-0.87-2.033l-2.036-1.451l-0.58-0.582l-0.292-1.742v-1.161l-1.743-0.582l-0.874,0.291l-0.579-2.324l0.579-0.871l-0.289-0.581l2.615-1.162l2.036-0.58l2.906,0.291l0.871-1.744l3.489-0.29l1.162-1.162l4.362-1.451l0.289-0.581l-0.289-1.743l2.033-0.581l-2.617-4.646l5.524-1.162l1.452-0.58l2.034-4.938l5.232,0.873l1.744-1.162v-2.904l2.328-0.291l2.033-1.742l1.163-0.29l0.581,2.032l2.326,1.452l4.067,0.872l1.746,2.323l-0.873,3.194l0.873,1.162l3.197,0.582l3.778,0.29l3.488,1.742l1.743,0.291l1.163,2.613l1.455,1.453h3.196l5.522,0.58l3.78-0.291l2.615,0.291l4.069,1.743h3.489l1.162,0.871l3.197-1.451l4.361-0.873l4.359-0.29l3.198-0.871l1.745-1.452l2.033-0.871l-0.581-0.872l-0.873-1.161l1.454-1.742l1.745,0.29l2.614,0.581l2.908-1.452l4.069-1.162l2.034-1.742l2.035-0.872l4.07-0.29l2.034,0.29l0.291-1.162l-2.325-1.741l-2.326-0.872l-2.036,0.872l-2.904-0.291l-1.455,0.291l-0.581-1.162l1.744-2.613l1.453-2.324l3.197,1.162l4.068-1.742v-1.162l2.328-2.903l1.452-0.872v-1.452l-1.452-0.871l2.325-1.162l3.486-0.58h3.491l4.067,0.58l2.617,1.162l1.744,2.903l0.871,1.161l0.874,1.453L825.204,94.194z",
                        "CO" : "M266.221,231.256l-1.163,-0.582l-1.163,-0.870l-0.871,0.290l-2.326,-0.290l-0.582,-1.161l-0.580,0.000l-2.907,-1.452l-0.291,-0.872l1.162,-0.290l-0.290,-1.451l0.582,-0.873l1.452,-0.289l1.164,-1.744l1.161,-1.452l-1.161,-0.580l0.580,-1.452l-0.580,-2.613l0.580,-0.580l-0.580,-2.325l-1.164,-1.451l0.582,-1.451l0.872,0.289l0.582,-0.871l-0.872,-1.741l0.290,-0.292l1.454,0.000l2.034,-2.031l1.163,-0.291l0.000,-0.872l0.581,-2.322l1.744,-1.162l1.745,0.000l0.000,-0.582l2.325,0.291l2.035,-1.451l1.163,-0.582l1.454,-1.451l0.872,0.290l0.580,0.581l-0.290,0.871l-2.035,0.581l-0.581,1.452l-1.163,0.580l-0.581,1.162l-0.582,2.033l-0.581,1.452l1.453,0.290l0.291,1.161l0.580,0.582l0.292,1.161l-0.292,1.161l0.000,0.581l0.583,0.000l0.872,1.162l3.488,-0.291l1.453,0.291l2.035,2.323l1.163,-0.290l2.034,0.290l1.454,-0.290l0.872,0.290l-0.291,1.452l-0.872,0.871l0.000,2.033l0.581,2.033l0.582,0.580l0.291,0.580l-1.454,1.453l0.872,0.580l0.873,1.162l0.872,2.614l-0.581,0.290l-0.582,-1.452l-0.873,-0.871l-0.871,0.871l-5.233,0.000l0.000,1.742l1.745,0.290l-0.291,0.871l-0.582,-0.290l-1.453,0.581l0.000,2.033l1.162,0.871l0.582,1.743l-0.291,1.161l-1.163,7.551l-1.452,-1.454l-0.582,-0.290l1.744,-2.613l-2.326,-1.452l-1.452,0.290l-1.164,-0.579l-1.453,0.870l-2.035,-0.291l-1.744,-2.903l-1.163,-0.870l-0.872,-1.163l-1.744,-1.452l0.872,-0.291z",
                        "CR" : "M245.292,208.315l-1.453,-0.580l-0.582,-0.582l0.291,-0.580l0.000,-0.581l-0.872,-0.579l-0.872,-0.582l-1.163,-0.291l0.000,-0.872l-0.872,-0.580l0.291,0.871l-0.582,0.581l-0.581,-0.581l-0.872,-0.291l-0.291,-0.580l0.000,-0.871l0.291,-0.871l-0.872,-0.291l0.581,-0.580l0.581,-0.291l1.745,0.581l0.581,-0.290l0.871,0.290l0.583,0.581l0.872,0.000l0.581,-0.581l0.580,1.452l1.164,1.162l1.162,1.161l-0.872,0.291l0.000,1.161l0.583,0.291l-0.583,0.581l0.291,0.289l-0.291,0.582l0.290,-0.580z",
                        "CU" : "M247.326,167.081l2.326,0.290l2.326,0.000l2.325,0.871l1.163,1.161l2.616,-0.290l0.873,0.581l2.325,1.743l1.744,1.161l0.871,0.000l1.744,0.581l-0.290,0.871l2.035,0.000l2.325,1.161l-0.581,0.581l-1.744,0.291l-1.745,0.290l-2.035,-0.290l-3.778,0.290l1.743,-1.452l-1.161,-0.871l-1.744,0.000l-0.872,-0.871l-0.582,-1.742l-1.744,0.289l-2.616,-0.870l-0.582,-0.581l-3.779,-0.291l-0.872,-0.581l0.872,-0.580l-2.616,-0.290l-2.034,1.451l-1.163,0.000l-0.292,0.580l-1.452,0.292l-1.163,0.000l1.454,-0.872l0.581,-1.161l1.453,-0.581l1.163,-0.581l2.325,-0.290l-0.581,0.290z",
                        "CY" : "M567.37,134.557l0.000,0.291l-2.909,1.161l-1.162,-0.581l-0.874,-1.161l1.456,0.000l0.580,0.290l0.582,-0.290l0.582,0.000l0.290,0.290l0.581,0.000l0.581,0.000l-0.293,0.000z",
                        "CZ" : "M520.57,97.388l-1.455,-0.581l-1.163,0.000l-2.326,-0.581l-0.871,0.000l-1.453,1.162l-2.035,-0.871l-1.744,-1.161l-1.163,-0.582l-0.289,-1.161l-0.584,-0.872l2.036,-0.580l0.871,-0.871l2.036,-0.291l0.581,-0.581l0.871,0.290l1.165,-0.290l1.453,0.872l2.036,0.291l-0.293,0.580l1.454,0.580l0.581,-0.580l1.746,0.290l0.290,0.872l2.034,0.290l1.454,1.161l-0.874,0.000l-0.580,0.582l-0.582,0.000l-0.292,0.581l-0.289,0.289l-0.290,0.291l-0.871,0.290l-1.165,0.000l0.289,-0.581z",
                        "DE" : "M501.093,79.674l0.000,1.161l2.906,0.582l0.000,0.872l2.617,-0.291l1.744,-0.872l2.907,1.163l1.452,0.870l0.583,1.452l-0.872,0.581l1.163,1.162l0.581,1.452l-0.292,0.870l1.165,1.742l-1.165,0.290l-0.871,-0.290l-0.581,0.581l-2.036,0.291l-0.871,0.871l-2.036,0.580l0.584,0.872l0.289,1.161l1.163,0.582l1.744,1.161l-1.162,1.162l-0.872,0.580l0.290,1.742l-0.290,0.291l-0.584,-0.581l-1.452,0.000l-2.034,0.581l-2.326,-0.291l-0.292,0.871l-1.452,-0.871l-0.873,0.291l-2.906,-0.871l-0.582,0.580l-2.324,0.000l0.290,-2.032l1.455,-1.743l-4.070,-0.580l-1.166,-0.581l0.000,-1.452l-0.579,-0.581l0.290,-1.742l-0.290,-2.904l1.454,0.000l0.871,-1.162l0.581,-2.323l-0.581,-1.161l0.581,-0.581l2.327,0.000l0.582,0.581l1.742,-1.451l-0.581,-0.872l0.000,-1.743l2.035,0.581l-1.744,0.581z",
                        "DJ" : "M592.368,196.119l0.581,0.871l0.000,1.161l-1.453,0.582l1.161,0.580l-1.161,1.452l-0.583,-0.290l-0.581,0.000l-1.743,0.000l0.000,-0.871l0.000,-0.581l0.871,-1.452l0.872,-1.162l1.164,0.291l-0.872,0.581z",
                        "DK" : "M508.649,77.933l-1.743,2.323l-2.615-1.452l-0.582-1.162l4.07-0.872L508.649,77.933zM503.708,75.609l-0.581,1.162l-0.871-0.291l-2.036,2.033l0.873,1.161l-1.744,0.582l-2.035-0.582l-1.161-1.451v-2.904l0.289-0.581l0.872-0.871h2.325l1.163-0.871l2.035-0.871v1.453l-0.872,0.87l0.291,0.871L503.708,75.609z",
                        "DO" : "M276.396,176.664l0.290,-0.291l2.034,0.000l1.744,0.580l0.872,0.000l0.291,0.872l1.454,0.000l0.000,0.871l1.162,0.000l1.454,1.162l-0.872,1.161l-1.453,-0.871l-1.164,0.290l-0.872,-0.290l-0.581,0.581l-1.163,0.290l-0.290,-0.871l-0.873,0.581l-1.161,1.743l-0.872,-0.291l0.000,-0.871l0.000,-0.872l-0.582,-0.580l0.582,-0.582l0.290,-1.161l0.290,1.451z",
                        "DZ" : "M506.906,166.5l-9.592,5.226l-7.849,5.227l-4.070,1.453l-2.906,0.000l0.000,-1.742l-1.452,-0.291l-1.454,-0.872l-0.873,-1.161l-9.301,-6.098l-9.301,-6.098l-10.176,-6.679l0.000,-0.291l0.000,-0.290l0.000,-3.194l4.361,-2.032l2.906,-0.581l2.036,-0.581l1.162,-1.452l3.197,-1.162l0.000,-2.032l1.744,-0.291l1.162,-0.870l3.782,-0.582l0.289,-0.871l-0.582,-0.580l-0.871,-2.905l-0.291,-1.742l-1.163,-1.742l2.907,-1.452l2.907,-0.581l1.744,-1.161l2.617,-0.872l4.650,-0.289l4.651,-0.291l1.162,0.291l2.615,-1.162l2.911,0.000l1.160,0.871l2.035,-0.290l-0.581,1.451l0.290,2.614l-0.579,2.323l-1.745,1.451l0.290,2.034l2.325,1.742l0.000,0.581l1.745,1.162l1.163,4.936l0.871,2.322l0.000,1.453l-0.291,2.033l0.000,1.451l-0.291,1.452l0.291,1.743l-1.162,1.161l1.744,2.033l0.000,1.162l1.163,1.451l1.163,-0.580l2.035,1.451l-1.452,-1.743z",
                        "EC" : "M252.85,240.258l1.453,-2.033l-0.581,-1.162l-1.163,1.162l-1.744,-1.162l0.581,-0.581l-0.291,-2.613l0.873,-0.580l0.581,-1.454l0.872,-2.031l0.000,-0.872l1.454,-0.581l1.744,-1.160l2.907,1.452l0.580,0.000l0.582,1.161l2.326,0.290l0.871,-0.290l1.163,0.870l1.163,0.582l0.581,2.324l-0.872,1.741l-3.198,2.904l-3.196,0.871l-1.744,2.613l-0.582,1.742l-1.454,1.162l-1.162,-1.451l-1.163,-0.290l-1.163,0.290l0.000,-1.162l0.873,-0.582l0.291,1.160z",
                        "EE" : "M540.626,72.125l0.291,-1.743l-0.872,0.290l-1.744,-0.870l-0.291,-1.743l3.489,-0.581l3.488,-0.582l2.906,0.582l2.906,0.000l0.291,0.291l-1.745,1.742l0.582,2.614l-1.163,0.871l-2.034,0.000l-2.614,-1.162l-1.165,-0.290l2.325,-0.581z",
                        "EG" : "M569.987,149.947l-0.874,0.872l-0.581,2.323l-0.873,1.162l-0.582,0.580l-0.870,-0.871l-1.164,-1.161l-2.034,-4.066l-0.291,0.291l1.163,2.903l1.744,2.904l2.034,4.065l0.873,1.743l0.871,1.452l2.618,2.904l-0.584,0.580l0.000,1.743l3.198,2.613l0.581,0.580l-10.755,0.000l-10.755,0.000l-11.045,0.000l0.000,-10.162l0.000,-9.873l-0.871,-2.324l0.579,-1.451l-0.289,-1.162l0.871,-1.452l3.779,0.000l2.615,0.581l2.615,0.871l1.456,0.580l2.033,-0.870l1.165,-0.872l2.323,-0.290l2.036,0.290l0.872,1.452l0.580,-0.870l2.036,0.580l2.327,0.290l1.161,-0.870l-2.038,-4.935z",
                        "EH" : "M449.643,156.336l-0.292,-1.452l0.581,0.000l0.000,0.290l0.000,0.291l0.000,4.355l-9.011,-0.290l0.000,7.261l-2.615,0.000l-0.581,1.451l0.581,4.066l-11.046,0.000l-0.582,0.871l0.289,-1.162l6.107,-0.291l0.290,-0.870l1.162,-1.162l0.874,-3.775l4.069,-3.194l1.162,-3.485l0.872,0.000l0.873,-2.323l2.324,-0.291l1.165,0.581l1.161,0.000l0.872,-0.871l-1.745,0.000z",
                        "ER" : "M590.332,196.409l-0.872,-0.871l-1.162,-1.452l-1.163,-1.162l-0.871,-0.870l-2.326,-1.162l-1.744,0.000l-0.873,-0.580l-1.453,0.870l-1.743,-1.452l-0.873,2.033l-3.198,-0.581l-0.290,-0.870l1.161,-4.065l0.291,-2.033l0.874,-0.873l2.035,-0.289l1.454,-1.742l1.452,3.193l0.871,2.614l1.454,1.452l3.779,2.613l1.454,1.453l1.453,1.742l0.871,0.871l1.455,0.871l-0.872,0.581l1.164,0.291z",
                        "ES" : "M448.769,115.683l0.292,-1.743l-1.163,-1.452l3.778,-1.742l3.489,0.290l3.778,0.000l2.908,0.581l2.324,-0.290l4.362,0.290l1.163,0.871l4.940,1.452l1.163,-0.580l2.907,1.161l3.197,-0.292l0.292,1.454l-2.616,2.032l-3.489,0.580l-0.291,0.872l-1.744,1.451l-1.162,2.324l1.162,1.451l-1.453,1.162l-0.581,1.742l-2.325,0.581l-1.744,2.323l-3.489,0.000l-2.616,0.000l-1.743,0.872l-1.165,1.161l-1.452,-0.291l-0.871,-0.870l-0.874,-1.742l-2.615,-0.291l0.000,-1.162l0.871,-0.871l0.291,-0.871l-0.873,-0.581l0.873,-2.032l-1.162,-1.452l1.162,-0.291l0.000,-1.451l0.582,-0.291l0.000,-2.033l1.163,-0.870l-0.581,-1.452l-1.746,0.000l-0.291,0.290l-1.744,0.000l-0.581,-1.162l-1.163,0.291l1.163,-0.581z",
                        "ET" : "M578.125,189.73l1.743,1.452l1.453,-0.870l0.873,0.580l1.744,0.000l2.326,1.162l0.871,0.870l1.163,1.162l1.162,1.452l0.872,0.871l-0.872,1.162l-0.871,1.452l0.000,0.581l0.000,0.871l1.743,0.000l0.581,0.000l0.583,0.290l-0.583,1.161l1.163,1.453l0.873,1.452l1.163,0.871l9.010,3.194l2.328,0.000l-7.850,8.421l-3.780,0.000l-2.324,2.033l-1.744,0.000l-0.874,0.870l-1.743,0.000l-1.161,-0.870l-2.618,1.162l-0.581,1.160l-2.036,-0.290l-0.580,-0.290l-0.580,0.000l-0.874,0.000l-3.489,-2.323l-2.033,0.000l-0.873,-0.871l0.000,-1.742l-1.452,-0.290l-1.455,-3.196l-1.454,-0.580l-0.290,-1.161l-1.452,-1.161l-1.746,-0.291l0.872,-1.452l1.455,0.000l0.582,-0.872l0.000,-2.613l0.579,-2.903l1.454,-0.582l0.292,-1.162l1.163,-2.322l1.743,-1.162l0.872,-2.904l0.581,-2.323l3.198,0.581l-0.873,2.033z",
                        "FI" : "M552.544,41.053l-0.584,2.033l4.363,1.743l-2.617,2.032l3.198,3.194l-1.744,2.324l2.325,2.033l-1.162,1.742l4.069,2.032l-0.871,1.161l-2.617,1.742l-5.814,3.485l-4.941,0.291l-4.941,0.871l-4.362,0.580l-1.744,-1.451l-2.615,-0.871l0.581,-2.614l-1.452,-2.613l1.452,-1.453l2.616,-1.742l6.106,-3.193l2.033,-0.582l-0.289,-1.160l-4.072,-1.162l-0.872,-1.162l0.000,-4.065l-4.361,-2.033l-3.486,-1.452l1.453,-0.581l3.198,1.452l3.488,0.000l2.908,0.581l2.615,-1.162l1.452,-2.032l4.362,-1.162l3.487,1.162l1.162,-2.032z",
                        "FJ" : "M964.732,278.588l0.873,0.871l-0.292,1.452l-1.744,0.291l-1.452-0.291l-0.292-1.162l0.873-0.87l1.455,0.291L964.732,278.588zM969.382,276.557l-1.741,0.579l-2.036,0.582l-0.292-1.161l1.455-0.291l0.873-0.291l1.741-0.871h-0.01h0.58l-0.29,1.162l-0.29,0.291H969.382z",
                        "FK" : "M305.173,373.544l3.488,-1.741l2.326,0.870l1.744,-1.161l2.034,1.161l-0.872,0.871l-3.778,0.872l-1.164,-0.872l-2.325,1.162l1.453,1.162z",
                        "FR" : "M329.008,223.997l-0.873,1.162h-1.453l-0.29-0.581l-0.582-0.292l-0.872,0.873l-1.162-0.581l0.581-1.162l0.291-1.162l0.582-1.161l-1.164-1.742l-0.289-1.743l1.453-2.612l0.872,0.289l2.034,0.872l2.907,2.323l0.582,1.161l-1.744,2.323L329.008,223.997zM500.22,115.102l-1.161,2.033l-1.164-0.582l-0.581-1.742l0.581-1.162l1.744-0.871L500.22,115.102zM483.652,92.451l2.036,1.162h1.162l2.615,1.162l0.581,0.291h0.871l1.165,0.581l4.07,0.58l-1.455,1.744l-0.29,2.032l-0.873,0.581l-1.163-0.291v0.581l-2.033,1.453v1.452l1.453-0.581l0.871,1.162l-0.291,0.871l0.872,1.162l-0.872,0.871l0.582,2.033l1.454,0.291l-0.291,1.162l-2.325,1.452l-5.523-0.581l-4.069,0.872l-0.292,1.741l-3.196,0.292l-2.907-1.162l-1.163,0.58l-4.94-1.452l-1.163-0.872l1.452-1.742l0.582-5.517l-2.907-2.905l-2.034-1.451l-4.36-0.872v-2.033l3.488-0.581l4.651,0.581l-0.872-2.903l2.615,1.162l6.396-2.324l0.87-2.324l2.325-0.29l0.293,0.872h1.452L483.652,92.451z",
                        "GA" : "M504.291,242l-2.908,-2.904l-1.744,-2.322l-1.744,-2.905l0.291,-0.871l0.582,-0.871l0.581,-2.033l0.582,-2.033l0.871,0.000l4.070,0.000l0.000,-3.483l1.163,0.000l1.744,0.289l1.744,-0.289l0.291,0.000l-0.291,1.451l0.871,1.162l2.036,0.000l0.581,0.580l-1.163,3.194l1.454,1.452l0.291,2.324l-0.582,1.741l-0.581,1.162l-2.616,0.000l-1.454,-1.451l-0.289,1.451l-1.745,0.291l-0.872,0.580l0.872,1.743l2.035,-1.742z",
                        "GB" : "M458.072,80.835l-1.452,2.033l-2.036-0.58h-1.745l0.582-1.453l-0.582-1.451l2.326-0.291L458.072,80.835zM465.629,69.802l-3.198,2.903l2.907-0.289h2.907l-0.582,2.032l-2.615,2.613h2.907l0.29,0.291l2.325,3.484l2.035,0.291l1.745,3.195l0.581,1.161l3.486,0.291l-0.29,2.033l-1.452,0.58l1.163,1.452l-2.617,1.453h-3.488l-4.94,0.871l-1.164-0.581l-1.744,1.161l-2.616-0.291l-2.034,1.162l-1.453-0.581l4.069-2.904l2.616-0.581l-4.359-0.581l-0.873-0.872l2.906-0.871l-1.454-1.451l0.582-2.033l4.069,0.291l0.291-1.452l-1.744-1.743l-3.488-0.58l-0.582-0.871l0.872-1.162l-0.872-0.581l-1.452,1.162V76.19l-1.454-1.453l0.873-2.904l2.326-2.032h2.033H465.629z",
                        "GE" : "M588.298,116.844l0.291,-1.161l-0.582,-2.034l-1.743,-0.871l-1.455,-0.580l-1.162,-0.581l0.581,-0.581l2.325,0.581l3.779,0.581l3.780,1.162l0.581,0.580l1.745,-0.580l2.614,0.580l0.581,1.162l1.745,0.871l-0.582,0.290l1.455,1.452l-0.582,0.290l-1.454,-0.290l-2.034,-0.580l-0.581,0.290l-3.780,0.580l-2.615,-1.452l2.907,-0.291z",
                        "GH" : "M476.676,214.704l-4.361,1.452l-1.452,1.161l-2.617,0.581l-2.327,-0.581l0.000,-1.161l-1.162,-2.323l0.872,-3.195l1.164,-2.323l-0.874,-3.775l-0.290,-2.323l0.000,-1.452l4.942,0.000l1.163,0.000l0.872,-0.290l1.163,0.290l0.000,0.872l0.871,1.161l0.000,2.033l0.292,2.322l0.871,0.872l-0.581,2.613l0.000,1.162l0.872,1.742l-0.582,-1.162z",
                        "GL" : "M344.996,3.593l9.302,-1.451l9.593,0.000l3.488,-0.871l9.883,-0.291l21.800,0.291l17.442,2.322l-5.232,0.872l-10.465,0.290l-14.824,0.291l1.453,0.289l9.593,-0.289l8.429,0.871l5.232,-0.582l2.326,0.872l-2.907,1.452l6.977,-0.871l13.370,-1.162l8.139,0.581l1.455,1.162l-11.047,2.032l-1.743,0.580l-8.721,0.581l6.395,0.000l-3.196,2.033l-2.326,1.742l0.290,3.195l3.198,1.742l-4.361,0.000l-4.361,0.872l4.943,1.451l0.581,2.323l-2.908,0.291l3.781,2.323l-6.106,0.291l2.906,1.160l-0.871,0.872l-3.780,0.581l-3.777,0.000l3.488,1.742l0.000,1.161l-5.522,-1.161l-1.455,0.871l3.778,0.582l3.488,1.741l1.163,2.324l-4.940,0.580l-2.034,-1.162l-3.489,-1.742l0.871,2.033l-3.197,1.452l7.267,0.000l3.780,0.290l-7.269,2.324l-7.557,2.322l-7.848,0.872l-3.198,0.000l-2.907,0.871l-3.779,2.903l-5.814,2.034l-2.034,0.290l-3.489,0.581l-4.069,0.580l-2.326,1.742l0.000,2.034l-1.453,1.742l-4.360,2.033l0.872,2.323l-1.162,2.323l-1.454,2.613l-3.779,0.000l-4.069,-2.033l-5.524,0.000l-2.615,-1.742l-2.036,-2.614l-4.650,-3.484l-1.454,-1.742l-0.291,-2.324l-3.778,-2.613l0.872,-2.033l-1.744,-0.871l2.617,-3.194l4.359,-1.162l0.872,-1.161l0.582,-2.034l-3.198,0.873l-1.454,0.289l-2.325,0.582l-3.488,-0.871l0.000,-2.034l0.871,-1.452l2.617,0.000l5.523,0.872l-4.651,-1.742l-2.325,-1.162l-2.907,0.581l-2.326,-0.872l3.198,-2.322l-1.744,-1.162l-2.035,-2.033l-3.489,-2.904l-3.488,-0.871l0.000,-1.162l-7.266,-1.742l-5.814,0.000l-7.558,0.000l-6.685,0.290l-3.199,-0.870l-4.649,-1.743l7.266,-0.871l5.523,-0.291l-11.917,-0.580l-6.105,-1.162l0.291,-1.161l10.464,-1.162l10.173,-1.452l0.872,-0.871l-7.266,-1.162l2.326,-1.161l9.592,-1.742l4.070,-0.290l-1.163,-1.162l6.395,-0.872l8.429,-0.289l8.430,0.000l3.199,0.580l7.266,-1.453l6.395,1.162l4.070,0.291l5.523,0.871l-6.395,-1.451l-0.290,1.453z",
                        "GM" : "M427.549,194.667l0.291,-1.162l2.909,0.000l0.581,-0.581l0.871,0.000l1.163,0.581l0.873,0.000l0.870,-0.581l0.582,0.872l-1.163,0.581l-1.162,0.000l-1.163,-0.581l-1.163,0.581l-0.582,0.000l-0.580,0.581l2.327,0.291z",
                        "GN" : "M450.514,209.768l-0.871,0.000l-0.582,1.161l-0.581,0.000l-0.582,-0.581l0.290,-1.162l-1.162,-1.741l-0.872,0.290l-0.581,0.000l-0.581,0.290l0.000,-1.161l-0.582,-0.581l0.000,-0.870l-0.581,-1.163l-0.582,-0.871l-2.326,0.000l-0.581,0.580l-0.871,0.000l-0.292,0.581l-0.289,0.582l-1.455,1.451l-1.453,-1.742l-0.873,-1.163l-0.870,-0.289l-0.582,-0.581l-0.291,-1.161l-0.582,-0.582l-0.581,-0.580l1.163,-1.162l0.873,0.000l0.581,-0.580l0.582,0.000l0.580,-0.291l-0.291,-0.871l0.291,-0.291l0.000,-0.871l1.453,0.000l2.036,0.581l0.581,0.000l0.000,-0.290l1.744,0.290l0.289,-0.290l0.293,1.162l0.290,0.000l0.581,-0.582l0.582,0.291l0.871,0.580l1.165,0.291l0.579,-0.580l0.873,-0.582l0.871,-0.290l0.581,0.000l0.582,0.581l0.292,0.871l1.162,1.162l-0.582,0.580l-0.291,1.162l0.582,-0.291l0.581,0.291l-0.290,0.871l0.871,0.581l-0.581,0.290l-0.290,0.871l0.581,1.163l0.871,2.323l-1.162,0.290l-0.290,0.290l0.290,0.581l0.000,1.162l0.581,0.000z",
                        "GQ" : "M499.931,228.061l-0.582,-0.290l0.871,-3.193l4.652,0.000l0.000,3.483l-4.070,0.000l0.871,0.000z",
                        "GR" : "M538.882,132.815l1.744,0.871l2.034-0.29l2.033,0.29v0.582l1.455-0.291l-0.292,0.581l-4.067,0.291v-0.291l-3.199-0.581L538.882,132.815zM547.02,116.553l-0.871,1.742l-0.581,0.291h-1.745l-1.454-0.291l-3.196,0.872l1.744,1.451l-1.454,0.291h-1.452l-1.454-1.16l-0.582,0.58l0.582,1.452l1.454,1.453l-0.872,0.58l1.452,1.162l1.455,0.871v1.452l-2.617-0.581l0.873,1.452l-1.745,0.291l0.872,2.323h-1.744l-2.326-1.161l-0.871-2.324l-0.581-1.742l-1.163-1.162l-1.452-1.742v-0.58l1.16-1.453l0.292-0.87l0.873-0.291v-0.871l1.742-0.291l1.164-0.58h1.452l0.582-0.291l0.29-0.29l2.036,0.29l2.325-0.872l2.034,0.872h2.326v-1.452L547.02,116.553z",
                        "GT" : "M225.816,193.215l-1.453,-0.580l-1.744,0.000l-1.163,-0.581l-1.454,-1.162l0.000,-0.871l0.291,-0.581l-0.291,-0.580l1.164,-2.033l3.487,0.000l0.292,-0.871l-0.582,-0.291l-0.291,-0.581l-1.162,-0.581l-0.872,-0.870l1.163,0.000l0.000,-1.743l2.615,0.000l2.617,0.000l0.000,2.324l-0.292,2.903l0.872,0.000l0.872,0.581l0.292,-0.291l0.872,0.291l-1.455,1.162l-1.161,0.580l-0.292,0.581l0.292,0.581l-0.583,0.580l-0.581,0.291l0.000,0.290l-0.580,0.291l-0.873,0.581l0.000,-0.580z",
                        "GW" : "M432.201,200.475l-1.452,-1.162l-1.164,0.000l-0.582,-0.871l0.000,-0.291l-0.871,-0.580l-0.292,-0.581l1.453,-0.581l0.874,0.000l0.871,-0.290l4.942,0.290l0.000,0.871l-0.291,0.291l0.291,0.871l-0.580,0.291l-0.582,0.000l-0.581,0.580l-0.873,0.000l1.163,-1.162z",
                        "GY" : "M309.243,208.025l1.744,0.871l1.744,1.742l0.000,1.452l1.162,0.000l1.453,1.452l1.163,0.873l-0.582,2.613l-1.453,0.579l0.000,0.872l-0.581,1.161l1.453,2.032l0.872,0.000l0.291,1.744l1.744,2.322l-0.872,0.000l-1.454,-0.290l-0.871,0.871l-1.163,0.581l-0.872,0.000l-0.290,0.581l-1.454,-0.290l-1.743,-1.162l-0.291,-1.162l-0.582,-1.451l0.582,-2.324l0.580,-1.162l-0.580,-1.161l-0.872,-0.290l0.290,-1.451l-0.582,-0.582l-1.453,0.291l-2.035,-2.322l0.873,-0.582l0.000,-1.163l1.743,-0.580l0.582,-0.581l-0.872,-0.871l0.290,-1.161l-2.036,1.452z",
                        "HN" : "M233.374,195.248l-0.291,-0.871l-0.872,-0.291l0.000,-1.162l-0.291,-0.289l-0.582,0.000l-1.161,0.289l0.000,-0.289l-0.872,-0.581l-0.582,-0.581l-0.873,-0.291l0.583,-0.580l-0.292,-0.581l0.292,-0.581l1.161,-0.580l1.455,-1.162l0.289,0.000l0.582,-0.291l0.581,0.000l0.291,0.000l0.582,0.000l1.163,0.291l1.162,-0.291l0.873,-0.290l0.581,-0.290l0.872,0.290l0.581,0.000l0.582,0.000l0.581,-0.290l1.454,0.580l0.289,0.000l0.872,0.582l0.873,0.580l0.871,0.291l0.873,0.870l-1.162,0.000l-0.291,0.291l-0.872,0.291l-0.872,0.000l-0.581,0.290l-0.582,0.000l-0.290,-0.290l-0.291,0.000l-0.291,0.580l-0.291,0.000l0.000,0.581l-1.163,0.871l-0.581,0.291l-0.291,0.289l-0.581,-0.580l-0.581,0.871l-0.582,-0.291l-0.871,0.291l0.290,1.162l-0.581,0.000l-0.291,0.871l0.872,0.000z",
                        "HR" : "M525.51,104.647l0.871,1.163l0.873,0.870l-1.163,0.872l-1.163,-0.581l-2.033,0.000l-2.325,-0.291l-1.163,0.000l-0.582,0.581l-1.162,-0.581l-0.581,0.872l1.454,1.451l0.579,0.872l1.163,0.871l1.162,0.581l0.874,1.161l2.614,1.161l-0.289,0.580l-2.615,-1.160l-1.746,-0.871l-2.326,-0.871l-2.326,-2.033l0.582,-0.291l-1.453,-1.162l0.000,-0.870l-1.744,-0.291l-0.871,1.161l-0.873,-1.161l0.292,-0.870l1.743,0.000l0.580,-0.291l0.873,0.291l1.163,0.000l0.000,-0.582l0.871,-0.290l0.293,-1.162l2.325,-0.580l0.871,0.290l2.036,1.161l2.325,0.581l-0.871,0.581z",
                        "HT" : "M272.326,176.083l1.744,0.290l2.326,0.291l0.290,1.451l-0.290,1.161l-0.582,0.582l0.582,0.580l0.000,0.872l-1.745,-0.581l-1.453,0.290l-1.744,-0.290l-1.163,0.581l-1.454,-0.872l0.291,-0.871l2.326,0.291l2.325,0.290l0.872,-0.581l-1.163,-1.161l0.000,-1.161l-1.744,-0.292l-0.582,0.870z",
                        "HU" : "M518.243,102.034l1.164,-1.742l-0.582,-0.581l1.453,0.000l0.292,-1.162l1.454,0.872l0.871,0.290l2.324,-0.581l0.291,-0.291l1.163,-0.290l1.163,-0.290l0.289,0.000l1.455,-0.290l0.582,-0.581l0.870,-0.291l2.908,0.872l0.582,-0.290l1.452,0.870l0.291,0.581l-1.743,0.581l-1.164,2.034l-1.742,1.741l-2.325,0.581l-1.455,0.000l-2.326,0.580l-0.871,0.581l-2.325,-0.581l-2.036,-1.161l-0.871,-0.290l-0.582,-1.162l0.582,0.000z",
                        "ID" : "M806.019,259.132h-1.163l-3.488-2.033l2.326-0.289l1.454,0.58l1.162,0.871L806.019,259.132zM816.193,258.842l-2.323,0.581l-0.292-0.291l0.292-0.871l1.16-1.742l2.617-1.16l0.29,0.58l0.29,0.871L816.193,258.842zM798.17,253.326l1.163,0.58l1.745-0.29l0.581,1.161l-3.198,0.582l-1.745,0.58l-1.743-0.291l1.162-1.451h1.455L798.17,253.326zM812.123,253.326l-0.579,1.451l-4.072,0.871l-3.486-0.58v-0.871l2.034-0.581l1.745,0.871l1.743-0.29L812.123,253.326zM772.881,249.55l5.232,0.29l0.582-1.161l4.94,1.452l1.163,1.742l4.07,0.58l3.487,1.452l-3.196,1.162l-3.199-1.162h-2.325h-2.907l-2.615-0.58l-3.199-1.162l-2.033-0.29l-1.163,0.29l-4.942-0.871l-0.58-1.452h-2.325l1.745-2.613h3.488l2.033,1.163l1.162,0.289L772.881,249.55zM844.679,248.098l-1.452,1.742l-0.292-2.032l0.583-0.871l0.58-1.162l0.581,0.871V248.098zM824.043,240.548l-1.163,0.87l-1.745-0.58l-0.581-1.162h2.907L824.043,240.548zM833.053,239.386l0.871,2.032l-2.325-0.87l-2.324-0.29h-1.454h-2.034l0.582-1.452l3.486-0.291L833.053,239.386zM842.935,234.16l0.874,4.355l2.906,1.743l2.325-2.905l3.199-1.741h2.323l2.326,0.87l2.033,1.162l2.909,0.581v8.712l0.29,9.002l-2.615-2.323l-2.91-0.29l-0.578,0.58l-3.489,0.291l1.161-2.323l1.744-0.871l-0.579-2.904l-1.454-2.323l-5.233-2.324l-2.323-0.289l-4.069-2.613L840.901,242l-1.162,0.292l-0.581-1.163v-1.161l-2.034-1.161l2.906-1.162h2.034l-0.289-0.581h-4.072l-1.161-1.742l-2.327-0.58l-1.161-1.161l3.778-0.872l1.455-0.872l4.359,1.162L842.935,234.16zM818.518,226.9l-2.325,2.904l-2.034,0.58l-2.615-0.58h-4.651l-2.325,0.58l-0.292,2.033l2.326,2.323l1.454-1.161l5.23-0.872l-0.29,1.161l-1.162-0.289l-1.163,1.451l-2.326,1.162l2.615,3.483l-0.581,0.872l2.326,3.194v1.742l-1.452,0.872l-0.874-0.872l1.165-2.323l-2.617,1.162l-0.871-0.873l0.579-0.869l-2.033-1.743l0.291-2.613l-2.036,0.871l0.292,3.195v3.773l-1.744,0.581l-1.165-0.871l0.874-2.613l-0.291-2.613h-1.162l-0.871-2.033l1.161-1.741l0.289-2.033l1.455-4.356l0.581-0.871l2.326-2.032l2.033,0.58l3.488,0.582l3.199-0.292l2.615-2.032L818.518,226.9zM828.111,227.771l-0.29,2.323h-1.452l-0.292,1.452l1.162,1.451l-0.87,0.291l-1.165-1.742l-0.871-3.485l0.581-2.032l0.873-1.162l0.29,1.452l1.744,0.291L828.111,227.771zM798.17,226.029l3.197,2.322l-3.197,0.292l-1.162,2.031l0.292,2.614l-2.618,1.742v2.613L793.52,242l-0.581-0.871l-2.908,1.163l-1.161-1.743l-2.034-0.29l-1.163-0.872l-3.488,1.162l-0.871-1.452l-1.744,0.29l-2.328-0.29l-0.581-3.775l-1.163-0.871l-1.452-2.322l-0.292-2.323l0.292-2.613l1.452-1.743l0.584,1.743l2.033,1.741l1.744-0.581h1.744l1.453-1.16l1.454-0.291l2.615,0.581l2.036-0.581l1.452-3.774l1.163-0.872l0.871-3.193h3.198l2.325,0.58l-1.454,2.323l2.036,2.614L798.17,226.029zM765.034,246.937l-2.907,0.29l-2.325-2.321l-3.779-2.324l-1.162-1.743l-2.033-2.323l-1.165-2.033l-2.325-3.774l-2.326-2.323l-0.871-2.323l-0.873-2.032l-2.615-1.743l-1.454-2.322l-2.034-1.743l-2.908-2.903l-0.289-1.451h1.745l4.358,0.58l2.618,2.614l2.033,2.032l1.453,1.161l2.615,2.905h2.908l2.325,2.032l1.454,2.322l2.033,1.161l-0.871,2.323l1.454,0.871h0.872l0.581,2.033l0.873,1.451l2.034,0.291l1.452,1.742l-0.871,3.485V246.937z",
                        "IE" : "M456.62,82.869l0.579,2.032l-2.034,2.323l-4.942,1.743l-3.779,-0.581l2.036,-2.904l-1.454,-2.613l3.779,-2.323l2.033,-1.162l0.582,1.451l-0.582,1.454l1.745,0.000l-2.037,-0.580z",
                        "IL" : "M572.021,140.946l-0.293,0.870l-1.163,-0.289l-0.578,1.743l0.871,0.289l-0.871,0.581l0.000,0.581l1.160,-0.291l0.000,0.872l-1.160,4.645l-2.038,-4.935l0.873,-0.872l0.581,-1.451l0.584,-2.033l0.289,-0.582l0.289,0.000l0.872,0.000l0.291,-0.580l0.582,0.000l0.000,1.162l-0.289,0.290l0.000,0.000z",
                        "IN" : "M688.002,133.396l2.909,3.194l-0.293,2.324l1.163,1.160l0.000,1.453l-2.036,-0.291l0.873,2.904l2.615,1.742l3.781,2.034l-1.745,1.161l-1.163,2.613l2.908,1.162l2.614,1.161l3.490,1.742l3.779,0.291l1.453,1.452l2.325,0.290l3.197,0.581l2.326,0.000l0.291,-1.162l-0.291,-1.742l0.000,-1.161l1.744,-0.582l0.292,2.033l0.000,0.581l2.615,1.162l1.744,-0.581l2.326,0.290l2.326,0.000l0.000,-1.742l-1.163,-0.871l2.326,-0.290l2.615,-2.033l3.198,-1.742l2.033,0.580l2.035,-1.162l1.455,1.743l-1.161,1.162l3.194,0.290l0.000,1.162l-0.871,0.580l0.291,1.452l-2.034,-0.290l-3.489,1.742l0.000,1.742l-1.453,2.323l-0.292,1.162l-1.163,2.322l-2.033,-0.580l-0.290,2.904l-0.583,0.872l0.291,1.161l-1.162,0.581l-1.454,-4.356l-0.872,0.000l-0.581,1.742l-1.454,-1.452l0.872,-1.452l1.163,-0.289l1.454,-2.324l-1.743,-0.291l-2.327,0.000l-2.616,-0.291l-0.291,-2.032l-1.454,0.000l-2.034,-1.451l-1.163,2.032l2.034,1.451l-1.743,0.873l-0.582,1.160l1.744,0.582l-0.579,1.742l1.160,2.032l0.290,2.324l-0.290,1.162l-2.034,-0.291l-3.197,0.580l0.000,2.033l-1.455,1.742l-4.069,1.744l-2.904,3.484l-2.038,1.743l-2.906,1.742l0.000,1.161l-1.163,0.581l-2.615,1.161l-1.162,0.000l-0.874,2.323l0.582,3.484l0.000,2.324l-1.163,2.614l0.000,4.644l-1.454,0.000l-1.160,2.325l0.870,0.871l-2.615,0.581l-0.874,2.032l-1.163,0.581l-2.615,-2.323l-1.163,-4.067l-1.162,-2.613l-0.874,-1.451l-1.452,-2.613l-0.581,-3.485l-0.581,-1.742l-2.618,-3.775l-1.161,-5.227l-0.584,-3.485l0.000,-3.194l-0.581,-2.613l-4.068,1.451l-2.035,-0.290l-3.488,-3.194l1.454,-1.162l-0.873,-0.871l-3.198,-2.323l1.745,-2.033l6.106,0.000l-0.583,-2.324l-1.455,-1.451l-0.579,-2.032l-1.745,-1.162l3.197,-2.904l3.199,0.291l2.904,-2.904l1.745,-2.904l2.618,-2.614l0.000,-2.032l2.325,-1.743l-2.325,-1.161l-0.874,-2.032l-1.160,-2.324l1.453,-1.162l4.069,0.581l3.196,-0.290l-2.617,2.323z",
                        "IQ" : "M598.763,131.943l1.744,0.872l0.289,1.742l-1.452,0.871l-0.581,2.033l2.033,2.613l3.200,1.453l1.454,2.323l-0.292,1.742l0.872,0.000l0.000,1.742l1.454,1.452l-1.744,-0.290l-1.744,-0.291l-2.037,2.614l-5.230,0.000l-7.561,-5.517l-4.067,-2.032l-3.488,-0.873l-1.163,-3.193l6.103,-2.904l1.163,-3.195l-0.292,-2.032l1.454,-0.872l1.454,-1.742l1.164,-0.291l3.197,0.291l0.873,0.872l1.452,-0.581l-1.745,-3.193z",
                        "IR" : "M622.309,128.75l2.323,-0.582l2.036,-1.742l1.745,0.291l1.162,-0.581l2.034,0.290l2.907,1.452l2.325,0.290l3.200,2.324l2.034,0.000l0.289,2.323l-1.161,3.485l-0.873,2.032l1.163,0.291l-1.163,1.742l0.873,2.032l0.290,1.743l2.036,0.581l0.289,1.742l-2.615,2.323l1.453,1.452l1.162,1.742l2.617,1.162l0.000,2.613l1.453,0.291l0.290,1.452l-4.070,1.162l-1.161,3.193l-4.943,-0.580l-3.197,-0.871l-2.906,-0.291l-1.454,-3.194l-1.163,-0.581l-2.034,0.581l-2.908,1.162l-3.196,-0.872l-2.907,-2.033l-2.617,-0.870l-1.745,-2.614l-2.034,-3.774l-1.744,0.580l-1.744,-0.871l-0.871,1.161l-1.454,-1.452l0.000,-1.742l-0.872,0.000l0.292,-1.742l-1.454,-2.323l-3.200,-1.453l-2.033,-2.613l0.581,-2.033l1.452,-0.871l-0.289,-1.742l-1.744,-0.872l-1.745,-3.193l-1.452,-2.324l0.579,-0.871l-0.870,-2.904l1.743,-0.871l0.582,0.871l1.163,1.453l2.033,0.289l0.873,0.000l3.489,-2.032l0.872,-0.290l0.871,0.871l-0.871,1.451l1.743,1.453l0.582,-0.291l0.873,2.033l2.615,0.580l1.744,1.453l4.069,0.291l4.360,-0.581l-0.293,0.581z",
                        "IS" : "M433.944,48.313l-0.870,1.742l3.196,1.742l-3.488,2.033l-8.138,2.033l-2.326,0.581l-3.488,-0.581l-7.849,-0.871l2.906,-1.162l-6.103,-1.451l4.940,-0.291l0.000,-0.871l-5.811,-0.580l1.744,-2.033l4.067,-0.291l4.362,1.742l4.360,-1.451l3.198,0.871l4.649,-1.452l-4.651,-0.290z",
                        "IT" : "M516.5,125.846l-0.873,2.033l0.292,0.872l-0.582,1.451l-2.034-0.871l-1.454-0.291l-3.777-1.451l0.289-1.452l3.199,0.29l2.904-0.29L516.5,125.846zM499.059,117.715l1.743,1.742l-0.291,3.775l-1.452-0.291l-1.164,0.871l-0.872-0.58l-0.291-3.195l-0.579-1.742l1.452,0.291L499.059,117.715zM507.779,102.325l4.069,0.581l-0.289,1.452l0.581,1.161l-2.326-0.291l-2.035,0.872v1.452l-0.292,0.871l0.873,1.162l2.615,1.452l1.455,2.324l2.906,2.323h2.326l0.58,0.58l-0.872,0.582l2.617,0.871l2.036,0.871l2.324,1.451l0.291,0.581l-0.581,0.873l-1.455-1.453l-2.325-0.289l-1.163,1.742l2.036,1.16l-0.581,1.453h-0.873l-1.745,2.323l-0.87,0.291v-0.871l0.289-1.453l0.872-0.58l-1.161-1.742l-0.873-1.162l-1.161-0.58l-0.873-1.162l-1.744-0.29l-1.163-1.162l-2.034-0.291l-2.036-1.162l-2.615-1.741l-1.744-1.743l-0.872-2.614l-1.454-0.29l-2.325-0.872l-1.163,0.291l-1.743,1.162l-1.163,0.291l0.291-1.162l-1.454-0.291l-0.582-2.033l0.872-0.871l-0.872-1.162l0.291-0.871l1.165,0.581h1.16l1.744-0.871l0.291,0.29h1.453l0.583-1.162l2.034,0.29l1.163-0.29l0.289-1.162l1.745,0.291l0.291-0.58l2.615-0.292L507.779,102.325z",
                        "JM" : "M260.116,180.148l2.036,0.290l1.452,0.581l0.291,0.871l-1.743,0.000l-0.872,0.291l-1.454,-0.291l-1.744,-1.161l0.290,-0.581l1.164,-0.290l-0.580,-0.290z",
                        "JO" : "M571.728,141.816l0.293,-0.870l3.195,1.161l5.234,-2.903l1.163,3.193l-0.582,0.582l-5.522,1.451l2.905,2.614l-0.872,0.581l-0.581,0.871l-2.036,0.290l-0.581,1.161l-1.161,0.582l-3.196,-0.291l0.000,-0.291l1.160,-4.645l0.000,-0.872l0.581,-0.871l0.000,1.743z",
                        "JP" : "M844.39,137.17l0.289,0.871l-1.452,1.742l-1.163-1.161l-1.454,0.871l-0.58,1.452l-2.035-0.581l0.292-1.452l1.452-1.743l1.452,0.291l1.165-1.161L844.39,137.17zM861.832,128.75l-1.165,2.323l0.584,1.162l-1.455,2.033l-3.488,1.452h-4.94l-3.78,3.195l-1.742-1.162l-0.292-2.033l-4.651,0.582l-3.488,1.451h-3.198l2.909,2.032l-1.745,4.646l-1.743,1.162l-1.454-1.162l0.582-2.323l-1.745-0.871l-1.163-1.742l2.617-0.871l1.452-1.742l2.907-1.453l2.035-2.033l5.523-0.581l2.907,0.291l2.904-4.646l1.746,1.162l4.07-2.614l1.452-1.161l1.744-3.484l-0.292-2.904l1.164-1.742l2.906-0.581l1.454,3.774v2.324l-2.615,2.613V128.75zM869.969,109.584l1.744,0.58l2.036-1.162l0.58,2.904l-4.068,0.871l-2.326,2.613l-4.36-1.742l-1.453,2.904h-3.199l-0.29-2.613l1.454-2.033l2.906-0.291l0.873-3.775l0.581-2.032l3.488,2.613L869.969,109.584z",
                        "KE" : "M586.553,233.289l1.745,2.323l-2.034,1.162l-0.582,1.161l-1.163,0.000l-0.291,2.032l-0.872,1.161l-0.581,1.744l-1.162,0.871l-3.780,-2.615l-0.291,-1.742l-9.883,-5.517l-0.582,-0.289l0.000,-2.906l0.872,-1.161l1.164,-1.742l1.163,-2.033l-1.163,-3.194l-0.291,-1.452l-1.452,-1.742l1.743,-1.743l1.745,-1.741l1.452,0.290l0.000,1.742l0.873,0.871l2.033,0.000l3.489,2.323l0.874,0.000l0.580,0.000l0.580,0.290l2.036,0.290l0.581,-1.160l2.618,-1.162l1.161,0.870l1.743,0.000l-2.325,3.196l0.000,-9.873z",
                        "KG" : "M669.108,114.811l0.581,-1.162l1.745,-0.580l4.649,0.871l0.292,-1.452l1.745,-0.581l3.779,1.162l1.161,-0.291l4.361,0.000l4.068,0.291l1.455,0.871l1.744,0.581l-0.289,0.581l-4.362,1.451l-1.162,1.162l-3.490,0.290l-0.871,1.744l-2.906,-0.291l-2.036,0.580l-2.615,1.162l0.289,0.580l-0.579,0.871l-5.233,0.291l-3.488,-0.871l-2.908,0.290l0.291,-1.743l2.906,0.582l0.873,-0.871l2.326,0.289l3.488,-2.032l-3.199,-1.451l-2.034,0.580l-2.035,-0.871l2.326,-1.742l0.872,0.291z",
                        "KH" : "M758.638,201.637l-1.162,-1.453l-1.454,-2.613l-0.580,-3.485l1.741,-2.323l3.781,-0.581l2.326,0.581l2.326,0.872l1.160,-1.743l2.617,0.871l0.581,2.033l-0.289,3.194l-4.651,2.033l1.162,1.742l-2.906,0.290l-2.326,1.162l2.326,0.580z",
                        "KO" : "M531.032,115.392l-0.289,0.581l-0.292,0.000l-0.289,-1.162l-0.582,-0.290l-0.581,-0.581l0.581,-0.871l0.582,0.000l0.289,-0.871l0.581,-0.291l0.293,0.291l0.581,0.290l0.290,0.581l0.583,0.000l0.579,0.580l0.292,0.000l-0.292,0.580l-0.290,0.292l0.000,0.290l-0.581,0.000l1.455,-0.581z",
                        "KP" : "M833.343,114.229l0.292,0.582l-0.872,0.000l-1.164,0.872l-0.872,0.870l0.000,2.033l-1.452,0.581l-0.291,0.582l-1.163,0.580l-1.744,0.580l-1.163,0.582l-0.292,1.451l-0.289,0.291l1.163,0.290l1.452,1.161l-0.290,0.871l-1.162,0.000l-2.035,0.291l-0.874,1.161l-1.452,0.000l-1.454,-0.290l-0.289,0.290l-0.874,0.290l0.000,-0.580l-0.581,0.000l-0.871,-0.581l0.871,-1.161l0.581,-0.291l-0.291,-0.580l0.583,-1.453l0.000,-0.580l-1.744,-0.291l-1.162,-0.580l2.033,-1.742l3.198,-1.453l1.745,-2.032l1.453,0.871l2.325,0.000l-0.289,-1.452l4.067,-1.163l1.163,-1.451l-1.744,-1.451z",
                        "KR" : "M826.948,124.684l2.617,3.194l0.582,2.034l0.000,2.903l-1.163,1.742l-2.326,0.582l-2.325,0.870l-2.326,0.291l-0.292,-1.452l0.292,-2.033l-1.163,-2.903l2.036,-0.291l-1.745,-2.614l1.452,0.000l0.874,-1.161l2.035,-0.291l1.162,0.000l-0.290,0.871z",
                        "KW" : "M605.74,148.496l0.581,1.162l-0.291,0.580l0.871,2.323l-1.743,0.000l-0.873,-1.452l-2.326,-0.290l2.037,-2.614l-1.744,-0.291z",
                        "KZ" : "M669.108,114.811l-1.454,0.291l-3.779,2.033l-1.163,2.032l-1.163,0.000l-0.580,-1.452l-3.489,0.000l-0.581,-2.323l-1.453,0.000l0.290,-2.614l-3.196,-2.032l-4.944,0.290l-3.196,0.291l-2.618,-2.614l-2.324,-0.872l-4.071,-2.031l-0.580,-0.291l-6.976,1.742l0.000,10.164l-1.455,0.000l-1.744,-2.033l-2.034,-0.871l-3.199,0.581l-1.160,0.871l0.000,-0.581l0.582,-1.163l-0.582,-0.869l-3.197,-1.162l-1.165,-2.323l-1.453,-0.581l-0.291,-1.161l2.909,0.289l0.000,-2.032l2.324,-0.290l2.326,0.290l0.581,-2.614l-0.581,-1.742l-2.616,0.291l-2.326,-0.872l-3.196,1.452l-2.618,0.581l-1.452,-0.581l0.289,-1.452l-1.743,-1.742l-2.034,0.000l-2.327,-1.742l1.453,-2.323l-0.580,-0.290l2.036,-3.195l2.906,1.742l0.289,-2.032l5.814,-3.195l4.362,0.000l5.812,2.032l3.489,1.163l2.906,-1.163l4.360,-0.290l3.488,1.453l0.871,-0.872l3.781,0.291l0.581,-1.453l-4.362,-1.742l2.618,-1.451l-0.581,-0.582l2.617,-0.870l-2.036,-1.743l1.454,-1.160l10.172,-0.872l1.454,-0.582l6.976,-1.161l2.326,-1.161l4.942,0.580l0.872,2.905l2.906,-0.581l3.488,0.872l-0.290,1.451l2.618,0.000l6.974,-2.614l-0.871,0.872l3.488,2.033l6.104,6.968l1.453,-1.451l3.780,1.742l4.070,-0.872l1.455,0.581l1.160,1.452l2.034,0.581l1.163,1.162l3.488,-0.291l1.455,1.743l-2.034,1.742l-2.328,0.291l0.000,2.904l-1.744,1.162l-5.232,-0.873l-2.034,4.938l-1.453,0.580l-5.524,1.162l2.617,4.646l-2.033,0.580l0.289,1.743l-1.744,-0.581l-1.455,-0.871l-4.068,-0.291l-4.361,0.000l-1.161,0.291l-3.779,-1.162l-1.745,0.581l-0.292,1.452l-4.649,-0.871l-1.745,0.580l0.581,-1.162z",
                        "LA" : "M763.29,191.763l0.872,-1.451l0.291,-2.323l-2.327,-2.324l0.000,-2.613l-2.325,-2.323l-2.036,0.000l-0.582,0.871l-1.452,0.000l-0.871,-0.581l-2.907,1.742l0.000,-2.323l0.579,-2.904l-1.743,-0.289l-0.290,-1.744l-1.163,-0.580l0.581,-1.162l2.326,-1.742l0.289,0.581l1.455,0.000l-0.290,-2.904l1.453,-0.581l1.454,2.324l1.161,2.322l3.488,0.000l1.165,2.614l-1.747,0.580l-0.870,0.872l3.197,1.742l2.325,3.194l1.745,2.614l2.036,1.742l0.870,2.032l-0.581,2.614l-2.617,-0.871l-1.160,1.743l2.326,0.872z",
                        "LB" : "M572.31,139.494l-0.582,0.000l-0.291,0.580l-0.872,0.000l0.872,-2.323l1.454,-2.032l1.163,0.000l0.581,1.162l-1.452,1.161l0.873,-1.452z",
                        "LK" : "M699.047,210.348l-0.579,2.904l-1.165,0.581l-2.323,0.582l-1.455,-2.034l-0.292,-4.066l1.166,-4.356l2.033,1.454l1.162,2.032l-1.453,-2.903z",
                        "LR" : "M452.549,219.06l-0.873,0.000l-2.615,-1.453l-2.617,-2.032l-2.324,-1.452l-1.744,-1.742l0.580,-0.872l0.000,-0.871l1.454,-1.452l1.163,-1.451l0.581,0.000l0.872,-0.290l1.162,1.741l-0.290,1.162l0.582,0.581l0.581,0.000l0.582,-1.161l0.871,0.000l0.000,0.870l0.291,1.162l-0.582,1.452l0.582,0.581l0.871,0.290l1.162,1.161l0.293,1.162l-0.293,0.291l0.289,-2.323z",
                        "LS" : "M553.416,310.531l1.163,0.872l-0.873,1.451l-0.581,0.871l-1.454,0.292l-0.581,0.869l-0.871,0.291l-2.036,-2.032l1.454,-1.742l1.453,-1.163l1.163,-0.579l-1.163,-0.870z",
                        "LT" : "M536.265,81.417l-0.291,-0.582l0.582,-0.870l-1.454,-0.291l-2.906,-0.581l-0.580,-2.322l3.197,-0.871l4.649,0.290l2.618,-0.290l0.581,0.580l1.455,0.291l2.614,1.162l0.290,1.160l-2.326,1.162l-0.578,1.452l-2.908,0.872l-2.907,0.000l-0.582,-0.872l1.454,0.290z",
                        "LU" : "M490.338,93.032l0.579,0.581l0.000,1.452l-0.871,0.000l-0.581,-0.291l0.290,-1.451l-0.583,0.291z",
                        "LV" : "M531.616,76.771l0.290,-2.033l1.162,-1.742l2.616,-0.871l2.326,2.033l2.035,0.000l0.581,-2.033l2.325,-0.581l1.165,0.290l2.614,1.162l2.034,0.000l1.455,0.581l0.291,1.161l0.871,1.742l-2.906,1.162l-1.745,0.291l-2.614,-1.162l-1.455,-0.291l-0.581,-0.580l-2.618,0.290l-4.649,-0.290l3.197,-0.871z",
                        "LY" : "M514.755,167.951l-2.036,1.162l-1.452,-1.452l-4.361,-1.161l-1.452,-1.743l-2.035,-1.451l-1.163,0.580l-1.163,-1.451l0.000,-1.162l-1.744,-2.033l1.162,-1.161l-0.291,-1.743l0.291,-1.452l0.000,-1.451l0.291,-2.033l0.000,-1.453l-0.871,-2.322l1.162,-0.581l0.290,-1.162l-0.290,-1.161l2.034,-1.162l0.872,-0.870l1.164,-0.873l0.291,-2.032l3.195,0.872l1.165,0.000l2.326,0.290l3.486,1.161l1.456,2.614l2.325,0.581l4.067,1.161l2.907,1.162l1.165,-0.581l1.453,-1.452l-0.582,-2.033l0.874,-1.162l1.741,-1.451l2.036,-0.290l3.778,0.580l0.873,1.161l1.163,0.000l0.871,0.582l2.616,0.291l0.582,0.870l-0.871,1.452l0.289,1.162l-0.579,1.451l0.871,2.324l0.000,9.873l0.000,10.162l0.000,5.228l-3.199,0.291l0.000,0.870l-11.045,-5.227l-11.046,-5.226l2.616,-1.451z",
                        "MA" : "M459.526,132.525l1.743,1.161l2.616,0.000l2.615,0.581l1.164,0.000l1.163,1.742l0.291,1.742l0.871,2.905l0.582,0.580l-0.289,0.871l-3.782,0.582l-1.162,0.870l-1.744,0.291l0.000,2.032l-3.197,1.162l-1.162,1.452l-2.036,0.581l-2.906,0.581l-4.361,2.032l0.000,3.194l-0.581,0.000l0.292,1.452l-1.745,0.000l-0.872,0.871l-1.161,0.000l-1.165,-0.581l-2.324,0.291l-0.873,2.323l-0.872,0.000l-1.162,3.485l-4.069,3.194l-0.874,3.775l-1.162,1.162l-0.290,0.870l-6.107,0.291l0.000,-1.161l1.165,-0.872l0.871,-1.451l-0.291,-0.872l1.164,-2.033l1.454,-1.742l0.871,-0.291l0.873,-1.742l0.000,-1.451l0.870,-1.742l2.036,-0.872l1.745,-2.904l1.452,-1.162l2.326,-0.289l2.326,-1.743l1.452,-0.871l2.036,-2.323l-0.582,-3.194l1.163,-2.323l0.290,-1.452l1.744,-2.033l2.906,-1.162l2.037,-1.162l1.745,-2.903l0.871,-1.742l-2.035,0.000z",
                        "MD" : "M547.02,98.259l0.584,-0.290l2.033,-0.290l2.034,0.870l1.162,0.000l1.166,0.872l-0.293,0.871l1.164,0.580l0.290,1.162l0.873,0.580l0.000,0.291l0.290,0.291l-0.581,0.290l-1.743,0.000l-0.293,-0.581l-0.581,0.291l0.291,0.580l-0.872,0.871l-0.291,0.872l-0.872,0.291l-0.291,-1.163l0.291,-1.161l-0.291,-1.161l-1.453,-1.742l-0.873,-1.162l-0.871,-0.872l0.873,0.290z",
                        "ME" : "M528.417,113.94l-0.292,-0.291l-1.163,1.162l0.000,0.872l-0.581,0.000l-0.579,-0.872l-1.163,-0.582l0.289,-0.580l0.291,-1.451l0.872,-0.581l0.582,-0.290l0.873,0.290l0.290,0.581l0.872,0.290l1.162,0.581l-0.290,0.000l-0.581,0.871l0.582,0.000z",
                        "MG" : "M610.099,265.23l0.873,1.163l0.582,1.742l0.579,3.485l0.584,1.160l-0.293,1.454l-0.581,0.579l-0.871,-1.451l-0.583,0.872l0.583,2.032l-0.291,1.160l-0.582,0.581l-0.292,2.325l-1.162,3.194l-1.161,3.775l-1.744,5.226l-1.162,3.775l-1.165,3.195l-2.325,0.581l-2.325,1.162l-1.455,-0.582l-2.324,-0.871l-0.872,-1.453l0.000,-2.613l-1.163,-2.032l0.000,-2.033l0.292,-2.032l1.452,-0.582l0.000,-0.871l1.163,-2.032l0.289,-1.742l-0.579,-1.453l-0.582,-1.451l-0.291,-2.614l1.163,-1.743l0.289,-1.742l1.455,0.000l1.452,-0.581l0.872,-0.579l1.454,0.000l1.455,-1.454l2.325,-1.740l0.872,-1.454l-0.580,-1.160l1.161,0.289l1.744,-1.743l0.000,-1.742l0.873,-1.160l-0.871,-1.160z",
                        "MK" : "M530.451,115.973l0.292,0.000l0.289,-0.581l1.455,-0.581l0.581,0.000l1.161,-0.290l1.165,0.000l1.452,0.871l0.000,1.743l-0.290,0.290l-0.582,0.290l-1.452,0.000l-1.164,0.580l-1.742,0.291l-1.165,-0.581l-0.289,-1.161l-0.289,0.871z",
                        "ML" : "M440.34,190.602l0.871,-0.290l0.583,-1.743l0.872,0.000l1.744,0.871l1.455,-0.580l1.161,0.000l0.581,-0.581l11.046,0.000l0.582,-2.032l-0.582,-0.291l-1.454,-11.906l-1.161,-11.615l4.070,-0.291l9.301,6.098l9.301,6.098l0.873,1.161l1.454,0.872l1.452,0.291l0.000,1.742l2.906,0.000l0.000,6.097l-1.452,2.034l-0.291,1.452l-2.326,0.580l-3.778,0.291l-0.872,0.870l-1.744,0.291l-2.035,0.000l-0.582,-0.581l-1.452,0.290l-2.617,1.162l-0.582,0.871l-2.035,1.161l-0.291,0.872l-1.163,0.581l-1.452,-0.581l-0.872,0.871l-0.291,1.742l-2.034,2.324l0.000,0.871l-0.873,1.161l0.290,1.741l-1.161,0.292l-0.583,0.290l-0.579,-1.162l-0.582,0.291l-0.581,0.000l-0.582,0.871l-2.037,0.000l-0.870,-0.582l-0.292,0.292l-0.871,-0.581l0.290,-0.871l-0.581,-0.291l-0.582,0.291l0.291,-1.162l0.582,-0.580l-1.162,-1.162l-0.292,-0.871l-0.582,-0.581l-0.581,0.000l-0.871,0.290l-0.873,0.582l-0.579,0.580l-1.165,-0.291l-0.871,-0.580l-0.582,-0.291l-0.581,0.582l-0.290,0.000l-0.293,-1.162l0.000,-0.871l0.000,-1.162l-1.162,-0.581l-0.581,-1.742l0.000,1.742z",
                        "MM" : "M747.882,175.501l-1.743,1.163l-2.034,0.000l-1.163,3.194l-1.165,0.290l1.455,2.613l1.744,1.742l1.163,2.034l-1.163,2.323l-0.871,0.580l0.582,1.162l1.741,2.322l0.582,1.453l-0.290,1.452l1.162,2.322l-1.454,2.614l-1.452,2.903l-0.289,-2.031l0.870,-2.033l-0.870,-1.742l0.289,-2.904l-1.163,-1.453l-0.871,-3.484l-0.581,-3.484l-1.164,-2.034l-1.743,1.162l-3.200,2.033l-1.454,-0.291l-1.741,-0.580l0.870,-3.486l-0.579,-2.612l-2.036,-2.904l0.290,-1.161l-1.744,-0.291l-1.743,-2.323l-0.291,-2.033l0.871,0.291l0.292,-2.033l1.162,-0.581l-0.291,-1.161l0.583,-0.872l0.290,-2.904l2.033,0.580l1.163,-2.322l0.292,-1.162l1.453,-2.323l0.000,-1.742l3.489,-1.742l2.034,0.290l-0.291,-1.452l0.871,-0.580l0.000,-1.162l1.455,0.000l0.873,1.452l1.161,0.580l0.291,2.324l-0.291,2.032l-2.615,2.323l-0.290,3.484l2.905,-0.580l0.873,2.614l1.743,0.580l-0.872,2.033l2.035,1.162l1.163,0.580l2.035,-0.870l0.000,1.161l-2.326,1.742l-0.581,1.162l1.454,-0.580z",
                        "MN" : "M715.327,95.356l2.907,-0.582l5.232,-2.323l4.069,-1.161l2.616,0.871l2.908,0.000l1.741,1.162l2.617,0.290l4.071,0.581l2.617,-2.033l-1.163,-1.453l2.907,-2.902l3.196,1.161l2.327,0.290l3.488,0.580l0.290,2.324l4.069,1.162l2.617,-0.582l3.487,-0.290l2.618,0.290l2.615,1.162l1.743,1.453l2.616,0.000l3.490,0.581l2.616,-0.872l3.488,-0.291l4.070,-2.033l1.745,0.291l1.452,0.871l3.197,-0.290l-1.453,2.324l-1.744,2.612l0.581,1.162l1.455,-0.290l2.904,0.290l2.036,-0.872l2.327,0.872l2.325,1.742l-0.291,1.161l-2.034,-0.289l-4.071,0.289l-2.035,0.872l-2.034,1.742l-4.069,1.162l-2.909,1.451l-2.614,-0.580l-1.745,-0.290l-1.454,1.742l0.873,1.162l0.581,0.871l-2.033,0.871l-1.745,1.452l-3.199,0.871l-4.359,0.289l-4.361,0.873l-3.197,1.451l-1.163,-0.870l-3.489,0.000l-4.069,-1.743l-2.615,-0.291l-3.781,0.291l-5.522,-0.580l-3.196,0.000l-1.456,-1.453l-1.163,-2.613l-1.743,-0.291l-3.488,-1.742l-3.778,-0.290l-3.198,-0.581l-0.873,-1.162l0.873,-3.194l-1.746,-2.323l-4.067,-0.872l-2.326,-1.451l0.581,2.032z",
                        "MR" : "M440.34,190.602l-2.034,-1.742l-1.454,-2.033l-2.034,-0.580l-1.163,-0.872l-1.454,0.000l-1.452,0.581l-1.456,-0.291l-0.871,0.872l-0.290,-1.453l0.871,-1.451l0.290,-2.614l-0.290,-2.613l-0.291,-1.453l0.291,-1.161l-0.871,-1.452l-1.454,-1.161l0.582,-0.871l11.046,0.000l-0.581,-4.066l0.581,-1.451l2.615,0.000l0.000,-7.261l9.011,0.290l0.000,-4.355l10.176,6.679l-4.070,0.291l1.161,11.615l1.454,11.906l0.582,0.291l-0.582,2.032l-11.046,0.000l-0.581,0.581l-1.161,0.000l-1.455,0.580l-1.744,-0.871l-0.872,0.000l-0.583,1.743l0.871,-0.290z",
                        "MW" : "M568.822,262.618l-0.582,2.032l0.582,3.776l1.165,-0.291l0.871,0.871l1.163,2.034l0.289,3.483l-1.163,0.581l-0.871,2.032l-1.744,-1.742l-0.292,-2.032l0.582,-1.161l-0.290,-1.161l-0.873,-0.582l-0.871,0.291l-1.455,-1.454l-1.452,-0.580l0.580,-2.612l0.872,-0.873l-0.290,-2.323l0.290,-2.322l0.582,-0.582l-0.582,-2.322l-1.452,-1.452l2.907,0.581l0.289,0.871l1.163,1.161l-0.582,-3.776z",
                        "MX" : "M206.341,159.82l-1.163,2.324l-0.291,2.033l-0.290,3.774l-0.291,1.162l0.581,1.743l0.872,1.161l0.582,2.033l1.744,2.323l0.581,1.452l1.163,1.451l2.906,0.582l1.163,1.161l2.326,-0.871l2.034,-0.290l2.035,-0.291l1.745,-0.581l1.743,-1.161l0.872,-1.452l0.000,-2.323l0.582,-0.871l2.034,-0.581l2.908,-0.872l2.324,0.291l1.745,-0.291l0.582,0.582l0.000,1.161l-1.454,1.742l-0.873,1.742l0.582,0.581l-0.291,1.162l-0.872,2.033l-0.582,-0.581l-0.581,0.000l-0.580,0.000l-0.872,1.742l-0.582,-0.580l-0.290,0.290l0.000,0.290l-2.617,0.000l-2.615,0.000l0.000,1.743l-1.163,0.000l0.872,0.870l1.162,0.581l0.291,0.581l0.582,0.291l-0.292,0.871l-3.487,0.000l-1.164,2.033l0.291,0.580l-0.291,0.581l0.000,0.871l-3.197,-2.903l-1.454,-0.872l-2.325,-0.870l-1.453,0.290l-2.325,1.161l-1.163,0.291l-2.035,-0.872l-2.035,-0.580l-2.617,-1.162l-2.034,-0.291l-3.198,-1.451l-2.325,-1.161l-0.582,-0.872l-1.453,0.000l-2.906,-0.871l-1.163,-1.453l-2.907,-1.451l-1.454,-1.742l-0.581,-1.453l0.872,-0.290l-0.291,-0.581l0.582,-0.871l0.000,-0.871l-0.873,-1.161l-0.290,-1.162l-0.872,-1.452l-2.325,-2.614l-2.908,-2.322l-1.453,-1.453l-2.325,-1.161l-0.290,-0.872l0.290,-1.451l-1.454,-0.871l-1.453,-1.162l-0.872,-2.032l-1.454,-0.291l-1.453,-1.452l-1.454,-1.161l0.000,-0.871l-1.453,-2.033l-1.162,-2.324l0.290,-0.870l-2.035,-1.162l-0.872,0.000l-1.744,-0.581l-0.290,1.162l0.290,1.161l0.290,2.034l0.872,1.161l2.036,2.032l0.581,0.581l0.291,0.290l0.581,0.872l0.291,0.000l0.581,1.742l0.872,0.580l0.581,1.162l1.745,1.162l0.872,2.613l0.872,1.162l0.872,1.452l0.000,1.452l1.453,0.000l0.872,1.160l1.164,1.454l0.000,0.290l-1.164,1.161l-0.581,0.000l-0.581,-1.742l-2.035,-1.452l-1.744,-1.453l-1.454,-0.580l0.000,-2.033l-0.291,-1.452l-1.453,-0.870l-1.744,-1.453l-0.581,0.581l-0.582,-0.871l-1.743,-0.581l-1.745,-1.742l0.291,0.000l1.163,0.000l1.162,-0.872l0.000,-1.451l-2.034,-1.742l-1.744,-0.871l-0.873,-1.742l-1.162,-1.744l-1.163,-2.322l-1.163,-2.323l3.198,-0.291l3.487,-0.290l-0.290,0.581l4.070,1.452l6.395,1.742l5.232,0.000l2.326,0.000l0.000,-1.162l4.650,0.000l1.163,1.162l1.453,0.871l1.454,1.162l0.872,1.451l0.872,1.453l1.454,0.871l2.325,0.871l1.744,-2.323l2.035,0.000l2.034,1.161l1.454,1.742l0.872,1.742l1.744,1.452l0.582,2.033l0.581,1.162l2.326,0.871l1.744,0.580l-1.163,0.000z",
                        "MY" : "M751.953,213.833l0.29,1.451l1.744-0.289l0.873-1.162l0.582,0.29l1.741,1.743l1.165,1.741l0.29,1.743l-0.29,1.452v0.87l0.29,1.453l0.871,0.871l1.162,2.322v1.162h-2.033l-2.616-2.033l-3.195-2.032l-0.295-1.452l-1.452-1.743l-0.581-2.322l-0.871-1.452l0.289-2.031l-0.58-1.162l0.291-0.582L751.953,213.833zM800.205,218.769l-2.034,0.871l-2.325-0.58h-3.198l-0.871,3.193l-1.163,0.872l-1.452,3.774l-2.036,0.581l-2.615-0.581l-1.454,0.291l-1.453,1.16h-1.744l-1.744,0.581l-2.033-1.741l-0.584-1.743l2.036,0.871l2.325-0.581l0.581-2.322l1.163-0.29l3.197-0.581l2.036-2.324l1.162-1.741l1.453,1.451l0.58-0.87h1.163l0.291-1.743v-1.451l2.327-1.743l1.161-2.322h1.162l1.455,1.452v1.162l2.034,0.869l2.325,0.872l-0.29,0.872l-1.744,0.289L800.205,218.769z",
                        "MZ" : "M568.822,262.618l2.036,-0.292l3.486,0.872l0.581,-0.291l2.036,-0.289l0.872,-0.581l1.746,0.000l2.907,-1.162l2.323,-1.452l0.292,1.162l0.000,2.613l0.289,2.614l0.000,4.064l0.584,1.453l-0.873,2.033l-0.873,1.742l-1.742,1.742l-2.618,1.161l-3.199,1.163l-2.905,3.194l-1.163,0.290l-2.036,2.033l-1.162,0.580l0.000,2.034l1.162,2.032l0.582,1.741l0.000,0.874l0.581,-0.292l-0.291,2.614l-0.290,1.451l0.581,0.290l-0.291,1.162l-1.161,1.161l-2.327,0.873l-3.198,1.451l-1.452,1.162l0.289,1.161l0.873,0.000l-0.291,1.452l-2.034,0.000l-0.291,-1.162l-0.580,-1.161l0.000,-1.162l0.290,-2.904l-0.582,-2.033l-1.452,-3.774l2.904,-3.195l0.874,-2.033l0.289,-0.290l0.293,-1.452l-0.293,-0.870l0.000,-2.033l0.582,-2.032l0.000,-3.486l-1.452,-0.871l-1.163,-0.289l-0.582,-0.582l-1.452,-0.581l-2.325,0.000l0.000,-0.870l-0.292,-2.033l8.429,-2.325l1.455,1.454l0.871,-0.291l0.873,0.582l0.290,1.161l-0.582,1.161l0.292,2.032l1.744,1.742l0.871,-2.032l1.163,-0.581l-0.289,-3.483l-1.163,-2.034l-0.871,-0.871l-1.165,0.291l-0.582,-3.776l-0.582,2.032z",
                        "NA" : "M518.825,309.661l-2.036,-2.325l-1.163,-2.033l-0.579,-2.613l-0.584,-2.032l-1.161,-4.065l0.000,-3.485l-0.291,-1.452l-1.163,-1.162l-1.454,-2.034l-1.452,-3.483l-0.582,-1.743l-2.034,-2.613l-0.291,-2.033l1.452,-0.581l1.455,-0.581l1.743,0.292l1.745,1.161l0.581,-0.291l11.047,0.000l2.033,1.162l6.396,0.582l5.232,-1.162l2.326,-0.582l1.745,0.000l0.871,0.582l0.290,0.289l-1.743,0.582l-0.874,0.000l-1.744,1.162l-0.871,-1.162l-4.361,0.871l-2.033,0.291l0.000,9.582l-2.908,0.289l0.000,7.843l0.000,10.163l-2.326,1.451l-1.452,0.290l-1.744,-0.581l-1.162,-0.290l-0.582,-1.162l-1.163,-0.580l1.163,-1.453z",
                        "NC" : "M930.142,289.042l2.325,1.452l1.452,1.454l-1.162,0.579l-1.453,-0.871l-2.036,-1.162l-1.744,-1.452l-1.742,-1.741l-0.582,-1.162l1.161,0.000l1.745,1.162l1.162,0.870l-0.874,-0.871z",
                        "NCY" : "M563.881,134.267l0.289,0.000l0.291,-0.581l2.035,0.000l2.326,-0.871l-1.745,1.162l0.293,0.580l-0.293,0.000l-0.581,0.000l-0.581,0.000l-0.290,-0.290l-0.582,0.000l-0.582,0.290l0.580,0.290z",
                        "NE" : "M479.583,198.151l0.291,-2.032l-3.198,-0.581l-0.291,-1.161l-1.453,-2.033l-0.292,-1.162l0.292,-1.161l1.744,-0.291l0.872,-0.870l3.778,-0.291l2.326,-0.580l0.291,-1.452l1.452,-2.034l0.000,-6.097l4.070,-1.453l7.849,-5.227l9.592,-5.226l4.361,1.161l1.452,1.452l2.036,-1.162l0.581,4.357l1.164,0.871l0.000,0.871l1.163,0.871l-0.581,1.162l-1.164,5.517l-0.292,3.484l-3.486,2.614l-1.165,3.775l1.165,0.871l0.000,1.742l1.742,0.291l-0.289,1.161l-0.582,0.291l-0.292,0.871l-0.289,0.000l-2.036,-2.904l-0.580,-0.291l-2.327,1.453l-2.033,-0.581l-1.455,-0.291l-0.872,0.291l-1.453,0.000l-1.743,1.161l-1.455,0.000l-3.196,-1.161l-1.452,0.581l-1.165,0.000l-1.163,-1.162l-2.617,-0.872l-3.195,0.291l-0.582,0.581l-0.292,1.452l-0.871,1.161l-0.291,2.324l-2.034,-1.453l-0.874,0.000l1.161,-0.871z",
                        "NG" : "M497.023,217.898l-2.615,0.871l-1.164,0.000l-1.161,0.581l-2.037,0.000l-1.452,-1.743l-0.873,-2.032l-2.033,-1.742l-2.036,0.000l-2.615,0.000l0.289,-4.647l0.000,-1.741l0.581,-1.743l0.582,-0.871l1.454,-1.452l-0.291,-0.873l0.580,-1.160l-0.580,-1.453l0.000,-1.160l0.291,-2.324l0.871,-1.161l0.292,-1.452l0.582,-0.581l3.195,-0.291l2.617,0.872l1.163,1.162l1.165,0.000l1.452,-0.581l3.196,1.161l1.455,0.000l1.743,-1.161l1.453,0.000l0.872,-0.291l1.455,0.291l2.033,0.581l2.327,-1.453l0.580,0.291l2.036,2.904l0.289,0.000l1.163,0.871l-0.289,0.580l0.000,0.872l-2.326,2.323l-0.873,1.742l-0.289,1.452l-0.582,0.582l-0.581,1.742l-1.455,1.161l-0.581,1.452l-0.580,1.161l-0.291,1.162l-1.744,0.870l-1.746,-1.161l-0.871,0.000l-1.743,1.743l-0.872,0.000l-1.164,2.614l0.872,-2.032z",
                        "NI" : "M237.734,200.475l-0.872,-0.871l-1.163,-1.162l-0.581,-0.871l-1.163,-0.871l-1.454,-1.162l0.291,-0.580l0.291,0.580l0.291,-0.290l0.872,0.000l0.291,-0.871l0.581,0.000l-0.290,-1.162l0.871,-0.291l0.582,0.291l0.581,-0.871l0.581,0.580l0.291,-0.289l0.581,-0.291l1.163,-0.871l0.000,-0.581l0.291,0.000l0.291,-0.580l0.291,0.000l0.290,0.290l0.582,0.000l0.581,-0.290l0.872,0.000l0.872,-0.291l0.291,-0.291l1.162,0.000l-0.291,0.291l-0.290,0.581l0.290,0.871l-0.582,1.162l-0.289,0.870l0.000,1.453l0.000,0.580l0.289,1.162l-0.580,0.290l-0.291,1.161l0.291,0.872l-0.581,0.581l0.000,0.871l0.581,0.290l-0.581,0.581l-0.872,0.000l-0.583,-0.581l-0.871,-0.290l-0.581,0.290l-1.745,-0.581l0.581,-0.291z",
                        "NL" : "M490.628,83.74l2.035,0.000l0.581,1.161l-0.581,2.323l-0.871,1.162l-1.454,0.000l0.290,2.904l-1.452,-0.582l-1.745,-1.451l-2.617,0.580l-2.034,0.000l1.452,-0.870l2.618,-4.066l-3.778,1.161z",
                        "NO" : "M551.381,35.246l8.43,2.032l-3.488,0.582l3.198,1.742l-4.942,1.161l-2.034,0.29l1.161-2.032l-3.486-1.162l-4.362,1.162l-1.452,2.032l-2.615,1.162l-2.907-0.581h-3.488l-3.198-1.452l-1.453,0.581l-1.744,0.29l-0.582,1.743l-5.231-0.291l-0.582,1.452h-2.615l-1.745,2.033l-2.906,2.903l-4.361,3.775l1.165,1.162l-0.873,0.872h-2.907l-1.744,2.613l0.29,3.775l1.743,1.162l-1.162,3.484l-2.033,1.742l-1.455,1.742l-1.742-1.742l-5.524,3.194l-3.488,0.582l-3.778-1.452l-1.163-2.905l-0.871-6.387l2.615-1.743l7.268-2.323l5.523-2.904l4.941-3.774l6.685-5.228l4.651-2.033l7.559-3.484l5.813-1.162h4.651l4.069-2.324l5.231,0.291L551.381,35.246zM541.79,16.951l-6.105,1.162l-4.941-0.87l2.036-0.582l-1.747-0.872l5.814-0.58l0.873,1.161L541.79,16.951zM524.058,11.724l9.01,2.033l-6.977,1.162l-1.452,2.032l-2.325,0.581l-1.455,2.324h-3.196l-6.104-1.743l2.615-0.87l-4.069-0.873l-5.523-2.323l-2.036-2.033l7.56-1.162l1.454,1.162l3.777-0.291l1.163-0.871h4.07L524.058,11.724zM543.823,9.692l5.522,1.161l-4.358,1.452l-7.849,0.29l-8.14-0.581l-0.582-0.58h-3.777l-3.199-1.453l8.722-0.58l3.778,0.58l2.906-0.871L543.823,9.692z",
                        "NP" : "M716.198,154.304l0.000,1.161l0.291,1.742l-0.291,1.162l-2.326,0.000l-3.197,-0.581l-2.325,-0.290l-1.453,-1.452l-3.779,-0.291l-3.490,-1.742l-2.614,-1.161l-2.908,-1.162l1.163,-2.613l1.745,-1.161l1.162,-0.582l2.326,0.871l2.616,1.742l1.454,0.291l1.162,1.452l2.034,0.581l2.326,1.162l2.906,0.580l-3.198,-0.291z",
                        "NZ" : "M949.907,343.345l0.873,1.161l1.745-1.161l0.87,1.161v1.161l-0.87,1.452l-2.036,2.033l-1.163,1.161l0.873,1.162h-2.034l-2.327,1.162l-0.871,1.74l-1.455,2.904l-2.323,1.161l-1.165,0.871l-2.615-0.289l-1.742-0.872h-3.198l-0.292-1.162l1.453-2.033l3.49-2.613l1.744-0.58l2.034-1.16l2.325-1.452l1.744-1.453l1.162-2.032l0.872-0.58l0.58-1.452l1.745-1.451L949.907,343.345zM954.559,330.277l1.743,2.904l0.292-1.743l1.16,0.58l0.293,2.324l2.324,0.872h1.745l1.743-0.872l1.453,0.289l-0.871,2.326l-0.873,1.74h-2.033l-0.582,0.581v1.452l-0.289,0.291l-1.165,1.452l-1.163,2.032l-2.325,1.161l-0.29-0.87l-1.162-0.291l1.452-2.322l-0.871-1.453l-2.907-1.16v-0.873l2.035-1.159l0.58-2.034l-0.289-1.743l-1.164-1.743l0.292-0.58l-1.454-1.161l-2.034-2.323l-1.162-2.032l0.87-0.291l1.455,1.453l2.325,0.87L954.559,330.277z",
                        "OM" : "M635.678,172.888l-0.871,1.742h-1.163l-0.58,0.581l-0.582,1.452l0.29,1.742l-0.29,0.581l-1.163-0.29l-1.744,1.162l-0.291,1.452l-0.58,0.581h-1.743l-1.165,0.582v1.162l-1.163,0.581l-1.452-0.291l-2.034,1.162h-1.163l-0.873-1.743l-2.325-4.645l8.431-2.613l1.745-5.519l-1.165-2.032v-1.162l0.873-1.162v-1.161l1.162-0.581l-0.581-0.291l0.289-1.742h1.456l1.161,1.742l1.745,1.161l2.036,0.291l1.45,0.581l1.165,1.452l0.871,0.872l0.872,0.58v0.582l-0.872,1.451l-0.582,0.872L635.678,172.888zM628.995,159.82l-0.291,0.291l-0.583-0.871l0.874-0.872l0.289,0.291L628.995,159.82z",
                        "PA" : "M259.244,211.219l-0.872,-0.871l-0.580,-1.452l0.872,-0.871l-0.872,-0.290l-0.582,-0.871l-1.163,-0.581l-1.162,0.000l-0.582,1.162l-1.162,0.580l-0.582,0.000l-0.291,0.581l1.163,1.451l-0.581,0.581l-0.582,0.291l-1.163,0.290l-0.581,-1.742l-0.291,0.291l-0.872,0.000l-0.581,-1.162l-1.163,-0.291l-0.580,-0.290l-1.164,0.000l-0.291,0.581l-0.290,-0.291l0.290,-0.580l0.291,-0.582l-0.291,-0.289l0.583,-0.581l-0.583,-0.291l0.000,-1.161l0.872,-0.291l1.163,1.162l0.000,0.581l0.872,0.000l0.291,-0.291l0.872,0.872l1.163,-0.291l1.163,-0.581l1.744,-0.579l0.872,-0.873l1.744,0.000l-0.291,0.291l1.745,0.291l1.163,0.291l0.871,0.870l0.872,0.870l-0.290,0.292l0.872,1.741l-0.582,0.871l-0.872,-0.289l0.582,-1.451z",
                        "PE" : "M282.208,279.17l-0.872,1.451l-1.163,0.872l-2.905,-1.743l-0.292,-1.162l-5.232,-2.613l-4.942,-3.195l-2.325,-1.451l-1.163,-2.323l0.581,-0.871l-2.326,-3.485l-2.905,-5.227l-2.326,-5.517l-1.163,-1.161l-0.872,-2.033l-2.325,-1.743l-1.745,-1.161l0.872,-1.162l-1.453,-2.613l0.872,-2.033l2.326,-1.742l0.291,1.160l-0.873,0.582l0.000,1.162l1.163,-0.290l1.163,0.290l1.162,1.451l1.454,-1.162l0.582,-1.742l1.744,-2.613l3.196,-0.871l3.198,-2.904l0.872,-1.741l-0.581,-2.324l0.872,-0.291l1.744,1.452l0.872,1.163l1.163,0.870l1.744,2.903l2.035,0.291l1.453,-0.870l1.164,0.579l1.452,-0.290l2.326,1.452l-1.744,2.613l0.582,0.290l1.452,1.454l-2.324,-0.290l-0.583,0.580l-2.033,0.289l-3.198,2.034l-0.291,1.161l-0.581,1.162l0.290,1.451l-1.744,0.581l0.000,1.162l-0.872,0.581l1.163,2.614l1.744,1.451l-0.581,1.451l1.744,0.000l0.872,1.453l2.616,0.000l2.326,-1.453l-0.292,4.066l1.163,0.292l1.744,-0.292l2.326,4.355l-0.582,0.873l-0.290,2.033l0.000,2.323l-1.163,1.452l0.582,0.872l-0.582,0.869l1.163,2.324l1.745,-2.904z",
                        "PG" : "M902.817,249.55l-0.873,0.29l-1.163-0.871l-1.162-1.742l-0.581-2.032l0.581-0.289l0.29,0.579l0.583,0.872l1.452,1.741l1.163,0.871L902.817,249.55zM892.063,246.065l-1.455,0.292l-0.29,0.58l-1.454,0.871l-1.452,0.582h-1.452l-2.328-0.872l-1.453-0.872v-0.871l2.616,0.582l1.454-0.292l0.289-1.159l0.582-0.293l0.292,1.452h1.452l0.873-1.159l1.452-0.873l-0.289-1.741h1.741l0.584,0.58l-0.291,1.452L892.063,246.065zM878.982,251.292l2.326,1.742l1.741,2.904h1.745v1.16l2.035,0.582l-0.87,0.291l2.904,1.16l-0.29,0.871l-1.744,0.292l-0.87-0.872l-2.328-0.291l-2.616-0.29l-2.325-1.743l-1.452-1.451l-1.454-2.613l-3.488-1.161l-2.326,0.871l-1.744,0.871l0.292,2.032l-2.034,0.871l-1.744-0.29l-2.617-0.29l-0.29-9.002v-8.712l4.94,1.742l4.941,1.451l2.036,1.453l1.452,1.452l0.292,1.741l4.649,1.743l0.583,1.451l-2.328,0.291L878.982,251.292zM895.259,243.451l-0.873,0.582l-0.582-1.741l-0.579-0.873l-1.162-0.87l-1.455-1.162l-2.034-0.871l0.579-0.58l1.455,0.58l1.163,0.581l1.163,0.871l0.87,1.161l1.165,0.871L895.259,243.451z",
                        "PH" : "M821.715,207.735l0.292,2.033v1.451l-0.872,2.322l-0.871-2.612l-1.454,1.452l0.871,2.033l-0.871,1.16l-3.199-1.452l-0.581-2.032l0.874-1.452l-1.745-1.161l-0.873,1.161l-1.452-0.29l-2.034,1.742l-0.292-0.871l0.871-2.323l1.744-0.871l1.455-0.872l1.163,1.162l2.035-0.87l0.29-1.162h2.033v-2.323l2.036,1.453l0.29,1.451L821.715,207.735zM815.03,202.798l-0.871,0.87l-0.873,1.744l-0.871,0.579l-1.744-1.741l0.582-0.871l0.581-0.581l0.289-1.743l1.455-0.29l-0.292,2.033l2.036-2.614L815.03,202.798zM799.916,205.413l-3.488,2.612l1.163-2.033l2.034-1.741l1.743-1.744l1.454-2.902l0.291,2.322l-1.745,1.453L799.916,205.413zM809.216,198.151l1.743,0.872h1.745v1.161l-1.452,1.162l-1.745,0.871v-1.162l0.292-1.451L809.216,198.151zM819.099,197.571l0.874,2.904l-2.036-0.582v0.872l0.581,1.741l-1.162,0.582l-0.29-2.033h-0.584l-0.578-1.742l1.743,0.291v-1.162l-1.743-2.033h2.614L819.099,197.571zM808.344,194.958l-0.873,2.323l-1.161-1.162l-1.454-2.323l2.615,0.291L808.344,194.958zM807.764,180.148l1.743,0.581l0.871-0.581v0.581l-0.289,1.162l0.87,2.033l-0.581,2.324l-1.744,0.87l-0.29,2.323l0.582,2.033l1.452,0.29l1.165-0.29l3.486,1.451l-0.289,1.743l0.87,0.581l-0.289,1.161l-2.036-1.161l-1.163-1.452l-0.579,0.871l-1.744-1.743l-2.617,0.581l-1.454-0.581l0.291-1.162l0.873-0.871l-0.873-0.58l-0.291,1.162l-1.453-1.743l-0.29-1.161l-0.291-2.613l1.162,0.871l0.292-4.355l0.871-2.324H807.764z",
                        "PK" : "M680.735,128.75l2.036,1.451l0.870,2.033l4.361,1.162l-2.617,2.323l-3.196,0.290l-4.069,-0.581l-1.453,1.162l1.160,2.324l0.874,2.032l2.325,1.161l-2.325,1.743l0.000,2.032l-2.618,2.614l-1.745,2.904l-2.904,2.904l-3.199,-0.291l-3.197,2.904l1.745,1.162l0.579,2.032l1.455,1.451l0.583,2.324l-6.106,0.000l-1.745,2.033l-2.033,-0.871l-0.873,-2.033l-2.034,-2.033l-5.234,0.580l-4.360,0.000l-4.068,0.291l1.161,-3.193l4.070,-1.162l-0.290,-1.452l-1.453,-0.291l0.000,-2.613l-2.617,-1.162l-1.162,-1.742l-1.453,-1.452l4.649,1.452l2.907,-0.291l1.455,0.291l0.581,-0.580l2.035,0.289l3.488,-1.161l0.291,-2.323l1.452,-1.742l2.034,0.000l0.292,-0.581l2.036,-0.290l1.160,0.000l0.875,-0.580l0.000,-1.743l1.162,-1.743l1.742,-0.580l-1.161,-1.743l2.616,0.000l0.872,-0.871l-0.289,-1.162l1.450,-1.161l-0.289,-1.452l-0.581,-1.162l1.454,-1.161l3.197,-0.580l2.907,-0.291l1.454,-0.581l-1.743,0.290z",
                        "PL" : "M515.047,90.418l-1.165,-1.742l0.292,-0.870l-0.581,-1.452l-1.163,-1.162l0.872,-0.581l-0.583,-1.452l1.744,-0.870l4.362,-1.163l3.489,-1.161l2.614,0.581l0.291,0.580l2.617,0.291l3.489,0.290l4.940,-0.290l1.454,0.290l0.582,0.872l0.289,1.452l0.582,0.870l0.000,1.161l-1.453,0.582l0.871,1.162l0.000,1.161l1.455,2.614l-0.292,0.580l-1.452,0.580l-2.617,2.033l0.872,1.452l-0.582,-0.289l-2.616,-1.163l-2.033,0.582l-1.455,-0.291l-1.453,0.581l-1.455,-1.163l-1.160,0.582l0.000,-0.291l-1.454,-1.161l-2.034,-0.290l-0.290,-0.872l-1.746,-0.290l-0.581,0.580l-1.454,-0.580l0.293,-0.580l-2.036,-0.291l1.453,0.872z",
                        "PR" : "M291.219,180.148l1.455,0.000l0.581,0.581l-0.872,0.871l-2.035,0.000l-1.453,0.000l-0.291,-1.162l0.582,-0.290l-2.033,0.000z",
                        "PS" : "M571.728,141.816l0.000,1.743l-0.581,0.871l-1.160,0.291l0.000,-0.581l0.871,-0.581l-0.871,-0.289l0.578,-1.743l-1.163,-0.289z",
                        "PT" : "M448.769,115.683l1.163,-0.581l1.163,-0.291l0.581,1.162l1.744,0.000l0.291,-0.290l1.746,0.000l0.581,1.452l-1.163,0.870l0.000,2.033l-0.582,0.291l0.000,1.451l-1.162,0.291l1.162,1.452l-0.873,2.032l0.873,0.581l-0.291,0.871l-0.871,0.871l0.000,1.162l-0.874,0.581l-1.452,-0.290l-1.454,0.290l0.292,-2.324l-0.292,-1.451l-1.163,-0.291l-0.581,-1.162l0.291,-1.742l0.871,-1.160l0.292,-0.873l0.582,-1.741l0.000,-1.162l-0.582,-0.871l0.292,1.161z",
                        "PY" : "M301.103,292.237l1.163,-3.485l0.000,-1.451l1.453,-2.324l4.652,-0.871l2.616,0.000l2.615,1.451l0.000,0.871l0.872,1.452l-0.291,3.776l2.907,0.581l1.163,-0.581l2.035,0.871l0.291,0.581l0.291,2.613l0.290,1.162l1.163,0.000l0.872,-0.290l1.163,0.290l0.000,1.741l-0.292,1.454l-0.580,1.742l-0.582,2.322l-2.325,2.032l-2.326,0.581l-3.197,-0.581l-2.617,-0.580l2.617,-4.354l-0.291,-1.162l-2.906,-1.161l-3.198,-2.034l-2.326,-0.290l5.232,4.356z",
                        "QA" : "M613.587,162.725l0.000,-1.743l0.582,-1.452l0.873,-0.290l0.871,0.871l0.000,1.451l-0.581,1.744l-0.872,0.000l0.873,0.581z",
                        "RO" : "M536.265,99.13l1.163,-0.581l1.744,0.581l1.745,0.000l1.163,0.581l1.162,-0.581l2.036,-0.291l0.579,-0.580l1.163,0.000l0.873,0.290l0.871,0.872l0.873,1.162l1.453,1.742l0.291,1.161l-0.291,1.161l0.291,1.163l1.452,0.580l1.166,-0.580l1.161,0.580l0.289,0.581l-1.450,0.581l-0.874,0.000l-0.872,3.194l-1.454,-0.290l-2.035,-0.872l-3.196,0.581l-1.452,0.581l-4.071,0.000l-2.035,-0.581l-1.164,0.291l-0.581,-1.162l-0.581,-0.581l0.581,-0.291l-0.581,-0.289l-0.871,0.580l-1.745,-0.872l-0.289,-1.161l-1.454,-0.580l-0.293,-0.872l-1.741,-1.161l2.325,-0.581l1.742,-1.741l1.164,-2.034l-1.743,0.581z",
                        "RS" : "M531.325,106.1l1.454,0.580l0.289,1.161l1.745,0.872l0.871,-0.580l0.581,0.289l-0.581,0.291l0.581,0.581l-0.871,0.581l0.290,1.161l1.454,1.162l-1.164,0.871l-0.580,0.871l0.290,0.289l-0.290,0.292l-1.165,0.000l-1.161,0.290l0.000,-0.290l0.290,-0.292l0.292,-0.580l-0.292,0.000l-0.579,-0.580l-0.583,0.000l-0.290,-0.581l-0.581,-0.290l-0.293,-0.291l-0.581,0.291l-0.289,0.871l-0.582,0.000l0.290,0.000l-1.162,-0.581l-0.872,-0.290l-0.290,-0.581l-0.873,-0.290l0.581,-0.291l0.582,-1.161l-1.455,-1.162l0.581,-1.161l-0.871,0.000l1.163,-0.872l-0.873,-0.870l-0.871,-1.163l2.326,-0.580l1.455,0.000l1.741,1.161l-0.293,-0.872z",
                        "RU" : "M869.098,91.29l2.907,4.936l-4.07-0.87l-1.743,4.065l2.614,2.613v2.033l-2.034-1.743l-1.743,2.323l-0.582-2.323l0.292-2.904l-0.292-2.904l0.582-2.033v-3.775l-1.454-2.613l0.291-3.774l2.326-1.162l-0.872-1.452l1.163-0.29l0.58,1.742l1.162,2.614l-0.29,2.903L869.098,91.29zM536.265,81.417l-4.94,0.29l-3.488-0.29l0.58-1.452l3.779-0.872l2.906,0.581l1.454,0.291l-0.582,0.871L536.265,81.417zM969.382,36.116l-3.196,0.291l-0.581-0.871l3.777-1.162h-0.01l0.58-0.29h2.326l3.779,0.872v0.29l-2.907,0.871h-3.778H969.382zM869.098,29.728h-4.069l-5.814-0.29l-0.582-0.29l2.618-1.162h3.488l4.067,0.872L869.098,29.728zM888.574,24.501l-3.198,1.162l-4.36-0.291l-4.942-1.16l0.582-0.873l5.232,0.291L888.574,24.501zM873.167,23.049l-2.324,2.033h-9.884l-4.651,0.58l-5.521-1.742l1.454-1.742l3.778-0.582h7.266L873.167,23.049zM632.19,36.407l-1.743,0.291l-9.012-0.291l-0.581-1.161l-4.941-0.872l-0.581-1.452l2.907-0.582V30.89l5.232-2.323l-2.325-0.291l6.393-2.613l-0.578-1.162l6.104-1.452l9.011-1.742l9.3-0.581l4.653-0.871l5.23-0.581l2.036,1.162l-1.745,0.871l-9.883,1.452l-8.43,1.162l-8.43,2.613l-4.069,2.614l-4.361,2.904l0.584,2.033L632.19,36.407zM969.382,52.379h-0.291l-3.486,1.161l-3.488-0.29l2.615,1.452l1.454,2.323l1.455,0.58l0.289,1.162l-0.873,0.872l-4.94-0.582l-7.849,2.033l-2.325,0.291l-4.362,2.033l-4.069,1.742l-0.871,1.161l-4.069-2.033l-6.977,2.324l-1.452-1.162l-2.618,1.162l-3.488-0.291l-0.871,1.742l-3.486,2.613l0.29,1.162l2.906,0.582l-0.291,4.064h-2.615l-1.163,2.324l1.163,1.161l-4.651,1.452l-1.163,3.194l-4.07,0.582l-0.87,2.903l-3.781,2.613l-1.162-2.032l-1.163-3.775l-1.454-6.389l1.164-3.775l2.324-1.453l0.291-1.451l4.36-0.581l4.942-3.484l4.649-2.904l4.943-2.033l2.326-3.775h-3.489l-1.744,2.324l-6.977,3.194l-2.034-3.485l-7.269,0.872l-6.975,4.646l2.325,1.742l-6.105,0.58l-4.359,0.291l0.291-2.032l-4.358-0.292l-3.199,1.453l-8.431-0.581l-9.01,0.871l-9.013,5.227l-10.463,6.679l4.357,0.29l1.165,1.743l2.615,0.581l1.744-1.452l3.196,0.291l3.78,2.904l0.29,2.323l-2.326,2.904v3.194l-1.452,4.356l-4.07,4.066l-0.87,1.741l-3.781,3.194l-3.777,3.194l-1.744,1.742l-3.488,1.452l-1.744,0.291l-1.744-1.453l-3.78,2.033l-0.579,0.871l-0.292-0.582v-1.161l1.454-0.291l0.29-3.194l-0.581-2.324l2.325-0.871l3.198,0.291l2.034-2.613l0.871-2.904l1.163-1.162l1.454-2.323l-4.651,0.871l-2.325,0.872h-4.361l-0.871-2.614l-3.488-1.742l-4.651-0.871l-1.16-2.904l-0.874-1.453l-0.871-1.161l-1.744-2.903l-2.617-1.162l-4.067-0.58h-3.491l-3.486,0.58l-2.325,1.162l1.452,0.871v1.452l-1.452,0.872l-2.328,2.903v1.162l-4.068,1.742l-3.197-1.162l-3.197,0.291l-1.452-0.871l-1.745-0.291l-4.069,2.033l-3.488,0.291l-2.616,0.872l-3.49-0.581h-2.615l-1.743-1.453l-2.615-1.162l-2.618-0.291l-3.486,0.291l-2.617,0.582l-4.069-1.162l-0.29-2.324l-3.488-0.58l-2.326-0.29l-3.196-1.162l-2.907,2.903l1.163,1.453l-2.617,2.033l-4.07-0.581l-2.617-0.29l-1.741-1.162h-2.908l-2.616-0.871l-4.068,1.161l-5.232,2.324l-2.907,0.582l-1.163,0.29l-1.454-1.742l-3.488,0.291l-1.163-1.162l-2.034-0.582l-1.16-1.452l-1.455-0.581l-4.069,0.872l-3.78-1.742l-1.453,1.451l-6.104-6.968l-3.488-2.033l0.871-0.871l-6.975,2.613h-2.617l0.29-1.451l-3.488-0.872l-2.906,0.581l-0.872-2.904l-4.941-0.581l-2.326,1.161l-6.977,1.162l-1.454,0.582l-10.172,0.872l-1.454,1.161l2.036,1.743l-2.617,0.87l0.581,0.581l-2.617,1.452l4.361,1.742l-0.581,1.453l-3.78-0.291l-0.871,0.872l-3.488-1.452l-4.36,0.29l-2.906,1.162l-3.488-1.162l-5.812-2.032h-4.361l-5.814,3.194l-0.289,2.033l-2.906-1.742l-2.036,3.195l0.58,0.29l-1.452,2.324l2.326,1.742h2.034l1.743,1.741l-0.289,1.453l1.452,0.581l-1.163,1.452l-2.906,0.581l-2.615,2.614l2.615,2.613l-0.289,2.032l2.906,3.194l-1.744,1.162l-0.29,0.581h-1.165l-2.033-1.743h-0.873l-1.745-0.871l-0.581-1.162l-2.614-0.58l-1.745,0.58l-0.581-0.58l-3.78-1.162l-3.778-0.581l-2.325-0.581l-0.581,0.581l-3.488-2.323l-3.197-1.161l-2.326-1.743l2.034-0.29l2.328-2.324l-1.455-1.162l4.07-1.162l-0.292-0.581l-2.323,0.581v-1.161l1.452-0.871l2.615-0.291l0.582-0.871l-0.582-1.452l1.163-1.451l-0.29-0.873l-4.07-0.871h-1.454l-1.744-1.162l-2.034,0.291l-3.488-0.871V91.29l-0.871-1.162h-2.327l-0.29-0.871l0.873-0.581l-1.744-1.742l-2.906,0.29h-0.872l-0.584,0.582h-1.16l-0.583-2.033l-0.871-0.872l0.581-0.291l2.326,0.291l1.163-0.58l-0.872-0.872l-2.036-0.581l0.292-0.29l-1.163-0.581l-1.743-1.742l0.578-0.871l-0.289-1.162l-2.615-0.581l-1.454,0.291l-0.29-0.872l-2.907-0.581l-0.871-1.742l-0.291-1.161l-1.455-0.582l1.163-0.871l-0.582-2.613l1.745-1.742l-0.291-0.291l3.199-1.742l-2.908-1.162l5.813-3.485l2.617-1.742l0.871-1.162l-4.069-2.032l1.162-1.742l-2.325-2.033l1.744-2.324l-3.198-3.194l2.617-2.033l-4.362-1.743l0.584-2.033l2.034-0.29l4.942-1.161l2.615-0.872l4.651,1.743l7.557,0.58l10.465,3.195l2.035,1.162v1.741l-2.906,1.453l-4.651,0.871l-12.21-2.033l-2.033,0.291l4.651,2.033v1.161l0.292,2.904l3.486,0.872l2.036,0.58l0.581-1.161l-1.746-1.162l1.746-1.162l6.685,1.742l2.326-0.581l-1.745-2.033l6.396-2.903l2.323,0.29l2.617,0.871l1.745-1.742l-2.326-1.742l1.163-1.742l-2.034-1.452l7.848,0.872l1.453,1.452l-3.489,0.289v1.453l2.326,1.162l4.361-0.582l0.581-2.033l5.812-1.161l9.594-2.323h2.034l-2.907,1.742l3.488,0.29l2.034-0.871h5.232l4.069-1.161l3.197,1.452l2.906-1.742l-2.906-1.453l1.454-1.162l8.14,0.872l3.778,0.871l10.176,3.194l1.742-1.452l-2.907-1.452v-0.581l-3.197-0.291l0.874-1.162l-1.455-2.323v-0.871l4.943-2.323l1.742-2.613l2.035-0.582l7.268,0.872l0.581,1.451l-2.615,2.324l1.743,0.871l0.872,1.742l-0.581,3.775l3.198,1.743l-1.165,1.742l-5.521,4.066l3.197,0.29l1.161-0.871l2.907-0.872l0.874-1.161l2.325-1.453l-1.744-1.452l1.454-1.742l-3.198-0.291l-0.582-1.451l2.326-2.904l-3.778-2.324l4.94-1.741l-0.581-2.033h1.453l1.454,1.452l-1.163,2.613l2.907,0.581l-1.162-2.033l4.65-0.872l5.522-0.29l5.232,1.451l-2.617-2.032l-0.29-3.195l4.94-0.291h6.688l5.812-0.29l-2.324-1.451l3.197-1.743l3.197-0.29l5.521-1.162l7.27-0.58l0.872-0.582l7.268-0.291l2.325,0.582l6.104-1.452h4.94l0.873-1.161l2.615-1.162l6.396-1.161l4.651,0.87l-3.489,0.872l6.104,0.291l0.874,1.452l2.324-0.871h8.141l6.104,1.452l2.325,1.162l-0.873,1.451l-2.907,0.581l-7.267,1.743l-2.036,0.581l3.49,0.58l4.068,0.581l2.326-0.581l1.452,1.743l1.165-0.581l4.359-0.582l9.013,0.582l0.579,1.161l11.628,0.582v-2.033l5.814,0.291h4.359l4.651,1.451l1.163,1.742l-1.745,1.162l3.488,2.323l4.36,1.161l2.615-2.904l4.653,1.162l4.65-0.871l5.233,0.871l2.034-0.581l4.648,0.29l-2.033-2.614l3.488-1.161l24.998,1.741l2.327,1.743l7.267,2.032l11.045-0.581l5.524,0.581l2.324,1.162l-0.58,2.033l3.486,0.581l3.78-0.581h4.941l4.94,0.581l5.234-0.29l4.938,2.323l3.488-0.872l-2.322-1.742l1.162-1.162l8.721,0.872l5.812-0.292l7.848,1.453l4.069,1.162h-0.01l6.976,2.033l6.977,2.614v1.742l1.744,0.871l-0.581-2.033l7.559,0.291l5.231,2.613l-2.616,1.162l-4.651,0.29v2.613l-1.161,0.581h-2.617l-2.034-0.871l-3.779-0.871l-0.582-1.162l-2.615-0.58l-3.199,0.58l-1.452-1.162l0.581-0.872l-3.198,0.582l1.165,1.452l-1.745,1.162H969.382zM762.998,15.499l-15.406,1.162l4.94-3.484l2.328-0.291h2.034l6.977,1.742L762.998,15.499zM614.46,9.401l-3.488,0.291l-2.617,0.29l-0.289,0.581l-3.199,0.291l-3.197-0.581l1.743-0.871h-6.104l5.233-0.581h4.359l0.291,0.581l1.744-0.581l2.618-0.291l4.067,0.581L614.46,9.401zM748.754,14.047l-5.812,0.29l-7.85-0.87l-4.359-0.872l-2.325-2.033l-3.779-0.581l7.268-1.742L738,7.369l5.232,1.452l6.396,2.614L748.754,14.047z",
                        "RW" : "M557.485,234.16l1.163,1.452l-0.289,1.741l-0.582,0.291l-1.454,-0.291l-0.874,1.743l-1.743,-0.290l0.293,-1.453l0.290,-0.290l0.000,-1.742l0.871,-0.580l0.582,0.290l-1.743,0.871z",
                        "SA" : "M591.496,185.956l-0.291,-1.162l-0.873,-0.871l-0.290,-1.162l-1.453,-0.871l-1.454,-2.323l-0.582,-2.322l-2.034,-1.744l-1.163,-0.580l-1.743,-2.613l-0.292,-1.744l0.000,-1.741l-1.453,-2.904l-1.454,-1.162l-1.453,-0.580l-0.871,-1.452l0.000,-0.872l-0.581,-1.451l-0.874,-0.582l-1.162,-2.032l-1.452,-2.033l-1.456,-2.033l-1.452,0.000l0.290,-1.451l0.292,-0.871l0.292,-1.162l3.196,0.291l1.161,-0.582l0.581,-1.161l2.036,-0.290l0.581,-0.871l0.872,-0.581l-2.905,-2.614l5.522,-1.451l0.582,-0.582l3.488,0.873l4.067,2.032l7.561,5.517l5.230,0.000l2.326,0.290l0.873,1.452l1.743,0.000l1.165,2.323l1.452,0.581l0.289,0.871l2.036,1.162l0.290,1.162l-0.290,0.870l0.290,0.872l0.584,0.871l0.578,0.871l0.292,0.581l0.873,0.581l0.872,0.000l0.290,0.871l0.291,0.871l0.872,2.613l8.430,1.452l0.580,-0.580l1.165,2.031l-1.745,5.519l-8.430,2.613l-7.849,1.162l-2.615,1.161l-2.036,2.904l-1.163,0.291l-0.580,-0.873l-1.164,0.292l-2.615,-0.292l-0.582,-0.289l-3.197,0.000l-0.582,0.289l-1.161,-0.869l-0.873,1.451l0.289,1.161l1.161,-0.872z",
                        "SB" : "M919.968,259.712l0.871,0.873h-2.034l-0.873-1.453l1.452,0.58H919.968zM916.48,257.972l-0.874,0.289l-1.743-0.289l-0.58-0.582v-1.161l2.034,0.581l0.873,0.58L916.48,257.972zM918.805,257.39l-0.291,0.582l-2.034-2.613l-0.582-1.453h0.871l0.873,2.033L918.805,257.39zM913.863,253.906v0.581l-2.034-1.161l-1.454-1.162l-1.161-0.871l0.579-0.29l1.164,0.871l2.326,1.161L913.863,253.906zM907.468,251.002l-0.581,0.29l-1.162-0.58l-1.163-1.162v-0.581l1.744,1.162L907.468,251.002z",
                        "SD" : "M567.37,204.831l-0.582,0.000l0.000,-1.452l-0.292,-0.873l-1.453,-1.160l-0.292,-1.742l0.292,-2.033l-1.162,-0.291l-0.293,0.582l-1.452,0.289l0.582,0.582l0.291,1.742l-1.454,1.451l-1.453,2.033l-1.454,0.291l-2.325,-1.744l-1.163,0.582l0.000,0.871l-1.454,0.581l-0.290,0.582l-2.617,0.000l-0.289,-0.582l-2.035,0.000l-1.164,0.291l-0.581,-0.291l-1.452,-1.452l-0.584,-0.871l-2.033,0.581l-0.581,1.161l-0.872,2.324l-0.874,0.581l-0.872,0.289l-0.290,0.000l-0.871,-0.870l0.000,-0.870l0.289,-1.163l0.000,-1.162l-1.452,-1.742l-0.292,-1.162l0.000,-0.580l-1.162,-0.871l0.000,-1.453l-0.582,-1.161l-0.873,0.290l0.293,-1.161l0.580,-1.162l-0.289,-1.162l0.871,-0.870l-0.582,-0.581l0.872,-1.743l1.164,-2.032l2.324,0.291l0.000,-11.036l0.000,-0.870l3.199,-0.291l0.000,-5.228l11.045,0.000l10.755,0.000l10.755,0.000l0.874,2.615l-0.581,0.580l0.289,2.614l1.163,3.485l1.164,0.580l1.454,0.872l-1.454,1.742l-2.035,0.289l-0.874,0.873l-0.291,2.033l-1.161,4.065l0.290,0.870l-0.581,2.323l-0.872,2.904l-1.743,1.162l-1.163,2.322l-0.292,1.162l-1.454,0.582l-0.579,2.903l0.000,-0.291z",
                        "SE" : "M534.813,50.346l-2.617,1.742l0.291,1.742l-4.362,2.324l-5.230,2.323l-2.036,3.774l2.036,2.033l2.615,1.452l-2.615,3.194l-2.907,0.581l-0.873,4.647l-1.744,2.613l-3.197,-0.291l-1.455,2.033l-3.196,0.291l-0.874,-2.614l-2.323,-3.194l-2.327,-3.776l1.455,-1.742l2.033,-1.742l1.162,-3.485l-1.743,-1.162l-0.290,-3.775l1.744,-2.612l2.907,0.000l0.873,-0.872l-1.165,-1.162l4.361,-3.774l2.907,-2.904l1.745,-2.033l2.615,0.000l0.582,-1.452l5.232,0.290l0.582,-1.742l1.744,-0.290l3.486,1.452l4.361,2.033l0.000,4.065l0.872,1.162l4.649,-0.871z",
                        "SI" : "M511.848,102.905l2.326,0.291l1.162,-0.582l2.616,0.000l0.291,-0.580l0.582,0.000l0.582,1.162l-2.325,0.580l-0.293,1.162l-0.871,0.290l0.000,0.582l-1.163,0.000l-0.873,-0.291l-0.580,0.291l-1.743,0.000l0.581,-0.291l-0.581,-1.162l-0.289,1.452z",
                        "SK" : "M525.802,94.774l0.000,0.291l1.160,-0.582l1.455,1.163l1.453,-0.581l1.455,0.291l2.033,-0.582l2.616,1.163l-0.872,0.870l-0.580,0.872l-0.582,0.290l-2.908,-0.872l-0.870,0.291l-0.582,0.581l-1.455,0.290l-0.289,0.000l-1.163,0.290l-1.163,0.290l-0.291,0.291l-2.324,0.581l-0.871,-0.290l-1.454,-0.872l-0.292,-0.870l0.292,-0.291l0.289,-0.581l1.165,0.000l0.871,-0.290l0.290,-0.291l0.289,-0.289l0.292,-0.581l0.582,0.000l0.580,-0.582l-0.874,0.000z",
                        "SL" : "M442.376,212.381l-0.873,-0.291l-2.034,-1.161l-1.455,-1.452l-0.289,-0.871l-0.292,-2.033l1.455,-1.451l0.289,-0.582l0.292,-0.581l0.871,0.000l0.581,-0.580l2.326,0.000l0.582,0.871l0.581,1.163l0.000,0.870l0.582,0.581l0.000,1.161l0.581,-0.290l-1.163,1.451l-1.454,1.452l0.000,0.871l0.580,-0.872z",
                        "SN" : "M427.84,193.505l-1.162,-2.032l-1.454,-1.161l1.164,-0.291l1.452,-2.032l0.582,-1.452l0.871,-0.872l1.456,0.291l1.452,-0.581l1.454,0.000l1.163,0.872l2.034,0.580l1.454,2.033l2.034,1.742l0.000,1.742l0.581,1.742l1.162,0.581l0.000,1.162l0.000,0.871l-0.289,0.290l-1.744,-0.290l0.000,0.290l-0.581,0.000l-2.036,-0.581l-1.453,0.000l-4.942,-0.290l-0.871,0.290l-0.874,0.000l-1.453,0.581l-0.291,-2.323l2.327,0.291l0.580,-0.581l0.582,0.000l1.163,-0.581l1.163,0.581l1.162,0.000l1.163,-0.581l-0.582,-0.872l-0.870,0.581l-0.873,0.000l-1.163,-0.581l-0.871,0.000l-0.581,0.581l2.909,0.000z",
                        "SO" : "M610.681,199.023l1.452,-0.290l1.162,-0.871l1.165,0.000l0.000,0.871l-0.291,1.451l0.000,1.453l-0.582,1.161l-0.581,2.904l-1.452,2.904l-1.747,3.484l-2.323,4.066l-2.326,3.194l-3.199,3.775l-2.907,2.323l-4.068,2.613l-2.616,2.033l-2.908,3.486l-0.582,1.451l-0.580,0.581l-1.745,-2.323l0.000,-9.873l2.325,-3.196l0.874,-0.870l1.744,0.000l2.324,-2.033l3.780,0.000l7.850,-8.421l1.742,-2.323l1.163,-1.742l0.000,-1.452l0.000,-2.614l0.000,-1.161l0.290,0.000l0.873,0.000l-1.163,0.581z",
                        "SOL" : "M608.355,204.831l-1.163,1.742l-1.742,2.323l-2.328,0.000l-9.010,-3.194l-1.163,-0.871l-0.873,-1.452l-1.163,-1.453l0.583,-1.161l1.161,-1.452l0.873,0.580l0.582,1.162l1.163,1.162l1.163,0.000l2.614,-0.580l3.199,-0.582l2.327,-0.580l1.452,-0.291l0.871,-0.580l1.744,0.000l-0.290,0.000l0.000,1.161l0.000,2.614l0.000,-1.452z",
                        "SR" : "M316.509,214.415l3.198,0.580l0.290,-0.291l2.326,-0.289l2.907,0.580l-1.453,2.612l0.289,1.743l1.164,1.742l-0.582,1.161l-0.290,1.163l-0.581,1.162l-1.745,-0.581l-1.162,0.289l-1.163,-0.289l-0.291,0.870l0.581,0.581l-0.290,0.581l-1.454,-0.291l-1.744,-2.322l-0.291,-1.744l-0.872,0.000l-1.453,-2.032l0.581,-1.161l0.000,-0.872l1.453,-0.579l-0.582,2.613z",
                        "SS" : "M567.37,204.831l0.000,2.322l-0.582,0.872l-1.455,0.000l-0.872,1.452l1.746,0.291l1.452,1.161l0.290,1.161l1.454,0.580l1.455,3.196l-1.745,1.741l-1.743,1.743l-1.745,1.162l-1.744,0.000l-2.326,0.580l-1.744,-0.580l-1.163,0.870l-2.325,-2.032l-0.874,-1.162l-1.450,0.581l-1.166,0.000l-0.873,0.291l-1.161,-0.291l-1.743,-2.323l-0.292,-0.871l-2.034,-0.871l-0.873,-1.743l-1.163,-1.161l-1.743,-1.452l0.000,-0.871l-1.452,-1.162l-2.037,-1.162l0.872,-0.289l0.874,-0.581l0.872,-2.324l0.581,-1.161l2.033,-0.581l0.584,0.871l1.452,1.452l0.581,0.291l1.164,-0.291l2.035,0.000l0.289,0.582l2.617,0.000l0.290,-0.582l1.454,-0.581l0.000,-0.871l1.163,-0.582l2.325,1.744l1.454,-0.291l1.453,-2.033l1.454,-1.451l-0.291,-1.742l-0.582,-0.582l1.452,-0.289l0.293,-0.582l1.162,0.291l-0.292,2.033l0.292,1.742l1.453,1.160l0.292,0.873l0.000,1.452l-0.582,0.000z",
                        "SV" : "M232.211,194.086l-0.291,0.581l-1.743,0.000l-0.872,-0.290l-1.164,-0.581l-1.452,0.000l-0.873,-0.581l0.000,-0.580l0.873,-0.581l0.580,-0.291l0.000,-0.290l0.581,-0.291l0.873,0.291l0.582,0.581l0.872,0.581l0.000,0.289l1.161,-0.289l0.582,0.000l0.291,0.289l0.000,-1.162z",
                        "SY" : "M580.45,139.204l-5.234,2.903l-3.195,-1.161l0.289,-0.290l0.000,-1.162l0.873,-1.452l1.452,-1.161l-0.581,-1.162l-1.163,0.000l-0.290,-2.033l0.582,-1.161l0.871,-0.582l0.581,-0.580l0.290,-1.742l0.873,0.580l2.907,-0.870l1.454,0.581l2.327,0.000l3.196,-0.872l1.453,0.000l3.197,-0.581l-1.454,1.742l-1.454,0.872l0.292,2.032l-1.163,3.195l6.103,-2.904z",
                        "SZ" : "M562.136,304.433l-0.581,1.161l-1.744,0.290l-1.452,-1.451l-0.292,-0.871l0.870,-1.161l0.293,-0.581l0.872,-0.290l1.163,0.580l0.580,1.161l-0.291,-1.162z",
                        "TD" : "M513.593,195.538l0.289,-1.161l-1.742,-0.291l0.000,-1.742l-1.165,-0.871l1.165,-3.775l3.486,-2.614l0.292,-3.484l1.164,-5.517l0.581,-1.162l-1.163,-0.871l0.000,-0.871l-1.164,-0.871l-0.581,-4.357l2.616,-1.451l11.046,5.226l11.045,5.227l0.000,11.036l-2.324,-0.291l-1.164,2.032l-0.872,1.743l0.582,0.581l-0.871,0.870l0.289,1.162l-0.580,1.162l-0.293,1.161l0.873,-0.290l0.582,1.161l0.000,1.453l1.162,0.871l0.000,0.580l-1.744,0.581l-1.452,1.161l-2.034,2.905l-2.617,1.452l-2.618,-0.291l-0.871,0.291l0.292,0.870l-1.454,0.872l-1.163,1.161l-3.488,1.162l-0.582,-0.580l-0.579,-0.291l-0.293,0.871l-2.325,0.290l0.290,-0.870l-0.872,-1.743l-0.289,-1.161l-1.165,-0.581l-1.742,-1.743l0.579,-1.161l1.455,0.289l0.581,-0.289l1.453,0.000l-1.453,-2.324l0.292,-2.032l-0.292,-1.743l1.162,1.742z",
                        "TF" : "M663.583,364.542l1.746,0.872l2.617,0.581l0.000,0.291l-0.584,1.452l-4.360,0.000l0.000,-1.452l0.292,-1.161l-0.289,0.583z",
                        "TG" : "M479,214.123l-2.324,0.581l-0.582,-1.162l-0.872,-1.742l0.000,-1.162l0.581,-2.613l-0.871,-0.872l-0.292,-2.322l0.000,-2.033l-0.871,-1.161l0.000,-0.872l2.616,0.000l-0.582,1.452l0.873,0.871l0.872,0.871l0.291,1.454l0.579,0.289l-0.290,6.388l-0.872,-2.033z",
                        "TH" : "M756.022,197.571l-2.325,-1.452l-2.325,0.000l0.290,-2.033l-2.326,0.000l-0.291,2.904l-1.454,4.065l-0.871,2.613l0.290,1.745l1.744,0.289l1.163,2.323l0.291,2.613l1.745,1.452l1.453,0.291l1.454,1.452l-0.873,1.162l-1.744,0.289l-0.290,-1.451l-2.326,-1.163l-0.291,0.582l-1.163,-1.162l-0.582,-1.452l-1.452,-1.452l-1.163,-1.161l-0.582,1.452l-0.581,-1.452l0.292,-1.742l0.871,-2.615l1.452,-2.903l1.454,-2.614l-1.162,-2.322l0.290,-1.452l-0.582,-1.453l-1.741,-2.322l-0.582,-1.162l0.871,-0.580l1.163,-2.323l-1.163,-2.034l-1.744,-1.742l-1.455,-2.613l1.165,-0.290l1.163,-3.194l2.034,0.000l1.743,-1.163l1.454,-0.580l1.163,0.580l0.290,1.744l1.743,0.289l-0.579,2.904l0.000,2.323l2.907,-1.742l0.871,0.581l1.452,0.000l0.582,-0.871l2.036,0.000l2.325,2.323l0.000,2.613l2.327,2.324l-0.291,2.323l-0.872,1.451l-2.326,-0.581l-3.781,0.581l-1.741,2.323l-0.580,-3.485z",
                        "TJ" : "M669.108,120.329l-0.873,0.871l-2.906,-0.582l-0.291,1.743l2.908,-0.290l3.488,0.871l5.233,-0.291l0.579,2.324l0.874,-0.291l1.743,0.582l0.000,1.160l0.292,1.742l-2.909,0.000l-1.745,-0.290l-1.744,1.162l-1.162,0.291l-1.161,0.581l-0.873,-0.872l0.000,-2.323l-0.581,0.000l0.291,-0.871l-1.454,-0.871l-1.455,1.161l-0.290,1.161l-0.289,0.291l-1.745,0.000l-0.872,1.162l-0.872,-0.582l-2.036,0.872l-0.871,-0.290l1.744,-2.614l-0.582,-2.032l-2.033,-0.871l0.579,-1.162l2.328,0.290l1.452,-1.743l0.872,-1.741l3.488,-0.582l-0.581,1.163l0.581,0.871l-0.873,0.000z",
                        "TL" : "M817.647,255.359l0.580,-0.582l2.327,-0.580l1.744,-0.291l0.871,-0.290l1.164,0.290l-1.164,0.871l-2.905,1.162l-2.037,0.871l-0.290,-0.871l0.290,0.580z",
                        "TM" : "M642.364,132.815l-0.289,-2.323l-2.034,0.000l-3.200,-2.324l-2.325,-0.290l-2.907,-1.452l-2.034,-0.290l-1.162,0.581l-1.745,-0.291l-2.036,1.742l-2.323,0.582l-0.582,-2.033l0.289,-2.904l-2.033,-0.871l0.581,-2.033l-1.743,0.000l0.578,-2.323l2.617,0.581l2.326,-0.872l-2.033,-1.742l-0.582,-1.451l-2.328,0.581l-0.289,2.032l-0.871,-1.742l1.160,-0.871l3.199,-0.581l2.034,0.871l1.744,2.033l1.455,0.000l3.199,0.000l-0.583,-1.452l2.325,-0.871l2.325,-1.742l3.778,1.451l0.292,2.324l1.163,0.580l2.907,-0.290l0.871,0.580l1.455,2.904l2.906,1.742l2.034,1.453l2.909,1.162l3.487,1.160l0.000,1.742l-0.871,0.000l-1.164,-0.871l-0.580,1.162l-2.326,0.291l-0.583,2.323l-1.454,0.870l-2.325,0.291l-0.581,1.452l-2.034,0.291l2.617,1.162z",
                        "TN" : "M499.931,147.625l-1.163,-4.936l-1.745,-1.162l0.000,-0.581l-2.325,-1.742l-0.290,-2.034l1.745,-1.451l0.579,-2.323l-0.290,-2.614l0.581,-1.451l2.908,-1.163l2.034,0.291l-0.291,1.453l2.325,-0.872l0.292,0.291l-1.454,1.451l0.000,1.161l1.162,0.872l-0.580,2.324l-1.745,1.451l0.582,1.452l1.452,0.000l0.583,1.452l1.163,0.290l-0.291,2.032l-1.164,0.873l-0.872,0.870l-2.034,1.162l0.290,1.161l-0.290,1.162l1.162,-0.581z",
                        "TR" : "M575.509,117.135l3.777,1.161l3.199-0.291l2.323,0.291l3.489-1.451l2.906-0.291l2.615,1.452l0.292,0.872l-0.292,1.452l2.036,0.58l1.162,0.872l-1.743,0.871l0.87,2.904l-0.579,0.871l1.452,2.324l-1.452,0.581l-0.873-0.872l-3.197-0.291l-1.164,0.291l-3.196,0.581h-1.453l-3.196,0.872h-2.327l-1.454-0.581l-2.906,0.871l-0.873-0.58l-0.29,1.742l-0.581,0.58l-0.871,0.582l-0.873-1.452l0.873-0.872l-1.455,0.291l-2.325-0.871l-2.033,1.742l-4.07,0.29l-2.326-1.452h-2.906l-0.582,1.162l-2.036,0.29l-2.615-1.452h-2.906l-1.744-2.904l-2.034-1.452l1.455-2.033l-1.747-1.452l2.907-2.613h4.361l1.163-2.033l5.232,0.29l3.197-1.742l3.196-0.871h4.65L575.509,117.135zM548.764,119.167l-2.325,1.451l-0.871-1.451v-0.581l0.581-0.291l0.871-1.742l-1.452-0.581l2.907-0.871l2.324,0.29l0.291,1.162l2.615,0.872l-0.58,0.58l-3.198,0.291L548.764,119.167z",
                        "TT" : "M304.01,201.346l1.454,-0.291l0.581,0.000l0.000,2.033l-2.326,0.291l-0.581,-0.291l0.872,-0.582l0.000,1.160z",
                        "TW" : "M808.926,163.886l-1.744,4.356l-1.163,2.322l-1.452,-2.322l-0.292,-2.033l1.744,-2.614l2.325,-2.322l1.163,0.871l0.581,-1.742z",
                        "TZ" : "M567.077,233.58l0.582,0.289l9.883,5.517l0.291,1.742l3.780,2.615l-1.163,3.484l0.000,1.452l1.744,1.161l0.292,0.581l-0.873,1.743l0.289,0.871l-0.289,1.162l0.873,1.742l1.161,2.903l1.162,0.581l-2.323,1.452l-2.907,1.162l-1.746,0.000l-0.872,0.581l-2.036,0.289l-0.581,0.291l-3.486,-0.872l-2.036,0.292l-0.582,-3.776l-1.163,-1.161l-0.289,-0.871l-2.907,-0.581l-1.456,-0.870l-1.743,-0.291l-1.161,-0.581l-1.162,-0.581l-1.455,-3.485l-1.744,-1.452l-0.290,-1.742l0.290,-1.452l-0.581,-2.324l1.163,-0.289l0.872,-0.870l1.163,-1.454l0.582,-0.580l0.000,-0.872l-0.582,-0.871l0.000,-0.871l0.582,-0.291l0.289,-1.741l-1.163,-1.452l0.874,-0.291l3.196,0.000l-5.522,0.289z",
                        "UA" : "M561.265,87.806l1.160,0.000l0.584,-0.582l0.872,0.000l2.907,-0.290l1.744,1.742l-0.873,0.581l0.290,0.871l2.327,0.000l0.871,1.162l0.000,0.581l3.488,0.870l2.034,-0.290l1.745,1.162l1.454,0.000l4.070,0.870l0.290,0.873l-1.163,1.451l0.582,1.452l-0.582,0.871l-2.615,0.291l-1.452,0.871l0.000,1.161l-2.329,0.292l-1.744,0.869l-2.615,0.000l-2.323,1.162l0.289,1.743l1.161,0.581l2.907,-0.290l-0.580,1.161l-2.906,0.290l-3.781,1.742l-1.452,-0.581l0.582,-1.451l-3.198,-0.581l0.579,-0.580l2.619,-0.872l-0.874,-0.581l-4.068,-0.871l-0.292,-0.872l-2.614,0.291l-0.874,1.452l-2.325,2.033l-1.161,-0.580l-1.166,0.580l-1.452,-0.580l0.872,-0.291l0.291,-0.872l0.872,-0.871l-0.291,-0.580l0.581,-0.291l0.293,0.581l1.743,0.000l0.581,-0.290l-0.290,-0.291l0.000,-0.291l-0.873,-0.580l-0.290,-1.162l-1.164,-0.580l0.293,-0.871l-1.166,-0.872l-1.162,0.000l-2.034,-0.870l-2.033,0.290l-0.584,0.290l-1.163,0.000l-0.579,0.580l-2.036,0.291l-1.162,0.581l-1.163,-0.581l-1.745,0.000l-1.744,-0.581l-1.163,0.581l-0.291,-0.581l-1.452,-0.870l0.580,-0.872l0.872,-0.870l0.582,0.289l-0.872,-1.452l2.617,-2.033l1.452,-0.580l0.292,-0.580l-1.455,-2.614l1.163,0.000l1.746,-0.581l2.035,-0.291l2.615,0.291l3.196,0.581l2.036,0.290l1.163,0.291l1.162,-0.581l0.583,0.581l2.615,0.000l0.873,0.289l0.290,-1.451l0.870,-0.580l-2.328,0.000z",
                        "UG" : "M561.555,233.869l-3.196,0.000l-0.874,0.291l-1.743,0.871l-0.582,-0.290l0.000,-2.324l0.582,-0.871l0.291,-2.324l0.581,-1.161l1.163,-1.451l0.871,-0.872l0.873,-0.871l-1.162,-0.289l0.289,-3.196l1.163,-0.870l1.744,0.580l2.326,-0.580l1.744,0.000l1.745,-1.162l1.452,1.742l0.291,1.452l1.163,3.194l-1.163,2.033l-1.164,1.742l-0.872,1.161l0.000,2.906l5.522,-0.289z",
                        "US" : "M45.593,178.406l-0.292,0.581l-0.873-0.581l0.292-0.581l-0.582-1.162l0.29-0.291l0.292-0.29l-0.292-0.582l0.292-0.29h0.291l0.872,0.581l0.582,0.291l0.581,0.29l0.582,0.872v0.29l-1.162,0.581L45.593,178.406zM44.14,174.05l-0.872,0.29l-0.582-0.581l-0.292-0.29l0.292-0.291l0.872,0.291l0.872,0.29L44.14,174.05zM42.395,172.598l-0.29,0.291h-1.453l0.29-0.291H42.395zM39.779,172.308v0.29l-0.291-0.29h-0.873l-0.582-0.582l0.873-0.581v0.291L39.779,172.308zM35.128,170.564l-0.291,0.292l-0.872-0.582v-0.291l0.581-0.29l0.582,0.29V170.564zM212.735,95.065l0.582,1.452l0.871,0.581l1.744,0.291l2.907,0.291l2.616,0.871l2.325-0.291l3.488,0.581h0.872l2.326-0.87l2.617,1.161l2.616,1.162l2.326,0.872l2.035,0.871l0.291,0.58l0.582,0.291v0.291h0.58l0.583-0.291l0.29,0.871l0.583,0.291h0.581l0.581,0.29l-0.581,0.581l2.906,1.162l0.583,2.613l0.58,2.323l-0.872,1.742l-1.163,1.451l-0.581,0.873v0.29l0.292,0.581l0.872,0.29h0.581l3.197-1.452l2.907-0.29l3.488-1.453l0.291-0.291l-0.291-0.871l-0.582-0.581l1.454-0.291h2.616h2.616l0.872-1.162l0.291-0.29l2.907-1.743l1.163-0.581h4.07h5.232l0.292-0.871h0.872l1.162-0.58l0.872-1.162l0.873-2.033l2.035-2.032l0.872,0.581l2.035-0.581l1.163,0.87v3.775l1.744,1.452l0.582,1.161l-2.907,1.162l-2.907,0.872l-2.907,0.872l-1.453,1.742l-0.582,0.581v1.453l0.872,1.451h1.163l-0.291-0.871l0.872,0.581l-0.291,0.871l-1.744,0.291h-1.162l-2.036,0.581h-1.452l-1.454,0.291l-2.326,0.58l4.07-0.291l0.872,0.291l-4.07,0.872H270l0.291-0.29l-0.872,0.872h0.872l-0.582,2.032l-2.035,2.033l-0.291-0.58l-0.582-0.291l-0.872-0.581l0.582,1.452l0.582,0.58v0.873l-0.873,1.161l-1.453,2.033h-0.291l0.873-1.742l-1.454-1.162l-0.291-2.322l-0.58,1.16l0.58,1.743l-1.744-0.291l1.744,0.871l0.291,2.614l0.873,0.291l0.291,0.871l0.291,2.613l-1.745,2.033l-2.907,0.871l-1.743,1.742H257.5l-1.452,1.162l-0.291,0.87l-2.907,1.744l-1.744,1.451l-1.163,1.452l-0.582,2.033l0.582,1.742l0.873,2.614l1.163,1.742v1.161l1.453,3.195v2.032l-0.29,0.871l-0.582,1.742l-0.873,0.291l-1.453-0.291l-0.291-1.161l-1.163-0.582l-1.454-2.323l-1.162-2.032l-0.583-1.161l0.583-1.743l-0.583-1.742l-2.325-2.323l-0.873-0.291l-2.906,1.162h-0.581l-1.163-1.451l-1.744-0.581l-3.197,0.29l-2.326-0.29l-2.326,0.29l-0.872,0.291l0.292,0.87v1.162l0.581,0.582l-0.581,0.29l-0.872-0.581l-1.164,0.581h-2.034l-2.035-1.452l-2.325,0.291l-2.035-0.581l-1.745,0.29l-2.325,0.581l-2.325,2.033l-2.908,1.162l-1.452,1.162l-0.582,1.451v1.742v1.452l0.582,0.871h-1.163l-1.744-0.58l-2.326-0.872l-0.581-1.162l-0.582-2.033l-1.744-1.452l-0.873-1.742l-1.453-1.742l-2.034-1.162h-2.036l-1.743,2.323l-2.326-0.871l-1.454-0.871l-0.872-1.453l-0.872-1.451l-1.454-1.162l-1.454-0.871l-1.163-1.162h-4.65v1.162h-2.326h-5.232l-6.395-1.742l-4.07-1.451l0.29-0.582l-3.487,0.291l-3.198,0.291l-0.581-1.453l-1.744-1.451l-1.163-0.582l-0.291-0.58l-1.743-0.291l-0.872-0.581l-2.616-0.29l-0.582-0.582l-0.291-1.452l-2.908-2.904l-2.034-3.775v-0.582l-1.163-0.871l-2.326-2.323l-0.291-2.322l-1.454-1.453l0.582-2.322v-2.324l-0.872-2.032l0.872-2.614l0.582-2.613l0.291-2.323l-0.581-3.775l-0.873-2.323l-0.872-1.162l0.291-0.58l4.069,0.87l1.454,2.613l0.581-0.87l-0.291-2.033l-0.872-2.324h7.849h8.139h2.616h8.43h8.14h8.138h8.43h9.302h9.302h5.813v-1.161H212.735zM52.569,73.867l-2.616,1.162l-1.454-0.871l-0.581-1.162l2.616-1.162l1.454-0.29l1.744,0.29l1.163,0.871L52.569,73.867zM17.978,66.316l-1.744,0.291l-1.745-0.581l-1.744-0.582l2.907-0.581l2.035,0.291L17.978,66.316zM1.118,55.572l1.744,0.582l1.744-0.291l2.035,0.581l2.907,0.581l-0.291,0.29l-2.035,0.581l-2.326-0.87l-0.872-0.291H1.409l-0.582-0.29L1.118,55.572zM47.046,35.246l1.744,1.161l1.453-0.291h4.651l-0.291,0.582l4.36,0.58l2.617-0.29l5.813,0.871l5.232,0.29l2.326,0.291l3.488-0.291l4.36,0.581l2.907,0.581v10.164v15.681h2.616l2.616,0.872l2.035,1.162L95.3,68.93l2.906-1.452l2.616-0.871l1.454,1.451l1.744,1.162l2.616,1.162l1.744,2.033l2.908,2.903l4.65,1.742v1.743l-1.454,1.452l-1.454-1.162l-2.615-0.871l-0.583-2.323l-3.778-2.323l-1.454-2.324l-2.616-0.291h-4.361l-3.197-0.871l-5.814-2.903l-2.616-0.581l-4.651-0.872l-3.778,0.291l-5.523-1.453l-3.198-1.161l-3.197,0.581l0.581,2.033l-1.454,0.29l-3.196,0.58l-2.326,0.873l-3.198,0.581l-0.291-1.742l1.163-2.614l2.907-0.871l-0.582-0.581l-3.488,1.452l-2.035,1.742l-4.07,2.033l2.035,1.161l-2.617,2.033l-2.907,1.162l-2.616,0.871l-0.872,1.162l-4.07,1.451l-0.872,1.452l-3.198,1.162l-2.035-0.29l-2.615,0.871l-2.617,0.87l-2.326,0.872l-4.65,0.871l-0.581-0.582l2.907-1.162l2.906-0.87l2.907-1.453l3.489-0.291l1.163-1.161l3.779-1.742l0.582-0.581l2.035-0.873l0.58-2.033l1.455-1.742l-3.198,0.872l-0.872-0.582L36,70.382l-1.745-1.453l-0.872,0.872l-1.162-1.162l-2.617,0.871h-1.743l-0.292-1.453l0.581-1.162l-1.744-0.87l-3.487,0.581l-2.326-1.452l-2.035-0.581v-1.452l-2.035-1.162l1.163-1.742l2.035-1.452l1.163-1.452l2.035-0.29l2.034,0.58l2.036-1.451l2.035,0.29l2.326-0.872l-0.583-1.161l-1.743-0.582l2.034-1.162h-1.453l-2.906,0.871l-0.873,0.581l-2.325-0.581l-3.779,0.291l-4.07-0.871l-1.163-0.871l-3.487-1.742l3.778-1.162l6.105-1.451h2.325l-0.29,1.451h5.814l-2.327-1.742l-3.197-1.162l-2.034-1.162l-2.616-1.161l-3.779-0.871l1.455-1.452l4.941-0.291l3.488-1.162l0.582-1.453l2.906-1.161l2.617-0.291L36,36.116h2.616l4.07-1.452L47.046,35.246z",
                        "UY" : "M315.056,314.017l1.744,-0.292l2.907,2.033l0.872,0.000l2.907,1.743l2.325,1.451l1.454,2.032l-1.163,1.164l0.872,1.740l-1.453,1.742l-2.907,1.453l-2.035,-0.582l-1.454,0.291l-2.616,-1.162l-2.035,0.000l-1.453,-1.452l0.000,-1.741l0.872,-0.580l-0.291,-2.905l0.872,-2.614l-0.582,2.321z",
                        "UZ" : "M656.899,128.168l0.000,-1.742l-3.487,-1.160l-2.909,-1.162l-2.034,-1.453l-2.906,-1.742l-1.455,-2.904l-0.871,-0.580l-2.907,0.290l-1.163,-0.580l-0.292,-2.324l-3.778,-1.451l-2.325,1.742l-2.325,0.871l0.583,1.452l-3.199,0.000l0.000,-10.164l6.976,-1.742l0.580,0.291l4.071,2.031l2.324,0.872l2.618,2.614l3.196,-0.291l4.944,-0.290l3.196,2.032l-0.290,2.614l1.453,0.000l0.581,2.323l3.489,0.000l0.580,1.452l1.163,0.000l1.163,-2.032l3.779,-2.033l1.454,-0.291l0.872,0.291l-2.326,1.742l2.035,0.871l2.034,-0.580l3.199,1.451l-3.488,2.032l-2.326,-0.289l-0.873,0.000l-0.581,-0.871l0.581,-1.163l-3.488,0.582l-0.872,1.741l-1.452,1.743l-2.328,-0.290l-0.579,1.162l2.033,0.871l0.582,2.032l-1.744,2.614l-2.035,-0.582l1.453,0.000z",
                        "VE" : "M277.558,198.442l-0.290,0.871l-1.454,0.291l0.872,1.161l0.000,1.452l-1.454,1.451l1.164,2.324l1.162,-0.290l0.582,-1.743l-0.872,-1.161l0.000,-2.033l3.487,-1.161l-0.582,-1.162l1.163,-0.871l0.872,1.742l2.035,0.291l1.744,1.451l0.000,0.871l2.617,0.000l2.907,-0.289l1.452,1.161l2.326,0.290l1.455,-0.582l0.000,-0.869l3.487,0.000l3.198,-0.291l-2.326,0.871l0.872,1.451l2.326,0.000l2.034,1.454l0.291,2.323l1.453,-0.292l1.164,0.872l-2.036,1.452l-0.290,1.161l0.872,0.871l-0.582,0.581l-1.743,0.580l0.000,1.163l-0.873,0.582l2.035,2.322l0.291,0.580l-0.872,1.162l-3.198,0.871l-2.035,0.580l-0.581,0.582l-2.326,-0.582l-2.034,-0.290l-0.582,0.000l1.163,0.872l0.000,1.741l0.292,1.744l2.324,0.289l0.291,0.581l-2.035,0.871l-0.291,1.162l-1.162,0.291l-2.036,0.870l-0.580,0.582l-2.036,0.289l-1.452,-1.451l-0.872,-2.614l-0.873,-1.162l-0.872,-0.580l1.454,-1.453l-0.291,-0.580l-0.582,-0.580l-0.581,-2.033l0.000,-2.033l0.872,-0.871l0.291,-1.452l-0.872,-0.290l-1.454,0.290l-2.034,-0.290l-1.163,0.290l-2.035,-2.323l-1.453,-0.291l-3.488,0.291l-0.872,-1.162l-0.583,0.000l0.000,-0.581l0.292,-1.161l-0.292,-1.161l-0.580,-0.582l-0.291,-1.161l-1.453,-0.290l0.581,-1.452l0.582,-2.033l0.581,-1.162l1.163,-0.580l0.581,-1.452l-2.035,0.581z",
                        "VN" : "M771.137,171.726l-3.488,2.324l-2.326,2.614l-0.581,1.742l2.034,2.904l2.617,3.774l2.325,1.743l1.744,2.033l1.163,5.226l-0.290,4.647l-2.327,2.032l-3.195,1.741l-2.037,2.325l-3.486,2.322l-1.164,-1.740l0.872,-1.745l-2.034,-1.451l2.326,-1.162l2.906,-0.290l-1.162,-1.742l4.651,-2.033l0.289,-3.194l-0.581,-2.033l0.581,-2.614l-0.870,-2.032l-2.036,-1.742l-1.745,-2.614l-2.325,-3.194l-3.197,-1.742l0.870,-0.872l1.747,-0.580l-1.165,-2.614l-3.488,0.000l-1.161,-2.322l-1.454,-2.324l1.454,-0.580l2.034,0.000l2.615,-0.291l2.329,-1.451l1.452,0.870l2.615,0.581l-0.581,1.742l1.454,0.872l-2.615,-0.870z",
                        "VU" : "M935.666,276.266l-0.872,0.291l-0.874-1.163v-0.871L935.666,276.266zM933.628,271.91l0.583,2.324l-0.874-0.292h-0.58l-0.29-0.58v-2.322L933.628,271.91z",
                        "YE" : "M619.983,185.084l-2.034,0.872l-0.583,1.161l0.000,0.872l-2.616,1.160l-4.651,1.453l-2.326,1.742l-1.162,0.291l-0.871,-0.291l-1.744,1.161l-1.745,0.581l-2.327,0.291l-0.580,0.000l-0.581,0.871l-0.582,0.000l-0.581,0.871l-1.455,-0.290l-0.870,0.580l-1.745,-0.290l-0.873,-1.452l0.292,-1.452l-0.581,-0.871l-0.581,-2.032l-0.874,-1.163l0.583,-0.289l-0.291,-1.162l0.582,-0.581l-0.291,-1.161l1.161,-0.872l-0.289,-1.161l0.873,-1.451l1.161,0.869l0.582,-0.289l3.197,0.000l0.582,0.289l2.615,0.292l1.164,-0.292l0.580,0.873l1.163,-0.291l2.036,-2.904l2.615,-1.161l7.849,-1.162l2.325,4.645l-0.873,-1.743z",
                        "ZA" : "M560.392,311.403l-0.29,0.291l-1.165,1.451l-0.87,1.451l-1.453,2.034l-3.198,2.902l-2.034,1.451l-2.036,1.453l-2.906,0.871l-1.452,0.29l-0.293,0.58l-1.743-0.29l-1.161,0.581l-3.199-0.581l-1.452,0.29h-1.164l-2.906,0.872l-2.325,0.58l-1.744,0.871l-1.162,0.29l-1.163-1.161h-0.871l-1.454-1.161v0.292l-0.29-0.583v-1.741l-0.873-1.742l0.873-0.581v-2.032l-2.034-2.613l-1.165-2.323l-2.034-3.484l1.163-1.453l1.163,0.58l0.582,1.162l1.162,0.29l1.744,0.581l1.452-0.29l2.325-1.451v-10.163l0.874,0.58l1.741,2.613l-0.289,1.741l0.582,0.872l2.033-0.29l1.164-1.162l1.452-0.87l0.582-1.453l1.454-0.58l1.162,0.29l1.162,0.872h2.326l1.744-0.582l0.289-0.87l0.584-1.161l1.452-0.293l0.874-1.16l0.871-1.742l2.324-2.032l4.07-2.033h1.163l1.163,0.581l0.871-0.289l1.454,0.289l1.452,3.774l0.582,2.033l-0.29,2.903v1.162l-1.163-0.58l-0.872,0.29l-0.293,0.581l-0.87,1.161l0.292,0.871l1.452,1.451l1.744-0.29l0.581-1.161h2.034l-0.582,2.031l-0.579,2.323l-0.584,1.162L560.392,311.403zM553.416,310.531l-1.162-0.87l-1.163,0.579l-1.453,1.163l-1.454,1.742l2.036,2.032l0.871-0.291l0.581-0.869l1.454-0.292l0.58-0.871l0.873-1.451L553.416,310.531z",
                        "ZM" : "M563.881,256.229l1.452,1.452l0.582,2.322l-0.582,0.582l-0.290,2.322l0.290,2.323l-0.872,0.873l-0.580,2.612l1.452,0.580l-8.429,2.325l0.292,2.033l-2.036,0.289l-1.744,1.162l-0.291,0.871l-0.872,0.291l-2.616,2.322l-1.454,1.744l-0.872,0.000l-0.872,-0.291l-3.197,-0.291l-0.291,-0.291l-0.290,-0.289l-0.871,-0.582l-1.745,0.000l-2.326,0.582l-1.745,-1.744l-2.034,-2.322l0.289,-8.711l5.524,0.000l0.000,-0.873l0.292,-1.161l-0.583,-1.161l0.291,-1.452l-0.291,-0.871l1.164,0.290l0.000,0.872l1.454,-0.291l1.743,0.291l0.871,1.452l2.036,0.291l1.745,-0.873l0.581,1.452l2.325,0.291l0.872,1.162l1.163,1.451l2.033,0.000l-0.289,-2.904l-0.581,0.581l-2.035,-1.160l-0.584,-0.291l0.293,-2.904l0.580,-3.195l-0.873,-1.161l0.873,-1.742l0.873,-0.290l3.490,-0.581l1.163,0.290l1.162,0.581l1.161,0.581l1.743,0.291l-1.456,-0.870z",
                        "ZW" : "M559.521,292.237l-1.454,-0.289l-0.871,0.289l-1.163,-0.581l-1.163,0.000l-1.745,-1.162l-2.326,-0.579l-0.580,-1.744l0.000,-0.870l-1.455,-0.292l-2.907,-2.903l-0.870,-1.742l-0.582,-0.580l-1.163,-2.034l3.197,0.291l0.872,0.291l0.872,0.000l1.454,-1.744l2.616,-2.322l0.872,-0.291l0.291,-0.871l1.744,-1.162l2.036,-0.289l0.000,0.870l2.325,0.000l1.452,0.581l0.582,0.582l1.163,0.289l1.452,0.871l0.000,3.486l-0.582,2.032l0.000,2.033l0.293,0.870l-0.293,1.452l-0.289,0.290l-0.874,2.033l2.904,-3.195z"
    
                    }
                }
            }
        }
    );

    return Mapael;

}));

/***/ })
/******/ ]);