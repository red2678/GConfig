/* @flow */
'use strict';

// Modules
import g$ from './src/v1/GConfig';
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

// Base Config
g$.bowerFolder = 'bower_components';
g$.buildFolder = 'builds';
g$.docsFolder = 'docs';
g$.liveReload = false;
g$.nodeFolder = 'node_modules';
g$.rootFolder = '.';
g$.sourceFolder = 'src';
g$.sourceFiles = {
  js: [
    g$.source + 'Gc.js'
  ],
  docs: [
    g$.source
  ],
  copy: [

    // Take only what you need to survive

  ]
};
g$.showDeleted = false;
g$.subFolder = 'v1';

//////////

gulp.task('default', [
  'devSetup',
  'clean',
  'js'
]);

gulp.task('dev', [
  'devSetup',
  'clean',
  'js',
  'watch'
]);

gulp.task('watch', () => {
  gulp.watch(g$.sourceFiles.js, ['js']);
});

//////////

gulp.task('devSetup', () => {
  g$.environment = 'dev';
});

gulp.task('prodSetup', () => {
  g$.environment = 'prod';
});

gulp.task('clean', () => {
  g$.deleteFiles([g$.build + '**/*'])
});

gulp.task('docs', () => {

  g$.deleteFiles([
    g$.docs
  ]);

  gulp.src(g$.sourceFiles.docs)
    .pipe(esDoc({
      source: g$.source,
      destination: g$.docs,
      autoPrivate: true,
      includes: ['\\.(es6)$'],
      coverage: true,
      includeSource: true,
      plugins: [{name: 'esdoc-es7-plugin'}]
    }));
});

gulp.task('js', () => {

  g$.deleteFiles([g$.build + 'main.min.js']);

  gulp.src(g$.sourceFiles.js, {
      base: g$.source
    })
    .pipe(plumber())
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(g$.build))
    .pipe(rename("main.min.js"))
    .pipe(uglify({
      comments: g$.environment === 'dev' || g$.environment === undefined
        ? 'all' : 'none'
    }))
    .pipe(gulp.dest(g$.build));
});

gulp.task('createRelease', ['prodSetup', 'js'], () => {
  gulp.src(g$.build + '**/**')
    .pipe(gulp.dest('./dist'));
});
