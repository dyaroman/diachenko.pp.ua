const gulp = require('gulp');
const util = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');

const config = require('./_config');

/**
 * build styles from '*.scss' to '*.css'
 * sourcemaps only for dev env
 * autoprefixer
 * minification styles only for prod env
 */
const styles = () => gulp.src([
  `./src/scss/**/*.scss`,
  `!./src/scss/**/_*.scss`
  ])
  .pipe(config.production ? util.noop() : sourcemaps.init({
    loadMaps: true
  }))
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .on('error', notify.onError())
  .pipe(autoprefixer({
    browsers: ['last 2 versions', 'ie 11'],
    cascade: false
  }))
  .pipe(config.production ? util.noop() : sourcemaps.write())
  .pipe(config.production ? csso() : util.noop())
  .pipe(gulp.dest(`./dest/css`));

const watcher = () => {
  console.log(`watch css in './src/scss/**/*.scss'`);
  return gulp.watch(`./src/scss/**/*.scss`, styles);
};

const cssWatcher = gulp.series(styles, watcher);

module.exports = {styles, cssWatcher};
