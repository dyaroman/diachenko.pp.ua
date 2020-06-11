const gulp = require('gulp');
const connect = require('gulp-connect');
const puppeteer = require('puppeteer');

const options = require('./options/common');
const htmlTask = require('./gulp-tasks/html');
const stylesTask = require('./gulp-tasks/styles');
const imagesTask = require('./gulp-tasks/images');


const html = () => htmlTask.html();
exports.html = html;

const css = () => stylesTask.styles();
exports.css = css;

const images = () => imagesTask.images();
exports.images = images;

const server = () => connect.server({
    root: `./dest/`,
    livereload: false,
});
exports.server = server;

const pdf = async (cb) => {
    server();

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
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

const copy = () => gulp
    .src('./src/copyInRoot/**/*')
    .pipe(gulp.dest('./dest/'));
exports.copy = copy;

const watch = () => gulp.series(
    gulp.parallel(
        htmlTask.htmlWatcher,
        stylesTask.cssWatcher,
        imagesTask.imagesWatcher,
        copy
    ),
    server
);
exports.watch = watch;

exports.default = gulp.series(
    gulp.parallel(
        html,
        css,
        images,
        copy
    ),
    pdf
);
