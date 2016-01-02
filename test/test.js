'use strict';

// MODULES //

var test = require( 'tape' );
var urls = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof urls === 'function', 'main export is a function' );
	t.end();
});
