const exec = require('child_process').exec;

module.exports = gulp => {
  gulp.task('exec:tsc', cb => {
    exec('cd dist; npm run build', (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });
  gulp.task('exec:ngBuild', cb => {
    exec(
      'cd dist/angular; npm run build',
      { maxBuffer: 1024 * 500 },
      (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      },
    );
  });
  gulp.task('exec:run', cb => {
    exec('cd dist/dist; node index.js', (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });
};
