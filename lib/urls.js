'use strict';

// MODULES //

var factory = require( './factory.js' );


// URLS //

/**
* FUNCTION: urls( options, clbk )
*	Get repository URLs for one or more packages.
*
* @param {Object} options - function options
* @param {String[]} options.packages - package names
* @param {String} [options.registry="registry.npmjs.org"] - registry
* @param {Number} [options.port=80] - registry port
* @param {String} [options.protocol="http"] - registry protocol
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function urls( options, clbk ) {
	factory( options, clbk )();
} // end FUNCTION urls()


// EXPORTS //

module.exports = urls;
