'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var noop = require( '@kgryte/noop' );
var data = require( './data.json' );


// RESPONSE //

/**
* FUNCTION: Response( statusCode, body )
*	Mock HTTP response constructor.
*
* @constructor
* @param {Number} statusCode - mock status code
* @param {String} body - mock response body
* @returns {Response} mock HTTP response object
*/
function Response( statusCode, body ) {
	var self;
	if ( !( this instanceof Response ) ) {
		return new Response( statusCode );
	}
	EventEmitter.call( this );
	this.statusCode = statusCode;

	self = this;
	setTimeout( onTimeout, 0 );

	return this;

	/**
	* FUNCTION: onTimeout()
	*	Callback invoked in the next event loop.
	*
	* @private
	* @returns {Void}
	*/
	function onTimeout() {
		var d;
		if ( statusCode !== 200 ) {
			if ( statusCode === 404 ) {
				d = '{}';
			} else {
				d = 'bad request';
			}
			self.emit( 'data', d );
			return self.emit( 'end' );
		}
		if ( body ) {
			d = body;
		} else {
			d = JSON.stringify( data );
		}
		self.emit( 'data', d );
		self.emit( 'end' );
	}
} // end FUNCTION Response()

Response.prototype = Object.create( EventEmitter.prototype );

Response.prototype.constructor = Response;

Response.prototype.setEncoding = noop;


// EXPORTS //

module.exports = Response;
