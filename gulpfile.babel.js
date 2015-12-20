/* @flow */
'use strict';

// Modules
import gc from './src/v1/Gc';
import concat from 'gulp-concat';
import gulp from 'gulp';
import eslint from 'gulp-eslint'
import esDoc from 'gulp-esdoc';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

// Config
gc.subFolder = 'v1';
gc.environment = 'dev';
gc.liveReload = false;
gc.sourceFiles = {
  js: [
    gc.source + 'Gc.js'
  ],
  docs: [
    gc.source
  ],
  copy: [

    // Take only what you need to survive

  ]
};

//////////

gulp.task('default', [
  'clean',
  'js'
]);

gulp.task('dev', [
  'clean',
  'js',
  'watch'
]);

gulp.task('watch', () => {
  gulp.watch(gc.sourceFiles.js, ['js']);
});

//////////

gulp.task('changeToProd', () => {
  gc.environment = 'prod';
});

gulp.task('clean', () => {
  gc.deleteFiles([gc.build + '**/*'])
});

gulp.task('docs', () => {

  gc.deleteFiles([
    gc.docs
  ]);

  return gulp.src(gc.sourceFiles.docs)
    .pipe(esDoc({
      source: gc.source,
      destination: gc.docs,
      autoPrivate: true,
      includes: ['\\.(es6)$'],
      coverage: true,
      includeSource: true,
      plugins: [{name: 'esdoc-es7-plugin'}]
    }));
});

gulp.task('js', () => {

  gc.deleteFiles([gc.build + 'main.min.js']);

  return gulp.src(gc.sourceFiles.js, {
      base: gc.source
    })
    .pipe(plumber())
    .pipe(gulpif(gc.environment === 'dev', sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(gc.environment === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(gc.build))
    .pipe(rename("main.min.js"))
    .pipe(uglify({
      comments: gc.environment === 'dev' || gc.environment === undefined
        ? 'all' : 'none'
    }))
    .pipe(gulp.dest(gc.build));
});

gulp.task('createRelease', ['changeToProd', 'js'], () => {
  return gulp.src(gc.build + '**/**')
    .pipe(gulp.dest('./dist'));
});
