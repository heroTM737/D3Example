/*
 * source from https://github.com/patorjk/d3-context-menu
 * version 0.1.2
 * update Nov 09, 2016
 * 
 * */
(function(root, factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = function(d3) {
			d3.contextMenu = factory(d3);
			return d3.contextMenu;
		};
	} else if(typeof define === 'function' && define.amd) {
		try {
			var d3 = require('d3');
		} catch (e) {
			d3 = root.d3;
		}

		d3.contextMenu = factory(d3);
		define([], function() {
			return d3.contextMenu;
		});
	} else if(root.d3) {
		root.d3.contextMenu = factory(root.d3);
	}
}(	this, 
	function(d3) {
		return function (menu, opts) {

			var openCallback,
				closeCallback;

			if (typeof opts === 'function') {
				openCallback = opts;
			} else {
				opts = opts || {};
				openCallback = opts.onOpen;
				closeCallback = opts.onClose;
			}

			// create the div element that will hold the context menu
			d3.selectAll('.d3-context-menu').data([1])
				.enter()
				.append('div')
				.attr('class', 'd3-context-menu');

			// close menu
			d3.select('body').on('click.d3-context-menu_123', function() {
				d3.select('.d3-context-menu').style('display', 'none');
				if (closeCallback) {
					closeCallback();
				}
			});
			
			d3.select('body').on('scroll', function() {
				d3.select('.d3-context-menu').style('display', 'none');
				if (closeCallback) {
					closeCallback();
				}
			});

			// this gets executed when a contextmenu event occurs
			return function(data, index) {
				var elm = this;

				d3.selectAll('.d3-context-menu').html('');
				var list = d3.selectAll('.d3-context-menu')
					.on('contextmenu', function(d) {
						d3.select('.d3-context-menu').style('display', 'none'); 
		  				d3.event.preventDefault();
						d3.event.stopPropagation();
					})
					.append('ul');
				list.selectAll('li').data(typeof menu === 'function' ? menu(data) : menu).enter()
					.append('li')
					.attr('class', function(d) {
						var ret = '';
						if (d.divider) {
							ret += ' is-divider';
						}
						if (d.disabled) {
							ret += ' is-disabled';
						}
						if (!d.action) {
							ret += ' is-header';
						}
						return ret;
					})
					.html(function(d) {
						if (d.divider) {
							return '<hr>';
						}
						if (!d.title) {
							console.error('No title attribute set. Check the spelling of your options.');
						}
						return (typeof d.title === 'string') ? d.title : d.title(data);
					})
					.on('click', function(d, i) {
						if (d.disabled) return; // do nothing if disabled
						if (!d.action) return; // headers have no "action"
						d.action(elm, data, index);
						d3.select('.d3-context-menu').style('display', 'none');

						if (closeCallback) {
							closeCallback();
						}
					});

				// the openCallback allows an action to fire before the menu is displayed
				// an example usage would be closing a tooltip
				if (openCallback) {
					if (openCallback(data, index) === false) {
						return;
					}
				}

				// display context menu
				// render at top left to get full size
				d3.select('.d3-context-menu')
					.style('left', '0px')
					.style('top', '0px')
					.style('display', 'block');
				
				var bcr = d3.select('.d3-context-menu').node().getBoundingClientRect(),
				menu_w = bcr.width,
				menu_h = bcr.height,
				w = window,
			    d = document,
			    e = d.documentElement,
			    g = d.getElementsByTagName('body')[0],
			    window_w = w.innerWidth || e.clientWidth || g.clientWidth,
			    window_h = w.innerHeight|| e.clientHeight|| g.clientHeight;
				
				var pos_x = pos_y = 0;
				if (menu_w + d3.event.pageX > window_w) {
					pos_x = window_w - menu_w;
				} else {
					pos_x = d3.event.pageX;
				}
				
				if (menu_h + d3.event.pageY > window_h) {
					pos_y = window_h - menu_h;
				} else {
					pos_y = d3.event.pageY;
				}
				
				//align context menu to mouse position
				d3.select('.d3-context-menu')
					.style('left', (pos_x - 2) + 'px')
					.style('top', (pos_y - 2) + 'px');
				
				d3.event.preventDefault();
				d3.event.stopPropagation();
			};
		};
	}
));
