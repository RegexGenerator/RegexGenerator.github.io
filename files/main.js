$(document).ready(function() {
	prepareAll();
	prepareTab1();
	prepareTab2();
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

function prepareTab2() {
	function defined() {
		for ( var i=0; i < arguments.length; i++ )
			if ( typeof( arguments[i] ) !== "undefined" ) return arguments[i];
		return arguments[0];
	};
	
	$( "#tabs-2 #run" ).click( function() {
		var text = $( "#tabs-2 #text" ).val();
		var re = /^(?:(-?\d+)([*\/+-])(-?\d+)$|(.*?)(\d+)([*\/])(-?\d+)|(.*?)(\d+)([+-])(-?\d+))/;
		var oldLength = -1;
		while ( !/^-?\d+$/.test( text ) && oldLength != text.length ) {
			oldLength = text.length;
			text = text.replace( /[+-]{2,}/g, function( val ) {
				return ( val.replace( /\+/g, "").length % 2 == 0 ) ? "+" : "-";
			} );
			if ( text.length != oldLength ) console.log( text );
			text = text.replace( re, function() {
				var g1 = defined( arguments[1], arguments[5], arguments[9] );
				var g2 = defined( arguments[2], arguments[6], arguments[10] );
				var g3 = defined( arguments[3], arguments[7], arguments[11] );
				var before = defined( arguments[4], arguments[8], "" );
				return before + eval( g1 + g2 + g3 );
			} );
			console.log( text );
		}
	} );
}