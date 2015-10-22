'use strict';

// MODULES //

var properties = require( 'properties' );


// READ ASYNC //

/**
* FUNCTION: read( path[, options,] clbk )
*	Reads the entire contents of an INI file.
*
* @param {String} path - file path
* @param {Object} [options] - function options
* @param {Function} clbk - callback to invoke after attempting to read a file
* @returns {Void}
*/
function read( path, options, clbk ) {
	var done,
		opts;

	if ( arguments.length < 3 ) {
		opts = {};
		done = options;
	} else {
		opts = options;
		done = clbk;
	}
	opts.path = true;
	opts.sections = true;
	opts.strict = true;
	opts.separators = '=';
	opts.comments = opts.comments || ';';
	properties.parse( path, opts, onRead );

	/**
	* FUNCTION: onRead( error, data )
	*	Callback invoked upon attempting to read a file.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {String} data - file data
	* @returns {Void}
	*/
	function onRead( error, data ) {
		if ( error ) {
			return done( error );
		}
		done( null, data );
	}
} // end FUNCTION read()


// EXPORTS //

module.exports = read;
