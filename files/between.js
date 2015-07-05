function getBetweenRegex( start, end, recur, optim, noEscape, lang ) {
	var res;
	if ( !noEscape ) {
		start = reEscape( start );
		end = reEscape( end );
	};
	if ( recur ) {

	} else {
		if ( optim ) {
			
		} else {
			res = start + ".*?" + end;
		}		
	};
	return res;
};

function easyConvertPCRE2JavaScript( re ) {
	// регулярка пропускает: что-то экранированное, что-то внутри символьного класса, а совпав с точкой заменяет ее
	return re.replace( /(?:\\[\s\S]|\[(?:\\[\s\S]|[^\]])*\]|\.)/g, function( text ) {
		return ( text == "." ) ? "[\\s\\S]" : text;
	} );
};

function reEscape( text ) {
	return ( text +'' ).replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}