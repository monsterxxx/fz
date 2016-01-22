// Router.route('/(.*)', function(){
//
// });
(function(){
'use strict';

// Router.route('/fzadmin', function(){
//
// });
// Router.route('/trainer', function(){
//
// });

angular.module('fz', [
  //CORE
  'angular-meteor',
  // 'angular-meteor.auth',
  'ui.router',
  //COMPONENTS
  'fz.navbar',
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
  // .state('admin1',{
  //     url: '/admin'
  //   })
  // .state('admin2',{
  //   url: '/admin/*path'
  // });

  $urlRouterProvider.otherwise('/');
})

.run(function ($state, $rootScope) {

  //when user loggs in or out go to home state
  Meteor.autorun(function () {
    if (Meteor.userId()) {}
    $state.go('home', {}, {reload: true});
  });

  $rootScope.$state = $state;
  // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
  //   //This is to not interfere with Houston Admin
  //   if(toState.name == "admin1" || toState.name == "admin2"){
  //     event.preventDefault();
  //   }
  // });
  // $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
  //   // We can catch the error thrown when the $requireUser promise is rejected
  //   // and redirect the user back to the main page
  //   // if (error === "AUTH_REQUIRED") {
  //   //   //$location.path("/");
  //   //   $state.go('main');
  //   // }
  //   $state.go('home');
  // });
  // $rootScope.$on('$stateChangeSuccess', function (stateTo, stateToParams, stateFrom, stateFromParams) {
  //   console.log(stateTo, JSON.stringify(stateToParams , null, 2), stateFrom, JSON.stringify(stateFromParams , null, 2));
  // });
  $rootScope.log = function (message) {
    console.log(message);
  };
  $rootScope.json = function (obj) {
    return angular.toJson(obj, 2);
  };

});

})();
