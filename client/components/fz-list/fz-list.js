(function() {
'use strict';

angular
  .module('fz.list', [])
  .directive('fzList', fzUserSettings);

function fzUserSettings() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-list/fz-list.html',
    transclude: {
      'new': 'fzListNew',
      'list': 'fzListList'
    },
    scope: {},
    bindToController: {
      listTitle: '=',
      showNew: '='
    },
    controller: Ctrl,
    controllerAs: 'list',
    link: function(scope, element, attrs){
      // Some fancy logic.
    }
  };

  return directive;

}

Ctrl.$inject = ['$timeout'];

function Ctrl($timeout) {
  var vm = this;
  vm.add = add;

  function add(event) {
    event.stopPropagation();
    if (!vm.expanded) {vm.expanded = true;}
    vm.showNew = true;
  }
}

})();
