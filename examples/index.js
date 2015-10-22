'use strict';

var path = require( 'path' ),
	read = require( './../lib' );


var file = path.join( __dirname, 'config.ini' );

/**
* INI reviver.
*
* @param {String} key - key
* @param {String} value - value
* @param {String} section - section
* @returns {*} revived value
*/
function reviver( key, value ) {
	/* jshint validthis:true */
	var vals;

	// Do not split section lines...
	if ( this.isSection ) {
		return this.assert();
	}
	// Split comma-delimited strings...
	if ( typeof value === 'string' ){
		vals = value.split( ',' );
		return ( vals.length === 1 ) ? value : vals;
	}
	// Do not split the rest of the lines:
	return this.assert();
}

// Sync:
var data = read.sync( file, {
	'reviver': reviver
});
// returns <object>

console.log( data instanceof Error );
// returns false

data = read.sync( 'beepboop' );
// returns <error>

console.log( data instanceof Error );
// returns true


// Async:
read( file, {
	'reviver': reviver
}, onRead );
read( 'beepboop', onRead );

function onRead( error, config ) {
	if ( error ) {
		if ( error.code === 'ENOENT' ) {
			console.error( 'INI file does not exist.' );
		} else {
			throw error;
		}
	} else {
		console.log( 'Port: %s.', config.server.port );
	}
}
