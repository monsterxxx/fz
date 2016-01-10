(function() {
// 'use strict';

angular
  .module('fz.users-table', [])
  .directive('fzUsersTable', Dir);

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
  vm.helpers({ users: () => Meteor.users.find({}, { sort: { 'profile.fname': 1 } }) });
  vm.updateUserSettings = updateUserSettings;
  vm.settingsChanged = settingsChanged;

  function updateUserSettings(id) {
    var user = _.detect(vm.users, function (user) { return user._id === id; });
    Meteor.call('updateUserSettings', id, user.settings);
  }

  function settingsChanged() {
    return true;
    // return function () {
    //   for (var i = 0; i < user.profile)
    // }
  }

}

})();
