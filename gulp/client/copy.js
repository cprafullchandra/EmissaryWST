var gulp = require('gulp');


gulp.task('copy:assets', function () {
  return gulp.src('./client/assets/**')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy:images', function () {
  return gulp.src('./client/assets/images/**/*.*')
     .pipe(gulp.dest('./dist/images'));
});

gulp.task('copy:bower-components', function () {
  return gulp.src('./client/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});