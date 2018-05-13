/*
    This should eventually be built with parcel
*/
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import concatCss from 'gulp-concat-css';
import cssNano from 'gulp-cssnano';
import htmlmin from 'gulp-htmlmin';
import rmHtmlComments from 'gulp-remove-html-comments';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';
import webpack from 'webpack-stream';

const DESTINATION = {
    CSS: 'main.css',
    DIRECTORY: 'dist/',
    JAVASCRIPT: 'main.js'
};

const SOURCE = {
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

const STATIC_FILES = [
    'src/**/*.ico',
    'src/**/*.jpg',
    'src/**/*.svg',
    'src/**/*.png'
];

const TARGET_BROWSERS = {
    browsers: [
        'last 2 major versions',
        'ie 11'
    ]
};

const TASKS = {
    BUILD: 'build',
    DEFAULT: 'default',
    HTML: 'html',
    SASS: 'sass',
    STATIC: 'static',
    WATCH: 'watch',
    WEBPACK: 'webpack'
};

const WATCH_FILES = {
    JAVASCRIPT: 'src/**/*.js',
    SASS: 'src/**/*.scss'
};

gulp.task(TASKS.HTML, () => gulp.src(SOURCE.HTML)
    .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
    .pipe(rmHtmlComments()).pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.SASS, () => gulp.src(SOURCE.SASS)
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(autoprefixer(TARGET_BROWSERS))
    .pipe(concatCss(DESTINATION.CSS))
    .pipe(cssNano())
    .pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.STATIC, () => gulp.src(SOURCE.STATIC_FILES).pipe(gulp.dest(`${__dirname}/${DESTINATION.DIRECTORY}`)));

gulp.task(TASKS.WEBPACK, () => gulp.src(SOURCE.JAVASCRIPT)
    .pipe(webpack({
        output: {
            filename: DESTINATION.JAVASCRIPT
        }
    }))
    .pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.WATCH, () => {
    gulp.watch(STATIC_FILES, [TASKS.STATIC]);
    gulp.watch(WATCH_FILES.SASS, [TASKS.SASS]);
    gulp.watch(WATCH_FILES.JAVASCRIPT, [TASKS.WEBPACK]);
});

gulp.task(TASKS.BUILD, [TASKS.HTML, TASKS.SASS, TASKS.STATIC, TASKS.WEBPACK]);
gulp.task(TASKS.DEFAULT, [TASKS.BUILD, TASKS.WATCH]);
