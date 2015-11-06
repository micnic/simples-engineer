'use strict';

// Temporary Object.assign polyfill to be used until V8 fully supports ES6
function assign(target) {

	if (target === undefined || target === null) {
		throw new TypeError('Cannot convert first argument to object');
	}

	var to = Object(target);
	for (var i = 1; i < arguments.length; i++) {
		var nextSource = arguments[i];
		if (nextSource === undefined || nextSource === null) {
			continue;
		}
		nextSource = Object(nextSource);

		var keysArray = Object.keys(nextSource);
		for (var j = 0, len = keysArray.length; j < len; j++) {
			var nextKey = keysArray[j];
			var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
			if (desc !== undefined && desc.enumerable) {
				to[nextKey] = nextSource[nextKey];
			}
		}
	}
	return to;
}

// Export the template engine wrapper creator
module.exports = function (name, options) {

	var engine = require(name),
		wrapper = {};

	// Set default options as an empty object
	if (!options || typeof options !== 'object') {
		options = {};
	}

	// Check if the template engine is supported and create the wrapper render
	if (name === 'ejs') {
		wrapper.render = function (location, imports, callback) {

			// Create the wrapped callback
			function wcallback(error, result) {
				if (error) {
					callback(error.stack);
				} else {
					callback(result);
				}
			};

			// Call the template engine render method
			engine.renderFile(location, imports, options, wcallback);
		};
	} else if (name === 'jade' || name === 'swig') {
		wrapper.render = function (location, imports) {
			return engine.renderFile(location, assign(options, imports));
		};
	} else if (name === 'hamljs') {
		wrapper.render = function (location, imports, callback) {

			var wimports = assign(options, imports);

			// Create the wrapped callback
			function wcallback(error, result) {
				if (error) {
					callback(error.stack);
				} else {
					callback(result);
				}
			};

			engine.renderFile(location, 'utf8', wimports, wcallback);
		};
	} else if (name === 'blade' || name === 'twig' || engine.__express) {
		wrapper.render = function (location, imports, callback) {

			var wimports = assign(options, imports);

			// Create the wrapped callback
			function wcallback(error, result) {
				if (error) {
					callback(error.stack);
				} else {
					callback(result);
				}
			};

			// Call the template engine render method
			engine.__express(location, wimports, wcallback);
		};
	}

	return wrapper;
};