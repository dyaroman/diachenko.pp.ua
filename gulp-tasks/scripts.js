const gulp = require('gulp');
const util = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const notify = require('gulp-notify');

const config = require('./_config');

/**
 * build scripts
 * sourcemaps only for dev env
 * transpaling es6 to es5 (for old browser)
 * minification scripts only for prod env
 */
const scripts = () => gulp.src([
  `./src/js/**/*.js`,
  `!./src/js/**/_*.js`,
  `!./src/js/libs/**/*.*`
  ])
  .pipe(config.production ? util.noop() : sourcemaps.init({
    loadMaps: true
  }))
  .pipe(babel())
  .on('error', notify.onError())
  .pipe(config.production ? util.noop() : sourcemaps.write())
  .pipe(config.production ? uglify() : util.noop())
  .pipe(gulp.dest(`./dest/js/`));

/**
 * Copy js files without changes from `src` to `dest`.
 * It is useful for libs like `jQuery`, `slick-slider` or etc.
 */
const jsLibs = () => gulp.src(`./src/js/libs/**/*.js`)
  .pipe(gulp.dest(`./dest/js/libs/`));

const watcher = () => {
  console.log(`watch js in './src/js/**/*.js'`);
  return gulp.watch(`./src/js/**/*.js`, scripts);
};

const jsWatcher = gulp.series(scripts, jsLibs, watcher);

module.exports = {scripts, jsWatcher, jsLibs};
