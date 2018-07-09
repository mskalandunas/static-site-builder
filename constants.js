export const DESTINATION = {
    CSS: 'main.css',
    DIRECTORY: 'dist/',
    JAVASCRIPT: 'main.js'
};

export const SOURCE = {
    HTML: 'src/**/*.html',
    JAVASCRIPT: 'src/js/index.js',
    SASS: 'src/sass/base.scss',
    STATIC: [
        'src/**/*.ico',
        'src/**/*.jpg',
        'src/**/*.png',
        'src/**/*.svg'
    ]
};

export const TARGET_BROWSERS = {
    browsers: [
        'last 2 major versions',
        'ie 11'
    ]
};

export const TASKS = {
    BUILD: 'build',
    DEFAULT: 'default',
    HTML: 'html',
    SASS: 'sass',
    STATIC: 'static',
    WATCH: 'watch',
    WEBPACK: 'webpack'
};

export const WATCH_FILES = {
    JAVASCRIPT: 'src/**/*.js',
    SASS: 'src/**/*.scss'
};
