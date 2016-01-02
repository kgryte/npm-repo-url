'use strict';

// MODULES //

var test = require( 'tape' );
var get = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof get === 'function', 'main export is a function' );
	t.end();
});
