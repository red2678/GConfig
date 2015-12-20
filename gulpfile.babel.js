/* @flow */
'use strict';

// GConfig
import GConfig from './src/v1/js_compiled/GConfig';

// Gulp
import concat from 'gulp-concat';
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint'
import esDoc from 'gulp-esdoc';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

const gc = new GConfig({
  subFolder: 'v1',
  liveReload: false
});

gc.sourceFiles = {

  // ES2015 (ES6) paths
  es: [
    gc.source + '*.es6'
  ],

  // JS paths concatenated into dist main.min.js
  js: [
    gc.source + 'js_compiled/GConfig.js'
  ],

  // Docs Folder
  docs: [
    gc.source
  ],

  // Files to Copy source path vars
  copy: [

    // Include only what you need to survive

  ]

};

gulp.task('default', [
  'clean',
  'envCheck',
  'sass',
  'js'
]);

gulp.task('dev', [
  'clean',
  'envCheck',
  'sass',
  'js',
  'watch'
]);

gulp.task('clean', () => {
  gc.deleteFiles([
    gc.builds + '**/*',
    '!' + gc.builds + '.gitignore'
  ])
});

gulp.task('babel', () => {

  gc.deleteFiles([gc.source + 'js_compiled']);

  return gulp.src(gc.sourceFiles.es, {
      base: gc.source
    })
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
      plugins: [
        'syntax-flow',
        'transform-flow-strip-types',
        'transform-strict-mode',
        'transform-class-properties',
        'transform-strict-mode'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(gc.source + 'js_compiled'));
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

gulp.task('js', ['babel'], () => {

  gc.deleteFiles([gc.builds + 'main.min.js']);

  return gulp.src(gc.sourceFiles.js, {
      base: gc.source + 'js_compiled'
    })
    .pipe(plumber())
    .pipe(gulpif(gc.environment === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js'))
    /*.pipe(uglify({
     comments: 'all'
     }))*/
    .pipe(gulpif(gc.environment === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(gc.builds));
});

gulp.task('createRelease', ['js'], () => {
  return gulp.src(gc.builds + '**/**')
    .pipe(gulp.dest('./dist'));
});
