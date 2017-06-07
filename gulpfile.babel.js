'use strict';

// Modules
import concat from 'gulp-concat';
import gulp from 'gulp';
import jsdoc from 'gulp-jsdoc3';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';

import g$ from './src/v1/GConfig';

// Configs
import config from './src/config/gulp.config';
// import JSDOC_CONFIG from './src/config/jsdocConfig.json';


// Main Builds Tasks
gulp.task('default', (callback) => {
  runSequence('devSetup', 'clean', 'js', callback);
});

gulp.task('dev', (callback) => {
  runSequence('devSetup', 'clean', 'js', 'watch', callback);
});

gulp.task('docs', (callback) => {
  runSequence('devSetup', 'clean', 'jsdoc', callback);
});

gulp.task('release', (callback) => {
  runSequence('clean', 'prodSetup', 'js', callback);
});

// Individual Tasks
gulp.task('watch', () => {
  gulp.watch(g$.sourceFiles.js, ['js']);
});

gulp.task('devSetup', () => {
  g$.loadConfig(config)
    .buildInfo();
});

gulp.task('prodSetup', () => {
  config.environment = 'prod';
  g$.showDeleted = true;
  g$.loadConfig(config);
  g$.buildInfo();
});

gulp.task('clean', () => {
  g$.deleteFiles([g$.build, g$.docs]);
});

gulp.task('jsdoc', (cb) => {
  g$.deleteFiles([
    g$.docs
  ]);

  gulp.src(g$.sourceFiles.docs, { read: false })
    .pipe(jsdoc(cb));
});

gulp.task('js', () => {
  g$.deleteFiles([`${g$.build}**/*.*`]);

  return gulp.src(g$.sourceFiles.js, {
    base: g$.source
  })
    .pipe(plumber())
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.init()))
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(`${g$.source}/_compiled`))
    .pipe(gulpif(g$.environment === 'prod', gulp.dest('./dist/'), gulp.dest(g$.build)));
});
