const gulp = require('gulp');
const util = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');

const config = require('./_config');

/**
 * build styles from '*.less' to '*.css'
 * sourcemaps only for dev env
 * autoprefixer
 * minification styles only for prod env
 */
const styles = () => gulp.src([
  `./src/css/**/*.less`,
  `!./src/css/**/_*.less`
  ])
  .pipe(config.production ? util.noop() : sourcemaps.init({
    loadMaps: true
  }))
  .pipe(less())
  .on('error', notify.onError())
  .pipe(autoprefixer({
    browsers: ['last 2 versions', 'ie 11'],
    cascade: false
  }))
  .pipe(config.production ? util.noop() : sourcemaps.write())
  .pipe(config.production ? csso() : util.noop())
  .pipe(gulp.dest(`./dest/css`));

const watcher = () => {
  console.log(`watch css in './src/css/**/*.less'`);
  return gulp.watch(`./src/scss/**/*.less`, styles);
};

const cssWatcher = gulp.series(styles, watcher);

module.exports = {styles, cssWatcher};
