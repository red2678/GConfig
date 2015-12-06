/* @flow */
'use strict';

// GConfig
import GConfig from './src/GConfig';

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

const gc = new GConfig({liveReload: false});

gc.set('sources', {

  // ES2015 (ES6) paths
  es: [
    gc.path('src', '*.es6')
  ],

  // JS paths concatenated into dist main.min.js
  js: [
    gc.path('src', 'js_compiled/GConfig.js')
  ],

  // Docs Folder
  docs: [
    gc.src
  ],

  // Files to Copy source path vars
  copy: [

    // Include only what you need to survive

  ]

});

console.log(gc);

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
    gc.path('builds', '**/*'),
    '!' + gc.path('builds', '.gitignore')
  ])
});

gulp.task('babel', () => {

  gc.deleteFiles([gc.path('src', 'js_compiled')]);

  return gulp.src(gc.sources.es, {
      base: gc.path('src')
    })
    .pipe(sourcemaps.init())
    .pipe(babel({
      "presets": ["es2015-node4"],
      "plugins": [
        "syntax-flow",
        "transform-flow-strip-types",
        "transform-strict-mode",
        "transform-class-properties",
        "transform-strict-mode"
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(gc.path('src', 'js_compiled')));
});

gulp.task('docs', () => {

  gc.deleteFiles([
    gc.path('docs', '**/*')
  ]);

  return gulp.src(gc.sources.docs)
    .pipe(esDoc({
      source: gc.path('src'),
      destination: gc.path('docs'),
      autoPrivate: true,
      includes: ["\\.(es6)$"],
      coverage: true,
      includeSource: true,
      plugins: [
        {"name": "esdoc-es7-plugin"}
      ]
    }));
});

gulp.task('js', ['babel'], () => {

  gc.deleteFiles([gc.path('builds', 'main.min.js')]);

  return gulp.src(gc.sources.js, {
      base: gc.path('src', 'js_compiled')
    })
    .pipe(plumber())
    .pipe(gulpif(gc.get('env') === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js'))
    /*.pipe(uglify({
     comments: 'all'
     }))*/
    .pipe(gulpif(gc.env === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(gc.path('builds')));
});

gulp.task('createRelease', ['js'], () => {
  return gulp.src(gc.path('builds', '**/**'))
    .pipe(gulp.dest('./dist'));
});
