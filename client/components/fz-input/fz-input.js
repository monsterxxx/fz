(function() {
// 'use strict';

angular
  .module('fz.input', [])
  .directive('fzInput', fzInput);

/* @ngInject */
function fzInput() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-input/fz-input.html',
    scope: {},
    bindToController: {
      model: '=',
      onOk: '&',
      placeholder: '@'
    },
    controller: FzInput,
    controllerAs: 'vm'
  };

  return directive;

  // function linkFunc(scope, el, attr, ctrl) {
  //
  // }
}

// ${5:Controller}.$inject = ['${6:dependencies}'];

/* @ngInject */
function FzInput() {
  var vm = this;
  var originalValue = vm.model;
  vm.cancel = cancel;

  function cancel() {
    vm.model = originalValue;
  }
}

})();
