import angular from 'angular';
import 'angular-material';
import config from './home.config';
import HomeController from './home.controller';

export default angular.module('barcode-collector.home',
  ['ngMaterial', 'ui.router'])
  .config(config)
  .controller('HomeController', HomeController);
