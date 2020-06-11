const options = require('./options/common');

const gulp = require('gulp');
const connect = require('gulp-connect');
const puppeteer = require('puppeteer');

const htmlTask = require('./gulp-tasks/html');
const stylesTask = require('./gulp-tasks/styles');
const jsTask = require('./gulp-tasks/scripts');
const imagesTask = require('./gulp-tasks/images');

gulp.task('html', () => {
    console.log(`build html`);
    return htmlTask.html();
});

gulp.task('css', () => {
    console.log(`build css`);
    return stylesTask.styles();
});

gulp.task('js', () => {
    console.log(`build js`);
    jsTask.jsLibs();
    return jsTask.scripts();
});

gulp.task('images', () => {
    console.log(`build images`);
    return imagesTask.images();
});

gulp.task('server', () => {
    connect.server({
        root: `./dest/`,
        livereload: false,
    });
});

gulp.task('watch', (cb) => {
    htmlTask.htmlWatcher();
    stylesTask.cssWatcher();
    jsTask.jsWatcher();
    imagesTask.imagesWatcher();
    gulp.task('copy')();
    gulp.task('server')();
    return cb();
});

gulp.task('pdf', () => {
    gulp.task('server')();

    const exit = process.exit;

    (async () => {
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
    gulp.task('js')();
    gulp.task('images')();
    gulp.task('pdf')();
    gulp.task('copy')();

    cb();
});
