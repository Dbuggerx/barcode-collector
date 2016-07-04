import angular from 'angular';
import PouchDB from 'pouchdb';
import PouchDBService from './pouchdb';

export default angular.module('Pouch', [])
  .constant('PouchDB', PouchDB)
  .service('pouchDBService', PouchDBService);
