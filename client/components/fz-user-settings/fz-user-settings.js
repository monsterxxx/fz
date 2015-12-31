(function() {
// 'use strict';

angular
  .module('fz.user-settings', 
    ['fz.popup'])
  .directive('fzUserSettings', fzUserSettings);

function fzUserSettings() {
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

Ctrl.$inject = ['$scope', '$reactive'];

function Ctrl($scope, $reactive) {
  var vm = this;
  $reactive(vm).attach($scope);
  Meteor.subscribe('users_extended');
  vm.helpers({ user: () => Meteor.user() });
  vm.updCurrUser = updCurrUser;

  function updCurrUser() {
    Meteor.users.update( { _id: Meteor.userId() }, { $set: { profile: vm.user.profile }} );
  }
}

})();
