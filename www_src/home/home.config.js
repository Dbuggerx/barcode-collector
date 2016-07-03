import 'angular-ui-router';

export default function ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'home/home.html',
    controller: 'HomeController as homeCtrl'
  });
  $urlRouterProvider.otherwise('/');
}
