'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
const bs = browserSync.create();

const bsConfig = {
  port: 3000,
  open: true,
  ghostMode: false,
  online: false,
  server: {}
};

gulp.task('reload', done => {
  bs.reload();
  done();
});

gulp.task('serve', () => {
  bsConfig.server.baseDir = [global.paths.src, './'];
  bs.init(bsConfig);
});

gulp.task('serve:dist', ['build'], done => {
  bsConfig.server.baseDir = global.paths.dist;
  bs.init(bsConfig);
  done();
});
