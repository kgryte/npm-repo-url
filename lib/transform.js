'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// NOTES //

/* Raw data...
	{
		"_id": "dstructs-matrix",
		"_rev": "...",
		"name": "dstructs-matrix",
		"description": "Matrices.",
		...
		"repository": {
			"type": "git",
			"url": "git://github.com/dstructs/matrix.git"
		},
		...
	}
*/


// TRANSFORM //

/**
* FUNCTION: transform( pkg )
*	Transforms raw response data.
*
* @param {Object} pkg - response data
* @returns {String|Null} repository URL or null
*/
function transform( pkg ) {
	// {}
	if ( !pkg.name ) {
		return null;
	}
	// "repository": "dstructs/array"
	if ( isString( pkg.repository ) ) {
		return pkg.repository;
	}
	/*
		"repository": {
			"type": "git",
			"url": "git://github.com/flow-io/map.git"
		}
	*/
	if ( pkg.repository && pkg.repository.url ) {
		return pkg.repository.url;
	}
	return null;
} // end FUNCTION transform()


// EXPORTS //

module.exports = transform;
