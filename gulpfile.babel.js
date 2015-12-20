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
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

// Config
gc.subFolder = 'v1';
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
  gulp.watch(config.sourceFiles.js, [ 'js']);
});

//////////

gulp.task('clean', () => {
  gc.deleteFiles([
    gc.builds + '**/*',
    '!' + gc.builds + '.gitignore'
  ])
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
      plugins: [
        {
          name: 'esdoc-es7-plugin'
        }
      ]
    }));
});

gulp.task('js', () => {

  gc.deleteFiles([gc.builds + 'main.min.js']);

  return gulp.src(gc.sourceFiles.js, {
      base: gc.source
    })
    .pipe(plumber())
    .pipe(gulpif(gc.environment === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js'))
    .pipe(uglify({
      comments: gc.environment === 'dev' || gc.environment === undefined
        ? 'all' : 'none'
    }))
    .pipe(gulpif(gc.environment === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(gc.builds));
});

gulp.task('createRelease', ['js'], () => {
  return gulp.src(gc.builds + '**/**')
    .pipe(gulp.dest('./dist'));
});
