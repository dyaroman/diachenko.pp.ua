const gulp = require('gulp');
const connect = require('gulp-connect');
const puppeteer = require('puppeteer');
const nunjucks = require('gulp-nunjucks');
const data = require('gulp-data');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const util = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');

const options = require('./options/common');


const html = () => gulp
    .src([
        `./src/html/**/*.njk`,
        `!./src/html/**/_*.njk`
    ])
    .pipe(data(() => {
        return options
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

exports.html = html;


const css = () => gulp
    .src([
        `./src/css/**/*.less`,
        `!./src/css/**/_*.less`
    ])
    .pipe(!!util.env.production ? util.noop() : sourcemaps.init({
        loadMaps: true
    }))
    .pipe(less())
    .on('error', notify.onError())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie 11'],
        cascade: false
    }))
    .pipe(!!util.env.production ? util.noop() : sourcemaps.write())
    .pipe(!!util.env.production ? csso() : util.noop())
    .pipe(gulp.dest(`./dest/css`));

exports.css = css;


const images = () => gulp
    .src(`./src/images/**/*.*`)
    .pipe(gulp.dest(`./dest/images/`));

exports.images = images;


const server = () => connect.server({
    root: `./dest/`,
    livereload: false,
});

exports.server = server;


const pdf = async () => {
    server();

    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(`http://localhost:8080`, {
        waitUntil: 'networkidle0',
    });
    await page.emulateMedia('print');
    await page.pdf({
        path: `./dest/${options.fullName.replace(' ', '_')}.pdf`,
        format: 'A4',
        margin: {
            top: '5mm',
            right: '5mm',
            bottom: '5mm',
            left: '5mm',
        },
    });
    await browser.close();

    connect.serverClose();
};

exports.pdf = pdf;


const copy = () => gulp.src('./src/copyInRoot/**/*')
    .pipe(gulp.dest('./dest/'));

exports.copy = copy;


const watch = () => {
    gulp.watch(`./src/html/**/*.njk`, gulp.series(html));
    gulp.watch(`./src/css/**/*.less`, gulp.series(css));
    gulp.watch(`./src/images/**/*.*`, gulp.series(images));
    gulp.watch(`./src/copyInRoot/**/*`, gulp.series(copy));
};

exports.watch = gulp.series(
    gulp.parallel(
        html,
        css,
        images,
        copy,
    ),
    gulp.parallel(
        watch,
        server,
    ),
);


exports.default = gulp.series(
    gulp.parallel(
        html,
        css,
        images,
        copy,
    ),
    pdf,
);
