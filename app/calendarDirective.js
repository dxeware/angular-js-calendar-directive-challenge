var DEBUG_MODE = true;
var debug = function(msg) {
  if (DEBUG_MODE === true) {
      console.log("DEBUG:", msg);
  }
};

// Holds the user selected Month (num) and Year
// Also, the collection to watch for user changes
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

      // function called when user changes year
      $scope.updateYr = function(year) {
        dateSelection.year = year;
        debug("======user entered yr = " + dateSelection.year);
      };
      // function called when user changes month
      $scope.updateMon = function(month) {
        dateSelection.monthNum = MONTHS.indexOf(month);
        debug("======user entered mon = " + dateSelection.month);
      };
  })

  // Directive to set up the month drop-down menu
  .directive('monthDrop',function(MONTHS){

    return {

      link: function(scope,element,attrs){
        scope.months = MONTHS;

        // get current month and save
        dateSelection.monthNum = new Date().getMonth();
        scope.currentMon = scope.months[dateSelection.monthNum];

        debug("currentMon = " + scope.currentMon);

      },
      templateUrl: 'month-dropdown.html'
    };
  })

  // Directive to set up the year drop-down menu
  .directive('yearDrop',function(){

    return {
      link: function(scope,element,attrs){
        scope.years = [];

        // get current year and save
        dateSelection.year = new Date().getFullYear();

        // display up to 'offset' years in the past, and 'range' years in the future
        for (var i = +attrs.offset; i < +attrs.range + 1; i++){
            scope.years.push(dateSelection.year + i);
        }
        scope.currentYr = dateSelection.year;
        debug("currentYear = " + scope.currentYr);
      },
      templateUrl: 'year-dropdown.html'
    };
  })

  // Directive to display calendar days
  .directive('calendarDisplay',function(){

    return {
      link: function(scope,element,attrs){

        var prep = {}, range = {};
        var startDate;

        // Initialize ready flag
        scope.calendarReady = false;

        // watch dateSelection object for changes from user to month and year
        scope.$watchCollection(function () {
          debug("watch triggered");
          return dateSelection;
        }, function() {

          // set current month (num)
          scope.currentMonNum = dateSelection.monthNum;

          // retrieve day 1 of selected month and year
          startDate = new Date(dateSelection.year, dateSelection.monthNum, 1);

          // get the range of days to be displayed on calendar
          prep = CalendarRange.prepareDate(startDate);
          scope.range = CalendarRange.getMonthlyRange(prep.date);

          debug("DISPLAYING currentYr currentMon = " + dateSelection.year + " " + dateSelection.monthNum);
          debug("currentMonNum = " + scope.currentMonNum);
          debug("START date = " + startDate);

        });

        // set ready flag for ng-show
        scope.calendarReady = true;
      },
      templateUrl: 'calendar.html'
    };
  });

