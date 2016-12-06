const gulp = require('gulp');
const nodemon = require('nodemon');


gulp.task('nodemon', function(cb) {
	runNodemon(cb)
})

function runNodemon(cb,debug) {
	debug = debug || false;
	var called = false;
	return nodemon({
		// ext: 'html js',
		script: 'index.js',
		nodeArgs: debug ? '--debug' : '',
		watch: [
			'index.js',
		],
		env: {
			'PORT': process.env.PORT || 3000
		}
	}).
	on('start', function() {
		if (!called) {
			called = true;
			cb();
		}
	})
	.on('restart', function(files) {
		console.log('Nodemon restarted after these files changed',files)
	})
}


gulp.task('default', ['nodemon'])