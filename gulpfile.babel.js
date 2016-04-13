'use strict';

// Modules
import g$ from './src/v1/GConfig';
import concat from 'gulp-concat';
import gulp from 'gulp';
import esDoc from 'gulp-esdoc';
import yuidoc from 'gulp-yuidoc';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

// Config
import config from './src/config/guplp.config';

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

gulp.task('devSetup', () => {
  g$.loadConfig(config)
    .buildInfo();
});

gulp.task('prodSetup', () => {
  config.environment = 'prod';
  g$.loadConfig(config)
    .buildInfo();
});

gulp.task('clean', () => {
  g$.deleteFiles([g$.build, g$.docs]);
});

gulp.task('docs', () => {
  g$.deleteFiles([
    g$.docs
  ]);

  gulp.src('./src/v1/GConfig.js')
    .pipe(yuidoc());
});

gulp.task('js', () => {
  g$.deleteFiles([`${g$.build}**/*.*`]);

  return gulp.src(g$.sourceFiles.js, {
    base: g$.source
  })
    .pipe(plumber())
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(g$.build));
});

gulp.task('release', ['clean', 'prodSetup', 'js'], () => {
  gulp.src(`${g$.build}**/*.*`, {
    base: g$.build
  })
    .pipe(plumber())
    .pipe(gulp.dest('./dist/'));
});
