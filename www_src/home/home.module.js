import angular from 'angular';
import 'angular-material';
import config from './home.config';
import HomeController from './home.controller';
import barcodeModule from '../common/components/barcode/barcode.module';

export default angular.module('barcode-collector.home',
  ['ngMaterial', 'ui.router', barcodeModule.name])
  .config(config)
  .controller('HomeController', HomeController);
