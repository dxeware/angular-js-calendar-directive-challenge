var DEBUG_MODE = true;
var debug = function(msg) {
  if (DEBUG_MODE === true) {
      console.log("DEBUG:", msg);
  }
};



var dateSelection = {
      monthNum: 99,
      year: 99
};

angular.module('calendarDemoApp',[])
  .value('MONTHS', ['January', 'February', 'March',
                  'April', 'May', 'June',
                  'July', 'August', 'September',
                  'October', 'Novemeber', 'December'])
  .controller('calendarCtrl', function($scope, MONTHS) {
      $scope.updateYr = function(year) {
        dateSelection.year = year;
        debug("======user entered yr = " + dateSelection.year);
      };
      $scope.updateMon = function(month) {
        dateSelection.monthNum = MONTHS.indexOf(month);
        debug("======user entered mon = " + dateSelection.month);
      };
  })

  .directive('monthDrop',function(MONTHS){

    return {

      link: function(scope,element,attrs){
        scope.months = MONTHS;
        dateSelection.monthNum = new Date().getMonth();
        scope.currentMon = scope.months[dateSelection.monthNum];
        debug("currentMon = " + scope.currentMon);
      },
      templateUrl: 'month-dropdown.html'
    };
  })
  .directive('yearDrop',function(){

    return {
      link: function(scope,element,attrs){
        scope.years = [];
        dateSelection.year = new Date().getFullYear();
        for (var i = +attrs.offset; i < +attrs.range + 1; i++){
            scope.years.push(dateSelection.year + i);
        }
        scope.currentYr = dateSelection.year;
        debug("currentYear = " + scope.currentYr);
      },
      templateUrl: 'year-dropdown.html'
    };
  })
  .directive('calendarRow',function(){

    return {
      link: function(scope,element,attrs){

        var prep = {}, range = {};
        var daysInWeek = 7;
        //scope.displayDate = new Date(scope.currentYr, scope.monthNum, 1, 0, 0, 0, 0);

        // Initialize ready flag
        scope.calendarReady = false;

        scope.$watchCollection(function () {
          debug("watch triggered");
          return dateSelection;
        }, function() {
          debug("DISPLAYING currentYr currentMon = " + dateSelection.year + " " + dateSelection.monthNum);

          scope.displayDate = new Date(dateSelection.year, dateSelection.monthNum, 1, 0, 0, 0, 0);
          debug("DISPLAY date = " + scope.displayDate);
          prep = CalendarRange.prepareDate(scope.displayDate);
          scope.range = CalendarRange.getMonthlyRange(prep.date);
          console.log("first = " + scope.range.first);

          //empty rows array and re-create rows needed for calendar
          scope.rows = [];
          for (var i = 0; i < Math.round(scope.range.days.length / daysInWeek); i++) {
              scope.rows[i] = scope.range.days.slice(i*daysInWeek, i*daysInWeek+daysInWeek);
              for (var j = 0; j < scope.rows[i].length; j++) {
                debug("getMonth = " + scope.rows[i][j].date.getMonth());
                if (scope.rows[i][j].date.getMonth() != dateSelection.monthNum ) {
                  scope.rows[i][j].shade = 'shade';
                }
              }
          }

          //scope.rows = [1,2,3,4,5];
          //if (scope.range.first.getMonth() != scope.monthNum ) {
            //scope.shade = 'shade';
            //console.log("shading....");
          //}
        });
        scope.calendarReady = true;
      },
      templateUrl: 'calendar.html'
    };
  });

function GetValue() {

}
