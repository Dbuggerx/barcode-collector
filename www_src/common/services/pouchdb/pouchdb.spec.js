/* eslint one-var: 0, "max-len": 0, max-nested-callbacks: 0 */

import module from './pouchdb.module';
import 'angular-mocks';

describe('PouchDB', () => {
  let PouchDBSpy, dbMock, pouchDBService;
  beforeEach(() => {
    PouchDBSpy = jasmine.createSpy('PouchDBSpy');
    dbMock = jasmine.createSpyObj('dbMock', ['destroy', 'put', 'allDocs']);
    PouchDBSpy.and.returnValue(dbMock);
    angular.mock.module(module.name, $provide => {
      $provide.constant('PouchDB', PouchDBSpy);
    });
  });

  beforeEach(angular.mock.inject(_pouchDBService_ => {
    pouchDBService = _pouchDBService_;
  }));

  describe('service', () => {
    let db;
    beforeEach(() => {
      db = pouchDBService.createDb('test');
    });

    describe('createDb', () => {
      it('calls PouchDB constructor', function () {
        expect(PouchDBSpy).toHaveBeenCalled();
      });
    });

    describe('destroyDb', () => {
      it('calls db.destroy', function () {
        pouchDBService.destroyDb(db);
        expect(dbMock.destroy).toHaveBeenCalled();
      });
    });

    describe('addItemToDb', () => {
      it('calls db.put', function () {
        const item = {test: true};
        pouchDBService.addItemToDb(db, item);
        expect(dbMock.put).toHaveBeenCalledWith(item);
      });
    });

    describe('getAllFromDb', () => {
      it('calls db.allDocs', function () {
        pouchDBService.getAllFromDb(db);
        expect(dbMock.allDocs).toHaveBeenCalled();
      });
    });
  });
});
