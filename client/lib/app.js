(function(){
'use strict';

angular.module('fz', [
  //CORE
  'angular-meteor',
  // 'angular-meteor.auth',
  'accounts.ui',
  'ui.router',
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
    resolve: {
      redirect: ($q, $state, $timeout) => {
        var deferred = $q.defer();

        $timeout(function () {

          if (Meteor.user() == null) {
            deferred.resolve();
          } else {

            let onlyOneRole = getOnlyOneRole();

            if (onlyOneRole) {
              $state.go(onlyOneRole);
              deferred.reject();
            }

            else {
              deferred.resolve();
            }

          }

        });

        return deferred.promise;

        function getOnlyOneRole() {
          let settings = Meteor.user().settings,
          count = 0,
          state = '';
          _.each(settings, function (access, module) {
            if (access) {
              state = module;
              count++;
            }
          });
          if (count === 1) { return state; }
        }

      }
    }
  });

  $urlRouterProvider.otherwise('/');
})

.run(function ($state, $rootScope) {

  //when user loggs in or out go to home state
  Meteor.autorun(function () {
    if (Meteor.userId()) {}
    $state.go('home', {}, {reload: true});
  });

  $rootScope.$state = $state;
  $rootScope.log = function (message) {
    console.log(message);
  };

})

.directive('loginButtons', Dir);

function Dir() {
  var directive = {
    restrict: 'E',
    controller: Ctrl,
    controllerAs: 'vm',
    link: Link
  };

  return directive;
}

Ctrl.$inject = ['$scope', '$reactive'];

function Ctrl($scope, $reactive) {

  let vm = $reactive(this).attach($scope);

  vm.autorun(function () {
    // if (Meteor.userId() && element) {
    //   console.log(element[0].querySelector('#login-name-link'));
    // }
  });

}

function Link(scope, element) {
  Meteor.autorun(function () {
    if (Meteor.userId()) {
      console.log(element[0].querySelector('#login-name-link'));
    }
  });
}

})();
