/* eslint one-var: 0, "max-len": 0, max-nested-callbacks: 0*/

import module from './home.module';
import 'angular-mocks';

describe('Home', () => {
  let $mdDialog;
  beforeEach(() => {
    angular.mock.module(module.name);
    angular.mock.inject(_$mdDialog_ => {
      $mdDialog = _$mdDialog_;
    });
  });

  describe('Module', () => {
    let $state, $scope;
    beforeEach(angular.mock.inject((_$state_, $rootScope, $templateCache) => {
      $state = _$state_;
      $templateCache.put('home/home.html', '');
      $scope = $rootScope.$new();
    }));

    it('should redirect to /', function () {
      $scope.$apply();
      expect($state.current.name).toEqual('home');
    });

    it('should respond to URL', function () {
      expect($state.href('home')).toEqual('#/');
    });
  });

  describe('Controller', () => {
    let $scope, makeController;
    beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
      makeController = () => _$controller_('HomeController', {
        $scope
      });
    }));

    describe('showPrompt', () => {
      let mdDialogSpy;
      beforeEach(() => mdDialogSpy = spyOn($mdDialog, 'show').and.returnValue(Promise.resolve()));
      it('should show prompt dialog', () => {
        const controller = makeController();
        controller.showPrompt();
        expect(mdDialogSpy).toHaveBeenCalled();
      });
    });
  });
});
