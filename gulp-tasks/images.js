const gulp = require('gulp');

const images = () => gulp
    .src(`./src/images/**/*.*`)
    .pipe(gulp.dest(`./dest/images/`));

const watcher = () => {
    console.log(`watch images in './src/images/'`);
    return gulp.watch(`./src/images/**/*.*`, images);
};

const imagesWatcher = gulp.series(images, watcher);

module.exports = {images, imagesWatcher};
