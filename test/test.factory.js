'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = {
	'meta': {
		'total': 1,
		'success': 1,
		'failure': 0
	},
	'data': {
		'dstructs-matrix': require( './fixtures/data.json' )
	},
	'failures': {}
};


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof factory === 'function', 'export is a function' );
	t.end();
});

test( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		factory( null, noop );
	}
	function bar() {
		factory( {'packages':null}, noop );
	}
});

test( 'the function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( opts, value );
		};
	}
});

test( 'function returns a function', function test( t ) {
	t.equal( typeof factory( getOpts(), noop ), 'function', 'returns a function' );
	t.end();
});

test( 'if a `port` option is not specified and the protocol is `https`, the default port is `443`', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'npm-registry-package-info': pkginfo
	});

	opts = getOpts();
	opts.protocol = 'https';
	delete opts.port;

	fcn = factory( opts, noop );
	fcn();

	function pkginfo( opts ) {
		t.equal( opts.port, 443, 'sets the default port to `443` for HTTPS' );
		t.end();
	}
});

test( 'if a `port` option is not specified and the protocol is `http`, the default port is `80`', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'npm-registry-package-info': pkginfo
	});

	opts = getOpts();
	opts.protocol = 'http';
	delete opts.port;

	fcn = factory( opts, noop );
	fcn();

	function pkginfo( opts ) {
		t.equal( opts.port, 80, 'sets the default port to `80` for HTTP' );
		t.end();
	}
});

test( 'function returns a function which returns an error to a provided callback if an error is encountered when fetching repository urls', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'npm-registry-package-info': pkginfo
	});

	opts = getOpts();
	fcn = factory( opts, done );
	fcn();

	function pkginfo( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

test( 'function returns a function which returns a package hash containing urls to a provided callback', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'npm-registry-package-info': pkginfo
	});

	expected = {
		'meta': {
			'total': 1,
			'success': 1,
			'failure': 0
		},
		'data': {
			'dstructs-matrix': 'git://github.com/dstructs/matrix.git'
		},
		'failures': {}
	};

	opts = getOpts();
	fcn = factory( opts, done );
	fcn();

	function pkginfo( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, data );
		}
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
