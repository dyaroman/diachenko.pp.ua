const gulp = require('gulp');

const htmlTask = require('./gulp-tasks/html');
const stylesTask = require('./gulp-tasks/styles');
const jsTask = require('./gulp-tasks/scripts');
const imagesTask = require('./gulp-tasks/images');
const connect = require('gulp-connect');

gulp.task('html', () => {
  console.log(`build html`);
  return htmlTask.html();
});

gulp.task('css', () => {
  console.log(`build css`);
  return stylesTask.styles();
});

gulp.task('js', () => {
  console.log(`build js`);
  jsTask.jsLibs();
  return jsTask.scripts();
});

gulp.task('images', () => {
  console.log(`build images`);
  imagesTask.favicons();
  return imagesTask.images();
});

gulp.task('server', () => {
  connect.server({
    root: `./dest/`,
    livereload: false
  });
});

gulp.task('copy', () => {
  return gulp.src([`./assets/copyToRoot/**/*.*`, `./src/assets/copyToRoot/**/*.*`])
    .pipe(gulp.dest(`./dest/`));
});

gulp.task('watch', () => {
  htmlTask.htmlWatcher();
  stylesTask.cssWatcher();
  jsTask.jsWatcher();
  imagesTask.imagesWatcher();
  gulp.task('server')();
});

gulp.task('build', (cb) => {
  const start = new Date();

  gulp.task('html')();
  gulp.task('css')();
  gulp.task('js')();
  gulp.task('images')();
  gulp.task('copy')();

  const stop = new Date();
  console.log(`Finished after ${Math.round((stop - start) * 1000) / 1000} ms`);
  cb();
});
