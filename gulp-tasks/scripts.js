const gulp = require('gulp');
const util = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const notify = require('gulp-notify');

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
    .pipe(!!util.env.production ? util.noop() : sourcemaps.init({
        loadMaps: true
    }))
    .pipe(babel())
    .on('error', notify.onError())
    .pipe(!!util.env.production ? util.noop() : sourcemaps.write())
    .pipe(!!util.env.production ? uglify() : util.noop())
    .pipe(gulp.dest(`./dest/js/`));

/**
 * Copy js files without changes from `src` to `dest`.
 * It is useful for libs like `jQuery`, `slick-slider` or etc.
 */
const jsLibs = () => gulp.src(`./src/js/libs/**/*.js`)
    .pipe(gulp.dest(`./dest/js/libs/`));

const watcher = (cb) => {
    console.log(`watch js in './src/js/**/*.js'`);
    gulp.watch(`./src/js/**/*.js`, scripts);
    return cb();
};

const jsWatcher = gulp.series(scripts, jsLibs, watcher);


module.exports = {
    scripts,
    jsWatcher,
    jsLibs
};
