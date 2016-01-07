(function() {
// 'use strict';

angular
  .module('fz.users-table', [])
  .directive('fzUsersTable', fzUserSettings);

function fzUserSettings() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-users-table/fz-users-table.html',
    scope: {},
    bindToController: {},
    controller: Ctrl,
    controllerAs: 'vm',
  };

  return directive;
}

Ctrl.$inject = ['$scope', '$reactive'];

function Ctrl($scope, $reactive) {
  let vm = $reactive(this).attach($scope);
  vm.helpers({ users: () => Meteor.users.find({}, { sort: { 'profile.name': 1 } }) });
  vm.updUserSettings = updUserSettings;
  vm.settingsChanged = settingsChanged;

  function updUserSettings(id) {
    var user = _.detect(vm.users, function (user) { return user._id === id; });
    Meteor.users.update( { _id: id }, { $set: { settings: user.settings }} );
  }

  function settingsChanged() {
    // return function () {
    //   for (var i = 0; i < user.profile)
    // }
  }

}

})();
