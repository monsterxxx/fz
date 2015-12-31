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
            if (Meteor.userId() == null || !Meteor.user().settings.admin) {
              return $q.reject();
            }
            else {
              return $q.resolve();
            }
          }
        }
      });
  });

})();
