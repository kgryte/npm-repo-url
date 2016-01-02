Repository URLs
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Get package repository URLs.


## Installation

``` bash
$ npm install npm-package-repo-url
```


## Usage

``` javascript
var urls = require( 'npm-package-repo-url' );
```

#### urls( opts, clbk )

Get package repository URLs.

``` javascript
var opts = {
	'packages': [
		'dstructs-matrix',
		'compute-erf',
		'utils-copy'
	]	
};

urls( opts, clbk );

function clbk( error, data ) {
	if ( error ) {
		throw error;
	}
	console.dir( data );
	/*
		{
			"dstructs-matrix": "...",
			"compute-erf": "...",
			"utils-copy": "..."
		}
	*/
}
```

The `function` accepts the following `options`:

*	__packages__: `array` of package names (*required*).
*	__registry__: registry. Default: `'registry.npmjs.org'`.
*	__port__: registry port. Default: `80`.
* 	__protocol__: registry protocol. Default: `'http'`.

To query an alternative registry, set the relevant options.

``` javascript
var opts = {
	'packages': [
		'dstructs-array',
		'flow-map',
		'utils-merge2'
	],
	'registry': 'my.favorite.npm/registry',
	'port': 80,
	'protocol': 'https'
};

urls( opts, clbk );
```


## Examples

``` javascript
var ls = require( 'npm-list-author-packages' );
var urls = require( 'npm-package-repo-url' );

var opts = {
	'username': 'kgryte'
};

ls( opts, onList );

function onList( error, list ) {
	if ( error ) {
		throw error;
	}
	urls( list, onUrls );
}

function onUrls( error, data ) {
	if ( error ) {
		throw error;
	}
	console.dir( data );
}
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g npm-package-repo-url
```


### Usage

``` bash
Usage: pkgrepo [options] pkg1 pkg2 ...

Options:

  -h,  --help                Print this message.
  -V,  --version             Print the package version.
  -p,  --port port           Registry port. Default: 80.
       --registry registry   Registry. Default: 'registry.npmjs.org'.
       --protocol protocol   Registry protocol. Default: 'http'.
```


### Examples

``` bash
$ DEBUG=* pkgrepo dstructs-matrix compute-erf utils-copy
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/npm-package-repo-url.svg
[npm-url]: https://npmjs.org/package/npm-package-repo-url

[build-image]: http://img.shields.io/travis/kgryte/npm-package-repo-url/master.svg
[build-url]: https://travis-ci.org/kgryte/npm-package-repo-url

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/npm-package-repo-url/master.svg
[coverage-url]: https://codecov.io/github/kgryte/npm-package-repo-url?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/npm-package-repo-url.svg
[dependencies-url]: https://david-dm.org/kgryte/npm-package-repo-url

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/npm-package-repo-url.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/npm-package-repo-url

[github-issues-image]: http://img.shields.io/github/issues/kgryte/npm-package-repo-url.svg
[github-issues-url]: https://github.com/kgryte/npm-package-repo-url/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com
