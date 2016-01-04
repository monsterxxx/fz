(function() {
'use strict';

angular
  .module('fz.list-groups', [
    'fz.list',
    'fz.form-group-new',
    'fz.list-item-group'
  ])
  .directive('fzListGroups', Dir)
  .controller('GroupItemCtrl', GroupItemCtrl);

function Dir() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-list-groups/fz-list-groups.html',
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
  vm.helpers({ groups: () => Groups.find({}, { sort: { name: 1 } }) });
  vm.newGroup = {};
  vm.showNew = false;
  vm.updGroup = updGroup;
  vm.delGroup = delGroup;

  function updGroup(id) {
    var group = _.detect(vm.groups, function (group) { return group._id === id; });
    Groups.update( { _id: id }, { $set: { 'came': group.came }} );
  }

  function delGroup(group) {
    Groups.remove({_id: group._id});
  }

}

function GroupItemCtrl() {
  var vm = this;
  vm.showNew = false;
}

})();
