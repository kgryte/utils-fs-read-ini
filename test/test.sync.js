/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	reviver = require( './fixtures/reviver.js' ),
	basic = require( './fixtures/basic.json' ),
	data = require( './fixtures/data.json' ),
	read = require( './../lib/sync.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'sync', function tests() {

	var file = path.join( __dirname, 'fixtures', 'config.ini' ),
		bad = path.join( __dirname, 'fixtures', 'bad.ini' );

	it( 'should export a function', function test() {
		expect( read ).to.be.a( 'function' );
	});

	it( 'should read an INI file', function test() {
		var actual = read( file );
		assert.deepEqual( actual, basic );
	});

	it( 'should read an INI file using provided options', function test() {
		var actual;

		// String options:
		actual = read( file, 'utf8' );

		assert.deepEqual( actual, basic );

		// Object options:
		actual = read( file, {
			'encoding': 'utf8',
			'reviver': reviver
		});

		assert.deepEqual( actual, data );
	});

	it( 'should return an error', function test() {
		var out = read( 'beepboopbapbop' );

		assert.isTrue( out instanceof Error );
		assert.strictEqual( out.code, 'ENOENT' );
	});

	it( 'should return an error (options)', function test() {
		var out;

		out = read( 'beepboopbapbop', 'utf8' );
		assert.isTrue( out instanceof Error );


		out = read( 'beepboopbapbop', {
			'encoding': 'utf8'
		});
		assert.isTrue( out instanceof Error );
	});

	it( 'should return an error if unable to parse file data as INI', function test() {
		var out = read( bad );
		assert.isTrue( out instanceof Error );
	});

});
