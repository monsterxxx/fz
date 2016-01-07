(function() {
'use strict';

angular
  .module('fz.trainer', [
    'fz.list-groups'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('trainer', {
        url: '/trainer',
        templateUrl: 'client/views/trainer/trainer.html',
        resolve: {
          currentUser: ($q) => {
            var deferred = $q.defer();

            if (Meteor.user() == null) {
              deferred.reject('AUTH_REQUIRED');
            } else

            if (!Meteor.user().settings.trainer) {
              deferred.reject('TRAINER_PERMISSION_REQUIRED');
            }

            else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      });
  });

})();
