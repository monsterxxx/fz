(function() {
'use strict';

angular
  .module('fz.form-client-add', [
    'fz.buttons-submit'
  ])
  .directive('fzFormClientAdd', Dir);

function Dir() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-form-client-add/fz-form-client-add.html',
    scope: {},
    bindToController: {
      client: '=',
      show: '='
    },
    controller: Ctrl,
    controllerAs: 'vm'
  };

  return directive;
}

function Ctrl() {

  var vm = this;
  var oriModel = angular.copy(vm.client);
  vm.isFormChanged = isFormChanged;
  vm.resetForm = resetForm;
  vm.insertGroup = insertGroup;

  function isFormChanged() {
    return !angular.equals(vm.client, oriModel);
  };

  function resetForm() {
    vm.client = angular.copy(oriModel);
    vm.form.$setPristine();
  }

  function insertGroup() {
    Meteor.call('clientAdd', vm.client, Meteor.userId());
    vm.resetForm();
    vm.show = false;
  }

}

})();
