const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const data = require('gulp-data');
const merge = require('deepmerge');
const notify = require('gulp-notify');
const rename = require('gulp-rename');

/**
 * build '*.html' from '*.njk'
 * insert variables from 'options.js' to templates
 */
const html = () => {
  return gulp.src([
    `./src/html/**/*.njk`,
    `!./src/html/**/_*.njk`
    ])
    .pipe(data(() => {
      return require('../assets/options.js')
    }))
    .pipe(nunjucks.compile())
    .on('error', notify.onError())
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(`./dest/`));
};

const watcher = () => {
  console.log(`watch html in './src/html/**/*.njk'`);
  return gulp.watch(`./src/html/**/*.njk`, html);
};
const htmlWatcher = gulp.series(html, watcher);

module.exports = {html, htmlWatcher};
