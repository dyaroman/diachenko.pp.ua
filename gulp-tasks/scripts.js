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
const scripts = () => gulp
    .src([
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

const watcher = () => gulp.watch(`./src/js/**/*.js`, scripts);

const jsWatcher = gulp.series(scripts, watcher);


module.exports = {
    scripts,
    jsWatcher
};
