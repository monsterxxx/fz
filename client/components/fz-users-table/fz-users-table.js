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
  var vm = this;
  $reactive(vm).attach($scope);
  vm.helpers({ users: () => Meteor.users.find({}, { sort: { 'profile.fullname': 1 } }) });
  console.log(JSON.stringify(vm.users , null, 2));
  vm.updUser = updUser;

  function updUser(id) {
    var user = _.detect(vm.users, function (user) { return user._id === id; });
    Meteor.users.update( { _id: id }, { $set: { profile: user.profile, settings: user.settings }} );
  }
}

})();
