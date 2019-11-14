const util = require('gulp-util');

const config = {
    production: !!util.env.production
};

module.exports = config;
