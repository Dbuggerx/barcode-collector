import './js/cordova-init';
import angular from 'angular';
import './common/templates';
import 'angular-ui-router';
import 'angular-material/angular-material.css!';
import 'angular-material';
import home from './home/home.module';

angular.module('barcode-collector', ['templates', 'ui.router', 'ngMaterial',
  home.name
]);

angular
  .element(document)
  .ready(() => {
    const body = document.getElementsByTagName('body')[0];
    angular.bootstrap(body, ['barcode-collector'], {strictDi: false});
  });
