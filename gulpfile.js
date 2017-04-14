/* File: gulpfile.js */
require('es6-promise').polyfill();
// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint');
    sass   = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps');
    autoprefixer = require('gulp-autoprefixer');
    browserSync = require('browser-sync').create();
    plumber = require('gulp-plumber');
    notify = require("gulp-notify");
    cleanCSS = require('gulp-clean-css');

    jsSrc = 'js/**/*.js';
    scssSrc = 'scss/**/*.scss';
    cssPub = 'css';



// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(jsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure the sass task
gulp.task('sass', function() {
  return gulp.src(scssSrc)

    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssPub))
    .pipe(browserSync.stream());
});


// configure which files to watch and what tasks to use on file changes & setup BrowserSync
gulp.task('watch', function() {
  browserSync.init({
      proxy: "localhost"
  });
  gulp.watch("*.html").on('change', browserSync.reload);

  gulp.watch(jsSrc, ['jshint']);
  gulp.watch(scssSrc, ['sass']);

});
