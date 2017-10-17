/* File: gulpfile.js */
require('es6-promise').polyfill();
// grab our packages
var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    cleanCSS = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint');

    es6Src = 'es6Src/**/*.js';
    scssSrc = 'scss/main.scss';
    watchScss = 'scss/*.scss';
    cssPub = 'css';
    jsPub = 'js';



// configure the jshint task
gulp.task('eslint', function() {
  return gulp.src(es6Src)
    .pipe(eslint({
      parserOptions: {
            "ecmaVersion": 6
        },
      rules: {
            "arrow-body-style": ["error", "always"],
            "no-var": "error",
            "prefer-const": "error"
        }
    }))
    .pipe(eslint.results(results => {
    	// Called once for all ESLint results. 
        console.log(`Total Results: ${results.length}`);
        console.log(`Total Warnings: ${results.warningCount}`);
        console.log(`Total Errors: ${results.errorCount}`);
    }))
    .pipe(eslint.format())
    .pipe(babel({
      presets: ['env']
  }))
  .pipe(gulp.dest(jsPub));
});

// configure the sass task
gulp.task('sass', function() {
  return gulp.src(scssSrc)

    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssPub))
    .pipe(browserSync.stream());
});


// configure which files to watch and what tasks to use on file changes & setup BrowserSync
gulp.task('watch', function() {
  browserSync.init({
                server: {
                        baseDir: "./"
                 }
        });
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch(es6Src, ['eslint']).on('change', browserSync.reload);
  gulp.watch(watchScss, ['sass']);

});
