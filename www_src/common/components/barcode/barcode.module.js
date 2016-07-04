import angular from 'angular';
import barcode from './barcode';

export default angular.module('barcode', [])
  .directive('barcode', barcode);
