import autoprefixer from 'gulp-autoprefixer';
import concatCss from 'gulp-concat-css';
import cssNano from 'gulp-cssnano';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import include from 'gulp-include';
import rmHtmlComments from 'gulp-remove-html-comments';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';
import webpack from 'webpack-stream';

import {
    DESTINATION,
    SOURCE,
    TARGET_BROWSERS,
    TASKS,
    WATCH_FILES
} from './constants';

gulp.task(TASKS.CSS, () => gulp.src(SOURCE.CSS)
    .pipe(sourceMaps.init())
    .pipe(autoprefixer(TARGET_BROWSERS))
    .pipe(concatCss(DESTINATION.VENDOR_CSS))
    .pipe(cssNano())
    .pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.HTML, () => gulp.src(SOURCE.HTML)
    .pipe(include())
    .on('error', console.log) // eslint-disable-line no-console
    .pipe(htmlmin({
        collapseWhitespace: true,
        minifyCSS: true
    }))
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

gulp.task(TASKS.STATIC, () => gulp.src(SOURCE.STATIC).pipe(gulp.dest(`${__dirname}/${DESTINATION.DIRECTORY}`)));

gulp.task(TASKS.WEBPACK, () => gulp.src(SOURCE.JAVASCRIPT)
    .pipe(webpack({
        output: {
            filename: DESTINATION.JAVASCRIPT
        }
    }))
    .pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.WATCH, () => {
    gulp.watch(SOURCE.CSS, [TASKS.CSS]);
    gulp.watch(SOURCE.HTML, [TASKS.HTML]);
    gulp.watch(SOURCE.STATIC, [TASKS.STATIC]);
    gulp.watch(WATCH_FILES.SASS, [TASKS.SASS]);
    gulp.watch(WATCH_FILES.JAVASCRIPT, [TASKS.WEBPACK]);
});

gulp.task(TASKS.BUILD, [TASKS.CSS, TASKS.HTML, TASKS.SASS, TASKS.STATIC, TASKS.WEBPACK]);
gulp.task(TASKS.DEFAULT, [TASKS.BUILD, TASKS.WATCH]);
