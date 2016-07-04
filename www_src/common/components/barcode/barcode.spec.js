/* eslint one-var: 0, "max-len": 0, max-nested-callbacks: 0, jasmine/no-spec-dupes: 0 */

import module from './barcode.module';
import 'angular-mocks';

describe('Barcode', () => {
  beforeEach(() => angular.mock.module(module.name));

  let $scope, $compile;

  function getCompiledElement() {
    const element = angular.element(
        '<div barcode barcode-type="{{mock.type}}" barcode-value="{{mock.value}}"></div>');
    const compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }

  beforeEach(angular.mock.inject(($rootScope, _$compile_) => {
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  describe('Directive', () => {
    describe('barcode type is qrcode', () => {
      beforeEach(() => {
        $scope.mock = {
          type: 'qrcode',
          value: 'testing'
        };
      });
      it('should render image', () => {
        const directiveElem = getCompiledElement();
          // The QRCode plugin renders a canvas and an img
        expect(directiveElem.find('canvas').length).toBe(1);
        expect(directiveElem.find('img').length).toBe(1);
      });
    });

    describe('barcode type is code128', () => {
      beforeEach(() => {
        $scope.mock = {
          type: 'code128',
          value: 'testing'
        };
      });
      it('should render image', () => {
        const directiveElem = getCompiledElement();
        expect(directiveElem.find('img').length).toBe(1);
      });
    });

    describe('barcode type is upc', () => {
      beforeEach(() => {
        $scope.mock = {
          type: 'upc',
          value: '123456789012'
        };
      });
      it('should render image', () => {
        const directiveElem = getCompiledElement();
        expect(directiveElem.find('img').length).toBe(1);
      });
    });

    describe('barcode type is invalid', () => {
      beforeEach(() => {
        $scope.mock = {
          type: '???',
          value: 'testing'
        };
      });
      it('should throw exception', () => {
        let exceptionThrown = false;
        try {
          getCompiledElement();
        } catch (e) {
          exceptionThrown = true;
        }
        expect(exceptionThrown).toBeTruthy();
      });
    });
  });
});
