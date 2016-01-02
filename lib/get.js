'use strict';

// MODULES //

var debug = require( 'debug' )( 'npm-package-repo-url:get' );
var request = require( './request.js' );
var transform = require( './transform.js' );


// VARIABLES //

var NUM_CONCURRENT_REQUESTS = 20;


// GET //

/**
* FUNCTION: get( opts, clbk )
*	Get repository URLs.
*
* @param {Object} opts - options
* @param {Function} clbk - callback to invoke after getting URLs
* @returns {Void}
*/
function get( opts, clbk ) {
	var count;
	var pkgs;
	var urls;
	var idx;
	var len;
	var i;

	urls = {}; // output data store
	count = 0; // number of completed requests
	idx = 0;   // request id

	pkgs = opts.packages;
	len = pkgs.length;

	debug( 'Number of packages: %d.', len );
	debug( 'Beginning queries...' );
	for ( i = 0; i < NUM_CONCURRENT_REQUESTS; i++ ) {
		next();
	}
	/**
	* FUNCTION: next()
	*	Requests package data for the next package in the queue. Once requests for all desired packages have completed, invokes the provided callback.
	*
	* @private
	* @returns {Void}
	*/
	function next() {
		if ( count === len ) {
			debug( 'Finished all queries.' );
			return clbk( null, urls );
		}
		if ( idx < len ) {
			debug( 'Querying for package: `%s` (%d)...', pkgs[idx], idx );
			request( pkgs[idx], opts, onResponse( pkgs[idx], idx ) );
			idx += 1;
		}
	} // end FUNCTION next()

	/**
	* FUNCTION: onResponse( pkg, idx )
	*	Returns a response callback.
	*
	* @private
	* @param {String} pkg - package name
	* @param {Number} idx - request index
	* @returns {Function} response callback
	*/
	function onResponse( pkg, idx ) {
		/**
		* FUNCTION: onResponse( error, data )
		*	Callback invoked upon receiving a request response.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object} data - response data
		* @returns {Void}
		*/
		return function onResponse( error, data ) {
			var url;
			debug( 'Response received for package: `%s` (%d).', pkg, idx );
			if ( error ) {
				if ( error instanceof Error ) {
					return clbk( error );
				}
			} else {
				url = transform( data );
				urls[ pkg ] = url;
				debug( 'Repository URL for package `%s` (%d): %s', pkg, idx, url );
			}
			count += 1;
			debug( 'Request %d of %d complete.', count, len );
			next();
		}; // end FUNCTION onResponse()
	} // end FUNCTION onResponse()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
