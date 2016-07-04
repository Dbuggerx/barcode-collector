import angular from 'angular';
import 'angular-material';
import config from './home.config';
import HomeController from './home.controller';
import barcodeModule from '../common/components/barcode/barcode.module';
import pouchDbModule from '../common/services/pouchdb/pouchdb.module';

export default angular.module('barcode-collector.home',
  ['ngMaterial', 'ui.router', barcodeModule.name, pouchDbModule.name])
  .config(config)
  .controller('HomeController', HomeController);
