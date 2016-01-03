'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var transform = require( './../lib/transform.js' );


// FIXTURES //

var results = {
	'meta': {
		'total': 3,
		'success': 2,
		'failure': 1
	},
	'data': {
		'dstructs-matrix': require( './fixtures/data.json' ),
		'utils-copy': {
			'name': 'utils-copy',
			'repository': 'kgryte/utils-copy'
		}
	},
	'failures': {
		'unknown_package': 'Not Found'
	}
};


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof transform === 'function', 'export is a function' );
	t.end();
});

test( 'the function transforms raw package info results by extracting repository urls (if present)', function test( t ) {
	var expected;
	var actual;

	actual = transform( results );
	expected = {
		'meta': {
			'total': 3,
			'success': 2,
			'failure': 1
		},
		'data': {
			'dstructs-matrix': 'git://github.com/dstructs/matrix.git',
			'utils-copy': 'kgryte/utils-copy'
		},
		'failures': {
			'unknown_package': 'Not Found'
		}
	};

	assert.deepEqual( actual, expected );
	t.ok( true, 'deep equal' );
	t.end();
});
