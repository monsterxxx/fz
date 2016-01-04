if (Meteor.isClient) {

  angular.module('fz', [
    //CORE
    'angular-meteor',
    // 'angular-meteor.auth',
    'accounts.ui',
    'ui.router',
    'multi-transclude',
    //COMPONENTS
    'fz.user-settings',
    'fz.users-table',
    'fz.clients-table',
    //LAYOUT
    'fz.admin',
    'fz.trainer'
  ])

  .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
      });

    $urlRouterProvider.otherwise('/');

  })

  .run(function ($state, $rootScope) {
    $rootScope.$state = $state;
    $rootScope.log = function (message) {
      console.log(message);
    };
  });

}
