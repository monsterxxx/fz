(function() {
'use strict';

angular
  .module('fz.pivot-attendance', [
  ])
  .directive('fzPivotAttendance', Dir);

function Dir() {
  var directive = {
    restrict: 'E',
    templateUrl: 'client/components/fz-pivot-attendance/fz-pivot-attendance.html',
    scope: {},
    bindToController: {
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
  vm.helpers({ attendance: () => Attendance.find({}) });

  var yearDeriver = $.pivotUtilities.derivers.dateFormat('createdAt', '%y');
  var monthDeriver = $.pivotUtilities.derivers.dateFormat('createdAt', '%m');
  var dayDeriver = $.pivotUtilities.derivers.dateFormat('createdAt', '%d');

  $('#output').pivotUI(vm.attendance,
    {
      rows: ['Тренер', 'Группа', 'Клиент'],
      cols: ['год', 'месяц', 'день'],
      derivedAttributes: {
        'год': yearDeriver,
        'месяц': monthDeriver,
        'день': dayDeriver,
        'Тренер': function (rec) { return rec.trainer; },
        'Группа': function (rec) { return rec.group; },
        'Клиент': function (rec) { return rec.client; }
      },
      hiddenAttributes: ['_id', 'group', 'trainer', 'client', 'createdAt']
    }
  );

}

})();
