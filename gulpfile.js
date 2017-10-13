'use strict';

var gulp = require('gulp');
var server = require('browser-sync').create();
var run = require('run-sequence');
var ghPages = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var del = require('del');
var plumber = require('gulp-plumber');

gulp.task('minjs', function () {
  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(gulp.dest('build/js/'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/minjs'));
});

gulp.task('html', function () {
  gulp.src('src/*html')
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src([
    'src/img/**',
    'src/photos/**',
    'src/*.html',
    'src/css/**',
    'src/js/*.js'
  ], {
    base: 'src/'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('deploy', function () {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('build', function (fn) {
  run(
      'clean',
      'copy',
      fn
  );
});

gulp.task('serve', function () {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('src/js/**/*.js', ['minjs']).on('change', server.reload);
  gulp.watch('src/*.html', ['html']).on('change', server.reload);
});
