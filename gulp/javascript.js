'use strict';

import gulp from 'gulp';
import jspm from 'jspm';
import uglify from 'gulp-uglify';
import path from 'path';
import cache from 'gulp-cached';
import eslint from 'gulp-eslint';
import ngAnnotate from 'gulp-ng-annotate';

gulp.task('build-js', ['lint-js', 'build-templates'], () => {
  const dist = path.join(global.paths.dist, 'app.min.js');
  return jspm.bundleSFX(path.join(global.paths.src, 'app.js'),
    dist, {encodeNames: false})
    .then(() => {
      return gulp.src(dist)
        .pipe(ngAnnotate())
        .pipe(uglify({
          compress: {
            unused: false
          }
        }))
        .pipe(gulp.dest(global.paths.dist));
    });
});

gulp.task('lint-js', () => {
  return gulp.src(global.paths.js)
    .pipe(cache('lint-js'))
    .pipe(eslint('.eslintrc'))
    .pipe(eslint.formatEach())
    .pipe(eslint.failAfterError());
});
