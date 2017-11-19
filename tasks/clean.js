const del = require('del');

module.exports = gulp => {
  gulp.task('clean:dist', () => {
    return del(['/dist']);
  });
};
