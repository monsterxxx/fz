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
      groupId: '@',
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
  vm.addClient = addClient;

  function isFormChanged() {
    return !angular.equals(vm.client, oriModel);
  }

  function resetForm() {
    vm.client = angular.copy(oriModel);
    vm.form.$setPristine();
  }

  function addClient() {
    Meteor.call('addClient', vm.client, vm.groupId);
    vm.resetForm();
    vm.show = false;
  }

}

})();
