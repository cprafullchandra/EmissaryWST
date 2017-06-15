let gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat', {recurse : true}),
    del = require('del'),
    jsdoc = require('gulp-jsdoc3', {recurse : true}),
    minifyImg = require('gulp-imagemin'),
    uglifyJS = require('gulp-uglify');

let paths = {
  css: {
    all: 'client/css/**/*.css',
    lib: 'client/css/lib/*.css',
    native: 'client/css/*.css'
  },
  developer_docs: 'developer_docs/*.md',
  dist: {
    base: 'dist',
    css: 'dist/css',
    fonts: 'dist/fonts',
    html: 'dist',
    images: 'dist/images',
    js: 'dist/js'
  },
  docs: 'docs',
  fonts: 'client/css/lib/font-icons/**/*.{eot,svg,ttf,woff,woff2,otf}',
  html: 'client/html/*.html',
  images: 'client/images/*.{JPG,jpg,png,gif,ico}',
  js: {
    all: '**/*.js',
    client: 'client/js/**/*.js',
    lib: 'client/js/lib/**/*.js',
    native: 'client/js/*.js',
    server: 'server/**/*.js',
    test: 'test/*.js',
    util: 'util/*.js'
  }
};

/* Remove the generated dist */
gulp.task('clean', function () {
  return del([paths.dist.base, paths.docs]);
});

/* Generate documentation based off code comments */
gulp.task('doc', function() {
  return gulp.src(['README.md',
    paths.js.native,
    paths.js.server,
    paths.js.test,
    paths.js.util])
    .pipe(jsdoc());
});

/* Copy all css files */
gulp.task('copy:css', function() {
  return gulp.src(paths.css.all)
    .pipe(gulp.dest(paths.dist.css));
});

/* Copy all fonts */
gulp.task('copy:fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist.fonts));
});

/* Copy all html */
gulp.task('copy:html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist.html));
});

/* Copy all images */
gulp.task('copy:images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist.images));
});

/* Copy all client-side js */
gulp.task('copy:js', function() {
  return gulp.src(paths.js.client)
    .pipe(gulp.dest(paths.dist.js));
});

/* Copy all client-side source code */
gulp.task('copy', gulp.parallel('copy:css', 'copy:fonts', 'copy:html', 'copy:images', 'copy:js'));

/* Concatenate some css files into bundle.css and places it
 * in proper folder
 */
gulp.task('concat:css', function() {
  return gulp.src([
    paths.dist.css+'/lib/bootstrap.min.css',
    paths.dist.css+'/lib/neon.css'
    ])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(paths.dist.css));
});

/* Concatenate some native files and css files into bundleAppointments.css
 * and place it into proper folder
 */
gulp.task('concat:cssAppointment', function() {
  return gulp.src([
    paths.dist.css+'/lib/bootstrap.css',
    paths.dist.css+'/lib/neon-core.css',
    paths.dist.css+'/lib/neon-theme.css',
    paths.dist.css+'/shared-dashboard.css'
    ])
    .pipe(concat('bundleAppointments.css'))
    .pipe(gulp.dest(paths.dist.css));
});

/* Concatenate some compatible js lib files into bundle.js and
 * place it into proper folder.
 */
gulp.task('concat:js', function() {
  return gulp.src([
    paths.dist.js+'/lib/bootstrap.js',
    paths.dist.js+'/lib/joinable.js',
    paths.dist.js+'/lib/neon-custom.js',
    paths.dist.js+'/lib/gsap/TweenMax.min.js',
    paths.dist.js+'/lib/js.cookie.js',
    paths.dist.js+'/lib/socket.io.js',
    paths.dist.js+'/lib/neon-api.js',
    paths.dist.js+'/lib/handlebars-v4.0.5.js',
    paths.dist.js+'/lib/neon-slider.js',
    paths.dist.js+'/lib/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(paths.dist.js));
});

/* Concat all compatible css and js files together */
gulp.task('concat', gulp.parallel('concat:css', 'concat:cssAppointment', 'concat:js'));

/* Minifies css */
gulp.task('minify:css', function() {
  return gulp.src(paths.dist.css+'/**/*.css')
    .pipe(cleanCSS({level: 0, compatibility: '*'}))
    .pipe(gulp.dest(paths.dist.css));
});

/* Minifies images */
gulp.task('minify:images', function() {
  return gulp.src(paths.dist.images+'/*')
    .pipe(minifyImg())
    .pipe(gulp.dest(paths.dist.images));
});

/* Minifies js */
/* This function should handle all minification of js. Due to
 * issues with gulp-uglify and ES6 minification, we are not able
 * to use this yet. However, should this code be inherited, try
 * commenting out this function to see if it works for you. :)
 * Note* - Make sure to update your gulp-uglify package first.
 */
// gulp.task('minify:js', function() {
//   return gulp.src(paths.dist.js+'/**/*.js')
//     .pipe(uglifyJS())
//     .pipe(gulp.dest(paths.dist.js));
// });

gulp.task('minify:js', function() {
  return gulp.src(paths.dist.js+'/bundle.js')
    .pipe(uglifyJS())
    .pipe(gulp.dest(paths.dist.js));
});

/* Minify css and js */
gulp.task('minify', gulp.parallel('minify:css', 'minify:images', 'minify:js'));

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
