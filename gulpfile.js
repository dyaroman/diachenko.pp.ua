const options = require('./assets/options.js');

const gulp = require('gulp');
const connect = require('gulp-connect');
const puppeteer = require('puppeteer');

const htmlTask = require('./gulp-tasks/html');
const stylesTask = require('./gulp-tasks/styles');
const imagesTask = require('./gulp-tasks/images');

gulp.task('html', () => {
  console.log(`build html`);
  return htmlTask.html();
});

gulp.task('css', () => {
  console.log(`build css`);
  return stylesTask.styles();
});

gulp.task('images', () => {
  console.log(`build images`);
  return imagesTask.images();
});

gulp.task('server', () => {
  connect.server({
    root: `./dest/`,
    livereload: false
  });
});

gulp.task('watch', () => {
  htmlTask.htmlWatcher();
  stylesTask.cssWatcher();
  imagesTask.imagesWatcher();
  gulp.task('server')();
});

gulp.task('pdf', () => {
  gulp.task('server')();

  const exit = process.exit;

  (async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`http://localhost:8080`, {
      waitUntil: 'networkidle2'
    });
    await page.emulateMedia('print');
    await page.pdf({
      path: `./dest/${options.fullName.replace(' ', '_')}.pdf`,
      format: 'A4',
      pageRanges: '1'
    });
    await exit();
    await browser.close();
  })();
});

gulp.task('copy', () => {
  return gulp.src('./src/copyInRoot/**/*')
    .pipe(gulp.dest('./dest/'));
});

gulp.task('build', (cb) => {
  gulp.task('html')();
  gulp.task('css')();
  gulp.task('images')();
  gulp.task('pdf')();
  gulp.task('copy')();

  cb();
});
