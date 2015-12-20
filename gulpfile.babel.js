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
g$.buildsFolder = 'builds';
g$.docsFolder = 'docs';
g$.liveReload = false;
g$.nodeFolder = 'node_modules';
g$.rootFolder = '.';
g$.sourceFolder = 'src';
g$.subFolder = 'v1';

g$.sourceFiles = {
  js: [
    g$.source + '*.js'
  ],
  docs: [
    g$.source
  ]
};


g$.showDeleted = false;
g$.debug = true;

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
  g$.buildInfo();
});

gulp.task('prodSetup', () => {
  g$.environment = 'prod';
  g$.buildInfo();
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

  g$.deleteFiles([g$.build + '**/**']);

  return gulp.src(g$.sourceFiles.js, {
      base: g$.source
    })
    .pipe(plumber())
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(g$.build));
});

gulp.task('distro', ['prodSetup', 'js'], () => {

  gulp.src(g$.build + '*.*', {
      base: g$.build
    })
    .pipe(plumber())
    .pipe(gulp.dest('./dist/'));
});
