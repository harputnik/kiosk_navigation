var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minify = require('gulp-minify');

gulp.task('compress', function() {
  gulp.src('src/scripts/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.min.js'
        },
    }))
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('less', function () {
  return gulp.src('./src/style/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/style/**/*.less', ['less']);
});
