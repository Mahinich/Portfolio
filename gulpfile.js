const {src, dest, watch, parallel} = require('gulp');

const sass         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify-es').default;

function browsersync () {
    browserSync.init ({
        server: {
            baseDir:'src/'
        }
    })
}

function scripts () {
    return src ('src/js/script.js')
    .pipe (concat('script.min.js'))
    .pipe (uglify())
    .pipe (dest('src/js'))
    .pipe(browserSync.stream())
}

function styles () {
    return src('src/sass/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid:true
        }))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
}

function watching () {
    watch(['src/sass/**/*.scss'], styles);
    watch(['src/js/**/*.js', '!src/js/script.min.js'], scripts);
    watch('src/*.html').on ('change', browserSync.reload);
}

function build() {
    return src ([
        'src/css/style.min.css',
        'src/js/script.min.js',
        'src/*.html'
    ], {base: 'src'})
    .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = build;

exports.default = parallel(scripts, browsersync, watching);