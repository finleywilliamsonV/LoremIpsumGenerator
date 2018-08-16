"use strict";

const gulp = require('gulp'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
      gutil = require('gulp-util');

gulp.task('concatScripts', function (){
  return gulp.src(['app.js', 'router.js', 'renderer.js', 'loremIpsumGenerator.js'])
    .pipe(maps.init())
    .pipe(concat('concatApp.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ['concatScripts'], function() {
  return gulp.src('js/concatApp.js')
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename('concatApp.min.js'))
    .pipe(gulp.dest('js'))
});

const pump = require('pump');

gulp.task('uglify-error-debugging', ['concatScripts'], function (cb) {
  pump([
    gulp.src('js/concatApp.js'),
    uglify(),
    gulp.dest('js')
  ], cb);
});