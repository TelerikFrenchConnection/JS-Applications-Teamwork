System.config({
	transpiler: "babel",
	babelOptions: {
		optional: [
			"runtime"
		]
	},
	map: {
		babel: 'lib/node_modules/babel-core/browser.min.js',
		jquery: 'lib/bower_components/jquery/dist/jquery.min.js',
		sammy: 'lib/bower_components/sammy/lib/min/sammy-latest.min.js',
		q: 'lib/bower_components/q/q.js',
		chai: 'lib/bower_components/chai/chai.js',
		handlebars: 'lib/bower_components/handlebars/handlebars.min.js',
		underscore: 'lib/bower_components/underscore/underscore-min.js'
	}
});