'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var transform = require( './../lib/transform.js' );


// FIXTURES //

var data = require( './fixtures/data.json' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof transform === 'function', 'export is a function' );
	t.end();
});

test( 'the transform returns `null` if provided an empty object', function test( t ) {
	var actual = transform( {} );
	t.equal( actual, null, 'returns null' );
	t.end();
});

test( 'if a repository field is a string, the transform returns the field value', function test( t ) {
	var actual = transform({
		'name': 'dstructs-matrix',
		'repository': 'beep/boop'
	});

	t.equal( actual, 'beep/boop', 'returns repository value' );
	t.end();
});

test( 'if a repository field is an object having a `url` field, the transform returns the `url` field value', function test( t ) {
	var actual = transform( data );

	t.equal( actual, 'git://github.com/dstructs/matrix.git', 'returns url field value' );
	t.end();
});

test( 'if a repository field does not exist, the transform returns `null`', function test( t ) {
	var actual = transform({
		'name': 'dstructs-matrix'
	});
	t.equal( actual, null, 'returns null when no repository field' );
	t.end();
});

test( 'if a repository `url` field does not exist, the transform returns `null`', function test( t ) {
	var actual = transform({
		'name': 'dstructs-matrix',
		'repository': {}
	});
	t.equal( actual, null, 'returns null when no url field' );
	t.end();
});
