const gulp = require('gulp');


const images = () => gulp
    .src(`./src/images/**/*.*`)
    .pipe(gulp.dest(`./dest/images/`));

const watcher = () => gulp.watch(`./src/images/**/*.*`, images);

const imagesWatcher = gulp.series(images, watcher);


module.exports = {
    images,
    imagesWatcher
};
