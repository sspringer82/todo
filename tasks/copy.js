module.exports = gulp => {
  gulp.task('copy:api', () => {
    return gulp.src(['api/**/*']).pipe(gulp.dest('dist/'));
  });
  gulp.task('copy:angularSrc', () => {
    return (
      gulp.src(['angular/**/*']).pipe(gulp.dest('dist/angular')) &&
      gulp.src(['angular/**/.*']).pipe(gulp.dest('dist/angular'))
    );
  });
  gulp.task('copy:angularDist', () => {
    return gulp
      .src(['dist/angular/dist/**/*'])
      .pipe(gulp.dest('dist/dist/public'));
  });
};
