INI
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Reads the entire contents of an [INI](https://en.wikipedia.org/wiki/INI_file) file.


## Installation

``` bash
$ npm install utils-fs-read-ini
```


## Usage

``` javascript
var read = require( 'utils-fs-read-ini' );
```

#### read( path, [ options,] clbk )

Reads the entire contents of an [INI](https://en.wikipedia.org/wiki/INI_file) file.

``` javascript
read( '/path/to/data.ini', onData );

function onData( error, data ) {
	if ( error ) {
		console.error( error );
	} else {
		console.log( data );
	}
}
```

The `function` accepts the same options as [`properties#parse`](https://github.com/gagle/node-properties#parse), except

-	`path` is __always__ `true`.
-	`sections` is __always__ `true`.
-	`strict` is __always__ `true`.
-	`separators` is __always__ `'='`.
-	`comments`, by default, begin with `';'`.

``` javascript
var opts = {
	'comments': [ ';', '#' ]
};

read( '/path/to/data.ini', opts, onData );

function onData( error, data ) {
	if ( error ) {
		console.error( error );
	} else {
		console.log( data );
	}
}
```


#### read.sync( path[, options] )

Synchronously reads the contents of an entire [INI](https://en.wikipedia.org/wiki/INI_file) file.

``` javascript
var out = read.sync( '/path/to/data.ini' );
if ( out instanceof Error ) {
	throw out;
}
console.log( out );
```

The `function` accepts the same options as [`fs.readFileSync()`](https://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options) as well as [utils-ini-parse](https://github.com/kgryte/utils-ini-parse/) options.



## Examples

``` javascript
var path = require( 'path' ),
	read = require( 'utils-fs-read-ini' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-fs-read-ini.svg
[npm-url]: https://npmjs.org/package/utils-fs-read-ini

[travis-image]: http://img.shields.io/travis/kgryte/utils-fs-read-ini/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-fs-read-ini

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/utils-fs-read-ini/master.svg
[codecov-url]: https://codecov.io/github/kgryte/utils-fs-read-ini?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-fs-read-ini.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-fs-read-ini

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-fs-read-ini.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-fs-read-ini

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-fs-read-ini.svg
[github-issues-url]: https://github.com/kgryte/utils-fs-read-ini/issues
