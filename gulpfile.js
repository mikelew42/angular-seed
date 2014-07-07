var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	open = require('open'),
	express = require('express'),
	port = 80;

gulp.task('server', function(next){
	var server = express();
	server.use('/js', express.static(__dirname + '/public/js'));
	server.use('/css', express.static(__dirname + '/public/css'));
	server.use('/html', express.static(__dirname + '/public/html'));
	server.all('/*', function(req, res, next){
		res.sendfile('/public/index.html', {root: __dirname });
	})

	//server.use(express.static( __dirname + '/public' ));
	server.listen(port, next);
	var portStr = port == 80 ? '' : ':' + port;
	open("http://localhost" + portStr, "chrome");
});

gulp.task('default', ['server'], function(){
	var refresh = livereload();

	gulp.watch(['public/*.*', 'public/**/*.*']).on('change', function(file){
		refresh.changed(file.path);
	});

});