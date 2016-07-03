'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import minifyCss from 'gulp-cssnano';
import del from 'del';
import path from 'path';
import postcss from 'gulp-postcss';
import postcssCopy from 'postcss-copy';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', () => {
  return gulp.src(global.paths.sassBase)
    .pipe(rename('app.css'))
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(global.paths.src));
});

// Clear the assets dir.
gulp.task('clean-assets', done => {
  del([global.paths.dist + '/assets']).then(() => done());
});

gulp.task('build-css', ['clean-assets', 'sass'], () => {
  return gulp.src(path.join(global.paths.src, 'app.css'))
    .pipe(postcss([postcssCopy({
      src: './',
      dest: global.paths.dist,
      template: 'assets/[name].[ext]',
      relativePath() {
        return global.paths.dist;
      }
    })]))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(global.paths.dist));
});
