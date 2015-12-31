(function() {
'use strict';

angular
  .module('fz.trainer', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('trainer', {
        url: '/trainer',
        templateUrl: 'client/views/trainer/trainer.html'
      });
  });

})();
