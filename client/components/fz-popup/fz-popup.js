(function() {
'use strict';

angular
  .module('fz.popup', [])
  .directive('fzPopup', fzUserSettings);

function fzUserSettings() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-popup/fz-popup.html',
    transclude: true,
    scope: {},
    bindToController: {
      show: '=',
      title: '@'
    },
    controller: function () {},
    controllerAs: 'vm'
  };

  return directive;
}

})();
