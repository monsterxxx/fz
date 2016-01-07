(function() {
'use strict';

angular
  .module('fz.list-item-group', [
    'fz.list',
    'fz.form-client-add',
    'fz.list-item-client'
  ])
  .directive('fzListItemGroup', Dir);

function Dir() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-list-item-group/fz-list-item-group.html',
    scope: {},
    bindToController: {
      groupName: '@',
      groupId: '@'
    },
    controller: Ctrl,
    controllerAs: 'vm'
  };

  return directive;
}

Ctrl.$inject = ['$scope', '$reactive'];

function Ctrl($scope, $reactive) {

  var vm = this;
  $reactive(vm).attach($scope);
  vm.helpers({ group: () => Groups.findOne(vm.groupId) });
  vm.showNew = false;
  vm.showAttendance = false;
  vm.countChecked = countChecked;
  vm.submitAttendance = submitAttendance;

  function countChecked() {
    var count = 0;
    for (var i = 0; i < vm.group.clients.length; i++) {
      if (vm.group.clients[i].check === true) { count++; }
    }
    return count;
  }

  function submitAttendance() {
    Meteor.call('submitAttendance', vm.group._id, vm.group.clients);
  }

}

})();
