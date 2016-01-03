'use strict';

// MODULES //

var getUrl = require( './geturl.js' );


// TRANSFORM //

/**
* FUNCTION: transform( results )
*	Transforms raw package info results.
*
* @param {Object} results - package info results
* @returns {Object} transformed results
*/
function transform( results ) {
	var keys;
	var i;

	keys = Object.keys( results.data );
	for ( i = 0; i < keys.length; i++ ) {
		results.data[ keys[i] ] = getUrl( results.data[ keys[i] ] );
	}
	return results;
} // end FUNCTION transform()


// EXPORTS //

module.exports = transform;
