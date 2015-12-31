if (Meteor.isClient) {

  angular.module('fz', [
    //CORE
    'angular-meteor',
    // 'angular-meteor.auth',
    'accounts.ui',
    'ui.router',
    //COMPONENTS
    'fz.input',
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

  });

}
