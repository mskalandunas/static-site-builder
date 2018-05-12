/*
    This should eventually be built with parcel
*/

import gulp from 'gulp';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cssNano from 'gulp-cssnano';
import concatCss from 'gulp-concat-css';
import webpack from 'webpack-stream';

const staticFiles = [
    'src/**/*.html',
    'src/**/*.ico',
    'src/**/*.jpg',
    'src/**/*.svg',
    'src/**/*.png'
];

const targetBrowser = {
    browsers: [
        'last 2 major versions',
        'ie 11'
    ]
};

gulp.task('sass:dev', () =>  gulp.src('src/sass/base.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(autoprefixer(targetBrowser))
    .pipe(concatCss('main.css'))
    .pipe(gulp.dest('dist/'))
);

gulp.task('static:dev', () => gulp.src(staticFiles).pipe(gulp.dest(__dirname + '/dist/')));

gulp.task('webpack:dev', () => gulp.src('src/js/index.js')
    .pipe(webpack({
        output: {
            filename: 'main.js'
        }
    }))
    .pipe(gulp.dest('dist/'))
);

gulp.task('watch:build', () => {
    gulp.watch(staticFiles, ['static:dev']);
    gulp.watch('src/**/*.scss', ['sass:dev']);
    gulp.watch('src/**/*.js', ['webpack:dev']);
});

gulp.task('build', ['static:dev', 'webpack:dev', 'sass:dev']);
gulp.task('default', ['build', 'watch:build']);
