"use strict";

const gulp = require('gulp'),
      concat = require('gulp-concat'),
      uglifyES = require('uglify-es'),
      rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
      gutil = require('gulp-util'),
      uglify = require('gulp-uglify'),
      composer = require('gulp-uglify/composer'),
      pump = require('pump');


// new try for minification
const minify = composer(uglifyES, console);

gulp.task('handleJs', ['concatScripts'], function (cb) {
  var options = {};

  pump([
      gulp.src('js/concatApp.js'),
      minify(options),
      rename('concatApp.min.js'),
      gulp.dest('js')
    ],
    cb
  );
});

gulp.task('concatScripts', function (){
  return gulp.src(['app.js', 'router.js', 'renderer.js', 'loremIpsumGenerator.js'])
    .pipe(maps.init())
    .pipe(concat('concatApp.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ['concatScripts'], function(code) {
  return gulp.src('js/concatApp.js')
    .pipe(uglify.minify(code))
    .pipe(rename('concatApp.min.js'))
    .pipe(gulp.dest('js'))
});