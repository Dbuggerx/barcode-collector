'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import util from 'gulp-util';
import path from 'path';
const bs = browserSync.create();

const bsConfig = {
  port: 3000,
  open: true,
  ghostMode: false,
  online: false,
  server: {}
};

function onChange(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}

gulp.task('reload', done => {
  bs.reload();
  done();
});

gulp.task('serve', ['sass', 'templates'], () => {
  bsConfig.server.baseDir = [global.paths.src, './'];
  bs.init(bsConfig);

  gulp.watch([global.paths.js], ['lint-js', 'reload']).on('change', onChange);
  gulp.watch([global.paths.html], ['templates', 'reload']).on('change', onChange);
  gulp.watch('**/*.scss', ['sass']).on('change', onChange);
  gulp.watch([path.join(global.paths.src, 'app.css')], ['reload']).on('change', onChange);
  gulp.watch([global.paths.html, path.join(global.paths.src, 'index.html')], ['reload'])
    .on('change', onChange);
});

gulp.task('serve:dist', ['build'], done => {
  bsConfig.server.baseDir = global.paths.dist;
  bs.init(bsConfig);
  done();
});
