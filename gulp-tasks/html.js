const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const data = require('gulp-data');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const util = require('gulp-util');


const html = () => gulp
    .src([
        `./src/html/**/*.njk`,
        `!./src/html/**/_*.njk`
    ])
    .pipe(data(() => {
        return require('../options/common')
    }))
    .pipe(nunjucks.compile())
    .on('error', notify.onError())
    .pipe(rename({
        extname: ".html"
    }))
    .pipe(!!util.env.production ? htmlmin({
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        decodeEntities: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
    }) : util.noop())
    .pipe(gulp.dest(`./dest/`));

const watcher = () => gulp.watch(`./src/html/**/*.njk`, html);

const htmlWatcher = gulp.series(html, watcher);


module.exports = {
    html,
    htmlWatcher
};
