'use strict';

import gulp from 'gulp';
import runSeq from 'run-sequence';
import del from 'del';

// Empty the build dir.
gulp.task('clean', done => {
  del([global.paths.dist + '/*']).then(() => done());
});

gulp.task('build', done => {
  runSeq('clean', ['build-html', 'build-js'], done);
});
