/* eslint one-var: 0, "max-len": 0, max-nested-callbacks: 0, jasmine/no-spec-dupes: 0, jasmine/no-suite-dupes: 0 */

import module from './home.module';
import 'angular-mocks';
import barcodeScanner from '../common/services/barcode-scanner/barcode-scanner';

describe('Home', () => {
  let $mdDialog, $q, $scope, $state;
  beforeEach(() => {
    angular.mock.module(module.name);
    angular.mock.inject((_$mdDialog_, _$q_, $rootScope, _$state_, $templateCache) => {
      $mdDialog = _$mdDialog_;
      $q = _$q_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $templateCache.put('home/home.html', '');
    });
  });

  describe('Module', () => {
    it('should redirect to /', function () {
      $scope.$apply();
      expect($state.current.name).toEqual('home');
    });

    it('should respond to URL', function () {
      expect($state.href('home')).toEqual('#/');
    });
  });

  describe('Controller', () => {
    let controller;

    // Spies
    let pouchDBServiceSpy, mdDialogPromptSpy, mdDialogAlertSpy;
    beforeEach(() => {
      pouchDBServiceSpy = jasmine.createSpyObj('pouchDBService', ['createDb', 'destroyDb', 'addItemToDb', 'getAllFromDb']);
      pouchDBServiceSpy.getAllFromDb.and.returnValue($q.resolve());
      pouchDBServiceSpy.addItemToDb.and.returnValue($q.resolve());

      mdDialogPromptSpy = spyOn($mdDialog, 'prompt').and.returnValue({
        title() {
          return this;
        },
        textContent() {
          return this;
        },
        placeholder() {
          return this;
        },
        ariaLabel() {
          return this;
        },
        targetEvent() {
          return this;
        },
        ok() {
          return this;
        },
        cancel() {
          return this;
        }
      });

      mdDialogAlertSpy = spyOn($mdDialog, 'alert').and.returnValue({
        clickOutsideToClose() {
          return this;
        },
        title() {
          return this;
        },
        textContent() {
          return this;
        },
        ariaLabel() {
          return this;
        },
        ok() {
          return this;
        }
      });
    });

    beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
      controller = _$controller_('HomeController', {
        $scope,
        pouchDBService: pouchDBServiceSpy
      });
    }));

    describe('constructor', () => {
      it('calls pouchDBService.getAllFromDb', () => {
        expect(pouchDBServiceSpy.getAllFromDb).toHaveBeenCalled();
      });
    });

    describe('showPrompt', () => {
      describe('success', () => {
        let mdDialogSpy;
        beforeEach(() => {
          mdDialogSpy = spyOn($mdDialog, 'show').and.returnValue($q.resolve({}));
          controller.showPrompt();
          $scope.$apply();
        });

        it('shows prompt dialog', () => {
          expect(mdDialogSpy).toHaveBeenCalled();
          expect(mdDialogPromptSpy).toHaveBeenCalled();
        });

        it('calls pouchDBService.addItemToDb', () => {
          expect(pouchDBServiceSpy.addItemToDb).toHaveBeenCalled();
        });
      });

      describe('reject', () => {
        let mdDialogSpy;
        it('shows alert dialog', () => {
          mdDialogSpy = spyOn($mdDialog, 'show').and.returnValue($q.reject());
          controller.showPrompt();
          $scope.$apply();
          expect(mdDialogSpy).toHaveBeenCalled();
          expect(mdDialogAlertSpy).toHaveBeenCalled();
        });
      });
    });

    describe('scanBarcode', () => {
      describe('success', () => {
        beforeEach(() => {
          spyOn(barcodeScanner, 'scan').and.returnValue($q.resolve({text: 'test'}));
          controller.scanBarcode();
          $scope.$apply();
        });

        it('calls barcodeScanner.scan', () => {
          expect(barcodeScanner.scan).toHaveBeenCalled();
        });
      });

      describe('reject', () => {
        beforeEach(() => {
          spyOn(barcodeScanner, 'scan').and.returnValue($q.reject());
          controller.scanBarcode();
          $scope.$apply();
        });

        it('shows alert dialog', () => {
          expect(mdDialogAlertSpy).toHaveBeenCalled();
        });
      });
    });

    describe('clearAllBarcodes', () => {
      describe('success', () => {
        beforeEach(() => {
          pouchDBServiceSpy.destroyDb.and.returnValue($q.resolve());
          controller.clearAllBarcodes();
          $scope.$apply();
        });

        it('calls pouchDBServiceSpy.destroyDb', () => {
          expect(pouchDBServiceSpy.destroyDb).toHaveBeenCalled();
        });
      });

      describe('reject', () => {
        beforeEach(() => {
          pouchDBServiceSpy.destroyDb.and.returnValue($q.reject());
          controller.clearAllBarcodes();
          $scope.$apply();
        });

        it('shows alert dialog', () => {
          expect(mdDialogAlertSpy).toHaveBeenCalled();
        });
      });
    });
  });
});
