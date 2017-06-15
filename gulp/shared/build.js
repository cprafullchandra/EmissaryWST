let uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    htmlify = require('gulp-angular-htmlify'),
    cleanCSS = require('gulp-clean-css'),
    ngAnnotate = require('gulp-ng-annotate');

let gulp = require('gulp');


gulp.task('htmlify' ,function(){
  return gulp.src('./dist/**/ /* *.html')
    .pipe(htmlify())
    .pipe(gulp.dest('./dist/'));
});


gulp.task('ng-annotate', ['concat:js'], function () {
  return gulp.src('dist/bundle.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-css', ['concat:cssAppointment'], function() {
  return gulp.src('./dist/assets/css/bundleAppointments.css')
    .pipe(cleanCSS({level: 0, compatibility: '*'}))
    .pipe(gulp.dest('./dist/assets/css'));
});

/* Minify bundle.js */
gulp.task('minify:js', ['ng-annotate'], function() {
  return gulp.src('./dist/assets/js/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'));
});

/* Build the app without minification */
gulp.task('build:dev', ['dist', 'doc', 'minify:js', 'minify-css']);

/* Build the app and minfy */
gulp.task('build:prod', ['dist', 'minify:js', /*'minify:css',*/ 'htmlify']);
