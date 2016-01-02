'use strict';

var ls = require( 'npm-list-author-packages' );
var urls = require( './../lib' );

var opts = {
	'username': 'kgryte'
};

ls( opts, onList );

function onList( error, list ) {
	var opts;
	if ( error ) {
		throw error;
	}
	if ( !list.length ) {
		return {};
	}
	opts = {
		'packages': list
	};
	urls( opts, onUrls );
}

function onUrls( error, data ) {
	if ( error ) {
		throw error;
	}
	console.dir( data );
}
