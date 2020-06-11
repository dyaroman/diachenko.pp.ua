const gulp = require('gulp');


const images = () => gulp
    .src(`./src/images/**/*.*`)
    .pipe(gulp.dest(`./dest/images/`));

const watcher = (cb) => {
    console.log(`watch images in './src/images/'`);
    gulp.watch(`./src/images/**/*.*`, images);
    return cb();
};

const imagesWatcher = gulp.series(images, watcher);


module.exports = {
    images,
    imagesWatcher
};
