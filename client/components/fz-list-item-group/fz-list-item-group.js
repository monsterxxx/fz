(function() {
'use strict';

angular
  .module('fz.list-item-group', [
    'fz.list'
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

function Ctrl() {

  var vm = this;
  vm.showNew = false;

}

})();
