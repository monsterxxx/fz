(function() {
// 'use strict';

angular
  .module('fz.users-table', [])
  .directive('fzUsersTable', Dir)
  .controller('FzUsersTableRowCtrl', FzUsersTableRowCtrl);

function Dir() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-users-table/fz-users-table.html',
    scope: {},
    bindToController: {},
    controller: Ctrl,
    controllerAs: 'vm'
  };

  return directive;
}

Ctrl.$inject = ['$scope', '$reactive'];

function Ctrl($scope, $reactive) {
  let vm = this;
  $reactive(vm).attach($scope);
  vm.helpers({ users: () => Meteor.users.find({}, { sort: { 'profile.fname': 1 } })});

}

function FzUsersTableRowCtrl($scope) {
  let vm = this;
  vm.oriUser = angular.copy($scope.user);
  vm.isUserChanged = isUserChanged;
  vm.updateUserSettings = updateUserSettings;

  function updateUserSettings() {
    // var user = _.detect(vm.users, function (user) { return user._id === id; });
    Meteor.call('updateUserSettings', $scope.user._id, $scope.user.settings);
    vm.oriUser = angular.copy($scope.user);
  }

  function isUserChanged() {
    return !angular.equals($scope.user, vm.oriUser);
  }

}

})();
