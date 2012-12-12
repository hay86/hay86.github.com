/**
 * Render.js - Render timeline UI (index.html) from timeline data (./data/data.json).
 *
 * Copyright (c) 2011 Kaifeng Xu - xukaifeng1986(at)gmail(dot)com | http://kfun.me
 * Dual licensed under MIT and GPL.
 * Date: 12/28/2011
 * @author: Kaifeng Xu
 * @version: 0.0.1
 *
 * http://project.kfun.me
 */

/* UI element width */
var margin_width 		= 0;
var bubble_half_width 	= 202;
var year_label_width 	= 50;
var item_label_width 	= 20;

/* HTML templates */
var nav_tpl 	= ['<li><a class="time_btn" href="javascript:void(0)">', '</a></li>'];
var ypin_tpl 	= ['<div class="pin year" style="left:', 'px">', '</div>'];
var ipin_tpl 	= ['<div class="pin item" style="left:', 'px">o</div>'];
var bubble_tpl 	= ['<div class="', '" style="left:', 'px"><h3>', '</h3><a href="./', '"><img src="', '" /></a><p>', '</p></div>'];
var layout_tpl 	= ['triangle-border', 'triangle-border top'];

/* document loaded */
$(document).ready(function(){
	$.getJSON('./data/project.json', function(data){		// get json data
		
		var nav_html 	= '';
		var pin_html 	= '';
		var bubble_html = ['', ''];
		
		var offset 	= 0;	// current x-offset
		var scroll = [];	// x-offset to scroll for each year button
		var c1 = 0, c2 = 0, c3 = 0.5, c4 = [1,1];

		$.each(data['data'], function(n, v) {
			offset += bubble_half_width + margin_width / 2;
			
			var year = v['year_label'];
			if( year != undefined ) {	// if a year label
				
				if( v['year_index'] != 'false' ){	// if it needs to be indexed
					var offsetToScroll = offset + c2 * year_label_width + (c3 - 0.5) * item_label_width - bubble_half_width - margin_width / 2;
					scroll.push(offsetToScroll);
					
					/* append a year label to nav-div */
					nav_html += nav_tpl[0] + year + nav_tpl[1];
				}
				
				/* place a year pin */
				pin_html += ypin_tpl[0] + offset + ypin_tpl[1] + year + ypin_tpl[2];

				c1 = 0;
				c2 += 1;
			}
			else {		// if an item
				var title 	= v['item_title'];
				var thumb 	= v['item_thumbnail'];
				var desc 	= v['item_description'];
				
				/* place a bubble */
				var offsetToPlace = offset - c4[c1 % 2] * bubble_half_width + c2 * year_label_width + c3 * item_label_width;
				bubble_html[c1 % 2] += bubble_tpl[0] + layout_tpl[c1 % 2] + bubble_tpl[1] + offsetToPlace + bubble_tpl[2] + title + bubble_tpl[3] + thumb + bubble_tpl[4] + thumb + bubble_tpl[5] + desc + bubble_tpl[6];
				
				/* place an item pin */
				pin_html += ipin_tpl[0] + offset + ipin_tpl[1];	
				
				c4[c1 % 2] += 2;
				c1 += 1;
				c3 += 1;
			}
			
			offset += margin_width / 2;
		});
		
		/* adjust new width */
		var width = offset + year_label_width * c2 +  item_label_width * (c3-0.5);
		$('#timeline_1')	.css('width', width + "px");
		$('#timeline_pin')	.css('width', width + "px");
		$('#timeline_2')	.css('width', width + "px");
		
		/* put innerHTML */
		$("#nav ul")		.html(nav_html);
		$('#timeline_pin')	.html(pin_html);
		$('#timeline_1')	.html(bubble_html[0]);
		$('#timeline_2')	.html(bubble_html[1]);
		
		/* bind click event */
		for(var i=0; i<scroll.length; i++){
			
			var e = $('#nav ul li:nth-child('+(i+1)+') a');
			e.click(scroll[i], function(event){
				
				// switch selection status
				$('#nav ul li a').removeClass("selected");
				$(this).addClass("selected");
				
				$.scrollTo(event.data,{
					horizontal:true,
					axis:'x',
					speed:1500
				});
			});	
			
			if(i==0)	// select the first one
				e.addClass("selected");
		}
	});
});
