'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var urls = require( './../lib/urls.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = {
	'beep': 'boop/beep',
	'bap': 'git://github.com/bop/bap.git'
};


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof urls === 'function', 'export is a function' );
	t.end();
});

test( 'function returns an error to a provided callback if an error is encountered when fetching repository urls', function test( t ) {
	var opts;
	var urls;

	urls = proxyquire( './../lib/urls.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	urls( opts, done );

	function factory( opts, clbk ) {
		return function urls() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( new Error( 'beep' ) );
			}
		};
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

test( 'function returns a package hash containing repository urls to a provided callback', function test( t ) {
	var expected;
	var opts;
	var urls;

	urls = proxyquire( './../lib/urls.js', {
		'./factory.js': factory
	});

	expected = {
		'beep': 'boop/beep',
		'bap': 'git://github.com/bop/bap.git'
	};

	opts = getOpts();
	urls( opts, done );

	function factory( opts, clbk ) {
		return function urls() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
