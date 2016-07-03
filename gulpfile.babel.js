'use strict';

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  html: 'www_src/**/!(index)*.html',
  // JS sources.
  js: 'www_src/**/!(*.spec|*.protractor)*.js',
  // SASS sources.
  sass: 'www_src/**/*.scss',
  // SASS base file
  sassBase: 'www_src/scss/app.scss',
  // Image sources.
  img: 'www_src/img',
  // Font sources.
  font: 'www_src/font',
  // Sources folder.
  src: 'www_src',
  // Compiled CSS.
  common: 'www_src/common',
  // Distribution folder.
  dist: 'www',
  // Protractor specs
  protractor: './**/*.protractor.js'
};

import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./gulp', {recurse: false});

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
