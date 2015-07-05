$(document).ready(function() {
	prepareAll();
	prepareTab1();
});

function prepareAll() {
	// COPY from http://jqueryui.com/selectmenu/#custom_render
	$.widget("custom.iconselectmenu", $.ui.selectmenu, {
		_renderItem : function(ul, item) {
			var li = $("<li>", {
				text : item.label
			});
			if (item.disabled) {
				li.addClass("ui-state-disabled");
			}
			$("<span>", {
				style : item.element.attr("data-style"),
				"class" : "ui-icon " + item.element.attr("data-class")
			}).appendTo(li);
			return li.appendTo(ul);
		}
	});
	// END COPY
	$( "#lang, #devLang" ).iconselectmenu( {
		width: "150px"
	} );
	$( "#tabs" ).tabs();
};

function prepareTab1() {
	$( "#tabs-1 #run, #tabs-1 #checkRecur, #tabs-1 #checkOptim, #tabs-1 #checkNoEsc" ).button();
	$( "#tabs-1 #run" ).click( function() {
		var re = getBetweenRegex( 
			$( "#tabs-1 #start" ).val(),
			$( "#tabs-1 #end" ).val(),
			$( "#tabs-1 #checkRecur" ).prop( "checked" ),
			$( "#tabs-1 #checkOptim" ).prop( "checked" ),
			$( "#tabs-1 #checkNoEsc" ).prop( "checked" ),
			$( "#devLang" ).val()
	    );
		console.log( re );
	} ); 
};
