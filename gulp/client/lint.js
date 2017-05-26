var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    htmlhint = require('gulp-htmlhint'),
    csslint  = require('gulp-csslint');

gulp.task('lint:client', function() {
  return gulp.src(['./client/app/**/*.js'])
    .pipe(jshint('./client/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


/* This will validate the html files
 */
gulp.task('lint:html', function(){
  return gulp.src(['./client/assets/native/*.html', 
      './client/assets/views/*.html'])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
});

/* This will validate the css files
 */
gulp.task('lint:css', function() {
  gulp.src('client/assets/native/css/*.css')
    .pipe(csslint())
    .pipe(csslint.formatter());
});
