'use strict';

import gulp from 'gulp';
import templateCache from 'gulp-angular-templatecache';
import fs from 'fs';
import minifyHtml from 'gulp-htmlmin';
import path from 'path';
import htmlreplace from 'gulp-html-replace';

gulp.task('templates', done => {
  // create empty module in development
  fs.writeFileSync(path.join(global.paths.common, 'templates.js'),
    'import angular from \'angular\'; angular.module("templates", []);'
  );
  done();
});

// Build templates for distribution.
gulp.task('build-templates', () => {
  // Populate the $templateCache
  return gulp.src(global.paths.html)
    .pipe(minifyHtml({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(templateCache({
      standalone: true,
      module: 'templates',
      moduleSystem: 'ES6'
    }))
    .pipe(gulp.dest(global.paths.common));
});

// Build HTML for distribution.
gulp.task('build-html', () => {
  gulp.src(path.join(global.paths.src, 'index.html'))
    .pipe(htmlreplace({
      js: ['app.min.js', 'cordova.js'],
      css: 'app.min.css'
    }))
    .pipe(gulp.dest(global.paths.dist));
});
