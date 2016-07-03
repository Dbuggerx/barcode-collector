'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
const bs = browserSync.create();

gulp.task('reload', done => {
  bs.reload();
  done();
});

gulp.task('serve', () => {
  bs.init({
    port: 3000,
    open: true,
    ghostMode: false,
    online: false,
    server: {
      baseDir: [global.paths.src, './']
    }
  });
});
