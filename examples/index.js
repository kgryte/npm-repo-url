'use strict';

var ls = require( 'npm-list-author-packages' );
var urls = require( './../lib' );

var opts = {
	'username': 'kgryte'
};

ls( opts, onList );

function onList( error, list ) {
	if ( error ) {
		throw error;
	}
	urls( list, onUrls );
}

function onUrls( error, data ) {
	if ( error ) {
		throw error;
	}
	console.dir( data );
}
