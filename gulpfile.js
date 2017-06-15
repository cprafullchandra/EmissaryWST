let gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat', {recurse : true}),
    del = require('del'),
    jsdoc = require('gulp-jsdoc3', {recurse : true}),
    minifyImg = require('gulp-imagemin'),
    uglifyJS = require('gulp-uglify');

let paths = {
  html: 'client/assets/views/*.html',
  images: 'client/assets/images/*.{JPG,jpg,png,gif,ico}',
  css: 'client/**/*.css',
  font: 'client/assets/css/font-icons/entypo/font/*',
  js: 'client/**/*.js'
};

/* Remove the generated dist */
gulp.task('clean', function () {
  return del('./dist');
});

/* Generate documentation based off code comments */
gulp.task('doc', function() {
   gulp.src(['README.md',
   "./client/assets/native/js/*.js",
   "./server/*.js",
   "./server/config/*.js",
   "./server/models/*.js",
   "./server/notification/*.js",
   "./server/routes/*",
   "./server/socket/*.js",
   "./server/test/*.js"])
   .pipe(jsdoc());
});

/* Copy all client source code over */
gulp.task('copy', function () {
  return gulp.src('./client/**')
    .pipe(gulp.dest('./dist/'));
});

/* Concatenate all css files into bundle.css and places it
 * in dist/assets folder
 */
gulp.task('concat:css', function() {
  return gulp.src([
    './client/assets/css/bootstrap.min.css',
    './client/assets/css/neon.css'
    ])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('concat:cssAppointment', function() {
  return gulp.src([
    './client/assets/css/bootstrap.css',
    './client/assets/css/neon-core.css',
    './client/assets/css/neon-theme.css',
    './client/assets/native/css/shared-dashboard.css'
    ])
    .pipe(concat('bundleAppointments.css'))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('concat:js', function() {
  return gulp.src([
    './client/assets/js/bootstrap.js',
    './client/assets/js/joinable.js',
    './client/assets/js/neon-custom.js',
    './client/assets/js/gsap/TweenMax.min.js',
    './client/assets/js/js.cookie.js',
    './client/assets/js/socket.io.js',
    './client/assets/js/neon-api.js',
    './client/assets/js/handlebars-v4.0.5.js',
    './client/assets/js/neon-slider.js',
    './client/assets/js/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./dist/assets/js'));
});

/* Concat all compatible css and js files together */
gulp.task('concat', gulp.parallel('concat:css', 'concat:cssAppointment', 'concat:js'));

/* Minifes the css to bundleAppointments.css */
gulp.task('minify:css', function() {
  return gulp.src('./dist/assets/css/bundleAppointments.css')
    .pipe(cleanCSS({level: 0, compatibility: '*'}))
    .pipe(gulp.dest('./dist/assets/css'));
});

/* Minifies the javascript to bundle.js */
gulp.task('minify:js', function() {
  return gulp.src('./dist/assets/js/bundle.js')
    .pipe(uglifyJS())
    .pipe(gulp.dest('./dist/assets/js'));
});

/* Minify css and js */
gulp.task('minify', gulp.parallel('minify:css', 'minify:js'));

/* Build the app without minification
 * First clean is called to remove any stale code
 * Dist is then called which runs the majority of gulp functions
 * involved with distribution of the code.
 * Lastly code-based docs are generated for debugging purposes.
 */
gulp.task('dev', gulp.series('clean', 'copy', 'concat', 'doc'));

/* Build the app and minify
 * First clean is called to ensure a new environment
 * Dist is then called which runs the majority of gulp functions
 * involved with the distribution of the code.
 * Lastly the code is prepared for production by minifying the css/js and images.
 */
gulp.task('prod', gulp.series('clean', 'copy', 'concat', 'minify'));

/* The default task */
gulp.task('default', gulp.series('prod'));
