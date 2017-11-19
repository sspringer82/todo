const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

require('./tasks/clean')(gulp);
require('./tasks/copy')(gulp);
require('./tasks/exec')(gulp);

// create database backup
// delete dist folder
// copy api to dist
// transpile api
// copy angular to dist
// ng build
// copy built angular to public

gulp.task(
  'build',
  gulpSequence(
    'clean:dist',
    'copy:api',
    'exec:tsc',
    'copy:angularSrc',
    'exec:ngBuild',
    'copy:angularDist',
  ),
);

gulp.task('run', ['exec:run']);

gulp.task('default', gulpSequence('build', 'run'));
