(function() {
'use strict';

angular
  .module('fz.admin', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'client/views/admin/admin.html',
        resolve: {
          currentUser: ($q) => {
            var deferred = $q.defer();

            Meteor.autorun(function () {
              Meteor.subscribe('users_extended', {
                onReady: function () {
                  console.log(Meteor.loggingIn());
                  if (!Meteor.loggingIn()) {
                    console.log(Meteor.user());
                    if (Meteor.user() == null) {
                      deferred.reject('AUTH_REQUIRED');
                    } else if (!Meteor.user().settings.admin) {
                      deferred.reject('ADMIN_PERMISSION_REQUIRED');
                    } else {
                      deferred.resolve(Meteor.user());
                    }
                  }
                },
                onStop: deferred.reject
              });
            });

            return deferred.promise;
          }
        }
      });
  });

})();
