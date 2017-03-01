var PATH = {
    scss: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    js_vendor: [
        './node_modules/jquery/dist/jquery.min.js'
    ],
    css_vendor: './src/scss/vendor/**/*.scss',
    DIST: './dist'
};

//
// Modules
// ======================================================
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var $ = require('gulp-load-plugins')();

//
// Styles (SCSS + autoprefixer + minify)
// ======================================================
gulp.task('styles', function () {
    return gulp.src(PATH.scss)
        .pipe($.sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe($.autoprefixer({browsers: ['last 10 version']}))
        .pipe($.csso())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.DIST + '/css'))
        .pipe(browserSync.stream());
});

// Watch
gulp.task('watch', function () {

// Watch .scss files
    gulp.watch(PATH.scss, ['styles']);

    // // Watch .js files
    gulp.watch(PATH.js, ['js']);
    //
    // // Watch image files
    //gulp.watch('./img/**/*', ['image']);

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch('./*.html').on('change', browserSync.reload);
});

//js task
gulp.task('js', function () {
    return gulp.src(PATH.js)
        .pipe($.sourcemaps.init())
        .pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.DIST + '/js'))
        .pipe(browserSync.stream());
});

gulp.task('js-vendor', function () {
    return gulp.src(PATH.js_vendor)
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest(PATH.DIST + '/js'))
        .pipe(browserSync.stream());
});

gulp.task('css-vendor', function() {
    return gulp.src(PATH.css_vendor)
        .pipe($.concat('vendor.css'))
        .pipe(gulp.dest(PATH.DIST + '/css'))
        .pipe(browserSync.stream());
});

// Static server
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            notify: true
        }
    });

    // Watch .scss files
    gulp.watch(PATH.scss, ['styles']);

    // // Watch .js files
    gulp.watch(PATH.js, ['js']);
    //
    // // Watch image files
    //gulp.watch('./img/**/*', ['image']);

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Initialization
gulp.task('default', ['styles', 'js-vendor', 'css-vendor', 'js', 'serve']);