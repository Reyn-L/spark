/* jshint esversion:6 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

gulp.task('serve', function(){

  browserSync.init({
    server: {
      baseDir: 'public',
      index: 'index.html'
    }
  });

  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("public/*").on('change', browserSync.reload);
});

gulp.task('build-js', function() {
return gulp.src('js/app.js')
.pipe(concat('app.js'))
// .pipe(sourcemaps.init())
// .pipe(sourcemaps.write())
.pipe(gulp.dest('public/js'));
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src("scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('default',  ['serve', 'sass', 'build-js']);