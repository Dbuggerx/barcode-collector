'use strict';

import gulp from 'gulp';
import path from 'path';
import htmlreplace from 'gulp-html-replace';

// Build HTML for distribution.
gulp.task('build-html', () => {
  gulp.src(path.join(global.paths.src, 'index.html'))
    .pipe(htmlreplace({
      js: ['app.min.js', 'cordova.js'],
      css: 'app.min.css'
    }))
    .pipe(gulp.dest(global.paths.dist));
});
