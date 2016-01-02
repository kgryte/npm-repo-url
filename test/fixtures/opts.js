'use strict';

function getOpts() {
	var opts = {
		'packages': [
			'beep',
			'boop'
		],
		'registry': 'registry.npmjs.org',
		'port': 80,
		'protocol': 'http'
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
