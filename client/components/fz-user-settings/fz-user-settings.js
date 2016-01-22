(function() {
// 'use strict';

angular
  .module('fz.user-settings', [
    'fz.window',
    'fz.field',
    'fz.input-submit'
  ])
  .directive('fzUserSettings', Dir);

function Dir() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-user-settings/fz-user-settings.html',
    scope: {},
    bindToController: {},
    controller: Ctrl,
    controllerAs: 'vm',
  };

  return directive;
}

Ctrl.$inject = ['$scope', '$reactive', '$q'];

function Ctrl($scope, $reactive, $q) {
  var vm = this;
  $reactive(vm).attach($scope);
  vm.helpers({ user: () => Meteor.user() });
  vm.show = false;
  vm.updateUserProfile = updateUserProfile;
  vm.getAvailableModules = getAvailableModules;
  vm.getModuleName = getModuleName;

  function updateUserProfile() {
    Meteor.call('updateUserProfile', Meteor.userId(), vm.user.profile);
  }

  function getAvailableModules() {
    var availableModules = [];
    if (vm.user) {
      _.each(vm.user.settings, function (available, module) {
        if (available) { availableModules.push(module); }
      });
    }
    return availableModules;
  }

  function getModuleName(module) {
    switch(module) {
      case 'client':
        return 'Клиент';
      case 'trainer':
        return 'Тренер';
      case 'admin':
        return 'Администратор';
    }
  }

  // waitForUser().then(function (user) {
  //   console.log('deferred user '+ JSON.stringify(user , null, 2));
  //   vm.helpers({ user: () => user });
  // });
  //
  // function waitForUser() {
  //   var deferred = $q.defer();
  //   vm.autorun(function () {
  //     if (!Meteor.loggingIn()) deferred.resolve(Meteor.user());
  //   });
  //   return deferred.promise;
  // }


}

})();
